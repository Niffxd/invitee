# Invitee

A modern, animated event invitation and RSVP management application built with Next.js, Firebase, and HeroUI.

## Overview

Invitee is a sleek web application designed for managing event invitations and tracking guest RSVPs. It features a beautiful, animated user interface with a carousel-based layout that guides guests through event details and confirmation.

## Features

### Guest-Facing Features
- 🎨 **Modern Animated UI** - Smooth carousel navigation with sparkle and gradient background effects
- ✅ **RSVP Confirmation** - Easy-to-use form for guests to confirm attendance
- 👥 **Plus One Support** - Guests can indicate if they're bringing a companion
- 📝 **Notes & Messages** - Guests can leave notes for the event organizer
- 🔔 **Toast Notifications** - Real-time feedback for form submissions
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile devices

### Event Management Features
- 📊 **Dashboard** - Admin interface (invitees list, activity, new invitee)
- 🔐 **Login** - Password-protected admin access (bcrypt)
- 🔥 **Firebase Admin** - Server-side Firestore via API routes
- 🎟️ **Unique Invite Links** - Each guest receives a personalized invitation URL
- 📈 **Guest Tracking** - Track confirmations, plus ones, and guest notes

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
- **UI Library:** [HeroUI 3.0](https://heroui.dev/) (Beta)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore) via [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- **Animations:** [Motion](https://motion.dev/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Tables:** [TanStack React Table](https://tanstack.com/table/latest)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Dates:** [Day.js](https://day.js.org/)
- **Auth:** bcryptjs (password hashing)
- **Language:** TypeScript

## Project Structure

```
invitee/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (Firebase Admin SDK)
│   │   ├── auth/login/       # Login endpoint
│   │   ├── invitees/         # Invitee CRUD, [inviteeId], batch, plus-ones
│   │   └── plus-ones/        # Plus one CRUD, [plusOneId]
│   ├── dashboard/            # Admin dashboard
│   │   ├── activity/         # Activity / RSVP list
│   │   ├── invitees/         # Invitee management
│   │   └── new-invitee/      # Add new invitee
│   ├── login/                # Login page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main invitation page
│   ├── not-found.tsx         # 404 page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── background/           # Sparkles background
│   ├── carousel/             # Carousel container
│   ├── copy-button/          # Copy-to-clipboard
│   ├── dashboard/            # Dashboard (navbar, table, activity, invitees)
│   ├── details/              # Event details
│   ├── form/                 # RSVP form
│   ├── gradient.tsx          # Gradient background
│   ├── home/                 # Home page + welcome / invitation link UI
│   ├── loading/              # Loading state
│   ├── login/                # Login form
│   ├── radio-button/         # Radio input
│   ├── schedule/             # Event schedule
│   ├── select/               # Select input
│   ├── switch/               # Switch toggle
│   ├── table/                # Table component
│   └── wrapper/              # Layout wrapper
├── consts/                   # Shared constants (details, home, schedule)
├── db/                       # Firebase Admin SDK
│   ├── admin.ts              # Firebase Admin initialization
│   ├── index.ts              # Re-exports
│   └── migration.ts          # Migration utilities
├── helpers/                  # Client helpers (call API routes)
│   ├── invitees.ts           # Invitee CRUD helpers
│   ├── utils.ts              # Utilities
│   └── index.ts
├── mocks/                    # Mock data (e.g. activities)
├── types/                    # TypeScript types
│   ├── invitee.ts            # Invitee types
│   ├── plusOne.ts            # Plus one types
│   ├── credential.ts         # Auth credential types
│   └── index.ts
├── scripts/                  # One-off scripts
│   ├── createInvitees.js     # Batch create invitees
│   ├── migrate-passwords.js  # Password hashing migration
│   └── README.md
├── VERCEL_DEPLOYMENT.md      # Vercel + Firebase setup
├── SECURITY_MIGRATION.md     # Password migration guide
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+ (or compatible version)
- pnpm package manager
- Firebase project with Firestore enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd invitee
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up Firebase:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database
   - For **local dev**: use a service account key file (see `db/admin.ts`)
   - For **production** (e.g. Vercel): set `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` in your environment

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

### Deploying to Vercel

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions on deploying this application to Vercel with Firebase Admin SDK configuration.

## Firebase Data Structure

### Collections

#### `invitees`
```typescript
{
  inviteeId: string;        // Unique UUID
  name: string;             // Guest name
  isConfirmed: boolean;     // Attendance confirmation
  isDeclined: boolean;      // Declined invitation
  hasPlusOne: boolean;      // Whether bringing a +1
  notes: string;            // Additional notes
  createdAt: Timestamp;     // Creation timestamp
  updatedAt: Timestamp;     // Last update timestamp
}
```

#### `credentials` (admin login)
Stores hashed passwords for dashboard access. See [SECURITY_MIGRATION.md](./SECURITY_MIGRATION.md) for schema and migration.

#### `plusOnes`
```typescript
{
  plusOneId: string;        // Unique UUID
  inviteeId: string;        // Reference to invitee
  name: string;             // Plus one name
  createdAt: Timestamp;     // Creation timestamp
  updatedAt: Timestamp;     // Last update timestamp
}
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## API & Helpers

**API routes** (under `app/api/`) use the Firebase Admin SDK server-side. **Helpers** in `helpers/invitees.ts` call these routes from the client:

- `createInvitee(name)` / `createInvitees(names[])` - Create invitee(s)
- `updateInvitee(inviteeId, data)` - Update invitee
- `getInvitee(inviteeId)` / `getInvitees()` - Get invitee(s)
- `deleteInvitee(inviteeId)` - Delete invitee and associated plus one
- `getAllPlusOne()` / `deletePlusOne(plusOneId)` - Plus one CRUD

Auth: `POST /api/auth/login` for admin login.

## Development Notes

- The application uses dark mode by default
- All animations use CSS transitions and Motion library
- Form validation is handled by React Hook Form
- Toast notifications provide user feedback
- The carousel component enables smooth section navigation

## Security & Docs

- **Firebase:** Use environment variables in production; see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).
- **Passwords:** Stored hashed (bcrypt). To migrate existing plain-text passwords, see [SECURITY_MIGRATION.md](./SECURITY_MIGRATION.md).
- **Best practices:** Firebase Security Rules, auth for admin routes, and (optional) Firebase App Check.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and intended for personal use.
