import React from "react";
import { Button } from "ui";
import { useRouter } from "next/router";

const Fallback = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push("/home");
  };

  return (
    <div
      id="login"
      className="xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary min-h-[100vh] flex justify-center items-center flex-col"
    >
      {/* <img src={`${process.env.NEXT_PUBLIC_URL}/images/offline.png`} /> */}
      <div className="text-appGray font-bold text-[22px] mt-3">
        Page Not Found
      </div>
      <div className="text-primary font-regular text-[15px] text-center mt-2">
        The page you are looking was moved, renamed or might never existed.
      </div>
      <Button
        className="font-medium mt-3"
        onClick={handleBack}
        text={"Go back to Home"}
        id="login-button"
      />
    </div>
  );
};

export default Fallback;
