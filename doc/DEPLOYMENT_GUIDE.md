# Deployment Guide

## Overview
This guide provides comprehensive instructions for deploying the Data Entry application to various environments including production, staging, and development setups.

---

## 🚀 **Quick Start Deployment**

### Prerequisites
Before deploying, ensure you have:
- Node.js 18+ installed
- PostgreSQL database access
- Environment variables configured
- Domain name (for production)

### Basic Deployment Steps
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Set up database
5. Build the application
6. Start the server

---

## 📋 **Environment Setup**

### Environment Variables
Create a `.env.local` file with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@hostname:5432/database_name"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"

# Application Configuration
NODE_ENV="production"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# Email Configuration (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Redis Configuration (Optional)
REDIS_URL="redis://localhost:6379"
```

### Environment-Specific Configurations

#### Development Environment
```bash
NODE_ENV="development"
DATABASE_URL="postgresql://localhost:5432/data_entry_dev"
NEXTAUTH_URL="http://localhost:3000"
```

#### Staging Environment
```bash
NODE_ENV="staging"
DATABASE_URL="postgresql://staging-db:5432/data_entry_staging"
NEXTAUTH_URL="https://staging.yourdomain.com"
```

#### Production Environment
```bash
NODE_ENV="production"
DATABASE_URL="postgresql://prod-db:5432/data_entry_prod"
NEXTAUTH_URL="https://yourdomain.com"
```

---

## 🐳 **Docker Deployment**

### Dockerfile
Create a `Dockerfile` in the project root:

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build the application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
```

### Docker Compose
Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  # Application service
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/data_entry
      - JWT_SECRET=your-jwt-secret
      - JWT_REFRESH_SECRET=your-refresh-secret
    depends_on:
      - db
      - redis
    restart: unless-stopped

  # Database service
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=data_entry
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  # Redis service (optional)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped

volumes:
  postgres_data:
```

### Docker Deployment Commands
```bash
# Build and start services
docker-compose up -d

# Run database migrations
docker-compose exec app pnpm prisma migrate deploy

# Seed the database (optional)
docker-compose exec app pnpm prisma db seed

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

---

## ☁️ **Cloud Platform Deployments**

### Vercel Deployment

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Configure vercel.json**
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
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret",
    "JWT_REFRESH_SECRET": "@jwt_refresh_secret"
  }
}
```

3. **Deploy to Vercel**
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add JWT_REFRESH_SECRET
```

### Railway Deployment

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Deploy to Railway**
```bash
# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up

# Add database
railway add postgresql

# Set environment variables
railway variables set JWT_SECRET=your-jwt-secret
railway variables set JWT_REFRESH_SECRET=your-refresh-secret
```

### DigitalOcean App Platform

1. **Create App Spec**
Create `app.yaml`:
```yaml
name: data-entry-app
services:
- name: web
  source_dir: /
  github:
    repo: your-username/data-entry
    branch: main
  run_command: pnpm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  env:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
  - key: JWT_SECRET
    value: your-jwt-secret
    type: SECRET
  - key: JWT_REFRESH_SECRET
    value: your-refresh-secret
    type: SECRET

databases:
- name: db
  engine: PG
  version: "15"
  size_slug: db-s-dev-database
```

2. **Deploy using doctl**
```bash
doctl apps create --spec app.yaml
```

---

## 🗄️ **Database Setup**

### PostgreSQL Setup

#### Local PostgreSQL
```bash
# Install PostgreSQL (Ubuntu)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE data_entry;
CREATE USER data_entry_user WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE data_entry TO data_entry_user;
\q
```

#### Cloud Database Options

**Supabase (Recommended)**
1. Create account at supabase.com
2. Create new project
3. Get connection string from Settings > Database
4. Update DATABASE_URL in environment variables

**PlanetScale**
1. Create account at planetscale.com
2. Create new database
3. Get connection string from Connect tab
4. Update DATABASE_URL in environment variables

**Neon**
1. Create account at neon.tech
2. Create new project
3. Get connection string from Connection Details
4. Update DATABASE_URL in environment variables

### Database Migration
```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate deploy

# Seed database (optional)
pnpm prisma db seed

# View database
pnpm prisma studio
```

---

## 🔧 **Build & Optimization**

### Build Commands
```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Build application
pnpm build

# Start production server
pnpm start
```

### Performance Optimizations

#### Next.js Optimizations
```javascript
// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    turbopack: true,
  },
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Enable compression
  compress: true,
  
  // Optimize fonts
  optimizeFonts: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
```

#### Database Optimizations
```sql
-- Add indexes for better performance
CREATE INDEX idx_farmer_commissioner ON farmer(commissioner_id);
CREATE INDEX idx_farmer_active ON farmer(is_active);
CREATE INDEX idx_product_commissioner ON product(commissioner_id);
CREATE INDEX idx_auction_session_date ON auction_session(date, commissioner_id);
CREATE INDEX idx_bill_status ON bill(payment_status, farmer_id);
```

---

## 🔒 **Security Configuration**

### SSL/TLS Setup
```bash
# Using Let's Encrypt with Certbot
sudo apt install certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
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
```

### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 5432  # PostgreSQL (only if external access needed)
```

---

## 📊 **Monitoring & Logging**

### PM2 Process Management
```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
echo 'module.exports = {
  apps: [{
    name: "data-entry-app",
    script: "pnpm",
    args: "start",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
}' > ecosystem.config.js

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

### Log Management
```bash
# View PM2 logs
pm2 logs

# Rotate logs
pm2 install pm2-logrotate

# Monitor with PM2
pm2 monit
```

### Health Checks
Create a health check endpoint:
```javascript
// pages/api/health.js
export default function handler(req, res) {
  // Check database connection
  // Check essential services
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'connected',
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
}
```

---

## 🔄 **CI/CD Pipeline**

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'
    
    - name: Install pnpm
      run: npm install -g pnpm
    
    - name: Install dependencies
      run: pnpm install --frozen-lockfile
    
    - name: Generate Prisma client
      run: pnpm prisma generate
    
    - name: Run database migrations
      run: pnpm prisma migrate deploy
      env:
        DATABASE_URL: postgresql://test_user:test_password@localhost:5432/test_db
    
    - name: Run tests
      run: pnpm test
      env:
        DATABASE_URL: postgresql://test_user:test_password@localhost:5432/test_db

  deploy:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      uses: your-deployment-action@v1
      with:
        api-key: ${{ secrets.DEPLOYMENT_API_KEY }}
        environment: production
```

---

## 🐛 **Troubleshooting**

### Common Issues

#### Database Connection Issues
```bash
# Check database connection
pnpm prisma db pull

# Reset database (development only)
pnpm prisma migrate reset

# Regenerate Prisma client
pnpm prisma generate
```

#### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check TypeScript errors
pnpm type-check
```

#### Performance Issues
```bash
# Monitor memory usage
htop

# Check disk space
df -h

# Monitor database performance
pnpm prisma studio
```

### Log Analysis
```bash
# Application logs
tail -f /var/log/app.log

# System logs
journalctl -u your-app-service -f

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

---

## 📋 **Deployment Checklist**

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database setup and migrations run
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Firewall rules configured
- [ ] Backup strategy implemented

### Post-Deployment
- [ ] Health checks passing
- [ ] Authentication working
- [ ] Database connections stable
- [ ] API endpoints responding
- [ ] SSL working correctly
- [ ] Monitoring setup
- [ ] Logs configured

### Performance Verification
- [ ] Page load times < 2 seconds
- [ ] API response times < 500ms
- [ ] Database query performance acceptable
- [ ] Memory usage within limits
- [ ] No JavaScript errors in console

---

## 🔗 **Related Documentation**

- [API Overview](./API_OVERVIEW.md) - Complete API documentation
- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Authentication system
- [Error Handling Guide](./ERROR_HANDLING_GUIDE.md) - Error handling patterns
- [Validation Guide](./VALIDATION_GUIDE.md) - Validation system

This deployment guide covers all aspects of deploying the Data Entry application to various environments with proper security, monitoring, and performance considerations.
