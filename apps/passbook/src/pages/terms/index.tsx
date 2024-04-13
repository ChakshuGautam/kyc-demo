import { Navbar, Header, Bottombar } from "components";
import { useTranslation } from "react-i18next";
import { terms } from "config/terms";
import { useStateContext } from "context";

const TermsConditions: React.FC = () => {
  const { locale } = useStateContext();
  return (
    <div className="mb-20">
      <Navbar />
      <Header />
      <div className="pt-40 sm:pt-48 ">
        {" "}
        <div className="bg-tertiary rounded-xl px-4 py-5 mx-3 min-h-[70vh]">
          <h1 className="text-appGray text-[20px] text-center pb-3 font-bold border-b border-[#DB6027]">
            {locale === "hi"
              ? terms.terms_conditionsh
              : terms.terms_conditionse}
          </h1>
          <p className="text-appGray text-[14px] font-regular mt-2 leading-6 text-justify px-2">
            <div>{locale === "hi" ? terms.para1h : terms.para1e}</div>
            <div>{locale === "hi" ? terms.para2h : terms.para2e}</div>
          </p>
          {terms.points.map((point, index) => (
            <div
              key={index}
              className="text-appGray text-[14px] font-regular mt-2 leading-6 text-justify"
            >
              <div className="text-[18px] font-bold m-2">
                {index + 1}. {locale === "hi" ? point.headingh : point.headinge}
              </div>
              <div className="px-2">
                {locale === "hi" ? point.bodyh : point.bodye}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Bottombar />
    </div>
  );
};

export default TermsConditions;
