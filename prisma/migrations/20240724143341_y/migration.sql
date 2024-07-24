/*
  Warnings:

  - Made the column `createdAt` on table `Reply` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Reply` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reply" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
