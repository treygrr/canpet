/*
  Warnings:

  - The `salt` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[salt]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "salt",
ADD COLUMN     "salt" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_salt_key" ON "User"("salt");
