# Data Types & Constants Guide

> **Goal**: Centralize types and constants for consistency.
> **Rule**: Define types once, use everywhere.

## File Structure

```
frontend/src/
├── types/
│   ├── index.ts        # Export all types
│   ├── user.ts         # User-related types
│   └── organization.ts # Organization types
└── constants/
    ├── config.ts       # App configuration
    ├── routes.ts       # Route paths
    └── roles.ts        # User roles
```

---

## Types

### Step 1: Import from OpenAPI (Preferred)

**File**: `frontend/src/types/user.ts`

```typescript
// Import from generated types
export type { User, CreateUserDto, UpdateUserDto } from '@/openapi-client/types.gen';
```

**Why**: OpenAPI types are auto-generated and always in sync with backend

### Step 2: Define Custom Types (If Needed)

```typescript
// frontend/src/types/user.ts
export interface UserWithStats extends User {
  loginCount: number;
  lastLogin: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface UserFilters {
  role?: UserRole;
  isActive?: boolean;
  search?: string;
}
```

### Step 3: Export All Types

**File**: `frontend/src/types/index.ts`

```typescript
export * from './user';
export * from './organization';
```

**Usage**:
```typescript
import { User, UserFilters } from '@/types';
```

---

## Constants

### App Configuration

**File**: `frontend/src/constants/config.ts`

```typescript
export const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
  DATE_FORMAT: 'yyyy-MM-dd',
  ITEMS_PER_PAGE: 20,
} as const;
```

**Usage**:
```typescript
import { CONFIG } from '@/constants/config';

const maxSize = CONFIG.MAX_UPLOAD_SIZE;
```

### Route Constants

**File**: `frontend/src/constants/routes.ts`

```typescript
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: {
    LIST: '/users',
    CREATE: '/users/new',
    DETAIL: (id: string) => `/users/${id}`,
    EDIT: (id: string) => `/users/${id}/edit`,
  },
  SETTINGS: '/settings',
} as const;
```

**Usage**:
```typescript
import { ROUTES } from '@/constants/routes';

navigate(ROUTES.USERS.DETAIL('123'));
```

### Role Constants

**File**: `frontend/src/constants/roles.ts`

```typescript
export const ROLES = {
  ADMIN: 'admin',
  ORG_ADMIN: 'org_admin',
  USER: 'user',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
```

**Usage**:
```typescript
import { ROLES } from '@/constants/roles';

const isAdmin = user.role === ROLES.ADMIN;
```

### Enum Constants

**File**: `frontend/src/constants/status.ts`

```typescript
export const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];

export const STATUS_LABELS: Record<Status, string> = {
  [STATUS.PENDING]: 'Pending Review',
  [STATUS.APPROVED]: 'Approved',
  [STATUS.REJECTED]: 'Rejected',
};

export const STATUS_COLORS: Record<Status, string> = {
  [STATUS.PENDING]: 'yellow',
  [STATUS.APPROVED]: 'green',
  [STATUS.REJECTED]: 'red',
};
```

**Usage**:
```typescript
import { STATUS, STATUS_LABELS } from '@/constants/status';

<Badge color={STATUS_COLORS[user.status]}>
  {STATUS_LABELS[user.status]}
</Badge>
```

---

## Naming Conventions

1. **Interfaces**: PascalCase (`User`, `UserFilters`)
2. **Types**: PascalCase (`UserRole`, `Status`)
3. **Constants**: UPPER_SNAKE_CASE (`MAX_UPLOAD_SIZE`)
4. **Const Objects**: UPPER_CASE (`ROUTES`, `CONFIG`)

---

## Best Practices

1. **Use OpenAPI types** when available
2. **Centralize constants** to avoid magic strings/numbers
3. **Use `as const`** for readonly objects
4. **Export from index.ts** for clean imports
5. **Type route functions** for safety

---

## Checklist

- [ ] Types imported from OpenAPI (or defined manually)
- [ ] All types exported from `types/index.ts`
- [ ] Constants defined in `constants/`
- [ ] Route constants use functions for dynamic paths
- [ ] Enums have corresponding labels/colors
- [ ] All magic strings/numbers replaced with constants
