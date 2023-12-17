"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDb();

    const { userId, limit = 3 } = params;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // find interactions with tags and group by tags
    // afterwards will implement this with interaction model

    return [
      {
        _id: "1",
        name: "NextJS",
      },
      {
        _id: "2",
        name: "ReactJS",
      },
      {
        _id: "3",
        name: "NodeJS",
      },
    ];
  } catch (err) {
    console.log(err);
  }
}
