# UI/UX Design System: The $10,000 Application Standard

> **ACTION**: After creating or updating this `ui-design.md` file, **YOU MUST STOP** and ask the user for explicit approval. This document is the single source of truth for the application's visual identity. No UI code should be written until this is approved.
{: .important }

> **Goal**: To create interfaces that are not just functional, but **beautiful, intuitive, and memorable**. We are building a **$10,000 premium application**; the user interface must be perfect, elegant, and flawless. Every pixel matters.
> **Philosophy**: We achieve this through a systematic approach: a strong **Visual Foundation**, consistent **Layouts**, meticulously designed **Components**, and delightful **Micro-interactions & Animations**.

---

## 1. The Visual Foundation (The Soul of the App)

This section defines the core visual identity. It's what makes the app unique and recognizable.

### A. Brand Identity & "Vibe"

First, we must understand the application's personality.

*   **Keywords**: What are 3-5 keywords that describe the brand? (e.g., "Professional, Trustworthy, Innovative" or "Playful, Creative, Friendly").
*   **Moodboard/Inspiration**: What are 2-3 existing apps or websites that capture the desired aesthetic?

### B. Color Palette

A consistent and harmonious color palette is crucial. Use tools like Coolors or Adobe Color to generate one.

*   **Primary**: The main brand color, used for primary buttons and key interactive elements.
*   **Secondary**: An accent color used to complement the primary color.
*   **Neutrals**: A range of grays/off-whites for text, backgrounds, and borders. (e.g., `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`).
*   **Semantic**: Colors for system feedback.
    *   **Success**: Green (e.g., for successful operations).
    *   **Warning**: Yellow/Orange (e.g., for warnings).
    *   **Error**: Red (e.g., for errors and destructive actions).

### C. Typography

Typography gives the application its voice.

*   **Heading Font**: (e.g., Inter, Outfit, Playfair Display). Specify font weight (e.g., `font-bold`, `font-semibold`).
*   **Body Font**: (e.g., Inter, System Fonts). Specify font weight (e.g., `font-normal`).
*   **Typographic Scale**: Define a consistent scale for font sizes (e.g., `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.).

### D. Iconography

*   **Icon Set**: (e.g., Lucide, Heroicons, Phosphor Icons).
*   **Style**: (e.g., Outline, Solid).
*   **Weight/Stroke**: (e.g., 1.5px).

---

## 2. Layout & Composition (The Skeleton)

This defines the structure and spacing of the application.

### A. Spacing System

Use a consistent spacing scale based on a base unit (e.g., 4px or 8px). This applies to `margin`, `padding`, and `gap`.

*   **Example Scale**: `space-1` (4px), `space-2` (8px), `space-4` (16px), `space-6` (24px), `space-8` (32px).

### B. Layout Patterns

*   **Header**: The header must be thoughtfully designed. It's not just a container for links.
    *   **Style**: Should it be sticky? Should it have a subtle border or shadow? Does it have a background color or is it transparent?
    *   **Content**: Logo, main navigation, user profile/actions (e.g., settings, logout), theme switcher.
    *   **Theme Matching**: The header's design must directly reflect the app's "Vibe". A corporate app might have a clean, sharp header, while a creative app might have a more expressive one.
*   **Page Layouts**: Define common page structures.
    *   **Dashboard**: Sidebar + Main content area.
    *   **Settings**: Two-column layout with navigation on the left.
    *   **Centered Form**: For login, registration, etc.

---

## 3. Component Design (The Building Blocks)

Every component must be styled with precision and care. Use `shadcn/ui` components as a base, but customize them to fit the brand.

### Cards
*   **Don't**: Use a simple border. `border border-gray-200 p-4`
*   **Do**: Create depth and a premium feel. `bg-card text-card-foreground rounded-xl border shadow-sm hover:shadow-md transition-shadow p-6`
*   **Consider**: Adding a subtle gradient border or a colored top border for emphasis.

### Buttons
*   **Don't**: Use default, unstyled buttons.
*   **Do**: Use the `Button` component and its variants. Ensure all buttons have clear `hover`, `active`, and `disabled` states.
*   **Primary Action**: The primary button should stand out.
*   **Secondary Action**: Should be less prominent than the primary.
*   **Icon Buttons**: Use for actions in tight spaces, and always include a `Tooltip`.

### Forms & Inputs
*   **Do**: Use the `Input`, `Label`, `Textarea` components.
*   **Style**: Inputs should have a clean, modern look. Use placeholders effectively.
*   **Feedback**: Provide clear visual feedback for `focus`, `error`, and `disabled` states.
*   **Helper Text**: Use helper text below inputs to provide context or instructions.

---

## 4. The Magic Touches (Animations & Delight)

This is what separates a good UI from a great one. Animations should be purposeful, not distracting.

### A. Micro-interactions
Subtle animations provide feedback and guide the user.
*   **Interactive Elements**: `transition-all duration-200`
*   **Card Hover**: `hover:scale-[1.02]`
*   **Button Press**: `active:scale-95`

### B. Advanced Animations & Transitions
*   **Page Transitions**: Implement subtle fade or slide transitions between pages.
    *   **Prompt**: "Use a library like Framer Motion to add a gentle fade-in and slide-up animation to page content as it loads."
*   **Staggered List Animations**: Animate lists of items (e.g., tables, cards) so they appear one after another.
    *   **Prompt**: "When a list of items is loaded, apply a staggered animation where each item fades in and slides up with a 50ms delay between them."
*   **State Change Animations**: Animate changes in component state, such as expanding/collapsing an accordion.
    *   **Prompt**: "Animate the opening and closing of accordions and dropdowns with a smooth height transition."

### C. System Feedback
*   **Loading States**: Use skeleton loaders (`Skeleton` component) for content that is loading. This provides a better perceived performance than a spinner.
*   **Empty States**: When a list or table is empty, display a helpful message, an illustration, and a call-to-action (e.g., a "Create New" button).
*   **Notifications (Toasts)**: Use `Sonner` for non-intrusive feedback on actions. Animate their entry and exit from the screen.

---

## 5. The $10,000 Quality Checklist

Before submitting any UI work, verify it against this checklist.

- [ ] **Consistency**: Is the use of color, typography, and spacing consistent across all pages?
- [ ] **Hierarchy**: Is it clear what the most important elements on the page are?
- [ ] **Clarity**: Is the UI easy to understand and navigate? Is text readable?
- [ ] **Feedback**: Does the UI provide feedback for all user interactions (hover, click, loading, success, error)?
- [ ] **Elegance**: Is the design clean, uncluttered, and visually appealing? Have all unnecessary elements been removed?
- [ ] **Delight**: Are there subtle animations and micro-interactions that make the experience enjoyable?
- [ ] **Brand Alignment**: Does the UI reflect the defined "Vibe" and brand identity?
- [ ] **Premium Feel**: Does this look and feel like a $10,000 application? Is it flawless?
