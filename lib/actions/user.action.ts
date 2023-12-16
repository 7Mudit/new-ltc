"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params: any) {
  try {
    connectToDb();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDb();

    const newUser = await User.create(userData);
    return newUser;
  } catch (err) {
    console.log(err);
  }
}
export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDb();

    const { clerkId, updateData, path } = params;
    await User.findOne({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDb();

    const { clerkId } = params;
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // delete everything questions answers comments
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // todo delete user answers

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (err) {
    console.log(err);
  }
}
