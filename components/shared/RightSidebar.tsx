import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTags from "./RenderTags";

const RightSidebar = () => {
  const hotQuestions: any = [
    { _id: 1, title: "How do I use a custome server component ? " },
    { _id: 2, title: "How do I use a custome server component ? " },
    { _id: 3, title: "How do I use a custome server component ? " },
    { _id: 4, title: "How do I use a custome server component ? " },
    { _id: 5, title: "How do I use a custome server component ? " },
  ];
  const popularTags: any = [
    { _id: 1, name: "Javascript", totalQuestions: 5 },
    { _id: 2, name: "React", totalQuestions: 50 },
    { _id: 3, name: "Next", totalQuestions: 35 },
    { _id: 4, name: "Java", totalQuestions: 25 },
    { _id: 5, name: "Django", totalQuestions: 15 },
  ];
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar shadow-light-300 sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 dark:shadow-none max-xl:hidden">
      <div className="">
        <h3 className="h3-bold text-dark200_light900 ">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px] ">
          {hotQuestions.map((question: any) => (
            <Link
              href={`/questions/${question.id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700 ">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900 ">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag: any) => (
            <RenderTags
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              key={tag._id}
              _id={tag._id}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
