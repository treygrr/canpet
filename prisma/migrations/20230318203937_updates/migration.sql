/*
  Warnings:

  - You are about to drop the column `address` on the `Animal` table. All the data in the column will be lost.
  - Made the column `addressTypeId` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_addressTypeId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "addressTypeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "address";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_addressTypeId_fkey" FOREIGN KEY ("addressTypeId") REFERENCES "AddressType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
