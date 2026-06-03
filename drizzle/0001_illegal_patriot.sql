CREATE TABLE "thermals" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"strength" real DEFAULT 0,
	"frequency" real DEFAULT 1,
	"windDirection" text,
	"season" text
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "mapStyle" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "interests" text;--> statement-breakpoint
CREATE INDEX "lat_lng_idx" ON "thermals" USING btree ("latitude","longitude");