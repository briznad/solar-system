# SvelteKit Solar System Explorer

A demo application built with SvelteKit and Firebase that showcases authentication, CRUD operations, and image management.

## Features

- **Authentication**
  - Login and signup with Firebase Auth
  - Role-based access control (admin/regular users)
  - Protected routes

- **CRUD Operations**
  - View all planets
  - View a single planet
  - Add a new planet (admin only)
  - Edit an existing planet (admin only)
  - Delete a planet (admin only)

- **Image Management**
  - Upload images to Firebase Storage
  - Delete images

## Technologies Used

- **Frontend**
  - SvelteKit
  - TypeScript
  - Firebase SDK

- **Backend**
  - SvelteKit API routes
  - Firebase Admin SDK

- **Database**
  - Firestore

- **Storage**
  - Firebase Storage

- **Authentication**
  - Firebase Authentication

## Project Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Firebase account

### Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage services
3. Set up Firebase Authentication with Email/Password provider
4. Create a web app in your Firebase project to get the configuration
5. Generate a service account key for server-side Firebase Admin SDK:
   - Go to Project Settings > Service accounts
   - Click "Generate new private key"
   - Save the JSON file

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/sveltekit-planets.git
cd sveltekit-planets
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Create a `.env.local` file with your Firebase Admin SDK configuration:
```
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"your-project-id",...}'
```

5. Run the development server
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Deployment

This application can be deployed to any SvelteKit-compatible hosting platform, such as Vercel, Netlify, or Firebase Hosting.

### Firebase Hosting Deployment

1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

2. Login to Firebase
```bash
firebase login
```

3. Initialize Firebase Hosting
```bash
firebase init
```

4. Build the application
```bash
npm run build
```

5. Deploy to Firebase
```bash
firebase deploy
```

## Project Structure

The project follows a typical SvelteKit structure with additional Firebase integration:

- `src/lib/firebase`: Firebase client and server configuration
- `src/lib/models`: TypeScript interfaces for data models
- `src/lib/components`: Reusable UI components
- `src/lib/stores`: Svelte stores for state management
- `src/routes`: SvelteKit routes and API endpoints
- `src/hooks.server.ts`: SvelteKit hooks for authentication middleware

## License

This project is licensed under the MIT License.
