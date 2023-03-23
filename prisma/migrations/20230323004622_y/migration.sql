/*
  Warnings:

  - You are about to drop the column `deviceSecret` on the `Device` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Device_deviceSecret_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "deviceSecret",
ADD COLUMN     "privateKey" VARCHAR(5000),
ADD COLUMN     "publicKey" VARCHAR(5000);
