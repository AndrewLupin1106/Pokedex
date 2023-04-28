import React, { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

var MAX_ITEMS = 9;
var width = window.matchMedia("(max-width: 640px)")

if (width.matches) {
    MAX_ITEMS = 3
}
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset }) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - MAX_LEFT, 1);

  function onPageChange(page) {
    setOffset((page - 1) * limit);
  }

  useEffect(() => {
  }, [total])

  return (
    <ul className="flex flex-row justify-center items-center md:gap-x-2 mb-10 w-fit max-w-full lg:w-fit bg-gray-900 text-white rounded-3xl px-4 shadow-2xl font-bold">
        <li>
          <button
            onClick={() => onPageChange(1)}
            disabled={current === 1}
            className="p-2 rounded hover:bg-gray-800"
          >
            First
          </button>
        </li>
      <li className="flex items-center justify-center">
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          aria-label="Back"
          className=" bg-gray-900 hover:bg-gray-800 rounded-full shadow-xl"
        >
          <HiChevronLeft size={40}/>
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map((page) => page <= pages ? (
          <li  key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={
                page === current
                  ? "bg-white text-gray-900 p-2 px-4 rounded-md shadow-2xl"
                  : "p-4 rounded-md hover:bg-gray-800"
              }
            >
              {page}
            </button>
          </li>
        ) : "")}
        <li className="flex items-center justify-center">
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === pages}
          aria-label="Advance"
          className=" bg-gray-900 hover:bg-gray-800 rounded-full shadow-xl"
        >
          <HiChevronRight size={40}/>
        </button>
      </li>
      <li>
        <button
          onClick={() => onPageChange(pages)}
          disabled={current === pages}
          className="p-2 rounded hover:bg-gray-800"
        >
             Last
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
