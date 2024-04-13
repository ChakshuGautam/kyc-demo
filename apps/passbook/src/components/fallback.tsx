import { Lock } from "assets/icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Button } from "ui";

const Fallback = () => {
  const router = useRouter();
  const { t } = useTranslation("fallback");
  const handleClick = async (event: any) => {
    router.push(`/`);
  };
  return (
    <>
      <h1 className="text-primary font-bold text-[28px] mb-4">
        {t("something_went_wrong")}
      </h1>
      <Lock />
      <div className="font-regular text-appGray text-center px-7">
        {t("please_try_logging_in_again")}
      </div>
      <Button className="font-medium mt-4" onClick={handleClick} text="Login" />
    </>
  );
};

export default Fallback;
