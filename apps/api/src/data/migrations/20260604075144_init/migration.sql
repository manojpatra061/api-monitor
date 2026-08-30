-- CreateTable
CREATE TABLE "api_endpoints" (
    "endpoint" TEXT NOT NULL,
    "interval_in_sec" INTEGER NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "api_endpoints_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "monitors" (
    "is_pause" BOOLEAN NOT NULL DEFAULT false,
    "last_checked_at" DATETIME,
    "next_check_at" DATETIME,
    "method" TEXT NOT NULL DEFAULT 'GET',
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "api_endpoint_id" TEXT NOT NULL,
    CONSTRAINT "monitors_api_endpoint_id_fkey" FOREIGN KEY ("api_endpoint_id") REFERENCES "api_endpoints" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "monitor_histories" (
    "success" BOOLEAN NOT NULL,
    "status_code" INTEGER,
    "response_time_in_ms" INTEGER NOT NULL,
    "checked_at" DATETIME NOT NULL,
    "error_message" TEXT,
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "monitorId" TEXT,
    CONSTRAINT "monitor_histories_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "email" TEXT,
    "name" TEXT,
    "is_guest" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "monitors_api_endpoint_id_key" ON "monitors"("api_endpoint_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
