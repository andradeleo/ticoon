-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "experience" INTEGER,
    "quiz_id" UUID NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
