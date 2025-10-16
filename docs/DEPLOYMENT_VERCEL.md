# Deploying DolReal to Vercel

Complete guide for deploying the DolReal platform to Vercel.

## Overview

Vercel is the recommended hosting platform for DolReal, offering:
- ✅ Zero-configuration deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless functions
- ✅ Built-in analytics
- ✅ Preview deployments for PRs

**Estimated deployment time**: 10-15 minutes

---

## Prerequisites

Before you begin, ensure you have:
- ✅ GitHub account with DolReal repository access
- ✅ Vercel account (free tier available)
- ✅ API keys ready:
  - YouTube API key (optional)
  - InfraNodus API key (optional)
  - AI agent API keys (for orchestration)

---

## Step 1: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

**Cost**: Free tier includes:
- Unlimited projects
- 100GB bandwidth/month
- Unlimited deployments
- Custom domains

---

## Step 2: Import Your Project

### Option A: Using Vercel Dashboard

1. Log in to Vercel dashboard
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Find and select your DolReal repository
5. Click "Import"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd /path/to/DolReal
vercel
```

---

## Step 3: Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

**Framework Preset**: Next.js

**Build Command**: 
```bash
npm run build
```

**Output Directory**: 
```
.next
```

**Install Command**:
```bash
npm install
```

**Development Command**:
```bash
npm run dev
```

**Node.js Version**: 20.x (recommended)

---

## Step 4: Set Environment Variables

### Required Variables

Add these in: **Project Settings** → **Environment Variables**

```env
# Production
NODE_ENV=production

# API Keys (Optional - for full functionality)
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
INFRANODUS_API_KEY=your_infranodus_api_key

# AI Agent Keys (Optional - for orchestration)
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Application Settings
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Environment-Specific Variables

You can set variables for different environments:

| Environment | When Applied |
|-------------|--------------|
| Production | Main branch deploys |
| Preview | PR and branch deploys |
| Development | Local development (not Vercel) |

**Example:**
```env
# Production only
NEXT_PUBLIC_YOUTUBE_API_KEY=prod_key_here

# Preview only
NEXT_PUBLIC_YOUTUBE_API_KEY=preview_key_here
```

---

## Step 5: Deploy

### First Deployment

1. Click "Deploy" button in Vercel dashboard
2. Wait for build to complete (typically 2-5 minutes)
3. Once deployed, you'll see:
   - ✅ Production URL: `https://your-project.vercel.app`
   - ✅ Deployment status
   - ✅ Build logs

### Automatic Deployments

After initial setup, Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you open/update a pull request
- **Branch**: When you push to any branch

---

## Step 6: Custom Domain (Optional)

### Add Your Domain

1. Go to **Project Settings** → **Domains**
2. Click "Add Domain"
3. Enter your domain name (e.g., `dolreal.com`)
4. Follow DNS configuration instructions

### DNS Configuration

#### Option A: Using Vercel Nameservers (Recommended)

Update your domain registrar to use:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Option B: Using CNAME Record

Add a CNAME record:
```
Type: CNAME
Name: www (or @)
Value: cname.vercel-dns.com
```

### SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt.
- ✅ Free
- ✅ Auto-renewal
- ✅ No configuration needed

---

## Step 7: Verify Deployment

### Health Checks

1. Visit your production URL
2. Check these pages:
   - ✅ Home page: `/`
   - ✅ Streams: `/se` (or your default language)
   - ✅ Archive: `/se/archive`
   - ✅ Schedule: `/se/schedule`

### API Routes

Test API endpoints:
```bash
# Check streams API
curl https://your-project.vercel.app/api/streams

# Check schedule API
curl https://your-project.vercel.app/api/schedule
```

### Performance Check

Run Lighthouse audit:
```bash
npm install -g lighthouse

lighthouse https://your-project.vercel.app \
  --view \
  --preset=desktop
```

**Targets:**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

---

## Monitoring and Analytics

### Vercel Analytics

Enable in **Project Settings** → **Analytics**:

1. **Web Vitals**: Track LCP, FID, CLS
2. **Page Views**: Monitor traffic
3. **Top Pages**: See most visited pages
4. **Devices**: Desktop vs mobile breakdown

### Custom Monitoring

Add custom analytics:

```typescript
// src/lib/analytics.ts
export function trackEvent(name: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', name, properties);
  }
}

// Usage in components
import { trackEvent } from '@/lib/analytics';

function handleStreamClick(streamId: string) {
  trackEvent('stream_clicked', { streamId });
}
```

---

## Environment Variables Management

### Using Vercel CLI

```bash
# Add variable
vercel env add YOUTUBE_API_KEY production

# List variables
vercel env ls

# Remove variable
vercel env rm YOUTUBE_API_KEY production

# Pull variables for local development
vercel env pull .env.local
```

### Security Best Practices

1. **Never commit secrets** to Git
2. **Use environment-specific values** for keys
3. **Rotate keys regularly**
4. **Use least-privilege access**
5. **Monitor usage** in API dashboards

---

## Advanced Configuration

### next.config.js

Optimize for Vercel:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compression
  compress: true,
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

### vercel.json

Create `vercel.json` for advanced settings:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

---

## Troubleshooting

### Build Failures

**Issue**: Build fails with "Module not found"
```bash
# Solution: Clear cache and rebuild
vercel --force

# Or via dashboard: Settings → General → Clear Build Cache
```

**Issue**: Out of memory during build
```bash
# Solution: Add to package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

### Runtime Errors

**Issue**: API routes return 404
- Check `src/app/api/` directory structure
- Ensure route exports `GET`, `POST`, etc.
- Verify build logs for errors

**Issue**: Environment variables not working
```bash
# Pull latest variables
vercel env pull

# Redeploy
vercel --prod
```

### Performance Issues

**Issue**: Slow page loads
1. Check bundle size: `npm run build`
2. Enable compression in `next.config.js`
3. Optimize images using Next.js Image component
4. Implement code splitting

**Issue**: High server response time
1. Cache API responses
2. Use Vercel Edge Functions
3. Implement ISR (Incremental Static Regeneration)

---

## Scaling Considerations

### Function Limits

Vercel Free Tier:
- Max function duration: 10s
- Max function size: 50MB
- Concurrent executions: 1000

Vercel Pro:
- Max function duration: 60s
- Max function size: 50MB
- Concurrent executions: Unlimited

### Database Considerations

For production, consider:
- **Vercel Postgres**: Integrated database
- **Supabase**: Free tier available
- **PlanetScale**: Serverless MySQL
- **MongoDB Atlas**: Serverless MongoDB

---

## CI/CD Integration

### GitHub Actions

Add `.github/workflows/vercel-deploy.yml`:

```yaml
name: Vercel Production Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Vercel CLI
        run: npm install -g vercel
      
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Required Secrets

Add to GitHub repository secrets:
- `VERCEL_TOKEN`: Get from Vercel account settings
- `VERCEL_ORG_ID`: Find in `.vercel/project.json`
- `VERCEL_PROJECT_ID`: Find in `.vercel/project.json`

---

## Cost Optimization

### Free Tier Limits

Monitor usage:
- Bandwidth: 100GB/month
- Build time: 6,000 minutes/month
- Serverless functions: 100GB-hours

### Optimization Tips

1. **Enable caching** for API routes
2. **Use static generation** where possible
3. **Optimize images** with Next.js Image
4. **Minimize API calls** with caching
5. **Use edge functions** for fast response times

---

## Security Checklist

- [ ] Environment variables configured
- [ ] Secrets not in Git repository
- [ ] HTTPS enabled (automatic)
- [ ] Security headers configured
- [ ] API routes protected
- [ ] Rate limiting implemented
- [ ] CORS configured properly
- [ ] Input validation on all endpoints

---

## Support Resources

### Vercel Support

- **Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Discord**: [vercel.com/discord](https://vercel.com/discord)
- **Support**: [vercel.com/support](https://vercel.com/support)

### DolReal Support

- **GitHub**: [Issues](https://github.com/Irilone/DolReal/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Irilone/DolReal/discussions)
- **Email**: support@dolreal.example.com

---

## Next Steps

After deployment:
1. ✅ Set up monitoring and alerts
2. ✅ Configure custom domain
3. ✅ Enable analytics
4. ✅ Set up preview deployments for PRs
5. ✅ Document deployment process for team
6. ✅ Plan scaling strategy

---

**Last Updated**: 2025-10-16  
**Vercel Version**: Latest  
**Next.js Version**: 15.5.5

For the latest Vercel features, check [Vercel Changelog](https://vercel.com/changelog).
