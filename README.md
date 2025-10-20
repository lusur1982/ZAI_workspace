# CM Crypto Miners - E-commerce Platform
NEEEW 
A comprehensive e-commerce platform for selling cryptocurrency mining hardware, built with Next.js 15, TypeScript, and modern web technologies.

## 🚀 Features

### Frontend
- **Next.js 15** with App Router for optimal performance and SEO
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** with shadcn/ui components for modern, responsive design
- **Server-side rendering** and static generation for better SEO
- **Mobile-first responsive design**

### Backend & API
- **Next.js API Routes** for serverless backend functionality
- **Prisma ORM** with PostgreSQL for robust database management
- **NextAuth.js** for secure authentication with Google OAuth
- **Role-based access control** (Admin/User roles)

### Key Features
- **Product Catalog**: Advanced filtering, search, and sorting
- **Shopping Cart**: Local storage-based cart with real-time updates
- **Checkout Process**: Multi-step checkout with shipping and payment
- **User Dashboard**: Profile management and order history
- **Admin Dashboard**: Product, order, and user management
- **Profitability Calculator**: Interactive mining profitability analysis
- **SEO Optimized**: Dynamic meta tags and structured data

## 📋 Pages

### Public Pages
- **Home**: Hero section, featured products, new arrivals
- **Shop**: Product grid with advanced filtering
- **Profitability**: Interactive mining profitability calculator
- **About**: Company history and team information
- **FAQ**: Comprehensive FAQ with search and filtering
- **Contact**: Contact form and company information

### User Pages
- **Profile**: User profile management
- **Cart**: Shopping cart with quantity management
- **Checkout**: Multi-step checkout process
- **Order History**: View past orders and status

### Admin Pages
- **Admin Dashboard**: Overview with statistics
- **Product Management**: CRUD operations for products
- **Order Management**: View and update order status
- **User Management**: Manage user accounts

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js v4
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + React Query
- **Deployment**: Ready for Vercel/Netlify

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd cm-crypto-miners
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cm_ecommerce"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Database setup**
```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed the database with sample data
npx prisma db seed
```

5. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database Schema

The application uses the following main models:

- **User**: User accounts with authentication
- **Product**: Crypto mining products with specifications
- **Order**: Customer orders with items and status
- **OrderItem**: Individual items within orders
- **FAQ**: Frequently asked questions
- **PageContent**: Dynamic page content management
- **Blog**: Blog posts (if needed)

## 📊 Sample Data

The seed script includes:
- **10 Crypto Miner Products**: Including ASIC and GPU miners
- **Admin User**: `admin@cmminers.com` / `admin123`
- **Test User**: `user@example.com` / `user123`
- **FAQ Items**: Common questions about crypto mining
- **Page Content**: SEO-optimized content for main pages

## 🔐 Authentication

### User Roles
- **USER**: Standard customer access
- **ADMIN**: Full administrative access

### Login Methods
- **Email/Password**: Traditional authentication
- **Google OAuth**: Social login option
- **Username/Email**: Flexible login options

## 🛒 E-commerce Features

### Product Management
- Product categories and filtering
- Advanced search functionality
- Product images and specifications
- Featured and new product badges
- Price and inventory management

### Shopping Cart
- Local storage persistence
- Real-time quantity updates
- Cart summary with calculations
- Promo code support (structure ready)

### Checkout Process
- Multi-step checkout (Shipping → Payment → Confirmation)
- Address management
- Order processing
- Email confirmations (structure ready)

### Order Management
- Order status tracking
- Order history for users
- Admin order management
- Shipping information

## 📈 Admin Dashboard

### Features
- **Dashboard Overview**: User, order, and revenue statistics
- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order status
- **User Management**: Manage customer accounts
- **Content Management**: Update page content and FAQs

### Access
- URL: `/admin`
- Admin credentials: `admin@cmminers.com` / `admin123`

## 🎨 UI/UX Features

### Design
- **Modern Design**: Clean, professional interface
- **Responsive**: Mobile-first approach
- **Dark Mode**: Theme support ready
- **Accessibility**: WCAG compliant components
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages

### Components
- **shadcn/ui**: Professional component library
- **Lucide Icons**: Consistent iconography
- **Form Validation**: Client and server-side validation
- **Toast Notifications**: User feedback system

## 🚀 Deployment

### Environment Setup
1. Set up production database
2. Configure environment variables
3. Set up Google OAuth credentials
4. Configure domain and SSL

### Deployment Platforms
- **Vercel**: Recommended for Next.js apps
- **Netlify**: Alternative option
- **Docker**: Container deployment
- **Self-hosted**: Custom server deployment

### Build Commands
```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🧪 Testing

### Testing Structure
- Unit tests for components and utilities
- Integration tests for API routes
- E2E tests for critical user flows

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 Documentation

### API Documentation
- **Products API**: CRUD operations
- **Orders API**: Order management
- **Users API**: User management
- **Auth API**: Authentication endpoints

### Component Documentation
- **Reusable Components**: Card, Button, Form, etc.
- **Custom Hooks**: Cart, auth, data fetching
- **Utilities**: Helper functions and constants

## 🔧 Development

### Code Style
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Husky**: Git hooks for code quality

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@cmminers.com
- **Documentation**: Check the `/docs` folder
- **Issues**: Create an issue on GitHub

## 🔄 Updates

### Version History
- **v1.0.0**: Initial release with core e-commerce functionality
- **v1.1.0**: Added profitability calculator
- **v1.2.0**: Enhanced admin dashboard
- **v1.3.0**: Improved mobile experience

### Roadmap
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Real-time inventory management
- [ ] Subscription-based products
- [ ] Mobile app development

---

Built with ❤️ for the crypto mining community