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

- Every request initializes a tenant context before any business logic executes.
- All data access and authorization decisions are scoped to this context.
- Requests without tenant identification are rejected early.

## Features

- Deterministic database schema + migrations (Drizzle)
- Clean request context (tenant + user + role)
- JWT authentication
- Membership enforcement (DB-backed)
- Policy-based authorization (resource + action)
- Guard-driven enforcement (no inline role checks)

## Authentication Design

- JWT authentication enriches a request-scoped context that already enforces tenant identification.
- Business logic consumes a unified context and never parses tokens directly.
- This ensures strict separation of authentication, authorization, and domain logic.

### Request

- Tenant header validated
- JWT validated
- Membership validated (DB)
- RequestContext populated
- Authorization
- Business logic

### Membership Enforcement

- Authenticated users must be active members of the tenant organization.
- Membership is valided against the database on every protected request.
- Roles are derived from membership, not trusted from JWT claims.

## Authorization Design

- Access control is enforced via centralized, policy-based guards.
- Policies evaluate request context and resource ownership without relying on route-level role checks.
- Authorization logic is isolated, extensible, and testable.

## Capability-Driven API Design

- API responses include explicit capability flags derived from authorization policies.
- The frontend renders actions based on these capabilities rather than duplicating permission logic.
- This ensure consistent authorization enforcement across backend and UI.
