import { useState } from "react";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import { Button } from "ui";
import {
  mappingAadharWithNumber,
  registerMember,
  verifyOtp,
  verifyOTPWithNumber,
} from "../../api";
import swal from "sweetalert";
import { Timer } from "components";
import { useTranslation } from "react-i18next";
import { CMImage } from "assets/images/cm";
import { useStateContext } from "context";
import { toast } from "react-toastify";
import { posthog } from "posthog-js";
import { formatDate } from "utils";
import Loading from "assets/icons/loading";

const Otp: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation("otp");
  const { type } = router?.query;
  const { loginData, setLoginData, locale } = useStateContext();
  const [otp, setOtp] = useState("");
  const [otpSubmit, setOtpSubmit] = useState(false);
  const [aadhaarLinkedMobile, setAadhaarLinkedMobile] = useState();
  const [spinner, setSpinner] = useState(false);

  const handleClick = async (event: any) => {
    setSpinner(true);
    if (type == "aadhaarLink") {
      const response = await registerMember(aadhaarLinkedMobile);
      setSpinner(false);
      if (response?.status == 201) {
        toast.success(t("otp_sent_successfully"));
        setLoginData({
          ...loginData,
          mobile: aadhaarLinkedMobile,
        });
        router.push(`/otp?type=aadhaarLinkOTP`);
      } else {
        toast.error(t("message_something_went_wrong"));
      }
    } else if (type == "aadhaarLinkOTP") {
      const response = await mappingAadharWithNumber(loginData?.mobile, otp);
      setSpinner(false);
      if (response?.status == 201) {
        posthog.capture("discover_isq", {
          date: formatDate(new Date()),
          discover_isq: 1,
        });
        toast.success(t("message_mobile_number_add"));
        router.push(`/home`);
      } else {
        toast.error(t("message_something_went_wrong"));
      }
    } else if (type == "mobile") {
      const response = await verifyOTPWithNumber(loginData?.mobile, otp);
      setSpinner(false);
      if (response?.status == 201) {
        toast.success(t("successful_logged_in"));
        router.push(`/home`);
      } else {
        toast.error(t("message_something_went_wrong"));
      }
    } else {
      setOtpSubmit(true);
      if (otp && type == "aadhar") {
        const response = await verifyOtp(
          otp,
          loginData?.aadhar,
          loginData?.txn
        );
        setSpinner(false);
        setOtpSubmit(false);
        if (response?.status == 201) {
          toast.success(t("successful_logged_in"));
          if (response?.data?.isMobileMapped) {
            router.push("/home");
          } else {
            router.push("/otp?type=aadhaarLink");
          }
        } else {
          toast.error(t("can_not_verify_otp"));
        }
      } else if (otp && type == "mobile") {
        const response = await verifyOTPWithNumber(loginData?.mobile, otp);
        setSpinner(false);
        setOtpSubmit(false);
        if (response?.status == 201) {
          toast.success(t("successful_logged_in"));
          router.push("/home");
        } else {
          toast.error(t("can_not_verify_otp"));
        }
      } else {
        setSpinner(false);
        toast.warn(t("please_enter_the_otp"));
        // swal({
        //   text: t("please_enter_the_otp"),
        //   icon: "warning",
        // });
      }
    }
  };
  return (
    <div className="xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary min-h-[100vh]">
      <div className="flex justify-between items-center">
        <img
          src={`${process.env.NEXT_PUBLIC_URL}/images/govtLogo.png`}
          alt="govtLogo"
          className="h-[65px] w-[65px]"
        />
        <CMImage />
      </div>
      <div className="flex justify-center mt-10">
        <img
          src={`${process.env.NEXT_PUBLIC_URL}/images/logo.png`}
          alt="familyID Logo"
        />
      </div>
      <div className="flex justify-center mt-5 flex-col">
        {type == "aadhaarLink" ? (
          <>
            <h1
              className="text-center text-appGray text-[1.5rem] font-medium"
              id="login-heading"
            >
              {t("enter_aadhar_linked_mobile")}
            </h1>

            <input
              type="number"
              className="mt-5 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              id="login-input-aadhar"
              value={aadhaarLinkedMobile}
              onChange={(e: any) => {
                const MAX_LENGTH_MOBILE = 10;
                if (e?.target?.value?.length > MAX_LENGTH_MOBILE) {
                  toast.warn(t("not_valid_mobile"));
                  // swal({
                  //   text: t("not_valid_mobile"),
                  //   icon: "warning",
                  // });
                  e.target.value = e.target.value.substring(
                    0,
                    MAX_LENGTH_MOBILE
                  ); // remove characters beyond 12th position
                }
                setAadhaarLinkedMobile(e.target.value);
              }}
            />
          </>
        ) : (
          <>
            <h1 className="text-center text-appGray text-[1.3rem] font-medium">
              {t("enter_otp")}
            </h1>
            <h1 className="text-center text-appGray text-[1rem] font-medium">
              {locale == "hi" && loginData?.mobile && loginData?.mobile}{" "}
              {t("otp_title")}{" "}
              {locale == "en" && loginData?.mobile && loginData?.mobile}
            </h1>
            <div className="mt-5 justify-center flex">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                renderInput={(props) => <input {...props} />}
                inputType="number"
                inputStyle={{
                  width: "2rem",
                  height: "2rem",
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                }}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center mt-10">
        <Button
          className="font-medium"
          onClick={handleClick}
          text={!spinner ? t("submit") : <Loading color="#FFF" />}
          id="otp-button"
          disabled={otpSubmit}
        />
      </div>
      {type != "aadhaarLink" && (
        <div className="mt-6 text-appGray text-center">
          <Timer
            aadhar={loginData?.aadhar}
            mobile={loginData?.mobile}
            txn={loginData?.txn}
            type={type}
          />
        </div>
      )}
    </div>
  );
};

export default Otp;
