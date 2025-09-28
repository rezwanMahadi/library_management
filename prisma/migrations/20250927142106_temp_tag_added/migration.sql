/*
  Warnings:

  - You are about to drop the column `type` on the `TempTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."TempTag" DROP COLUMN "type",
ADD COLUMN     "tagType" TEXT NOT NULL DEFAULT 'tempTag';
