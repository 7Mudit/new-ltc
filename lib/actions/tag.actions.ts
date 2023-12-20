"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

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

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDb();

    const tags = await Tag.find();
    return { tags };
  } catch (err) {
    console.log(err);
  }
}
