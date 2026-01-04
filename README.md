# SaaS Operations Console

A production-grade, multi-tenant SaaS dashboard built to demonstrate
policy-based authorization, tenant isolation, and backend-driven UI contracts.

## Tech Stack

- Monorepo: Turborepo + pnpm
- Frontend: Next.js + shadcn/ui
- Backend: NestJS
- Database: PostgreSQL (RDS)
- Hosting: Vercel (frontend), EC2 (backend)

## Core Engineering Focus

- Multi-tenancy
- Authorization policies
- Auditability
- Operational correctness

## Tenant Isolation Guarantee

Every request initializes a tenant context before any business logic executes.
All data access and authorization decisions are scoped to this context.
Requests without tenant identification are rejected early.
