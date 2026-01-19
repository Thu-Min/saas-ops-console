CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"actor_user_id" uuid NOT NULL,
	"resource" text NOT NULL,
	"action" text NOT NULL,
	"resource_id" uuid,
	"metadata" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
