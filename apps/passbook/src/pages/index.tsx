import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "ui";
import { useStateContext } from "context";
import { useSyncLanguage } from "ni18n";
import { CMImage } from "assets/images/cm";
import Launch from "components/launch";
import { posthog } from "posthog-js";

export default function Index() {
  const { locale, setLocale } = useStateContext();
  const router = useRouter();
  const [launch, setLaunch] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLaunch(false);
      router.push("/login");
    }, 2000);
  }, []);

  const handleLanguageSelection = (language: string) => {
    {
      posthog.capture("Language Selection", { property: "English selected" });
    }
    setLocale(language);
    router.push("/login");
  };
  useSyncLanguage(locale);

  if (launch) {
    return <Launch />;
  }
  // return (
  //   <>
  //     <div
  //       id="language-selector"
  //       className={`xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary min-h-[100vh] ${locale}`}
  //     >
  //       <div className="flex justify-between">
  //         <img
  //           src={`${process.env.NEXT_PUBLIC_URL}/images/govtLogo.svg`}
  //           alt="govtLogo"
  //         />
  //         <CMImage />
  //       </div>
  //       <div className="flex justify-center mt-10">
  //         <img
  //           src={`${process.env.NEXT_PUBLIC_URL}/images/logo.png`}
  //           alt="familyID Logo"
  //         />
  //       </div>
  //       <div className="flex justify-center mt-5 flex-col">
  //         <h1
  //           className="text-center text-appGray text-[1.5rem] font-medium"
  //           id="language-selector-heading"
  //         >
  //           Choose your Language
  //         </h1>
  //       </div>
  //       <div className="mt-7 flex justify-between px-4">
  //         <Button
  //           className="font-medium"
  //           text={"English"}
  //           onClick={() => handleLanguageSelection("en")}
  //           id="language-selector-english"
  //         />
  //         <Button
  //           className=""
  //           text={"हिन्दी"}
  //           onClick={() => handleLanguageSelection("hi")}
  //           id="language-selector-hindi"
  //         />
  //       </div>
  //     </div>
  //   </>
  // );
}
