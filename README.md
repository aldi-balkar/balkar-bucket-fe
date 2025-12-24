# Balkar Bucket Frontend

Frontend aplikasi untuk Balkar Bucket - File Storage System.

## Tech Stack

- **Next.js 14** - React Framework dengan App Router
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP Client

## Prerequisites

- Node.js 18+ 
- npm atau yarn
- Backend API running di http://localhost:8000

## Setup

1. Clone repository:
```bash
git clone https://github.com/aldi-balkar/balkar-bucket-fe.git
cd balkar-bucket-fe
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Setup environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

4. Run development server:
```bash
npm run dev
```

Aplikasi akan berjalan di http://localhost:3000

## Build untuk Production

```bash
npm run build
npm start
```

## Project Structure

```
balkar-bucket-fe/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Dashboard & main pages
│   ├── buckets/           # Bucket management
│   ├── files/             # File management
│   ├── api-keys/          # API key management
│   ├── users/             # User management
│   ├── settings/          # System settings
│   ├── logs/              # Activity logs
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Header.tsx
│   └── Sidebar.tsx
├── lib/                   # Utilities & services
│   ├── api.ts             # API client
│   ├── auth.ts            # Auth utilities
│   └── services/          # API service wrappers
└── middleware.ts          # Route protection
```

## Features

- 🔐 Authentication & Authorization
- 📦 Bucket Management (Create, Edit, Delete)
- 📁 File Management (Upload, Download, Delete)
- 🔑 API Key Management
- 👥 User Management (CRUD)
- ⚙️ System Settings
- 📊 Dashboard dengan Statistics
- 📝 Activity Logs
- 🌙 Dark Mode Support

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:8000/api` |

## Backend Repository

Backend API: [balkar-bucket](https://github.com/aldi-balkar/balkar-bucket)

## License

MIT
