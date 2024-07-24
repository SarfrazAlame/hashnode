-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "replyId" TEXT;

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
