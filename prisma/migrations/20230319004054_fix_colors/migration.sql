/*
  Warnings:

  - You are about to drop the `AnimalColor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimalColor" DROP CONSTRAINT "AnimalColor_animalId_fkey";

-- DropForeignKey
ALTER TABLE "AnimalColor" DROP CONSTRAINT "AnimalColor_colorId_fkey";

-- DropTable
DROP TABLE "AnimalColor";

-- CreateTable
CREATE TABLE "_AnimalToColor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnimalToColor_AB_unique" ON "_AnimalToColor"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimalToColor_B_index" ON "_AnimalToColor"("B");

-- AddForeignKey
ALTER TABLE "_AnimalToColor" ADD CONSTRAINT "_AnimalToColor_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToColor" ADD CONSTRAINT "_AnimalToColor_B_fkey" FOREIGN KEY ("B") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;
