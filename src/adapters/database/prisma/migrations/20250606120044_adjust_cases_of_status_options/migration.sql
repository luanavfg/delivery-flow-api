/*
  Warnings:

  - Changed the type of `status` on the `Delivery` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "status",
ADD COLUMN     "status" "DeliveryStatus" NOT NULL;
