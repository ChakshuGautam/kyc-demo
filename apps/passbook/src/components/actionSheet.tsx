import { CrossIcon, ImportIcon } from "assets/icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getCodeChallenge } from "utils";

export const ActionSheet = ({ showBox, toggleBox }) => {
  const { t } = useTranslation("comingSoon");
  const router = useRouter();
  const handleClick = () => {
    router.push(
      `${
        process.env.NEXT_PUBLIC_DIGILOCKER_URL
      }/public/oauth2/1/authorize?response_type=code&client_id=${
        process.env.NEXT_PUBLIC_DIGILOCKER_CLIENT_ID
      }&redirect_uri=${
        process.env.NEXT_PUBLIC_URL
      }/family/addDocuments&code_challenge_method=S256&code_challenge=${getCodeChallenge()}&state=${
        router?.query?.slug
      }`
    );
  };
  return (
    <>
      {showBox && (
        <div className="actionsheet-container mb-12">
          <div className="actionsheet-box pb-12">
            <div className="flex justify-end">
              <button
                onClick={toggleBox}
                className="actionsheet-slide-down cursor-pointer"
              >
                <CrossIcon />
              </button>
            </div>
            <h2 className="text-primary font-demi text-center py-5 border-solid border-[#626161] border rounded-xl mx-7">
              <button className="text-appGray px-7" onClick={handleClick}>
                <div className="flex justify-center text-[18px]">
                  <div className="mr-3">
                    <ImportIcon />
                  </div>
                  Import
                </div>
                <div className="text-[12px] text-[#989898] flex mt-3">
                  <div className="flex self-center mr-2">Supported by</div>
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}/images/digilogo.png`}
                    alt="Digilocker Logo"
                    className="py-2"
                    width={"80px"}
                  />
                </div>
              </button>
            </h2>
          </div>
        </div>
      )}
    </>
  );
};
