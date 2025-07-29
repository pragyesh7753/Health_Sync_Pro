# Health Sync Pro

> **Empowering Health & Well-being for All**
>
> _A modern, open-source health management platform aligned with **UN Sustainable Development Goal 3: Good Health and Well-being**._

---

## 🌍 Project Vision

Health Sync Pro is a comprehensive, user-friendly health dashboard designed to help individuals track, manage, and improve their health outcomes. By leveraging modern web technologies, it aims to make personal health management accessible, actionable, and engaging for everyone—supporting the global mission of SDG Goal 3: _Ensure healthy lives and promote well-being for all at all ages_.

---

## ✨ Key Features

- **Secure Authentication**: User login and registration with privacy in mind.
- **Personal Health Dashboard**: Visualize daily steps, heart rate, weight, and more.
- **Health Metrics Tracking**: Monitor blood pressure, vitals, and trends over time.
- **Profile Management**: Store allergies, chronic conditions, and personal health info.
- **Medication Management**: Schedule, track, and get reminders for medications.
- **Appointment Organizer**: Manage and view upcoming health appointments.
- **Health Records Vault**: Securely store and access medical records.
- **Notifications & Reminders**: Stay on top of meds, appointments, and health goals.
- **Quick Data Entry**: Fast modal for logging daily health stats.
- **Mobile-first Design**: Responsive UI with mobile navigation and sidebar.
- **Customizable Theming**: Light/dark mode for accessibility and comfort.
- **Reusable UI Components**: Built with Radix UI and Tailwind CSS for consistency.

---

## 🏗️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **UI Components**: Radix UI, custom components
- **Forms & Validation**: React Hook Form, Zod
- **State Management**: React Context, custom hooks
- **Icons**: [Lucide](https://lucide.dev/)

---

## 🗂️ Project Structure

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
├── public/              # Static assets (images, favicon, etc.)
├── styles/              # Global CSS (Tailwind)
├── package.json         # Project metadata and scripts
├── tailwind.config.ts   # Tailwind CSS config
├── postcss.config.mjs   # PostCSS config
├── tsconfig.json        # TypeScript config
└── ...
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/health-sync-pro.git
cd health-sync-pro
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 3. Run the Development Server
```bash
pnpm dev
# or
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
pnpm build
# or
npm run build
```

---

## 🧩 Main Modules & Components

| Module                        | Description                                      |
|-------------------------------|--------------------------------------------------|
| `auth-context.tsx`            | Authentication context and logic                  |
| `login-register.tsx`          | Login and registration forms                     |
| `dashboard.tsx`               | Main dashboard with health summaries             |
| `health-app.tsx`              | App shell, tab navigation                        |
| `health-metrics.tsx`          | Charts and metrics visualization                 |
| `health-profile.tsx`          | User profile, allergies, conditions              |
| `medication-management.tsx`   | Medication tracking and reminders                |
| `appointment-management.tsx`  | Appointment scheduling and management            |
| `health-records.tsx`          | Health records storage and access                |
| `notification-system.tsx`     | In-app notifications and reminders               |
| `quick-entry-modal.tsx`       | Fast entry for daily health data                 |
| `mobile-bottom-nav.tsx`       | Mobile navigation bar                            |
| `theme-provider.tsx`          | Light/dark mode theming                          |
| `ui/`                         | Reusable UI primitives (buttons, cards, etc.)    |

---

## 🛠️ Custom Hooks

- **`useIsMobile`**: Detects mobile viewport for responsive UI.
- **`useResponsive`**: Provides breakpoint utilities for adaptive layouts.
- **`useToast`**: Manages toast notifications for user feedback.

---

## 🎨 Theming & Accessibility

- **Light/Dark Mode**: Easily switchable via `next-themes` and `theme-provider.tsx`.
- **Accessible Components**: Built with Radix UI for keyboard and screen reader support.
- **Mobile-first**: Optimized for all devices, ensuring inclusivity.

---

## 🌱 SDG Goal 3 Alignment

Health Sync Pro directly supports **UN SDG Goal 3: Good Health and Well-being** by:

- Empowering users to monitor and improve their health.
- Providing reminders for medication and appointments, reducing missed doses and checkups.
- Enabling early detection of health trends through data visualization.
- Supporting health literacy and self-management for all ages.
- Promoting digital health equity with a free, open-source, mobile-friendly platform.

---

## 👩‍💻 How to Contribute

1. **Fork** the repository
2. **Create a branch** (`git checkout -b feature/your-feature`)
3. **Commit** your changes
4. **Push** to your branch (`git push origin feature/your-feature`)
5. **Open a Pull Request**

---

## 📊 Presenting This Project

You can use this documentation to create a presentation (PPT) with the following suggested outline:

1. **Project Overview**: Vision, SDG Goal 3 alignment, and mission
2. **Key Features**: Highlight main modules and user benefits
3. **Tech Stack**: Showcase modern technologies used
4. **Architecture**: Visual diagram of project structure (see above)
5. **Demo**: Screenshots or live demo of dashboard, metrics, notifications, etc.
6. **Impact**: How it supports health and well-being for all
7. **How to Use**: Quick start and user journey
8. **How to Contribute**: Invite for collaboration
9. **Q&A / Contact**: For questions and support

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Credits & Resources

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Zod](https://zod.dev/)

---

## 📬 Contact

For questions, support, or collaboration, please open an issue or contact the maintainer.
