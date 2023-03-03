import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const BoxList = ({ title, index, list, width, getValue }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(index);

  const listRef = useRef(null);
  useEffect(() => {
    getValue(index === "Genres" ? "All" : index);
  });
  useEffect(() => {
    if (open) {
      listRef.current.classList.add("block");
      listRef.current.classList.remove("hidden");
    } else {
      listRef.current.classList.add("hidden");
      listRef.current.classList.remove("block");
    }
  }, [open]);
  return (
    <div className={`inline-block ${width}`}>
      <p>{title}</p>
      <div
        onClick={() => {
          setOpen((open) => !open);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
        className={
          open
            ? "p-2 cursor-pointer bg-white text-black flex items-center justify-between mt-2 rounded relative z-10 shadow-lightRounder "
            : "p-2 cursor-pointer bg-white text-black flex items-center justify-between mt-2 rounded  "
        }
      >
        <span className=" font-semibold">{data}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-down"
          viewBox="0 0 16 16"
        >
          <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
        </svg>
        <div
          ref={listRef}
          className=" absolute top-full bg-white w-full left-0 border px-2"
        >
          {list.map((item, index) => {
            return (
              <p
                key={index}
                onClick={() => {
                  getValue(item);
                  setData(item);
                }}
                className=" border-b hover:font-semibold"
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

BoxList.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
  getValue: PropTypes.func,
};

export default BoxList;
