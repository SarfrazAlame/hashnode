/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Save` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Save_userId_postId_key" ON "Save"("userId", "postId");
