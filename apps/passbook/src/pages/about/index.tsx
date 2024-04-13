import { Navbar, Header, Bottombar } from "components";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation("menu");
  return (
    <div className="mb-20">
      <Navbar />
      <Header />
      <div className="pt-40 sm:pt-48 ">
        {" "}
        <div className="bg-tertiary rounded-xl px-4 py-5 mx-3 min-h-[70vh]">
          <h1 className="text-appGray text-[20px] text-center pb-3 font-bold border-b border-[#DB6027]">
            {t("about")}
          </h1>
          <p className="text-appGray text-[14px] font-regular mt-2 leading-6">
            {t("about_content")}
          </p>
        </div>
      </div>

      <Bottombar />
    </div>
  );
};

export default About;
