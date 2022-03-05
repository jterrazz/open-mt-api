/*
  Warnings:

  - Changed the type of `priceCurrency` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'USD');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "priceCurrency",
ADD COLUMN     "priceCurrency" "Currency" NOT NULL;
