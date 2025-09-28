/*
  Warnings:

  - You are about to drop the column `author` on the `AvailableBook` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `AvailableBook` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `OrderedBook` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `OrderedBook` table. All the data in the column will be lost.
  - Changed the type of `userId` on the `OrderedBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."AvailableBook" DROP COLUMN "author",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "public"."OrderedBook" DROP COLUMN "author",
DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."AvailableBook" ADD CONSTRAINT "AvailableBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderedBook" ADD CONSTRAINT "OrderedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderedBook" ADD CONSTRAINT "OrderedBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
