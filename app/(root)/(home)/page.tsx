import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/Filters";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQL",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "NEXTJS" },
      { _id: "3", name: "REACT JS" },
    ],
    author: { _id: "1", name: "John Doe", picture: "url_to_john_doe_picture" },
    upvotes: 10,
    views: 10000000,
    answers: [{}],
    createdAt: new Date("2021-10-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "Cascading Deletes in React",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "NEXTJS" },
      { _id: "3", name: "REACT JS" },
    ],
    author: { _id: "1", name: "John Doe", picture: "url_to_john_doe_picture" },
    upvotes: 10,
    views: 100,
    answers: [{}],
    createdAt: new Date("2021-10-01T12:00:00.000Z"),
  },
  {
    _id: "3",
    title: "How to center a div in CSS?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "NEXTJS" },
      { _id: "3", name: "REACT JS" },
    ],
    author: { _id: "1", name: "John Doe", picture: "url_to_john_doe_picture" },
    upvotes: 10,
    views: 100,
    answers: [{}],
    createdAt: new Date("2021-10-01T12:00:00.000Z"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end  max-sm:w-full ">
          <Button className="primary-gradient !text-light-900 min-h-[46px] px-4 py-3">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6 ">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
