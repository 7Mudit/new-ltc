"use server";

import { connectToDb } from "../mongoose";

export async function createQuestion() {
  try {
    connectToDb();
  } catch (err) {
    console.log(err);
  }
}
