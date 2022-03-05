/*
  Warnings:

  - You are about to drop the column `userId` on the `UserSettings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userSettingsId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userSettingsId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userId_fkey";

-- DropIndex
DROP INDEX "UserSettings_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userSettingsId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_userSettingsId_key" ON "User"("userSettingsId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userSettingsId_fkey" FOREIGN KEY ("userSettingsId") REFERENCES "UserSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
