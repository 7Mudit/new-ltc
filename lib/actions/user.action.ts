"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";

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
