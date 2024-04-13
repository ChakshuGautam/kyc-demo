import { Navbar, Header, Bottombar } from "components";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { BackIcon } from "assets/icons";
import { useStateContext } from "context";

const Options = () => {
  const router = useRouter();
  const { t } = useTranslation("discovery");
  const { setForm, setFormData } = useStateContext();

  const handleClick = async (event: any) => {
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
    if (router?.query?.eligibility == "true") {
      router.push(
        `/discover/members?schemeId=${router?.query?.schemeId}&eligibility=true`
      );
    } else {
      router.push(`/discover/members`);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleOthers = () => {
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
  return (
    <div className="mb-20">
      <Navbar />
      <Header />
      <div className="pt-40 sm:pt-48">
        <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh]">
          <div className="flex border-b pb-3 border-[#B7B7B7]">
            <div className="cursor-pointer mt-1" onClick={handleGoBack}>
              <BackIcon fill={"#626161"} />
            </div>
            <div className="text-appGray self-center mx-auto font-bold text-[20px] text-center px-3">
              {t("find_schemes_for_you")}
            </div>
          </div>

          <div className="text-appGray font-demi text-center mt-4 border-[#B7B7B7]">
            {t("find_for_whom")}
          </div>
          <div
            className={`cursor-pointer text-appGray font-regular shadow-lg rounded text-[14px] py-2 px-3 mb-2 bg-white text-center mt-6`}
            onClick={handleClick}
          >
            {t("within_family")}
          </div>
          <div
            className={`cursor-pointer text-appGray font-regular shadow-lg rounded text-[14px] py-2 px-3 mb-2 bg-white text-center mt-4`}
            onClick={handleOthers}
          >
            {t("others")}
          </div>
        </div>
      </div>
      <Bottombar />
    </div>
  );
};

export default Options;
