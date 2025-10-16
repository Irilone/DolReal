# Deploying DolReal with Docker

Complete guide for deploying the DolReal platform using Docker and Docker Compose.

## Overview

Docker deployment provides:
- ✅ Consistent environment across all platforms
- ✅ Easy scaling and orchestration
- ✅ Isolated dependencies
- ✅ Quick rollbacks
- ✅ Production-ready setup

**Estimated setup time**: 20-30 minutes

---

## Prerequisites

### Required Software

- **Docker**: 20.10+ 
  - Install: [docs.docker.com/get-docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: 2.0+
  - Included with Docker Desktop
  - Linux: [Install Compose](https://docs.docker.com/compose/install/)

### Verify Installation

```bash
# Check Docker version
docker --version
# Expected: Docker version 20.10.0 or higher

# Check Docker Compose version
docker-compose --version
# Expected: Docker Compose version 2.0.0 or higher

# Test Docker
docker run hello-world
```

---

## Step 1: Create Dockerfile

Create `Dockerfile` in the project root:

```dockerfile
# Multi-stage build for optimized image size

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set hostname
ENV HOSTNAME "0.0.0.0"

# Start application
CMD ["node", "server.js"]
```

### Optimize next.config.js

Update `next.config.js` for standalone output:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Compression
  compress: true,
};

module.exports = nextConfig;
```

---

## Step 2: Create .dockerignore

Create `.dockerignore` to exclude unnecessary files:

```
# Dependencies
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build output
.next
out
dist
build

# Environment files
.env
.env.local
.env.*.local

# Git
.git
.gitignore
.github

# IDE
.vscode
.idea
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage
.jest

# Documentation
docs
*.md
!README.md

# Miscellaneous
.trunk
.trunk-tmp
logs
*.log
artifacts
releases
alt-root-claude
```

---

## Step 3: Create Docker Compose File

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Main application
  dolreal:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
    image: dolreal:latest
    container_name: dolreal-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
      - NEXT_PUBLIC_YOUTUBE_API_KEY=${NEXT_PUBLIC_YOUTUBE_API_KEY}
      - INFRANODUS_API_KEY=${INFRANODUS_API_KEY}
    env_file:
      - .env.production
    volumes:
      - ./logs:/app/logs
    networks:
      - dolreal-network
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Nginx reverse proxy (optional)
  nginx:
    image: nginx:alpine
    container_name: dolreal-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - dolreal
    networks:
      - dolreal-network

  # Redis for caching (optional)
  redis:
    image: redis:7-alpine
    container_name: dolreal-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - dolreal-network
    command: redis-server --appendonly yes

networks:
  dolreal-network:
    driver: bridge

volumes:
  redis-data:
    driver: local
```

---

## Step 4: Create Environment Files

### Production Environment

Create `.env.production`:

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# API Keys
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
INFRANODUS_API_KEY=your_infranodus_api_key

# AI Agents (optional)
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Redis (if using)
REDIS_URL=redis://redis:6379

# Database (if using)
DATABASE_URL=postgresql://user:password@host:5432/dolreal
```

### Environment Template

Create `.env.docker.example`:

```env
# Copy this file to .env.production and fill in your values

# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# API Keys
NEXT_PUBLIC_YOUTUBE_API_KEY=
INFRANODUS_API_KEY=

# Optional Services
REDIS_URL=redis://redis:6379
```

---

## Step 5: Build and Run

### Build Image

```bash
# Build the Docker image
docker build -t dolreal:latest .

# Or with Docker Compose
docker-compose build
```

### Run Container

```bash
# Run with Docker
docker run -d \
  --name dolreal-app \
  -p 3000:3000 \
  --env-file .env.production \
  dolreal:latest

# Or with Docker Compose
docker-compose up -d
```

### Verify Deployment

```bash
# Check running containers
docker ps

# View logs
docker logs dolreal-app

# Or with Docker Compose
docker-compose logs -f dolreal
```

Visit `http://localhost:3000` to see your application.

---

## Step 6: Nginx Configuration (Optional)

Create `nginx.conf` for reverse proxy:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream dolreal_app {
        server dolreal:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general_limit:10m rate=100r/s;

    # Caching
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;

    server {
        listen 80;
        listen [::]:80;
        server_name your-domain.com www.your-domain.com;

        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name your-domain.com www.your-domain.com;

        # SSL configuration
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Security headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # Compression
        gzip on;
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

        # Static files
        location /_next/static {
            proxy_cache my_cache;
            proxy_pass http://dolreal_app;
            proxy_cache_valid 200 60m;
            add_header Cache-Control "public, max-age=3600, immutable";
        }

        # API routes with rate limiting
        location /api/ {
            limit_req zone=api_limit burst=20 nodelay;
            proxy_pass http://dolreal_app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Main application
        location / {
            limit_req zone=general_limit burst=50 nodelay;
            proxy_pass http://dolreal_app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

---

## Step 7: SSL/TLS Setup

### Option A: Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal (already configured by certbot)
sudo systemctl status certbot.timer
```

### Option B: Self-Signed Certificate (Development)

```bash
# Generate self-signed certificate
mkdir -p ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem \
  -out ssl/cert.pem \
  -subj "/CN=localhost"
```

---

## Management Commands

### Start/Stop/Restart

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose stop

# Restart services
docker-compose restart

# Stop and remove
docker-compose down

# Stop and remove including volumes
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f dolreal

# Last 100 lines
docker-compose logs --tail=100 dolreal
```

### Scale Services

```bash
# Run multiple instances
docker-compose up -d --scale dolreal=3

# With load balancer
# Update docker-compose.yml first to remove port mapping
```

---

## Monitoring

### Health Checks

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' dolreal-app

# Via API
curl http://localhost:3000/api/health
```

### Resource Usage

```bash
# Real-time stats
docker stats dolreal-app

# Detailed info
docker inspect dolreal-app
```

### Logs Collection

Consider using logging solutions:
- **ELK Stack**: Elasticsearch, Logstash, Kibana
- **Loki**: Grafana Loki
- **Fluentd**: Log aggregation

---

## Backup and Restore

### Backup Volumes

```bash
# Backup Redis data
docker run --rm \
  -v dolreal_redis-data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/redis-backup-$(date +%Y%m%d).tar.gz -C /data .

# Backup application logs
tar czf logs-backup-$(date +%Y%m%d).tar.gz logs/
```

### Restore from Backup

```bash
# Restore Redis data
docker run --rm \
  -v dolreal_redis-data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar xzf /backup/redis-backup-20251016.tar.gz -C /data

# Restart services
docker-compose restart redis
```

---

## Updating the Application

### Update Process

```bash
# 1. Pull latest code
git pull origin main

# 2. Rebuild image
docker-compose build dolreal

# 3. Stop current container
docker-compose stop dolreal

# 4. Start with new image
docker-compose up -d dolreal

# Or do it all at once
docker-compose up -d --build dolreal
```

### Zero-Downtime Updates

```bash
# 1. Scale up with new version
docker-compose up -d --scale dolreal=2 --no-recreate

# 2. Wait for health check
sleep 30

# 3. Remove old container
docker-compose scale dolreal=1
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs dolreal-app

# Common issues:
# 1. Port already in use
sudo lsof -i :3000

# 2. Permission issues
docker exec -it dolreal-app ls -la

# 3. Environment variables
docker exec -it dolreal-app env
```

### Build Failures

```bash
# Clear Docker cache
docker builder prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check disk space
df -h
```

### High Memory Usage

```bash
# Set memory limits in docker-compose.yml
services:
  dolreal:
    mem_limit: 1g
    mem_reservation: 512m
```

---

## Production Checklist

- [ ] Environment variables configured
- [ ] SSL/TLS certificates installed
- [ ] Nginx reverse proxy configured
- [ ] Health checks implemented
- [ ] Logging configured
- [ ] Backup strategy in place
- [ ] Monitoring setup
- [ ] Resource limits set
- [ ] Security headers configured
- [ ] Rate limiting enabled

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [DolReal GitHub](https://github.com/Irilone/DolReal)

---

**Last Updated**: 2025-10-16  
**Docker Version**: 20.10+  
**Docker Compose Version**: 2.0+
