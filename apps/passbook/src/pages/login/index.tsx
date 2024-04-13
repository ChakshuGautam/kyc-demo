import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "ui";
import swal from "sweetalert";
import {
  getAccessTokenWithRefreshToken,
  login,
  loginWithNumber,
  verifyToken,
} from "api";
import { useTranslation } from "react-i18next";
import { useStateContext } from "context";
import { useSyncLanguage } from "ni18n";
import { getCookie, removeCookies, setCookie } from "cookies-next";
import { CMImage } from "assets/images/cm";
import { Modal } from "components";
import { LanguageSwitcher } from "components/languageSwitcher";
import { toast } from "react-toastify";
import { posthog } from "posthog-js";
import { formatDate } from "utils";
import Loading from "assets/icons/loading";

export default function Login() {
  const { t } = useTranslation("common");
  const { locale, setForm, setFormData, setLoginData, setModaleOpen } =
    useStateContext();

  useSyncLanguage(locale);

  const [loginMethod, setLoginMethod] = useState("aadhaar");
  const router = useRouter();
  const [loginId, setloginId] = useState("");
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    if (
      getCookie("username") &&
      getCookie("token") &&
      getCookie("refreshToken")
    ) {
      const authTokenVerification = async () => {
        const res = await verifyToken();
        if (res == 200) {
          router.push("/home");
        } else {
          const res = await getAccessTokenWithRefreshToken();
          if (res == 200) {
            setCookie("token", res?.result?.user?.token);
            router.push("/home");
          } else {
            removeCookies("token");
            removeCookies("username");
            removeCookies("code_verifier");
            removeCookies("refreshToken");
            router.push("/login");
          }
        }
      };
      authTokenVerification();
    }
  }, []);

  const handleLogin = async (event: any) => {
    if (navigator.onLine) {
      setSpinner(true);
      if (loginId !== "" && loginMethod == "aadhaar") {
        posthog.capture("login_aadhaar", {
          date: formatDate(new Date()),
          login_aadhaar: 1,
        });
        const response = await login(loginId);
        setSpinner(false);
        if (response?.status == 403) {
          posthog.capture("login_aadhaar_failure", {
            date: formatDate(new Date()),
            login_aadhaar_failure: 1,
          });
          toast.warn(t("not_valid_family_id"));
          // swal({
          //   text: t("not_valid_family_id"),
          //   icon: "warning",
          // });
        }
        if (response?.status == 201) {
          toast.success(t("otp_sent_successfully"));
          // swal({
          //   text: t("otp_sent_successfully"),
          //   icon: "success",
          // });
          setLoginData({
            aadhar: loginId,
            txn: response?.data?.Value[0]?.otptxn,
            mobile: response?.data?.Value[0]?.maskedMobile,
          });
          router.push(`/otp?type=aadhar`);
        }
      } else if (loginId !== "" && loginMethod == "mobile") {
        posthog.capture("login_mob", {
          date: formatDate(new Date()),
          login_mob: 1,
        });
        const response = await loginWithNumber(loginId);
        setSpinner(false);
        if (response?.status == 403) {
          posthog.capture("login_mob_failure", {
            date: formatDate(new Date()),
            login_mob_failure: 1,
          });
          toast.warn(t("not_registered_mobile_number"));
          // swal({
          //   text: t("not_registered_mobile_number"),
          //   icon: "warning",
          // });
        }
        if (response?.status == 201) {
          toast.success(t("otp_sent_successfully"));
          // swal({
          //   text: t("otp_sent_successfully"),
          //   icon: "success",
          // });
          setLoginData({
            aadhar: "",
            txn: "",
            mobile: loginId,
          });
          router.push(`/otp?type=mobile`);
        }
      } else {
        setSpinner(false);
        toast.warn(t("please_enter_the_family_id"));
        // swal({
        //   text: t("please_enter_the_family_id"),
        //   icon: "warning",
        // });
      }
    } else {
      setModaleOpen(true);
    }
  };

  const handleDiscoveryClick = () => {
    posthog.capture("withoutlogin_discovery", {
      date: formatDate(new Date()),
      withoutlogin_discovery: 1,
    });
    setForm((prevForm: any) => {
      const updatedForm = { ...prevForm };
      Object.keys(updatedForm.steps).forEach((stepKey: string) => {
        const updatedStep = { ...updatedForm.steps[stepKey] };
        updatedStep.fields.forEach((field: any) => {
          field.answer = "";
          field.disabled = false;
        });
        updatedForm.steps[stepKey] = updatedStep;
      });
      return updatedForm;
    });
    setFormData([]);
    router.push("/discovery");
  };
  const handleDisable =
    (loginMethod === "aadhaar" && loginId?.length < 12) ||
    (loginMethod === "mobile" && loginId?.length < 10)
      ? false
      : true;

  return (
    <>
      <div
        id="login"
        className={`xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary min-h-[100vh] ${locale}`}
      >
        <div className="flex justify-between">
          <img
            src={`${process.env.NEXT_PUBLIC_URL}/images/govtLogo.svg`}
            alt="govtLogo"
          />
          <CMImage />
        </div>
        <div className="flex justify-center">
          <img
            src={`${process.env.NEXT_PUBLIC_URL}/images/logo.png`}
            alt="familyID Logo"
            width={220}
            height={220}
          />
        </div>
        <div className="flex justify-center text-[2rem] text-appGray mb-6 font-demi">
          {t("welcome")}
        </div>
        <div className="flex justify-center" justify-center>
          {" "}
          <LanguageSwitcher />
        </div>
        <div className="flex justify-center mt-6 flex-col">
          <div className="flex justify-center mb-6 px-4 items-center">
            <Button
              className="font-medium"
              onClick={() => setLoginMethod("mobile")}
              text={t("mobile")}
              outline={loginMethod == "mobile" ? false : true}
              id="mobile-button"
            />
            <div className="px-2 font-medium text-[1.2rem] text-appGray">
              {t("or")}
            </div>
            <Button
              className="font-medium"
              onClick={() => setLoginMethod("aadhaar")}
              text={t("aadhaar")}
              outline={loginMethod == "aadhaar" ? false : true}
            />
          </div>
          {loginMethod == "aadhaar" && (
            <h1
              className="text-center text-appGray text-[1.5rem] font-medium"
              id="login-heading"
            >
              {t("enter_aadhaar_number")}
            </h1>
          )}
          {loginMethod == "mobile" && (
            <h1
              className="text-center text-appGray text-[1.5rem] font-medium"
              id="login-heading"
            >
              {t("enter_mobile_number")}
            </h1>
          )}
          <input
            type="number"
            className="mt-5 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            id="login-input-aadhar"
            value={loginId}
            onChange={(e: any) => {
              const MAX_LENGTH_AADHAR = 12;
              const MAX_LENGTH_MOBILE = 10;
              if (
                loginMethod == "aadhaar" &&
                e?.target?.value?.length > MAX_LENGTH_AADHAR
              ) {
                toast.warn(t("not_valid_family_id"));
                // swal({
                //   text: t("not_valid_family_id"),
                //   icon: "warning",
                // });
                e.target.value = e.target.value.substring(0, MAX_LENGTH_AADHAR); // remove characters beyond 12th position
              } else if (
                loginMethod == "mobile" &&
                e?.target?.value?.length > MAX_LENGTH_MOBILE
              ) {
                toast.warn(t("not_valid_mobile"));
                // swal({
                //   text: t("not_valid_mobile"),
                //   icon: "warning",
                // });
                e.target.value = e.target.value.substring(0, MAX_LENGTH_MOBILE); // remove characters beyond 12th position
              }
              setloginId(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center mt-5">
          <Button
            className={`font-demi ${handleDisable ? "" : "opacity-[0.6]"}`}
            onClick={handleLogin}
            text={!spinner ? t("login") : <Loading color="#FFF" />}
            id="login-button"
            disabled={!handleDisable}
          />
        </div>
        <div
          className="text-center mt-5 text-appGray"
          id="login-registration-portal"
        >
          {t("not_registered_on_family_id")}&nbsp;
          <a
            href="https://familyid.up.gov.in/"
            className="font-demi text-primary"
            id="login-registration-portal-link"
          >
            {t("click_here")}
          </a>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            className="font-medium mx-auto"
            onClick={() => handleDiscoveryClick()}
            text={t("find_schemes_for_you")}
            id="find-schemes-button"
          />
        </div>
      </div>
      <Modal>
        <div
          id="login"
          className="xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary flex justify-center items-center flex-col"
        >
          <img src={`${process.env.NEXT_PUBLIC_URL}/images/offline.png`} />
          <div className="text-appGray font-bold text-[22px] mt-3">
            You are offline
          </div>
          <div className="text-primary text-[15px] text-center mt-2">
            You must be in network to login. Please try again once internet
            connection is established
          </div>
        </div>
      </Modal>
    </>
  );
}
