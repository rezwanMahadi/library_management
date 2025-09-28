/*
  Warnings:

  - A unique constraint covering the columns `[bookId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."AvailableBook" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "AvailableBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderedBook" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OrderedBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvailableBook_bookId_key" ON "public"."AvailableBook"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderedBook_bookId_key" ON "public"."OrderedBook"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "Book_bookId_key" ON "public"."Book"("bookId");
