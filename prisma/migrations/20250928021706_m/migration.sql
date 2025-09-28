/*
  Warnings:

  - A unique constraint covering the columns `[universityId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_universityId_key" ON "public"."User"("universityId");
