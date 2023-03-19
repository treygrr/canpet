/*
  Warnings:

  - You are about to drop the `AnimalBreed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimalBreed" DROP CONSTRAINT "AnimalBreed_animalId_fkey";

-- DropForeignKey
ALTER TABLE "AnimalBreed" DROP CONSTRAINT "AnimalBreed_breedId_fkey";

-- DropTable
DROP TABLE "AnimalBreed";

-- CreateTable
CREATE TABLE "_AnimalToBreed" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnimalToBreed_AB_unique" ON "_AnimalToBreed"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimalToBreed_B_index" ON "_AnimalToBreed"("B");

-- AddForeignKey
ALTER TABLE "_AnimalToBreed" ADD CONSTRAINT "_AnimalToBreed_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToBreed" ADD CONSTRAINT "_AnimalToBreed_B_fkey" FOREIGN KEY ("B") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
