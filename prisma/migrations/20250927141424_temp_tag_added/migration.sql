-- CreateTable
CREATE TABLE "public"."TempTag" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "TempTag_pkey" PRIMARY KEY ("id")
);
