# SaaS Operations Console

A **production-grade, multi-tenant SaaS dashboard** built to demonstrate **correct authorization modeling**, **strict tenant isolation**, and **backend-driven UI contracts**.

This project focuses on *engineering correctness over feature breadth* and reflects patterns used in real SaaS platforms where security, operability, and maintainability matter more than superficial complexity.

---

## Why This Project Exists

Most SaaS examples stop at:

* JWT authentication
* Role checks inside controllers
* UI logic guessing permissions

This project intentionally goes further by modeling:

* Authentication **separate** from tenant context
* Authorization as **policy evaluation**, not role conditionals
* UI behavior driven by **backend capabilities**
* Operational visibility through **audit logging**

The goal is to demonstrate **how production systems are actually built**, not just how APIs are wired.

---

## Tech Stack

**Monorepo**

* Turborepo
* pnpm

**Frontend**

* Next.js (App Router)
* shadcn/ui
* Capability-driven rendering

**Backend**

* NestJS
* Drizzle ORM
* Policy-based authorization

**Database**

* PostgreSQL (RDS-compatible)

**Hosting**

* Vercel (frontend)
* EC2 (backend)

---

## Core Engineering Principles

* Explicit multi-tenancy (no implicit defaults)
* Deterministic schema and migrations
* Centralized authorization logic
* Backend as the single source of truth
* Auditability of sensitive actions
* Clear request lifecycle boundaries

---

## Request Lifecycle (High-Level)

Every protected request follows the same deterministic pipeline:

1. **JWT authentication** (identity only)
2. **Tenant selection** via explicit header
3. **Membership validation** (database-backed)
4. **Request context initialization**
5. **Policy-based authorization**
6. **Business logic execution**
7. **Audit logging (when applicable)**

Business logic never:

* Parses JWTs
* Checks roles directly
* Infers tenant state

---

## Multi-Tenancy and Tenant Isolation

* Users authenticate **before** selecting an organization.
* Organization selection is explicit and required before entering the application.
* Every tenant-scoped request must include `X-Organization-Id`.
* Tenant context is validated and enforced before any business logic executes.
* Cross-tenant access is rejected early and consistently.

There is **no "default organization"**.

---

## Authentication and Membership Enforcement

* JWTs establish **identity**, not tenant authority.
* Tenant access is validated on every request against the database.
* User roles are derived from **membership records**, not trusted from JWT claims.
* Authentication, authorization, and domain logic are strictly separated.

---

## Authorization Model

Authorization is implemented using **policy-based access control**:

* Policies are defined per resource (e.g. Project)
* Policies evaluate:
  * Request context (user, role, tenant)
  * Resource ownership
  * Intended action
* Guards enforce policies centrally
* Controllers never contain role checks

This design makes authorization:

* Explicit
* Testable
* Extensible
* Easy to reason about

---

## Capability-Driven API Design

Instead of the frontend guessing permissions, the backend returns **capability flags** derived from policies:

```json
{
  "data": { ... },
  "capabilities": {
    "canCreate": true,
    "canUpdate": false,
    "canDelete": false
  }
}
```

The frontend renders UI actions based solely on these capabilities.

This ensures:

* No duplicated authorization logic
* No UI drift from backend rules
* Safe evolution of roles and policies

---

## Audit Logging

Sensitive actions are recorded in an **append-only audit log**, capturing:

* Actor (user)
* Tenant (organization)
* Resource
* Action
* Timestamp
* Optional metadata

Audit logging is:

* Centralized
* Decoupled from business logic
* Non-blocking

This provides operational traceability without impacting core request flows.

---

## Local Development

* Deterministic migrations via Drizzle
* Seed scripts create realistic multi-org, multi-role data
* Supports local testing of tenant switching and authorization behavior

---

## What This Project Demonstrates

* Correct multi-tenant SaaS architecture
* Policy-based authorization done properly
* Backend-driven UI contracts
* Operational awareness beyond CRUD
* Engineering judgment over tutorial patterns
