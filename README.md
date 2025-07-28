# Health Sync Pro

Health Sync Pro is a modern, full-stack health management dashboard built with Next.js, TypeScript, Tailwind CSS, and Radix UI. It provides users with a comprehensive platform to track, manage, and visualize their health data, medications, appointments, and more, with a focus on responsive design and user experience.

---

## Features

- **User Authentication**: Secure login and registration system.
- **Dashboard**: Visualize daily health metrics (steps, heart rate, weight) and upcoming medications.
- **Health Metrics**: Track blood pressure and other vital statistics over time.
- **Health Profile**: Manage allergies, medical conditions, and personal health information.
- **Medication Management**: Schedule and track medications with reminders.
- **Appointment Management**: Organize and view upcoming health appointments.
- **Health Records**: Store and access health records securely.
- **Notifications**: In-app notification system for reminders and updates.
- **Quick Entry Modal**: Fast input for daily health data.
- **Mobile Support**: Responsive UI with mobile bottom navigation and sidebar.
- **Theming**: Light/dark mode support via NextThemes.
- **Reusable UI Components**: Built with Radix UI and custom Tailwind components.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **UI Components**: Radix UI, custom components
- **Form Handling**: React Hook Form, Zod
- **State Management**: React Context, custom hooks
- **Icons**: [Lucide](https://lucide.dev/)

---

## Project Structure

```
├── app/                  # Next.js app directory (entry, layout, global styles)
├── components/           # All React components
│   ├── ui/               # Reusable UI primitives (Accordion, Button, Card, etc.)
│   ├── app-sidebar.tsx   # Sidebar navigation
│   ├── dashboard.tsx     # Main dashboard view
│   ├── health-app.tsx    # App shell and tab logic
│   ├── health-metrics.tsx# Health metrics charts
│   ├── health-profile.tsx# User profile management
│   ├── health-records.tsx# Health records view
│   ├── login-register.tsx# Auth forms
│   ├── medication-management.tsx # Medication tracking
│   ├── mobile-bottom-nav.tsx     # Mobile navigation
│   ├── notification-system.tsx   # Notification logic
│   ├── quick-entry-modal.tsx     # Quick data entry modal
│   ├── theme-provider.tsx        # Theme context
│   └── ...
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile detection
│   ├── use-responsive.ts# Responsive breakpoints
│   └── use-toast.ts     # Toast notifications
├── lib/                 # Utility functions
│   └── utils.ts         # Class name helpers
├── public/              # Static assets
├── styles/              # Global CSS (Tailwind)
├── package.json         # Project metadata and scripts
├── tailwind.config.ts   # Tailwind CSS config
├── postcss.config.mjs   # PostCSS config
├── tsconfig.json        # TypeScript config
└── ...
```

---

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

3. **Build for production**
   ```bash
   pnpm build
   # or
   npm run build
   ```

---

## Key Components

- **Authentication**: `components/auth-context.tsx`, `components/login-register.tsx`
- **Dashboard**: `components/dashboard.tsx`, `components/health-app.tsx`
- **Health Metrics**: `components/health-metrics.tsx`
- **Profile Management**: `components/health-profile.tsx`
- **Medication & Appointments**: `components/medication-management.tsx`, `components/appointment-management.tsx`
- **Notifications**: `components/notification-system.tsx`, `hooks/use-toast.ts`
- **UI Primitives**: `components/ui/`
- **Responsive & Mobile**: `hooks/use-mobile.tsx`, `components/mobile-bottom-nav.tsx`

---

## Custom Hooks

- `useIsMobile`: Detects mobile viewport for responsive UI.
- `useResponsive`: Provides breakpoint utilities.
- `useToast`: Manages toast notifications.

---

## Theming

- Uses `next-themes` for light/dark mode.
- Customizable via `components/theme-provider.tsx`.

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Credits

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Zod](https://zod.dev/)

---

## Contact

For questions or support, please open an issue or contact the maintainer.
