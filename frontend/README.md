<div align="center">
  <h1>MII Website Frontend</h1>
  <p><b>Modern React-based website for MII Foundation</b></p>
</div>

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## About
This is the frontend codebase for the MII Foundation website, built with React, Vite, and Tailwind CSS. It features a modular structure for scalable development and easy maintenance.

## Features
- Modern responsive UI
- React Router-based navigation
- Modular component structure (Home, About, Programs, Startups, Contact, etc.)
- Tailwind CSS for rapid styling
- ESLint for code quality

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure
```
MIIWebsiteFrontend/
├── public/                  # Static assets (currently empty)
├── index.html               # Main HTML file
├── package.json             # Project metadata and dependencies
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── src/                     # Source code
│   ├── App.jsx              # Main App component
│   ├── AppRoutes.jsx        # React Router routes
│   ├── main.jsx             # Entry point
│   ├── App.css, index.css   # Global styles (Tailwind, fonts)
│   ├── assets/              # (empty or for shared assets)
│   └── components/          # All UI components
│       ├── AppLayout.jsx    # Layout with Navbar & Footer
│       ├── sara/            # Home page & shared components
│       │   ├── Home.jsx
│       │   └── HomeComponent/
│       │       ├── Navbar.jsx
│       │       ├── Footer.jsx
│       │       ├── Hero.jsx
│       │       ├── ProgramsAndEvents.jsx
│       │       ├── Query.jsx
│       │       └── StartupCards.jsx
│       ├── leeni/           # About & Investors
│       │   ├── About/
│       │   │   └── Aboutpage.jsx
│       │   ├── Investor/
│       │   │   └── Investor.jsx
│       │   └── images/
│       ├── ayushi/          # Programs & Events, Contact
│       │   ├── ContactPage.jsx
│       │   ├── OngoingPrograms.jsx
│       │   ├── ProgramsAndEvents.jsx
│       │   ├── ProgramsInDetail.jsx
│       │   └── ProgramsAndEventsComponents/
│       ├── saloni/          # Startups pages
│       │   ├── StartupPage.jsx
│       │   ├── StartupsAtMii.jsx
│       │   ├── StartupInDetail.jsx
│       │   └── StartupPageComponents/
│       └── ...
└── README.md                # This file
```

## New/Updated Features
- Added Investor page and route (`/investors`)
- About page moved to `leeni/About/Aboutpage.jsx`
- Project structure updated for new folders

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)