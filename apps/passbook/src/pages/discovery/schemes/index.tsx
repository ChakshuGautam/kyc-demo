import { useTranslation } from "react-i18next";
import { useStateContext } from "context";
import { Bottombar, Header, Navbar } from "components";
import { Button } from "ui";
import { BackIcon, SchemesIcon } from "assets/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { BenefitsIcon } from "assets/icons";
import {
  AgricultureDepartment,
  BalVikas,
  BasicEducation,
  EmpowermentDisabilities,
  FoodAndCivil,
  RevenueDepartment,
  SecondaryEducation,
  SocialWelfare,
  UrbanDevelopment,
  UrbanEmployment,
  VocationalEducation,
  WomenWelfare,
  WorkersWelfareBoard,
} from "assets/icons/departments";
import { departmentLogos } from "config/departmentLogos";
import Link from "next/link";

const Schemes = () => {
  const { t } = useTranslation("discovery");
  const { locale, recommendedSchemes } = useStateContext();
  // const [categories, setCategories] = useState<string[]>([]);
  // const [mergedSchemes, setMergedSchemes] = useState<any[]>([]);
  const [login, setLogin] = useState(false);
  const { discoveryMember, setForm, setFormData } = useStateContext();
  const router = useRouter();
  // useEffect(() => {
  //   const categoryParam = router?.query?.category as string | undefined;
  //   if (categoryParam) {
  //     const categoriesArray = categoryParam.split(",");
  //     setCategories(categoriesArray);

  //     const uniqueSchemeIds = new Set<string>();
  //     categoriesArray?.forEach((category) => {
  //       const schemes = recommendedSchemes?.filter(
  //         (scheme: any) => scheme?.id == category
  //       );
  //       schemes?.[0]?.schemes?.forEach((scheme: any) => {
  //         uniqueSchemeIds.add(scheme?.id);
  //       });
  //     });
  //     setMergedSchemes(Array.from(uniqueSchemeIds));
  //   }
  // }, []);

  useEffect(() => {
    if (getCookie("token")) {
      setLogin(true);
    }
  }, []);

  const handleReset = () => {
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
    router.push("/discover/members");
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleDepartmentIcons = (code: any) => {
    if (code === "" || !departmentLogos[code]?.DepartmentCode)
      return <BenefitsIcon />;
    switch (departmentLogos[code].DepartmentCode) {
      case 101:
        return <AgricultureDepartment />;
      case 104:
        return <SocialWelfare />;
      case 105:
        return <BalVikas />;
      case 106:
        return <BasicEducation />;
      case 110:
        return <SocialWelfare />;
      case 111:
        return <EmpowermentDisabilities />;
      case 113:
        return <FoodAndCivil />;
      case 124:
        return <SecondaryEducation />;
      case 125:
        return <SocialWelfare />;
      case 126:
        return <UrbanDevelopment />;
      case 127:
        return <UrbanEmployment />;
      case 128:
        return <WorkersWelfareBoard />;
      case 129:
        return <VocationalEducation />;
      case 130:
        return <WomenWelfare />;
      case 131:
        return <RevenueDepartment />;
      default:
        return <BenefitsIcon />;
    }
  };

  return (
    <div className={login ? "mb-20" : "mb-10"}>
      <Navbar discovery={true} />
      <Header />
      <div className="pt-40 sm:pt-48">
        <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh]">
          <div className="flex">
            <div className="cursor-pointer mt-[0.3rem]" onClick={handleGoBack}>
              <BackIcon fill={"#626161"} />
            </div>
            <h1
              className={`${
                locale == "hi" ? "font-extrabold hi" : "font-demi"
              } text-[20px] text-center px-2 pb-3 text-appGray`}
            >
              {t("page_title_category")}
            </h1>
          </div>
          <div className="text-appGray mt-4 text-[14px] font-medium flex justify-between">
            <div>
              {discoveryMember?.namee?.length > 0 &&
                discoveryMember?.nameh?.length > 0 &&
                (locale === "hi" // @ts-ignore
                  ? discoveryMember?.nameh // @ts-ignore
                  : discoveryMember?.namee)}
            </div>
            {/* @ts-ignore */}
            {discoveryMember?.namee.length > 0 &&
              discoveryMember?.nameh.length > 0 && (
                <Link href="/discover/members">
                  <div className="text-primary font-medium underline">
                    {t("change_user")}
                  </div>
                </Link>
              )}
          </div>
          <div className="bg-white border-[#DC6127] border-2 border-solid rounded-xl px-3 pb-1 mt-4 min-h-[50vh]">
            <h1
              className={`${
                locale == "hi" ? "font-semibold" : "font-demi"
              } text-[15px] text-center mt-4 mb-6 text-appGray`}
            >
              {t("select_scheme_confirm_your_eligibility")}
            </h1>

            {recommendedSchemes.map((category: any) => (
              <div key={category.id}>
                {category.schemes.map((scheme: any) => (
                  <>
                    <div
                      className="border border-[#DC6127] flex py-2 px-2 text-appGray font-medium text-[13px] mt-3 items-center"
                      key={scheme?.id}
                      onClick={() =>
                        router.push(
                          `/discovery/schemes/${scheme?.id}?schemeCode=${scheme?.schemeCode}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <div className="group flex items-center text-primary">
                        {handleDepartmentIcons(scheme?.schemeCode)}
                      </div>
                      <span className="ml-2">
                        {locale == "hi"
                          ? scheme?.schemeNameh
                          : scheme?.schemeName}
                      </span>
                    </div>
                    {/* <li key={scheme.id}>

                      <h3>{scheme.schemeName}</h3>
                      <p>{scheme.schemeNameh}</p>
                      <p>Scheme Code: {scheme.schemeCode}</p>
                      <p>Department Code: {scheme.departmentCode}</p>
                      <p>Stage: {scheme.stage}</p>
                    </li> */}
                  </>
                ))}
              </div>
            ))}
            {/* {mergedSchemes.length > 0 &&
              mergedSchemes.map((schemeId: string) => {
                const scheme = recommendedSchemes?.find((scheme: any) =>
                  scheme?.schemes?.some(
                    (innerScheme: any) => innerScheme?.id === schemeId
                  )
                );
                if (!scheme) return null;

                const foundScheme = scheme?.schemes?.find(
                  (innerScheme: any) => innerScheme?.id === schemeId
                );
                return (
                  <div
                    className="border border-[#DC6127] flex py-2 px-2 text-appGray font-medium text-[13px] mt-3 items-center"
                    key={foundScheme?.id}
                    onClick={() =>
                      router.push(`/discovery/schemes/${foundScheme?.id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className="group flex items-center text-primary">
                      {handleDepartmentIcons(foundScheme?.schemeCode)}
                    </div>
                    <span className="ml-2">
                      {locale == "hi"
                        ? foundScheme?.schemeNameh
                        : foundScheme?.schemeName}
                    </span>
                  </div>
                );
              })} */}

            <div className="flex justify-center">
              <Button
                text={t("reset_form_button")}
                className="font-medium my-8 w-full"
                onClick={handleReset}
              />
            </div>
          </div>
        </div>
      </div>
      {login && <Bottombar />}
    </div>
  );
};

export default Schemes;
