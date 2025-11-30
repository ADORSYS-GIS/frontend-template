# Testing Strategy Guide

> **Goal**: Write tests that give confidence, not just coverage.
> **Rule**: Test user behavior, not implementation details.

## Testing Tools

- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright
- **Mocking**: MSW (Mock Service Worker)

---

## File Structure

```
frontend/src/
├── __tests__/
│   ├── components/
│   │   └── UserCard.test.tsx
│   ├── hooks/
│   │   └── useUsers.test.ts
│   └── utils/
│       └── formatDate.test.ts
└── e2e/
    └── users.spec.ts
```

---

## Pattern 1: Component Testing

**File**: `frontend/src/__tests__/components/UserCard.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { UserCard } from '@/components/users/UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
  };

  it('renders user information', () => {
    render(<UserCard user={mockUser} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const onEdit = vi.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} onDelete={vi.fn()} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);
    
    expect(onEdit).toHaveBeenCalledWith(mockUser);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(<UserCard user={mockUser} onEdit={vi.fn()} onDelete={onDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);
    
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
```

**Why**: 
- Tests user interactions, not implementation
- Uses accessible queries (`getByRole`, `getByText`)
- Verifies callbacks are called correctly

---

## Pattern 2: Hook Testing

**File**: `frontend/src/__tests__/hooks/useUsers.test.ts`

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers } from '@/hooks/useUsers';
import { UsersService } from '@/openapi-client/services.gen';

// Mock the service
vi.mock('@/openapi-client/services.gen');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useUsers', () => {
  it('fetches users successfully', async () => {
    const mockUsers = [
      { id: '1', name: 'John', email: 'john@example.com' },
    ];
    
    vi.mocked(UsersService.getUsers).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockUsers);
  });

  it('handles errors', async () => {
    vi.mocked(UsersService.getUsers).mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
```

---

## Pattern 3: Utility Testing

**File**: `frontend/src/__tests__/utils/formatDate.test.ts`

```typescript
import { formatDate } from '@/utils/formatDate';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15T10:30:00Z');
    expect(formatDate(date)).toBe('Jan 15, 2024');
  });

  it('handles invalid dates', () => {
    expect(formatDate(null)).toBe('Invalid date');
  });
});
```

---

## Pattern 4: E2E Testing

**File**: `frontend/e2e/users.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('creates a new user', async ({ page }) => {
    await page.goto('/users');
    await page.click('button:has-text("Add User")');
    
    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.selectOption('select[name="role"]', 'user');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Jane Doe')).toBeVisible();
  });

  test('deletes a user', async ({ page }) => {
    await page.goto('/users');
    
    const userRow = page.locator('tr:has-text("John Doe")');
    await userRow.locator('button:has-text("Delete")').click();
    
    await page.click('button:has-text("Confirm")');
    
    await expect(page.locator('text=John Doe')).not.toBeVisible();
  });
});
```

---

## Mocking API Calls (MSW)

**File**: `frontend/src/__tests__/mocks/handlers.ts`

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: '1', name: 'John', email: 'john@example.com' },
    ]);
  }),

  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: '2', ...body });
  }),
];
```

**Setup** (`frontend/src/__tests__/setup.ts`):

```typescript
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## Running Tests

```bash
# Start the development server for manual testing or E2E tests
npm run dev

# Unit/Integration tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## Manual Testing & Verification

To manually test the application and verify the new features:

1.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    This will typically open the application in your browser at `http://localhost:5173` (or a similar port).

2.  **Login**:
    -   **Instructor**: Use `instructor@example.com` / `password`
    -   **Student**: Use `student@example.com` / `password`

3.  **Verify Video Streaming Integration (Phase 6.1)**:
    -   Login as a **Student**.
    -   Navigate to the "Course Catalog" or "Student Dashboard".
    -   Enroll in a course that has video content.
    -   Access the course content and navigate to a video lecture.
    -   Verify that the `VideoPlayer` component renders and plays the video correctly.
    -   (Optional) If a live stream URL is available, verify the `LiveStreamPlayer` component.

4.  **Verify Gamification Elements (Phase 6.2)**:
    -   Login as a **Student**.
    -   Navigate to the "Student Dashboard".
    -   **Badges**: Verify that the "Your Badges" section displays the mock badges (`First Course Complete`, `Quiz Master`).
    -   **Leaderboard**: Verify that the "Leaderboard" section displays the mock leaderboard entries (Alice, Bob, Charlie).
    -   **Rewards System**: Verify that the "Your Rewards" section displays the placeholder message.

5.  **Code Quality Checks**:
    Before considering any phase truly complete, always run the following checks:
    ```bash
    npm run lint:check
    npm run build
    ```
    Ensure there are no linting errors or build failures.

---

## What to Test

### ✅ Do Test:
- User interactions (clicks, typing)
- Conditional rendering
- Error states
- Accessibility (roles, labels)
- Critical business logic

### ❌ Don't Test:
- Implementation details (state variables)
- Third-party libraries
- Styling/CSS
- Trivial functions

---

## Checklist

- [ ] Component tests use `@testing-library/react`
- [ ] Tests query by role/label (accessible)
- [ ] Hooks tested with `renderHook`
- [ ] API calls mocked with MSW
- [ ] E2E tests cover critical flows
- [ ] Tests focus on user behavior
