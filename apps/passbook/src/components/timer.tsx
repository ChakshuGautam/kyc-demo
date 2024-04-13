import { login, loginWithNumber } from "api";
import { useStateContext } from "context";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import swal from "sweetalert";

export const Timer = (props: any) => {
  const { t } = useTranslation("otp");
  const router = useRouter();
  const { setLoginData } = useStateContext();
  const resendOTP = async () => {
    setMinutes(0);
    setSeconds(60);
    if (props?.type === "mobile" && props?.mobile) {
      const response = await loginWithNumber(props?.mobile);
      if (response?.status == 403) {
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
          mobile: props?.mobile,
        });
        router.push(`/otp?type=mobile`);
      }
    } else if (props.type == "aadhar") {
      const response = await login(props?.aadhar);
      if (response?.status == 201) {
        toast.success(t("otp_sent_successfully"));
        // swal({
        //   text: t("otp_sent_successfully"),
        //   icon: "success",
        // });
        router.push(
          `/otp?aadhar=${props?.aadhar}&txn=${response?.data?.Value[0]?.otptxn}&mobile=${response?.data?.Value[0]?.maskedMobile}`
        );
      }
    }
  };

  const { initialMinute = 0, initialSeconds = 60 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      <div className="font-regular text-center text-appGray">
        {minutes === 0 && seconds === 0 ? null : (
          <>
            {t("time_remaining")}: {minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </>
        )}
      </div>
      <button
        disabled={seconds > 0 || minutes > 0}
        className="font-regular cursor-pointer"
        style={{
          color: seconds > 0 || minutes > 0 ? "#9e9e9e" : "#626161",
        }}
        onClick={resendOTP}
      >
        {t("resend_otp")}
      </button>
    </>
  );
};
