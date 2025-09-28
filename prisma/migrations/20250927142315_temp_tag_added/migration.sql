/*
  Warnings:

  - You are about to drop the column `tagType` on the `TempTag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tag]` on the table `TempTag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."TempTag" DROP COLUMN "tagType",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'tempTag';

-- CreateIndex
CREATE UNIQUE INDEX "TempTag_tag_key" ON "public"."TempTag"("tag");
