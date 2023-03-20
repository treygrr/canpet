/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Device` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refreshToken]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Device_accessToken_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "accessToken",
ADD COLUMN     "refreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Device_refreshToken_key" ON "Device"("refreshToken");
