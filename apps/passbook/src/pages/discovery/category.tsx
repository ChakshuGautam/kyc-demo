import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useStateContext } from "context";
import { Bottombar, Header, Navbar } from "components";
import { Button } from "ui";
import SchemeFallback from "components/discovery/schemeFallback";
import Loading from "assets/icons/loading";
import { getCookie } from "cookies-next";
import { BackIcon } from "assets/icons";
import { BenefitsIcon } from "assets/icons";
import {
  EducationAndLearning,
  FarmerAndAgriculture,
  HealthAndMedical,
  Housing,
  SkillsAndEmployment,
  SmallBusiness,
  SocialWelfare,
} from "assets/icons/categories";

const Category = () => {
  const { t } = useTranslation("discovery");
  const { locale, recommendedSchemes, setForm, setFormData } =
    useStateContext();
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (categoryId: Number) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const handleSchemes = () => {
    const selectedCategoryQuery = selectedCategories.join(",");
    router.push(`/discovery/schemes?category=${selectedCategoryQuery}`);
  };

  const handleBack = () => {
    setForm((prevForm: any) => {
      const updatedForm = { ...prevForm };
      Object.keys(updatedForm.steps).forEach((stepKey: string) => {
        const updatedStep = { ...updatedForm.steps[stepKey] };
        updatedStep.fields.forEach((field: any) => {
          field.answer = "";
        });
        updatedForm.steps[stepKey] = updatedStep;
      });
      return updatedForm;
    });
    setFormData([]);
    router.push("/discovery");
  };

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (getCookie("token")) {
      setLogin(true);
    }
  }, []);

  const isCategorySelected = (categoryName: string) => {
    return selectedCategories.includes(categoryName);
  };

  const handleCategoryIcons = (categoryName: any) => {
    switch (categoryName) {
      case "Farmer & Agriculture":
        return <FarmerAndAgriculture />;
      case "Education & Learning":
        return <EducationAndLearning />;
      case "Small Business/Entrepreneurship":
        return <SmallBusiness />;
      case "Social Welfare & Empowerment":
        return <SocialWelfare />;
      case "Health & Medical":
        return <HealthAndMedical />;
      case "Housing":
        return <Housing />;
      case "Skills & Employment":
        return <SkillsAndEmployment />;
      default:
        return <BenefitsIcon />;
    }
  };

  return (
    <div className={login ? "mb-20" : "mb-10"}>
      <Navbar discovery={true} />
      <Header />
      {recommendedSchemes ? (
        <div className="pt-40 sm:pt-48">
          <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh]">
            <div className="flex">
              <div
                className="cursor-pointer mt-[0.3rem]"
                onClick={handleGoBack}
              >
                <BackIcon fill={"#626161"} />
              </div>
              <h1
                className={`${
                  locale == "hi" ? "font-extrabold hi" : "font-demi"
                } text-[20px] text-center pb-3 text-appGray`}
              >
                {t("page_title_category")}
              </h1>
            </div>

            <div className="bg-white border-[#DC6127] border-2 border-solid rounded-xl px-3 pb-1 mt-4 min-h-[50vh]">
              {recommendedSchemes && recommendedSchemes?.length > 0 ? (
                <>
                  <h1
                    className={
                      locale == "hi"
                        ? "text-[20px] text-center mt-4 mb-6 font-semibold text-appGray"
                        : "text-[20px] text-center mt-4 mb-6 font-demi text-appGray"
                    }
                  >
                    {t("select_one_or_more_category")}
                  </h1>
                  {recommendedSchemes &&
                    recommendedSchemes?.length > 0 &&
                    recommendedSchemes?.map((category: any) => (
                      <div
                        className={`shadow-lg border rounded grid grid-cols-7 mt-4 py-2 px-2 ${
                          isCategorySelected(category?.id)
                            ? "border-[#e1703b] border-4"
                            : "border-[#e1703b]"
                        }`}
                        onClick={() => handleCategoryClick(category?.id)}
                        key={category?.id}
                      >
                        <div className="group flex items-center text-primary">
                          {handleCategoryIcons(category?.name)}
                        </div>
                        <div className="group text-appGray col-span-5 flex flex-col justify-center ml-4">
                          <div
                            className="text-[14px] font-demi"
                            style={{
                              overflowWrap: "break-word",
                            }}
                          >
                            {locale == "hi" ? category?.nameh : category?.name}
                          </div>
                          <div className="font-demi text-primary text-[12px]">
                            {category?.schemes?.length}{" "}
                            {category?.schemes?.length > 1
                              ? t("schemes")
                              : t("scheme")}
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="flex justify-between my-8">
                    <Button
                      text={t("back_button")}
                      className="font-medium"
                      onClick={() => router.push("/discovery")}
                    />
                    <Button
                      text={t("submit_button")}
                      className={`font-medium ${
                        selectedCategories?.length === 0 && "opacity-[0.6]"
                      }`}
                      onClick={handleSchemes}
                      disabled={selectedCategories?.length === 0}
                    />
                  </div>
                </>
              ) : (
                <div className="mt-8">
                  <SchemeFallback />
                  <div className="flex justify-center">
                    <Button
                      text={t("back_button")}
                      className="font-medium mt-6"
                      onClick={handleBack}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-tertiary min-h-screen flex flex-col justify-center items-center">
          <Loading color="#e1703b" />
        </div>
      )}
      {login && <Bottombar />}
    </div>
  );
};

export default Category;
