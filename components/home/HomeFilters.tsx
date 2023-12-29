"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { HomePageFilters } from "@/constants/Filters";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState("");

  const handleTypeCLick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex ">
      {HomePageFilters.map((item) => (
        <Button
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500 "
              : "bg-light-800 text-light-500  hover:bg-light-900 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-500 "
          }`}
          key={item.value}
          onClick={() => {
            handleTypeCLick(item.value);
          }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
