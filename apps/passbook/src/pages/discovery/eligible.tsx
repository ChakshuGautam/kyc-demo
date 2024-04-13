import { useStateContext } from "context";
import { Bottombar, Header, Navbar } from "components";
import { Button } from "ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import { BackIcon, SchemeDocumentsIcon } from "assets/icons";
import SearchIcon from "assets/icons/searchIcon";
import BackButtonIcon from "assets/icons/backButton";

const Eligible = () => {
  const { t } = useTranslation("discovery");
  const router = useRouter();
  const { locale, discoveredScheme } = useStateContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [login, setLogin] = useState(false);
  // const isPhoneNumberValid = phoneNumber.length === 10;

  const handleCall = () => {
    toast.success(t("call_success_message"));
    // swal({
    //   text: t("call_success_message"),
    //   icon: "success",
    // });
  };

  // const handlePhoneNumberChange = (event) => {
  //   setPhoneNumber(event.target.value);
  // };

  const handleClick = () => {
    if (router.query?.eligibility) {
      router.push("/discovery/schemes/all");
    } else {
      router.push("/discovery/schemes");
    }
  };
  useEffect(() => {
    if (getCookie("token")) {
      setLogin(true);
    }
  }, []);

  return (
    <div className={login ? "mb-20" : "mb-10"}>
      <Navbar discovery={true} />
      <Header />
      <div className="pt-40 sm:pt-48">
        <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh]">
          <div className="bg-white border-[#DC6127] border-2 border-solid rounded-xl px-3 pb-1 mt-4 min-h-[50vh] text-center">
            <div className="flex justify-center pt-5">
              <img src="/images/congratulations.png" />
            </div>
            {/* <h1
              className={`${
                locale === "hi" ? "font-extrabold hi" : "font-demi"
              } text-[20px] pb-3 text-appGray border-[#DC6127] border-b mt-5`}
            >
              {t("congratulations_title")}
            </h1> */}
            <div className="font-regular text-primary mb-4 mt-3 border-[#DC6127] border-b pb-3">
              {t("eligibility_message")}{" "}
              <span className="font-bold">
                {locale == "hi"
                  ? discoveredScheme?.nameh
                  : discoveredScheme?.namee}
              </span>
            </div>

            <div className="font-regular text-appGray text-[14px] mt-5 text-left ">
              <ul className="mt-3 list-disc px-8">
                <li>{t("more_info")}</li>
                <li>{t("more_info2")}</li>
              </ul>
            </div>
            <div className="border-b border-[#DC6127] font-demi text-primary mt-5 text-[14px] flex pb-1">
              <SchemeDocumentsIcon />{" "}
              <span className="ml-2 mt-[-2px]">{t("documents")}</span>
            </div>
            <div className="text-appGray font-medium text-[12px] mt-3 capitalize text-left">
              <ul className="mt-3 list-disc px-8">
                {locale == "hi"
                  ? discoveredScheme?.documenth?.map(
                      (point: string, index: number) => (
                        <li key={index}>{point}</li>
                      )
                    )
                  : discoveredScheme?.documente?.map(
                      (point: string, index: number) => (
                        <li key={index}>{point}</li>
                      )
                    )}
              </ul>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                text={t("explore_other_schemes_button")}
                className="font-demi mt-2 w-full px-5"
                onClick={handleClick}
                icon={<SearchIcon />}
              />
            </div>

            <div className="flex justify-center mb-8">
              <Button
                text={t("go_to_main_screen")}
                className="font-demi mt-2 w-full"
                onClick={() => router.push("/discover")}
                icon={<BackButtonIcon />}
              />
            </div>

            {/* <div className="font-regular text-black text-[14px] mt-8 ">
              {t("enter_mobile_number_message")}
            </div>
            <input
              type="text"
              className="border border-[#DC6127] rounded mt-2 w-full px-2 py-1"
              placeholder={t("enter_mobile_number_placeholder")}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <div className="flex justify-center mb-10 mt-8">
              <Button
                onClick={handleCall}
                text={t("call_button")}
                className={`font-demi ${
                  isPhoneNumberValid ? "" : "opacity-[0.6]"
                }`}
                disabled={!isPhoneNumberValid}
              />
            </div> */}
          </div>
        </div>
      </div>
      {login && <Bottombar />}
    </div>
  );
};

export default Eligible;
