# SvelteKit Solar System App

## Project Structure

```
src/
├── app.d.ts                 # TypeScript declaration file
├── app.html                 # Base HTML template
├── lib/                     # Shared components and utilities
│   ├── components/          # Reusable UI components
│   │   ├── Auth/
│   │   │   ├── LoginForm.svelte
│   │   │   └── SignupForm.svelte
│   │   ├── Layout/
│   │   │   ├── Header.svelte
│   │   │   ├── Footer.svelte
│   │   │   └── Navigation.svelte
│   │   ├── Planets/
│   │   │   ├── PlanetCard.svelte
│   │   │   ├── PlanetDetail.svelte
│   │   │   ├── PlanetForm.svelte
│   │   │   └── ImageUploader.svelte
│   │   └── ui/              # Basic UI components
│   │       ├── Button.svelte
│   │       ├── Input.svelte
│   │       └── Modal.svelte
│   ├── firebase/            # Firebase configuration and services
│   │   ├── client.ts        # Client-side Firebase initialization
│   │   ├── server.ts        # Server-side Firebase initialization
│   │   ├── auth.ts          # Authentication service
│   │   ├── storage.ts       # Storage service
│   │   └── db.ts            # Firestore database service
│   ├── models/              # TypeScript type definitions
│   │   ├── user.ts          # User model
│   │   └── planet.ts        # Planet model
│   ├── server/              # Server-side utilities
│   │   └── auth.ts          # Server authentication utilities
│   ├── stores/              # Svelte stores
│   │   └── auth.ts          # Authentication store
│   └── utils/               # Utility functions
│       ├── validation.ts    # Form validation
│       └── permissions.ts   # Permission checking
├── routes/                  # Application routes
│   ├── +page.svelte         # Homepage
│   ├── +layout.svelte       # Root layout
│   ├── +layout.server.ts    # Server-side layout logic
│   ├── login/
│   │   └── +page.svelte     # Login page
│   ├── signup/
│   │   └── +page.svelte     # Signup page
│   ├── planets/
│   │   ├── +page.svelte     # View all planets page
│   │   ├── +page.server.ts  # Planet list server logic
│   │   ├── +layout.ts       # Planet layout - auth protection
│   │   ├── [id]/
│   │   │   ├── +page.svelte # View single planet page
│   │   │   └── +page.server.ts # Single planet server logic
│   │   ├── add/
│   │   │   ├── +page.svelte # Add planet page
│   │   │   └── +page.server.ts # Add planet server logic
│   │   └── edit/
│   │       ├── [id]/
│   │       │   ├── +page.svelte # Edit planet page
│   │       │   └── +page.server.ts # Edit planet server logic
│   └── api/                 # API endpoints
│       └── planets/         # Planet API endpoints
│           └── +server.ts   # Planet API handler
└── hooks.server.ts         # SvelteKit hooks for auth middleware
```

## Key Features:

1. **Authentication System**
   - Firebase Auth for user management
   - Protected routes for authenticated users
   - Role-based access control (admin vs regular)
   - Session management with SvelteKit stores

2. **Planet CRUD Operations**
   - Create, read, update, and delete planets
   - Image upload and management with Firebase Storage
   - Form validation and error handling

3. **TypeScript Integration**
   - Strong typing for all data models
   - Type-safe Firebase operations
   - Improved developer experience
