# Page Implementation Guide

> **When to use**: Every time you create a new route/view.
> **Rule**: Pages are orchestrators only. They call hooks and render components. No business logic.

## What is a Page?

A page is a **top-level component** that:
1. Lives in `frontend/src/pages/`
2. Is connected to a route in `frontend/src/router/`
3. Calls custom hooks for data
4. Renders UI components
5. Manages local UI state (dialogs, selected items)

## File Location

```
frontend/src/pages/
├── UsersPage.tsx
├── DashboardPage.tsx
└── SettingsPage.tsx
```

---

## Standard Page Structure

Every page follows this pattern:

```typescript
// File: frontend/src/pages/UsersPage.tsx
import { useState } from 'react';
import { useUsers, useCreateUser } from '@/hooks/useUsers';  // Step 1: Import hooks
import { UserTable } from '@/components/users/UserTable';    // Step 2: Import components
import { UserForm } from '@/components/users/UserForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

export const UsersPage: React.FC = () => {
  // Step 3: Call hooks at the top
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  
  // Step 4: Local UI state
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Step 5: Event handlers
  const handleCreate = (data) => {
    createUser.mutate(data, {
      onSuccess: () => setIsFormOpen(false),
    });
  };

  // Step 6: Loading state
  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  // Step 7: Render
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={() => setIsFormOpen(true)}>Add User</Button>
      </div>
      
      <UserTable data={users || []} />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <UserForm onSubmit={handleCreate} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
```

---

## Page Patterns

### Pattern A: List Page

**Use when**: Displaying a table/list of items

```typescript
export const UsersPage: React.FC = () => {
  const { data, isLoading } = useUsers();

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-6">
      <PageHeader title="Users" />
      <UserTable data={data || []} />
    </div>
  );
};
```

### Pattern B: Detail Page

**Use when**: Showing a single item's details

```typescript
export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useUser(id!);

  if (isLoading) return <Loader />;
  if (!user) return <NotFound />;

  return (
    <div className="container mx-auto p-6">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

### Pattern C: Form Page

**Use when**: Creating/editing a single item

```typescript
export const CreateUserPage: React.FC = () => {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const handleSubmit = (data) => {
    createUser.mutate(data, {
      onSuccess: () => navigate('/users'),
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1>Create User</h1>
      <UserForm onSubmit={handleSubmit} isLoading={createUser.isPending} />
    </div>
  );
};
```

---

## What Pages Should NOT Do

❌ **Don't** call API directly:
```typescript
// BAD
const [users, setUsers] = useState([]);
useEffect(() => {
  fetch('/api/users').then(r => r.json()).then(setUsers);
}, []);
```

✅ **Do** use hooks:
```typescript
// GOOD
const { data: users } = useUsers();
```

❌ **Don't** put complex logic in page:
```typescript
// BAD
const handleCreate = (data) => {
  const validated = validateUser(data);
  const transformed = transformUser(validated);
  // 20 more lines...
};
```

✅ **Do** extract to hook:
```typescript
// GOOD
const { createUser } = useUserActions();
const handleCreate = (data) => createUser(data);
```

---

## Dependencies

**Pages depend on**:
- `frontend/src/hooks/` - Data fetching hooks (see `docs/hooks.md`)
- `frontend/src/components/` - UI components (see `docs/components.md`)
- `frontend/src/types/` - TypeScript types (see `docs/data-types.md`)

**Pages are used by**:
- `frontend/src/router/` - Router configuration (see `docs/routing.md`)

---

## Checklist

Before marking a page complete:
- [ ] Page is in `frontend/src/pages/[Name]Page.tsx`
- [ ] Uses hooks for data (no direct API calls)
- [ ] Renders components (no inline JSX complexity)
- [ ] Handles loading state
- [ ] Handles error state
- [ ] Handles empty state
- [ ] Route added to router
- [ ] No business logic in page
