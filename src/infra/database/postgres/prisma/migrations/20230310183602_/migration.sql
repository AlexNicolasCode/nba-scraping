/*
  Warnings:

  - You are about to drop the column `link` on the `Team` table. All the data in the column will be lost.
  - Added the required column `profileLink` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "link",
ADD COLUMN     "profileLink" TEXT NOT NULL;
