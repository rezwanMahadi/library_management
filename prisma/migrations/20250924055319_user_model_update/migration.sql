-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "universityId" TEXT,
ALTER COLUMN "role" DROP DEFAULT;
