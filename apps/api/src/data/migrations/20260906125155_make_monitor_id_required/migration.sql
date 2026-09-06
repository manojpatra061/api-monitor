/*
  Warnings:

  - Made the column `monitorId` on table `monitor_results` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_monitor_results" (
    "success" BOOLEAN NOT NULL,
    "status_code" INTEGER,
    "response_time_in_ms" INTEGER NOT NULL,
    "checked_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error_message" TEXT,
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "monitorId" TEXT NOT NULL,
    CONSTRAINT "monitor_results_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_monitor_results" ("checked_at", "created_at", "error_message", "id", "monitorId", "response_time_in_ms", "status_code", "success", "updated_at") SELECT "checked_at", "created_at", "error_message", "id", "monitorId", "response_time_in_ms", "status_code", "success", "updated_at" FROM "monitor_results";
DROP TABLE "monitor_results";
ALTER TABLE "new_monitor_results" RENAME TO "monitor_results";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
