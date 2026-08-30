/*
  Warnings:

  - A unique constraint covering the columns `[user_id,endpoint]` on the table `api_endpoints` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "api_endpoints_user_id_endpoint_key" ON "api_endpoints"("user_id", "endpoint");
