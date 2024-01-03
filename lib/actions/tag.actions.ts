"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDb();

    const { userId } = params;
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
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const skipAmount = pageSize * (page - 1);

    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }
    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const tagDocuments = await Tag.countDocuments(query);
    const isNext = tagDocuments > skipAmount + tags.length;

    return { tags, isNext };
  } catch (err) {
    console.log(err);
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDb();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const skipAmount = pageSize * (page - 1);

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!tag) throw new Error("Tag not found");

    const questions = tag.questions;

    const isNext = tag.questions.length > pageSize;

    return { tagTitle: tag.name, questions, isNext };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getHotTags() {
  try {
    connectToDb();

    const tags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return tags;
  } catch (err) {
    console.log(err);
  }
}
