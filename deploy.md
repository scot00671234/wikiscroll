# WikiScroll Deployment Guide

## Deploying to VPS with Dokploy

### Prerequisites
- VPS with Dokploy installed
- Domain name (optional but recommended)
- Git repository with your code

### Deployment Steps

#### 1. Prepare Your Repository
Make sure all files are committed and pushed to your Git repository:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Deploy with Dokploy

**Option A: Using Nixpacks (Recommended)**
1. In Dokploy dashboard, create a new project
2. Connect your Git repository
3. Select "Nixpacks" as the build method
4. The `nixpacks.toml` file will automatically configure the build process
5. Deploy!

**Option B: Using Dockerfile**
1. In Dokploy dashboard, create a new project
2. Connect your Git repository
3. Select "Dockerfile" as the build method
4. The `Dockerfile` will be used for building
5. Deploy!

#### 3. Environment Variables
Set these in Dokploy dashboard under Environment Variables:
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

#### 4. Domain Configuration (Optional)
1. In Dokploy, go to your project settings
2. Add your domain name
3. Configure SSL certificate (Let's Encrypt is recommended)
4. Update DNS records to point to your VPS

### Build Configuration

The app is configured for optimal production deployment:

- **Standalone Output**: Next.js builds a standalone server
- **Multi-stage Docker**: Optimized Docker image with minimal size
- **Node.js 18**: Latest LTS version
- **Production Optimizations**: All production optimizations enabled

### Performance Features

- **Image Optimization**: Wikipedia images are optimized
- **SEO Ready**: All meta tags and structured data included
- **AdSense Ready**: Google AdSense integration configured
- **Infinite Scroll**: Optimized for performance
- **Responsive Design**: Mobile-first approach

### Monitoring

After deployment, monitor:
- Application logs in Dokploy dashboard
- Resource usage (CPU, Memory)
- Response times
- Error rates

### Troubleshooting

**Build Fails:**
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check Docker build logs

**App Won't Start:**
- Verify environment variables
- Check port configuration (should be 3000)
- Review application logs

**Performance Issues:**
- Monitor resource usage
- Check for memory leaks
- Optimize images if needed

### Security Considerations

- Keep dependencies updated
- Use HTTPS in production
- Monitor for security vulnerabilities
- Regular backups recommended

### Backup Strategy

- Database backups (if using external DB)
- Application code in Git
- Environment configuration backup
- Regular VPS snapshots
