# Data Entry Application

A comprehensive agricultural data management system built with Next.js, designed for commissioners to manage farmers, products, auctions, and bills in agricultural markets.

## 🚀 **Features**

- **Authentication System**: Secure JWT-based authentication with automatic token refresh
- **Farmer Management**: Complete CRUD operations for farmer profiles
- **Product Catalog**: Manage agricultural products with categories and units
- **Commissioner Profiles**: User profile management with commission rates
- **Auction System**: Manage auction sessions and items (in development)
- **Bill Generation**: Generate and manage bills for farmers (in development)
- **Real-time Validation**: Client and server-side validation using Zod
- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS
- **Database Integration**: PostgreSQL with Prisma ORM
- **API Documentation**: Comprehensive API documentation

## 🛠️ **Tech Stack**

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with httpOnly cookies
- **Validation**: Zod schemas
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## 📦 **Installation**

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- pnpm package manager

### Setup Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd data-entry
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/data_entry"

# JWT Secrets
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"

# Application
NODE_ENV="development"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Database Setup**

```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# Seed the database (optional)
pnpm prisma db seed
```

5. **Start Development Server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ **Project Structure**

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/
│   │   │   └── api/           # API endpoints
│   │   │       ├── auth/      # Authentication endpoints
│   │   │       ├── farmers/   # Farmer management
│   │   │       ├── products/  # Product management
│   │   │       └── commissioner/ # Commissioner management
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   └── layout/          # Layout components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   ├── schemas/             # Zod validation schemas
│   ├── types/               # TypeScript type definitions
│   └── styles/              # Global styles
├── prisma/                  # Database schema and migrations
├── doc/                     # Documentation
└── public/                  # Static assets
```

## 📚 **Documentation**

Comprehensive documentation is available in the `doc/` directory:

- **[API Overview](./doc/API_OVERVIEW.md)** - Complete API documentation
- **[Authentication Guide](./doc/AUTHENTICATION_GUIDE.md)** - Authentication system details
- **[Farmers API](./doc/FARMERS_API_DOCS.md)** - Farmer management endpoints
- **[Products API](./doc/PRODUCTS_API_DOCS.md)** - Product management endpoints
- **[Commissioner API](./doc/COMMISSIONER_API_DOCS.md)** - Commissioner endpoints
- **[Validation Guide](./doc/VALIDATION_GUIDE.md)** - Zod validation system
- **[Error Handling](./doc/ERROR_HANDLING_GUIDE.md)** - Error handling patterns
- **[Data Models](./doc/DATA_MODELS.md)** - Database models and types
- **[Frontend Components](./doc/FRONTEND_COMPONENTS.md)** - React components guide
- **[Deployment Guide](./doc/DEPLOYMENT_GUIDE.md)** - Deployment instructions

## 🔐 **Authentication**

The application uses JWT-based authentication with the following flow:

1. Users login with email/password
2. Server returns JWT tokens as httpOnly cookies
3. Tokens are automatically included in subsequent requests
4. System handles token refresh automatically

### API Authentication

All protected endpoints require authentication cookies:

```bash
# Login first
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}' \
  -c cookies.txt

# Use cookies for protected endpoints
curl -X GET "http://localhost:3000/api/farmers" -b cookies.txt
```

## 🧪 **Testing**

### API Testing

Use the provided test flows in the API documentation:

```bash
# 1. Login to get authentication cookies
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password"}' \
  -c cookies.txt

# 2. Test farmer endpoints
curl -X GET "http://localhost:3000/api/farmers" -b cookies.txt
curl -X POST "http://localhost:3000/api/farmers" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name": "Test Farmer", "phone": "1234567890", "village": "Test Village"}'
```

### Database Testing

```bash
# View data in Prisma Studio
pnpm prisma studio

# Reset database (development only)
pnpm prisma migrate reset
```

## 🚀 **Deployment**

### Quick Deployment with Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Run migrations
docker-compose exec app pnpm prisma migrate deploy
```

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

For detailed deployment instructions, see the [Deployment Guide](./doc/DEPLOYMENT_GUIDE.md).

## 📊 **Database Schema**

The application uses PostgreSQL with the following main entities:

- **Commissioner**: Users who manage the system
- **Farmer**: Agricultural producers registered by commissioners
- **Product**: Agricultural products available in the system
- **AuctionSession**: Auction events conducted by commissioners
- **AuctionItem**: Individual items sold in auctions
- **Bill**: Bills generated for farmers
- **Buyer**: Purchasers at auctions

See [Data Models](./doc/DATA_MODELS.md) for complete schema details.

## 🛡️ **Security Features**

- JWT authentication with secure httpOnly cookies
- Password hashing with bcrypt
- Request validation with Zod schemas
- SQL injection prevention with Prisma
- CORS protection
- Rate limiting (configurable)
- Environment-based configuration

## 📈 **Performance Features**

- Server-side rendering with Next.js
- Database query optimization with Prisma
- Image optimization
- Font optimization
- Compression enabled
- Caching strategies

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

For support and questions:

1. Check the [documentation](./doc/) first
2. Search existing issues
3. Create a new issue with detailed information
4. Include error messages, logs, and reproduction steps

## 🔗 **Links**

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
