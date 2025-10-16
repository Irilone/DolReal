# Manual Deployment Guide - DolReal

Complete guide for manually deploying DolReal to a VPS or dedicated server.

## Overview

This guide covers deployment to:
- Ubuntu 22.04 LTS (recommended)
- Debian 11+
- CentOS/RHEL 8+

**Estimated setup time**: 45-60 minutes

---

## Server Requirements

### Minimum Specifications

- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 20GB SSD
- **OS**: Ubuntu 22.04 LTS (recommended)
- **Network**: 10 Mbps+ upload/download

### Recommended Specifications

- **CPU**: 4+ cores
- **RAM**: 8GB+
- **Storage**: 40GB+ SSD
- **OS**: Ubuntu 22.04 LTS
- **Network**: 100 Mbps+ upload/download

---

## Step 1: Initial Server Setup

### Update System

```bash
# Update package list
sudo apt update

# Upgrade packages
sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git build-essential software-properties-common
```

### Create Deploy User

```bash
# Create user
sudo adduser dolreal

# Add to sudo group
sudo usermod -aG sudo dolreal

# Switch to new user
su - dolreal
```

### Configure SSH (if not already done)

```bash
# Generate SSH key (on your local machine)
ssh-keygen -t ed25519 -C "dolreal@your-server"

# Copy to server (on your local machine)
ssh-copy-id dolreal@your-server-ip

# Test connection
ssh dolreal@your-server-ip
```

---

## Step 2: Install Node.js

### Using NodeSource Repository

```bash
# Download setup script
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### Alternative: Using NVM

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Load NVM
source ~/.bashrc

# Install Node.js
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version
```

---

## Step 3: Install and Configure Nginx

### Install Nginx

```bash
# Install
sudo apt install -y nginx

# Start and enable
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx

# Allow through firewall
sudo ufw allow 'Nginx Full'
```

### Configure Nginx for DolReal

Create `/etc/nginx/sites-available/dolreal`:

```nginx
# HTTP - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    return 301 https://$server_name$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    # Proxy settings
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;

    # Static files cache
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Images cache
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=2592000";
    }

    # API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # Main application
    location / {
        proxy_pass http://localhost:3000;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:3000/api/health;
        access_log off;
    }
}
```

### Enable Site

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/dolreal /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## Step 4: Install SSL Certificate

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow prompts:
# 1. Enter email
# 2. Agree to terms
# 3. Choose redirect option (2)

# Test auto-renewal
sudo certbot renew --dry-run

# Auto-renewal is configured via cron/systemd timer
sudo systemctl status certbot.timer
```

---

## Step 5: Install PM2 Process Manager

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

---

## Step 6: Clone and Setup Application

### Clone Repository

```bash
# Navigate to home directory
cd ~

# Clone repository
git clone https://github.com/Irilone/DolReal.git

# Navigate to project
cd DolReal
```

### Install Dependencies

```bash
# Install dependencies
npm ci --only=production

# Or if you need dev dependencies for building
npm ci
```

### Configure Environment

```bash
# Copy example environment file
cp .env.example .env.production

# Edit environment file
nano .env.production
```

Add your configuration:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# API Keys
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_key
INFRANODUS_API_KEY=your_infranodus_key

# Optional
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### Build Application

```bash
# Build for production
npm run build

# Verify build
ls -la .next
```

---

## Step 7: Configure PM2

### Create PM2 Ecosystem File

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'dolreal',
      script: 'npm',
      args: 'start',
      cwd: '/home/dolreal/DolReal',
      instances: 'max',  // Use all CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_file: '.env.production',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      autorestart: true,
      watch: false,
    },
  ],
};
```

### Start Application

```bash
# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs dolreal

# Monitor
pm2 monit
```

### Configure PM2 Startup

```bash
# Generate startup script
pm2 startup systemd -u dolreal --hp /home/dolreal

# Save PM2 process list
pm2 save

# Test by rebooting
sudo reboot
```

After reboot, verify:

```bash
pm2 status
```

---

## Step 8: Configure Firewall

### UFW (Ubuntu Firewall)

```bash
# Enable firewall
sudo ufw enable

# Allow SSH
sudo ufw allow OpenSSH

# Allow HTTP/HTTPS
sudo ufw allow 'Nginx Full'

# Check status
sudo ufw status
```

---

## Step 9: Setup Monitoring

### Install Node Exporter (Optional)

```bash
# Download
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz

# Extract
tar xvfz node_exporter-*.tar.gz
cd node_exporter-*/

# Move binary
sudo mv node_exporter /usr/local/bin/

# Create systemd service
sudo tee /etc/systemd/system/node_exporter.service > /dev/null <<EOF
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=dolreal
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF

# Start and enable
sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl enable node_exporter
```

### Configure Log Rotation

Create `/etc/logrotate.d/dolreal`:

```
/home/dolreal/DolReal/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    missingok
    create 0640 dolreal dolreal
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

---

## Step 10: Verify Deployment

### Health Checks

```bash
# Check application
curl http://localhost:3000

# Check via domain
curl https://your-domain.com

# Check API
curl https://your-domain.com/api/streams
```

### Performance Test

```bash
# Install Apache Bench
sudo apt install -y apache2-utils

# Run test
ab -n 1000 -c 10 https://your-domain.com/
```

---

## Maintenance Tasks

### Update Application

```bash
# Navigate to project
cd ~/DolReal

# Pull latest code
git pull origin main

# Install dependencies
npm ci --only=production

# Build
npm run build

# Restart application
pm2 restart dolreal

# Check status
pm2 status
```

### View Logs

```bash
# PM2 logs
pm2 logs dolreal

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
journalctl -u nginx -f
```

### Backup

```bash
# Create backup script
cat > ~/backup-dolreal.sh <<'EOF'
#!/bin/bash

BACKUP_DIR=~/backups
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application
tar czf $BACKUP_DIR/dolreal-$DATE.tar.gz \
    -C ~ \
    --exclude='DolReal/node_modules' \
    --exclude='DolReal/.next' \
    DolReal

# Backup configuration
tar czf $BACKUP_DIR/config-$DATE.tar.gz \
    /etc/nginx/sites-available/dolreal \
    ~/DolReal/.env.production

# Keep only last 7 backups
find $BACKUP_DIR -name "dolreal-*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "config-*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

# Make executable
chmod +x ~/backup-dolreal.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * ~/backup-dolreal.sh") | crontab -
```

---

## Security Hardening

### Disable Root Login

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Change these settings:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes

# Restart SSH
sudo systemctl restart sshd
```

### Install Fail2Ban

```bash
# Install
sudo apt install -y fail2ban

# Create local configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit configuration
sudo nano /etc/fail2ban/jail.local

# Enable and start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check status
sudo fail2ban-client status
```

### Enable Automatic Updates

```bash
# Install unattended-upgrades
sudo apt install -y unattended-upgrades

# Enable
sudo dpkg-reconfigure -plow unattended-upgrades

# Configure
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs dolreal --lines 100

# Check if port is available
sudo lsof -i :3000

# Check Node.js version
node --version

# Rebuild application
npm run build
pm2 restart dolreal
```

### SSL Certificate Issues

```bash
# Test certificate renewal
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal

# Check certificate expiry
sudo certbot certificates
```

### High Memory Usage

```bash
# Check memory
free -h

# Check PM2 processes
pm2 status

# Reduce PM2 instances
pm2 scale dolreal 2

# Or edit ecosystem.config.js
# instances: 2
```

### Nginx Errors

```bash
# Test configuration
sudo nginx -t

# Check error log
sudo tail -100 /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

---

## Monitoring and Alerts

### Setup Simple Uptime Monitor

Create `~/monitor-dolreal.sh`:

```bash
#!/bin/bash

URL="https://your-domain.com/api/health"
EMAIL="your-email@example.com"

if ! curl -sf $URL > /dev/null; then
    echo "DolReal is down!" | mail -s "DolReal Alert" $EMAIL
    pm2 restart dolreal
fi
```

Add to crontab (every 5 minutes):

```bash
*/5 * * * * ~/monitor-dolreal.sh
```

---

## Performance Optimization

### Enable HTTP/2

Already enabled in Nginx configuration (http2 flag)

### Optimize Node.js

Edit `ecosystem.config.js`:

```javascript
env: {
  NODE_ENV: 'production',
  NODE_OPTIONS: '--max-old-space-size=2048',
}
```

### CDN Integration

Consider using Cloudflare:
1. Sign up at cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable caching and optimization

---

## Scaling Considerations

### Vertical Scaling

Upgrade server resources:
- More CPU cores
- More RAM
- Faster storage (NVMe SSD)

### Horizontal Scaling

Use load balancer with multiple servers:
1. Setup multiple servers
2. Install HAProxy or Nginx as load balancer
3. Configure session persistence
4. Use shared database/storage

---

## Additional Resources

- [Ubuntu Server Guide](https://ubuntu.com/server/docs)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [DolReal GitHub](https://github.com/Irilone/DolReal)

---

**Last Updated**: 2025-10-16  
**Tested On**: Ubuntu 22.04 LTS  
**Node.js Version**: 20.x
