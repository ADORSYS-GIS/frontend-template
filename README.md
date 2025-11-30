# Frontend Template

This project serves as a robust and standardized frontend template for building scalable, maintainable, and high-quality web applications. It enforces a structured methodology, leveraging modern web technologies and best practices to streamline development and ensure consistency across CRUD (Create, Read, Update, Delete) frontend projects.

## Features

*   **React**: A declarative, component-based JavaScript library for building user interfaces.
*   **TypeScript**: A superset of JavaScript that adds static typing, enhancing code quality and developer experience.
*   **Vite**: A fast and opinionated build tool that provides an extremely quick development server and optimized builds.
*   **TanStack Query**: Powerful asynchronous state management for data fetching, caching, and synchronization.
*   **Zod**: TypeScript-first schema declaration and validation library.
*   **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
*   **Shadcn/ui**: A collection of reusable components built with Radix UI and Tailwind CSS.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **OpenAPI Client Generation**: Automated generation of API client from OpenAPI specifications, ensuring type-safe API interactions.
*   **Internationalization (i18n)**: Support for multiple languages using `i18next`.
*   **Routing**: Efficient and protected routing using `react-router-dom`.
*   **Theming**: Dark/Light mode support with `ThemeContext`.
*   **Linting & Formatting**: Enforced code quality with ESLint and Prettier.
*   **Testing**: Setup for unit and integration tests.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

*   Node.js (v18 or higher)
*   npm or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-org/frontend-template.git
    cd frontend-template/frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Project

1.  Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

2.  Build for production:
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will generate a `dist` directory with the production-ready build.

## Folder Structure

The project adheres to a strict and organized folder structure to promote modularity and maintainability.

```
my_crud_app/
├── frontend/
│   ├── src/
│       ├── components/       → Reusable UI components (shared and shadcn/ui)
│       ├── constants/        → Application-wide constants, enums
│       ├── context/          → React Contexts (Auth, Theme)
│       ├── hooks/            → Custom React hooks for business logic and data fetching
│       ├── layouts/          → Main application layouts
│       ├── openapi-client/   → Auto-generated API client from OpenAPI spec (DO NOT EDIT)
│       ├── pages/            → Top-level page components
│       ├── router/           → Application routing configuration
│       ├── services/         → Business logic and direct API calls (wrapped by hooks)
│       ├── types/            → TypeScript interfaces and types
│       ├── App.tsx           → Main application component
│       └── main.tsx          → Entry point for the React application
├── docs/                 → Comprehensive project documentation
│   ├── intro.md          → Master guide for AI agents and developers
│   ├── design.md         → Project-specific design documentation
│   ├── pages.md          → Guidelines for implementing CRUD pages
│   ├── forms.md          → Patterns for forms using Zod and React Hook Form
│   ├── tables.md         → Patterns for tables using TanStack Table
│   └── ...               → Other documentation files (authentication, i18n, etc.)
└── tests/                → Unit and integration tests
```

## Documentation

All critical project documentation is located in the `docs/` directory. This includes:

*   [`docs/intro.md`](docs/intro.md): The master guide for developers and AI agents, outlining the project methodology, mandatory checkpoints, and implementation flows.
*   [`docs/design.md`](docs/design.md): Project-specific design details, including page descriptions, flow diagrams, and routing.
*   [`docs/pages.md`](docs/pages.md): Detailed instructions for creating new CRUD pages.
*   [`docs/forms.md`](docs/forms.md): Guidance on building forms with Zod and React Hook Form.
*   [`docs/tables.md`](docs/tables.md): Best practices for implementing tables with TanStack Table.
*   [`docs/api-integration.md`](docs/api-integration.md): Details on OpenAPI client integration and data fetching.
*   [`docs/ui-design.md`](docs/ui-design.md): Comprehensive UI design guidelines, including visual identity, component rules, and responsive behavior.

**It is mandatory to consult the `docs/` directory before starting any new feature or making significant changes.**

## Code Quality

This project enforces high code quality standards through:

*   **Linting**: ESLint is configured to catch potential errors and enforce coding styles. Run `npm run lint:check` to check for issues and `npm run lint:fix` to automatically fix them.
*   **TypeScript**: Strict TypeScript rules ensure type safety across the codebase.
*   **Build Process**: The `npm run build` command verifies successful compilation and prepares the application for production.
*   **Testing**: A testing framework is set up to ensure the reliability and correctness of the application.

## Contributing

Contributions are welcome! Please refer to the `docs/intro.md` for detailed guidelines on contributing to this project, including design documentation, code quality checks, and the feature implementation flow.

## License

This project is licensed under the [MIT License](LICENSE).