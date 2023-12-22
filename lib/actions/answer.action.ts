"use server";

import Answer from "@/database/answer.model";
import { connectToDb } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDb();
    const { content, author, question, path } = params;
    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });
    // add answer to question answers array
    await Question.findByIdAndUpdate(question, {
      $push: {
        answers: newAnswer._id,
      },
    });

    // TODO interaction

    revalidatePath(path);
  } catch (er) {
    console.log(er);
    throw er;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDb();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
