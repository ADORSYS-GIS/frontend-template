# UI/UX Design System & Prompt Refinement

> **Goal**: Transform simple user requests into professional, "Lovable-quality" UI implementations.
> **Philosophy**: Great UI comes from **Smart Defaults** + **Design Rules** + **Prompt Refinement**.

## 1. The "Hidden" System Prompt (Internalize This)

Whenever you design a UI, you must internally apply these rules **BEFORE** writing code:

1.  **Modern Best Practices**:
    -   **Spacing**: Use generous whitespace (padding/margin). Avoid cramped layouts.
    -   **Hierarchy**: Use font weight and size to guide the eye. Primary actions must pop.
    -   **Contrast**: Ensure text is readable. Use subtle borders/shadows for depth, not heavy lines.
    -   **Feedback**: Interactive elements must have hover/active states.

2.  **Visual Style (The "Lovable" Look)**:
    -   **Clean & Minimal**: Less is more. Remove unnecessary borders and backgrounds.
    -   **Soft Aesthetics**: Rounded corners (`rounded-lg` or `rounded-xl`), soft shadows (`shadow-sm` or `shadow-md`).
    -   **Typography**: Use `Inter` or system fonts. Headings `font-bold` or `font-semibold`.
    -   **Colors**: Neutral backgrounds (`bg-white`, `bg-gray-50/95`). One primary accent color.

## 2. Prompt Refinement Protocol

**NEVER** take a user prompt literally if it results in a basic UI. You must **EXPAND** it.

### Example Transformation

**User Input**:
> "Build a dashboard for a fitness app."

**Your Internal Refined Prompt (Execute THIS)**:
> "Create a modern, minimal, responsive dashboard for a fitness app.
> **Layout**: Grid-based with a sidebar navigation and a top header.
> **Style**: Clean, professional, soft shadows, rounded corners.
> **Color Palette**: White background, gray text, vibrant blue/purple accent for metrics.
> **Components**:
> -   **Stats Cards**: 4-column grid showing Steps, Calories, Heart Rate. Use icons and trend indicators.
> -   **Activity Chart**: Large area chart showing weekly progress.
> -   **Recent Workouts**: List view with avatars and status badges.
> **Typography**: Large, clear headings (text-2xl font-bold). Readable body text (text-sm text-muted-foreground)."

## 3. Component Design Rules (shadcn/ui + Tailwind)

### Cards
-   **Don't**: `border border-gray-200 p-4`
-   **Do**: `bg-card text-card-foreground rounded-xl border shadow-sm hover:shadow-md transition-shadow p-6`

### Buttons
-   **Don't**: `bg-blue-500 text-white p-2`
-   **Do**: `h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50` (Use `Button` component!)

### Inputs
-   **Do**: Use `Input` component with `placeholder` and `Label`. Add helper text for context.

## 4. Responsive Behavior
-   **Mobile First**: Design for mobile, then scale up (`md:`, `lg:`).
-   **Grid Layouts**: Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`.
-   **Navigation**: Hamburger menu on mobile, Sidebar/Topnav on desktop.

## 5. Micro-Interactions
-   Add `transition-all duration-200` to interactive elements.
-   Use `hover:scale-[1.02]` for cards to add tactile feel.
-   Use `active:scale-95` for buttons.

## 6. Creating a UNIQUE Identity (Anti-Cookie-Cutter)

To ensure every app feels distinct, you must define a **Visual Signature** during the Design Phase.

### A. The "Vibe" Check
Before coding, ask: *What is the personality of this app?*
-   **Corporate/Trust**: Serif headings (`Playfair Display`), Navy/Forest Green, Sharp corners (`rounded-sm`).
-   **Start-up/SaaS**: Sans-serif (`Inter`), Vibrant Blue/Purple, Soft corners (`rounded-xl`).
-   **Lifestyle/Creative**: Display font (`Outfit`), Pastels/Earth tones, Organic shapes.
-   **Data-Heavy**: Monospace numbers, High contrast, Neutral background.

### B. The Variable System
Never hardcode "blue-600". Use semantic names in your head, but map them to distinct Tailwind colors for the project.

1.  **Primary Color**: Don't just use Blue. Try Indigo, Rose, Emerald, Violet, or Slate.
2.  **Radius**: `rounded-none` (Brutalist) vs `rounded-md` (Standard) vs `rounded-2xl` (Friendly).
3.  **Surface**: Pure White (`bg-white`) vs Off-White (`bg-slate-50`) vs Dark Mode.

### C. Unique Layout Patterns
-   Don't always use a Sidebar. Consider a **Top Navigation** with a mega-menu.
-   Don't always use a Card Grid. Consider a **List View** or a **Masonry Layout**.
-   Add a **Signature Gradient** or **Pattern** to the background or header to distinguish the brand.

---

**When the user asks for a UI, check this file to ensure it looks PREMIUM and UNIQUE.**
