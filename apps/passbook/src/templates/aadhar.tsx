import React from "react";

const Aadhar = () => {
  return (
    <div className="rounded-lg bg-white aadhar">
      <img
        src={`${process.env.NEXT_PUBLIC_URL}/images/aadharHeader.png`}
        className="rounded-md"
      />
      <div className="bg-[#f7f6fa] px-2 pt-3 mt-2 border-b-2 border-red-500">
        <img
          src={`${process.env.NEXT_PUBLIC_URL}/images/aadharPhoto.jpeg`}
          className="rounded h-[120px]"
        />
        <div className="font-bold text-black text-center text-[20px] mt-2 mb-1">
          3496 9085 7639
        </div>
      </div>
      <img
        src={`${process.env.NEXT_PUBLIC_URL}/images/aadharFooter.png`}
        className="rounded-md"
      />
    </div>
  );
};

export default Aadhar;
