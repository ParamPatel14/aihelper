/*
  Warnings:

  - You are about to drop the column `token_type` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "token_type",
ADD COLUMN     "tokent_ype" TEXT;
