/*
  Warnings:

  - You are about to drop the column `userId` on the `OrderedBook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[universityId]` on the table `OrderedBook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `universityId` to the `OrderedBook` table without a default value. This is not possible if the table is not empty.
  - Made the column `universityId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderedBook" DROP CONSTRAINT "OrderedBook_userId_fkey";

-- AlterTable
ALTER TABLE "public"."OrderedBook" DROP COLUMN "userId",
ADD COLUMN     "universityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "universityId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrderedBook_universityId_key" ON "public"."OrderedBook"("universityId");

-- AddForeignKey
ALTER TABLE "public"."OrderedBook" ADD CONSTRAINT "OrderedBook_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "public"."User"("universityId") ON DELETE RESTRICT ON UPDATE CASCADE;
