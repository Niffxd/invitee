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
- 📊 **Dashboard** - Admin interface for managing invitations
- 🔥 **Firebase Integration** - Real-time database for guest data
- 🎟️ **Unique Invite Links** - Each guest receives a personalized invitation URL
- 📈 **Guest Tracking** - Track confirmations, plus ones, and guest notes

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
- **UI Library:** [HeroUI 3.0](https://heroui.dev/) (Beta)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Animations:** [Motion](https://motion.dev/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

## Project Structure

```
invitee/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Admin dashboard page
│   ├── layout.tsx         # Root layout with backgrounds
│   ├── page.tsx           # Main invitation page
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── carousel.tsx       # Carousel container
│   ├── form.tsx           # RSVP form
│   ├── header.tsx         # Event header
│   ├── schedule.tsx       # Event schedule
│   ├── details.tsx        # Event details
│   ├── sparkles.tsx       # Sparkle background effect
│   ├── gradient.tsx       # Gradient background
│   └── ...               # Other UI components
├── db/                    # Firebase configuration
│   └── firebase.ts        # Firebase initialization
├── helpers/               # Helper functions
│   └── invitees.ts        # CRUD operations for invitees
├── types/                 # TypeScript type definitions
│   ├── invitee.ts         # Invitee types
│   └── plusOne.ts         # Plus one types
└── package.json           # Project dependencies
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
   - Copy your Firebase configuration
   - Update `db/firebase.ts` with your credentials (consider using environment variables for production)

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
  hasPlusOne: boolean;      // Whether bringing a +1
  notes: string;            // Additional notes
  createdAt: Timestamp;     // Creation timestamp
  updatedAt: Timestamp;     // Last update timestamp
}
```

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

## API Functions

The application includes helper functions for managing invitees:

- `createInvitee(name)` - Create a single invitee
- `createInvitees(names[])` - Batch create multiple invitees
- `updateInvitee(inviteeId, data)` - Update invitee details
- `getInvitee(inviteeId)` - Retrieve single invitee
- `getInvitees()` - Get all invitees
- `deleteInvitee(inviteeId)` - Delete invitee and associated plus one
- `getAllPlusOne()` - Get all plus ones
- `deletePlusOne(plusOneId)` - Delete a plus one

## Development Notes

- The application uses dark mode by default
- All animations use CSS transitions and Motion library
- Form validation is handled by React Hook Form
- Toast notifications provide user feedback
- The carousel component enables smooth section navigation

## Security Considerations

⚠️ **Important:** The Firebase configuration in `db/firebase.ts` contains API keys. For production:

1. Move sensitive credentials to environment variables
2. Set up Firebase Security Rules
3. Implement proper authentication
4. Use Firebase App Check for abuse prevention

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and intended for personal use.
