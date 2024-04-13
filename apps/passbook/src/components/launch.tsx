import { CMImage } from "assets/images/cm";

export default function Launch() {
  return (
    <>
      <div
        id="launch"
        className="flex justify-center items-center bg-tertiary min-h-[100vh] flex-col"
      >
        <div className="flex justify-between w-[90vw] max-w-[360px] absolute top-[1.5rem] md:top-[4rem]">
          <img
            src={`${process.env.NEXT_PUBLIC_URL}/images/govtLogo.svg`}
            alt="govtLogo"
          />
          <CMImage />
        </div>
        <div className={`flex justify-center items-center h-[40vh]`}>
          <img
            src={`${process.env.NEXT_PUBLIC_URL}/images/logo.png`}
            alt="familyID Logo"
          />
        </div>
      </div>
    </>
  );
}
