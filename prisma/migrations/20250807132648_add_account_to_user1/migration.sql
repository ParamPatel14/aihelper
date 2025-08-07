/*
  Warnings:

  - You are about to drop the column `tokent_type` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "tokent_type",
ADD COLUMN     "token_type" TEXT;
