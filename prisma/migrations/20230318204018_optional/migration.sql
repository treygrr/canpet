-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_addressTypeId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "addressTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_addressTypeId_fkey" FOREIGN KEY ("addressTypeId") REFERENCES "AddressType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
