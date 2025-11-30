# Design Document: Online Learning Platform

> **CRITICAL INSTRUCTION FOR ANY DEVELOPER OR AI**  
> You **MUST** fill this entire document with the user/client before writing a single line of code.  
> If any section is empty or says "[FILL ME]", **STOP** and ask the user for the missing information.  
> This file is the contract. Nothing gets built until this is signed off.

{: .warning }

## 1. Project Name & One-Line Description
**Project Name:** Online Learning Platform
**Tagline (max 12 words):** Empowering education for instructors and students worldwide.

## 2. Target Users & Roles
List every user type that will log in or use the app:
- Instructor
- Student
- Guest / Public

## 3. Core User Stories (MVP only)
Only the features that will be delivered in the first version.

```
As a [Role], I want to [Action] so that [Benefit].
```

- As an Instructor, I want to create a new course with a title, description, and content so that students can find and learn from it.
- As a Student, I want to browse available courses so that I can find courses that interest me.
- As a Student, I want to enroll in a course so that I can access learning materials.
- As a Student, I want to access course materials (lectures, readings, assignments) so that I can learn at my own pace.
- As a Student, I want to track my progress in a course so that I can see my achievements.
- As an Instructor, I want to view student progress so that I can provide feedback.
- As an Instructor, I want to manage course content (add, edit, delete) so that I can keep my courses up-to-date.

## 4. Full App Flow (Mermaid)

```mermaid
flowchart TD
    Start([Landing Page]) -->|/| PublicHome[Public Home]
    PublicHome --> Login[Login]
    PublicHome --> Register[Register]
    Login --> InstructorDashboard[Instructor Dashboard]
    Login --> StudentDashboard[Student Dashboard]
    Register --> StudentDashboard
    InstructorDashboard --> CourseList[Course List (Instructor)]
    CourseList --> CreateCourse[Create New Course]
    CourseList --> CourseDetailInstructor[View Course Detail]
    CourseDetailInstructor --> EditCourse[Edit Course]
    EditCourse --> CourseDetailInstructor
    CourseDetailInstructor --> DeleteCourse[Delete Course Confirmation]
    DeleteCourse --> CourseList
    InstructorDashboard --> InstructorProfile[My Profile]
    InstructorDashboard --> Logout[Logout] --> Start

    StudentDashboard --> CourseCatalog[Course Catalog (Student)]
    CourseCatalog --> CourseDetailStudent[View Course Detail]
    CourseDetailStudent --> EnrollCourse[Enroll in Course]
    CourseDetailStudent --> AccessContent[Access Course Content]
    AccessContent --> TrackProgress[Track Progress]
    StudentDashboard --> StudentProfile[My Profile]
    StudentDashboard --> Logout
    
    style Start fill:#e1f5fe
    style Logout fill:#ffebee
```

## 5. Complete Routes & Pages Table

| Route                        | Page Component Name         | Description                                  | Access     | Notes                     |
|------------------------------|-----------------------------|----------------------------------------------|------------|---------------------------|
| `/`                          | HomePage                    | Public landing / marketing                   | Public     |                           |
| `/login`                     | LoginPage                   | Email + password                             | Public     |                           |
| `/register`                  | RegisterPage                | User registration                            | Public     |                           |
| `/dashboard/instructor`      | InstructorDashboardPage     | Instructor's main overview                   | Private    | Instructor only           |
| `/dashboard/student`         | StudentDashboardPage        | Student's main overview                      | Private    | Student only              |
| `/courses`                   | CourseListPage              | List of all courses                          | Public     | Instructor can manage     |
| `/courses/new`               | CourseCreatePage            | Create new course form                       | Private    | Instructor only           |
| `/courses/:id`               | CourseDetailPage            | View single course details                   | Public     | Content access based on enrollment |
| `/courses/:id/edit`          | CourseEditPage              | Edit course form                             | Private    | Instructor only           |
| `/enrollments`               | EnrollmentListPage          | List of student enrollments                  | Private    | Student/Instructor        |
| `/profile`                   | ProfilePage                 | User profile (instructor/student)            | Private    |                           |

## 6. Data Models (TypeScript interfaces)

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'instructor' | 'student' | 'admin';
  avatar?: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

interface Course {
  id: string;
  title: string;
  description: string;
  content: CourseContent[]; // Array of modules/lessons
  instructorId: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
}

interface CourseContent {
  id: string;
  title: string;
  type: 'lecture' | 'reading' | 'assignment' | 'quiz' | 'video';
  url?: string; // For video, external links
  text?: string; // For readings, descriptions
  quizId?: string; // Link to a quiz
  order: number;
}

interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrollmentDate: string;
  progress: number; // Percentage of course completed
  lastAccessedContentId?: string;
}

interface Quiz {
  id: string;
  title: string;
  courseContentId: string; // Links to a specific course content item
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'true-false';
}

interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  attemptDate: string;
  score: number;
  answers: { questionId: string; selectedAnswer: string }[];
}
```


## 7. Tech Stack & Libraries (final decision)

- **Framework**: React + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms & Validation**: React Hook Form + Zod
- **Auth**: Custom JWT + HttpOnly cookies
- **i18n**: Yes → Languages: English, French
- **Deployment**: Vercel

## 8. Non-Functional Requirements
- Mobile responsive? Yes
- Offline support needed? No
- Dark mode? Yes
- Accessibility (a11y) level: Basic

## 9. Open Questions / Decisions Needed
- How will course content be structured (e.g., modules, lessons, quizzes)? (Initial structure provided in `CourseContent` interface, but further detail needed)
- What are the specific requirements for video streaming integration (e.g., platform, features)?
- What gamification elements are desired (badges, leaderboards, rewards)?
- What specific metrics should be displayed on the instructor dashboard?
- Do we need role-based access control beyond instructor/student? (Yes, implied by instructor-only actions)
- Should delete be soft-delete or hard-delete?
- What is the strategy for handling file uploads for course materials (e.g., videos, documents)?
- How will real-time grading and feedback for quizzes be implemented?

---

---