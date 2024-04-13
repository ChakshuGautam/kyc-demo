import { Navbar, Header, Bottombar } from "components";
import { ComingSoon } from "assets/icons";
import { Button } from "ui";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Notifications: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation("comingSoon");
  const handleClick = async (event: any) => {
    router.push(`/home`);
  };
  return (
    <div className="bg-tertiary min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <Header />
      <h1 className="text-primary font-bold text-[34px]">
        {t("coming_soon")} !
      </h1>
      <ComingSoon />
      <div className="font-regular text-appGray text-center px-7">
        {t("coming_soon_description")}
      </div>
      <Button
        className="font-medium mt-4"
        onClick={handleClick}
        text={t("back")}
      />
      <Bottombar />
    </div>
  );
};

export default Notifications;
