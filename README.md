🚀 Zenith Expense Tracker

Zenith is a full-stack financial management application designed to help users track their spending habits and maintain strict adherence to their personal budgets. By combining high-performance backend architecture with a reactive frontend, Zenith provides real-time insights into financial health.

🛠 Tech Stack
Frontend: Next.js (React), Tailwind CSS

Backend: Spring Boot (Java), REST API

Database: Supabase (PostgreSQL)

Data Fetching: TanStack Query (React Query)

Authentication: Supabase Auth / JWT

✨ Key Features
Real-time Expense Tracking: Instantly record expenditures with categories and timestamps.

Budgeting System: Set monthly or category-based limits. The system automatically calculates remaining balances and warns users when they approach their limit.

Data Synchronization: Uses TanStack Query for smart caching and optimistic updates, ensuring a lag-free UI.

Secure Authentication: User-specific data isolation powered by Supabase and Spring Security.

Responsive Design: Fully mobile-responsive UI built with Tailwind CSS.

🏗 System Architecture
The application follows a modern decoupled architecture:

Frontend (Next.js): Handles the UI logic, client-side routing, and state management via TanStack Query.

API Gateway (Spring Boot): Acts as the brain of the operation, handling complex business logic, budget calculations, and communicating with the database.

Data Layer (Supabase): Stores user profiles, expense logs, and budget configurations in a relational PostgreSQL schema.
