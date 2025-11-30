# Project Progress & Roadmap: [Project Name]

> **MANDATORY WORKFLOW RULES:**
> 1. **Code Quality Checks**: Before marking any phase/step as complete, you MUST:
>    - Run `npm run lint:check` and fix ALL issues
>    - Ensure TypeScript compiles without errors (`npm run typecheck` if available)
>    - Run `npm run build` to verify successful compilation
>    - Verify all related files are error-free
>    - Only proceed if all checks pass
> 
> 2. **Phase Completion**:
>    - Update this file IMMEDIATELY after completing each phase/step
>    - Mark completed items with `[x]`
>    - Add completion timestamp
>    - Run code quality checks again after updates
> 
> 3. **File Management**:
>    - Check this file at the start of EVERY session
>    - Never skip code quality checks
>    - Fix all issues before moving to next phase

> **Standard Instructions:**
> 1. Create this file immediately after `docs/design.md` is approved.
> 2. Analyze the Design: Read `docs/design.md` and break the entire project into logical Phases.
> 3. Populate the Phases with specific, actionable tasks.
> 4. Update this file after EVERY successful feature implementation.
> 5. Never proceed to next phase without completing all checks.
> 6. **STOP** when a phase is complete and ask the user for confirmation to proceed.
> 7. **MANDATORY FINAL PHASE: User Manual Testing Guide**: After the final phase is complete, you **MUST** generate a detailed user manual testing guide (`docs/usertesting/user-guide.md`) to ensure full application functionality.

## Project Status
- **Current Phase**: [e.g., Phase 1: Setup]
- **Last Updated**: [YYYY-MM-DD HH:MM:SS]
- **Code Quality Status**: ✅ All checks passed / ⚠️ Needs attention
- **Overall Progress**: 0%

## Code Quality Log
| Timestamp | Check | Status | Details |
|-----------|-------|--------|---------|
| [YYYY-MM-DD HH:MM:SS] | Lint | ✅ Passed | - |
| [YYYY-MM-DD HH:MM:SS] | Type Check | ✅ Passed | - |

---

## Phase 1: [Phase Name, e.g., Setup & Foundation]
> **Goal**: [Brief description of what this phase achieves]

- [ ] **1.1 [Step Name]**
    - [ ] [Detailed task]
    - [ ] [Detailed task]
    - [ ] Run code quality checks (lint, typecheck)
    - [ ] Fix all issues
    - [ ] Mark as complete
- [ ] **1.2 [Step Name]**
    - [ ] [Detailed task]

## Phase 2: [Phase Name, e.g., Core Feature X]
> **Goal**: [Brief description]

- [ ] **2.1 [Step Name]**
    - [ ] [Detailed task]
    - [ ] [Detailed task]

## Phase 3: [Phase Name]
...

---

## Token Management Strategy
-   **STOP** after completing a Phase or a complex Feature.
-   **Mark** the item as `[x]` above.
-   **Commit** changes.
-   **Instruct User**: "Phase X complete. Please start a new chat to continue to Phase Y."
