# Security Best Practices Guide

> **Goal**: Build secure applications by default. Security is not optional.
> **Rule**: Follow OWASP guidelines and assume all user input is malicious.

## 1. Authentication & Authorization

### Token Storage
-   **NEVER** store tokens in `localStorage` if you can avoid it.
-   **Preferred**: Use HttpOnly cookies (managed by backend).
-   **If JWT in localStorage**: Implement token refresh and short expiration times.

### Protected Routes
```tsx
// Always verify authentication before rendering sensitive content
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};
```

### Role-Based Access Control (RBAC)
```tsx
// Check permissions before rendering UI or making API calls
const { user } = useAuth();
const canDelete = user?.roles?.includes(ROLES.ADMIN);

{canDelete && <Button onClick={handleDelete}>Delete</Button>}
```

## 2. Input Validation & Sanitization

### Client-Side Validation
-   **Always** validate with Zod schemas.
-   **Never** trust client-side validation alone (backend must validate too).

```tsx
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120),
});
```

### XSS Prevention
-   **React escapes by default**: `{userInput}` is safe.
-   **NEVER** use `dangerouslySetInnerHTML` unless absolutely necessary.
-   **If you must**: Sanitize with `DOMPurify`.

```tsx
import DOMPurify from 'dompurify';

const sanitized = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: sanitized }} />
```

### URL Parameters
-   **Always** validate and sanitize route params.
-   **Never** directly use user input in API calls without validation.

```tsx
// BAD
const id = params.id;
await deleteUser(id); // What if id is malicious?

// GOOD
const idSchema = z.string().uuid();
const id = idSchema.parse(params.id);
await deleteUser(id);
```

## 3. API Security

### HTTPS Only
-   **Production**: Always use HTTPS.
-   **Development**: Use `http://localhost` (acceptable for local dev).

### CORS
-   Configure CORS on the backend, not the frontend.
-   **Never** disable CORS in production.

### Sensitive Data
-   **NEVER** log sensitive data (passwords, tokens, PII).
-   **NEVER** expose API keys in frontend code.

```tsx
// BAD
console.log('User password:', password);

// GOOD
console.log('Login attempt for user:', email);
```

### Rate Limiting
-   Implement on backend.
-   Frontend: Show user-friendly messages for rate limit errors.

## 4. Dependency Security

### Regular Updates
-   Run `npm audit` regularly.
-   Fix vulnerabilities: `npm audit fix`.
-   Review dependencies before adding them.

### Trusted Sources
-   Only install packages from npm with good reputation.
-   Check package download stats and last update date.

## 5. Environment Variables

### Secrets Management
-   **NEVER** commit `.env` files.
-   Use `.env.example` for documentation.
-   **NEVER** expose backend secrets in frontend.

```bash
# .env.example
VITE_API_URL=https://api.example.com
VITE_APP_NAME=MyApp
# DO NOT put secret keys here - frontend is public!
```

### Vite Exposure
-   Only `VITE_*` prefixed variables are exposed to the frontend.
-   This is intentional - it prevents accidental secret exposure.

## 6. Content Security Policy (CSP)

Configure CSP headers on your server:
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
```

## 7. Common Vulnerabilities (OWASP Top 10)

### A01: Broken Access Control
-   ✅ Always verify permissions on backend.
-   ✅ Hide UI elements user can't access, but enforce on backend.

### A02: Cryptographic Failures
-   ✅ Use HTTPS.
-   ✅ Never implement your own crypto (use libraries).

### A03: Injection
-   ✅ Use parameterized queries (backend).
-   ✅ Validate all inputs (Zod).

### A04: Insecure Design
-   ✅ Follow this documentation.
-   ✅ Security by design, not as an afterthought.

### A05: Security Misconfiguration
-   ✅ Remove console.logs in production.
-   ✅ Disable source maps in production (or restrict access).

### A07: XSS (Cross-Site Scripting)
-   ✅ React escapes by default.
-   ✅ Sanitize if using `dangerouslySetInnerHTML`.

### A08: Software and Data Integrity Failures
-   ✅ Use lock files (`package-lock.json`).
-   ✅ Verify package integrity.

### A09: Security Logging and Monitoring
-   ✅ Log authentication events.
-   ✅ Monitor for suspicious activity (backend).

### A10: SSRF (Server-Side Request Forgery)
-   ✅ Validate URLs before making requests.
-   ✅ Whitelist allowed domains.

## 8. Secure Coding Checklist

Before deploying, verify:
- [ ] All API calls use HTTPS in production
- [ ] Tokens are stored securely (HttpOnly cookies or short-lived localStorage)
- [ ] All user inputs are validated with Zod
- [ ] No sensitive data in console.logs
- [ ] No API keys or secrets in frontend code
- [ ] CORS is properly configured on backend
- [ ] CSP headers are set
- [ ] Dependencies are up to date (`npm audit`)
- [ ] Protected routes verify authentication
- [ ] RBAC is enforced for sensitive actions

## 9. Security Resources

-   [OWASP Top 10](https://owasp.org/www-project-top-ten/)
-   [React Security Best Practices](https://react.dev/learn/security)
-   [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

**Remember**: Security is a shared responsibility. Frontend security prevents basic attacks, but the backend must be the ultimate gatekeeper.
