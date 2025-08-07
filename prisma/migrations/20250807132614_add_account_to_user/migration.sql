/*
  Warnings:

  - You are about to drop the column `tokent_ype` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "tokent_ype",
ADD COLUMN     "tokent_type" TEXT;
