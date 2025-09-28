-- CreateTable
CREATE TABLE "public"."seatStatus" (
    "id" SERIAL NOT NULL,
    "availabelSeat" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "seatStatus_pkey" PRIMARY KEY ("id")
);
