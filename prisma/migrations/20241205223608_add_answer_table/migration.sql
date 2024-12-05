-- CreateTable
CREATE TABLE "answers" (
    "id" UUID NOT NULL,
    "option" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "question_id" UUID NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
