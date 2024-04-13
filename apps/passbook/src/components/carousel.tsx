import { BackIcon } from "assets/icons";
import { useStateContext } from "context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Carousel({ slides }) {
  let [current, setCurrent] = useState(0);
  const { locale } = useStateContext();

  const router = useRouter();

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((schemes) => {
          return (
            <div className="bg-white text-appGray font-regular border border-[#e1703b] min-h-[50px] min-w-full rounded-lg mt-3">
              <div className="bg-tertiary p-4 font-bold">
                {" "}
                {locale == "hi" ? schemes?.schemeNameh : schemes?.schemeName}
              </div>
              <div className="flex">
                <button onClick={previousSlide} className="pl-3">
                  <BackIcon fill="#E1703B" />
                </button>
                <div
                  className="text-[14px] px-6 pt-3 pb-3 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/discovery/schemes/${schemes?.id}?eligibility=true&schemeCode=${schemes?.schemaCode}`
                    )
                  }
                >
                  {locale == "hi" ? schemes?.abouth : schemes?.about}
                </div>
                <button
                  onClick={nextSlide}
                  className="transform rotate-180 pl-3"
                >
                  <BackIcon fill="#E1703B" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-2 text-3xl">
       
       
      </div> */}

      <div className=" py-4 flex justify-center gap-2 w-full">
        {slides?.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-3 h-3 cursor-pointer  ${
                i == current ? "bg-primary" : "bg-gray-300"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
