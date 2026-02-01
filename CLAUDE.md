# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

プレリビ is a Japanese prefecture/city review web application where users can post and browse reviews about different locations. The app consists of a Laravel API backend and a Next.js frontend, running in Docker containers.

## Development Commands

### Docker Operations (from project root)
```bash
make build          # Build containers and copy node_modules from next container
make up             # Start containers in detached mode
make down           # Stop containers
make api            # Enter the API (Laravel) container
make nextjs         # Enter the Next.js container
make test           # Run Laravel tests (PHPUnit)
```

### Container Logs
```bash
make wlog           # View nginx logs
make alog           # View API logs
make nlog           # View Next.js logs
```

### Inside the API Container (Laravel)
```bash
php artisan test                    # Run all tests
php artisan test --filter=TestName  # Run specific test
php artisan migrate                 # Run database migrations
php artisan db:seed                 # Seed database
```

### Inside the Next.js Container
```bash
npm run dev         # Start development server (runs automatically)
npm run build       # Build for production
npm run lint        # Run ESLint
```

### Code Formatting (from project root)
```bash
npx prettier --write "src/app/**/*.php"   # Format PHP files
```
Note: Prettier runs automatically on pre-commit for `src/app/` and `src/config/` PHP files via lint-staged.

## Architecture

### Backend (Laravel API)
- **Location**: `src/` directory contains the Laravel 11 application
- **API Routes**: `src/routes/api.php` - RESTful API endpoints
- **Controllers**: `src/app/Http/Controllers/` - ReviewController, ProfileController, NotificationController, etc.
- **Models**: `src/app/Models/` - User, Review, Rating, City, Prefecture, Photo, Like, UserSetting
- **Authentication**: Laravel Sanctum for API token authentication

### Frontend (Next.js 15)
- **Location**: `next/` directory contains the Next.js application with App Router
- **Pages**: `next/app/` - Uses App Router with file-based routing
- **Components**: `next/app/components/` - Reusable UI components
- **Types**: `next/types.ts` - TypeScript interfaces for Review, User, Rating, etc.
- **API Services**: `next/service/authServise.ts` - Authentication service
- **Data Fetching**: `next/lib/fetcher.ts` - SWR fetcher with auth headers

### Key Data Flow
- Frontend calls Laravel API at localhost (dev) via Sanctum tokens
- API URL configured in `next/Util/Util_api.ts`
- Reviews include ratings (safety, transportation, child_rearing, city_policies, livability)

### Docker Services
- **api**: PHP/Laravel application (port 8000)
- **next**: Next.js frontend (port 3000)
- **web**: Nginx reverse proxy (ports 80, 443, 8090)
- **mysql**: MySQL 8.0 database (port 2000)
- **phpmyadmin**: Database admin (port 10000)
- **mailhog**: Email testing (ports 1025, 8025)

## Testing

Tests use SQLite in-memory database (configured in `src/phpunit.xml`). Run tests via:
```bash
make test
# or inside api container:
php artisan test
```
