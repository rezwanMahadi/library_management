/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `TempTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TempTag_type_key" ON "public"."TempTag"("type");
