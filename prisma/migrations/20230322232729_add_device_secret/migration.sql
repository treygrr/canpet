/*
  Warnings:

  - A unique constraint covering the columns `[deviceSecret]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - The required column `deviceSecret` was added to the `Device` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "deviceSecret" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceSecret_key" ON "Device"("deviceSecret");
