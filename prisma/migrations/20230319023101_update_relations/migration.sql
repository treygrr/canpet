/*
  Warnings:

  - You are about to drop the `_LocationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LocationToUser" DROP CONSTRAINT "_LocationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToUser" DROP CONSTRAINT "_LocationToUser_B_fkey";

-- DropTable
DROP TABLE "_LocationToUser";

-- CreateTable
CREATE TABLE "UsersOnLocations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnLocations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersOnLocations" ADD CONSTRAINT "UsersOnLocations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnLocations" ADD CONSTRAINT "UsersOnLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
