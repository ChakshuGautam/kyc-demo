import { Navbar, Header, Bottombar } from "components";
import { faqs } from "config/faq";
import { useStateContext } from "context";
import { useTranslation } from "react-i18next";

const Help: React.FC = () => {
  const { locale } = useStateContext();
  const { t } = useTranslation("menu");
  return (
    <div className="mb-20">
      <Navbar />
      <Header />
      <div className="pt-40 sm:pt-48 ">
        <div className="bg-tertiary rounded-xl px-4 py-5 mx-3 min-h-[70vh]">
          <h1 className="text-appGray text-[20px] text-center pb-3 font-bold border-b border-[#DB6027]">
            {t("faq")}
          </h1>
          {faqs &&
            faqs?.length > 0 &&
            faqs.map((faq: any) => (
              <div
                tabIndex={0}
                className="collapse collapse-arrow bg-primary rounded mt-4"
                key={faq?.id}
              >
                <div className="collapse-title text-white font-demi text-[15px] min-h-[0.5rem] py-[0.70rem]">
                  {locale == "hi" ? faq?.queh : faq?.que}
                </div>
                <div className="collapse-content font-regular text-appGray bg-white text-[13px]">
                  <p className="pt-3">
                    {locale == "hi" ? faq?.ansh : faq?.ans}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Bottombar />
    </div>
  );
};

export default Help;
