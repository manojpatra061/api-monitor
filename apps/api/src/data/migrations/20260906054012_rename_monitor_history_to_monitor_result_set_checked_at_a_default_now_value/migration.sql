/*
  Warnings:

  - You are about to drop the `monitor_histories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "monitor_histories";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "monitor_results" (
    "success" BOOLEAN NOT NULL,
    "status_code" INTEGER,
    "response_time_in_ms" INTEGER NOT NULL,
    "checked_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error_message" TEXT,
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "monitorId" TEXT,
    CONSTRAINT "monitor_results_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
