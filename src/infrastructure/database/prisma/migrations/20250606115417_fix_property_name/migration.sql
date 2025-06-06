/*
  Warnings:

  - You are about to drop the column `deliveryAddress` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `destinyAddress` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "deliveryAddress",
ADD COLUMN     "destinyAddress" TEXT NOT NULL;
