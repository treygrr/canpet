/*
  Warnings:

  - Made the column `speciesId` on table `Animal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_speciesId_fkey";

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "adopted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "adoptedDate" TIMESTAMP(3),
ADD COLUMN     "adoptionFee" SMALLINT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "description" VARCHAR(1000),
ALTER COLUMN "speciesId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
