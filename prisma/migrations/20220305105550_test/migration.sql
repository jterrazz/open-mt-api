-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_bannerImageId_fkey";

-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "bannerImageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
