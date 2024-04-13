import { useTranslation } from "react-i18next";
import { useStateContext } from "context";
import { Bottombar, Header, Navbar } from "components";
import { Button } from "ui";
import {
  BackIcon,
  SchemeBenefitsIcon,
  SchemeDocumentsIcon,
  SchemeEligibilityIcon,
  WalletIcon,
} from "assets/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSchemeById } from "api";
import { getCookie } from "cookies-next";
import { departmentLogos } from "config/departmentLogos";
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
import { posthog } from "posthog-js";
import { formatDate } from "utils";
import Link from "next/link";

const Schemes = () => {
  const { t } = useTranslation("discovery");
  const { locale, discoveryMember, setDiscoveredScheme } = useStateContext();
  const router = useRouter();
  const [schemeDetails, setSchemeDetails]: any = useState();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const getSchemeDetails = async () => {
      const response = await getSchemeById(router?.query?.id);
      console.log("response:router", router);
      setSchemeDetails(response);
      setDiscoveredScheme({
        namee: response?.schemeName,
        nameh: response?.schemeNameh,
        documente: response?.document,
        documenth: response?.documenth,
      });
    };
    getSchemeDetails();

    posthog.capture("scheme_clicked", {
      scheme_id: router?.query?.id,
      scheme_clicked: 1,
      scheme_code: router?.query?.schemeCode,
      member_id: getCookie("username"),
    });
  }, []);
  const handleEligibility = () => {
    if (login) {
      posthog.capture("mob_no_add", {
        date: formatDate(new Date()),
        mob_no_add: 1,
        member_id: getCookie("username"),
      });
    } else {
      posthog.capture("withoutlogin_initiated_scheme_questionnaire", {
        date: formatDate(new Date()),
        withoutlogin_initiated_scheme_questionnaire: 1,
      });
    }
    if (router?.query?.eligibility === "true") {
      router.push(
        `/discover/members?schemeId=${router?.query?.id}&eligibility=true`
      );
    } else {
      router.push(`/discovery/questions/${router?.query?.id}`);
    }
  };

  useEffect(() => {
    if (getCookie("token")) {
      setLogin(true);
    }
  }, []);

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
        {schemeDetails && (
          <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh] ">
            <div className="flex border-b border-[#DC6127]">
              <div className="cursor-pointer" onClick={handleGoBack}>
                <BackIcon fill={"#626161"} />
              </div>
              <div className="flex px-3">
                <div className="flex items-center text-primary pb-2 pr-2">
                  {handleDepartmentIcons(schemeDetails?.schemeCode)}
                </div>
                <h1
                  className={`${
                    locale == "hi" ? "font-extrabold hi" : "font-demi"
                  } text-[18px] pb-3 ml-1 text-appGray`}
                >
                  {locale == "hi"
                    ? schemeDetails?.schemeNameh
                    : schemeDetails?.schemeName}
                </h1>
              </div>
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
            <div className="h-[48vh] overflow-y-auto">
              <div className="border-b border-[#DC6127] font-demi text-primary mt-9 text-[14px] flex pb-1">
                <SchemeBenefitsIcon />{" "}
                <span className="ml-2 mt-[-2px]">{t("benefits")}</span>
              </div>
              <div className="text-black font-medium text-[12px] mt-3">
                <ul className="mt-3 list-disc px-8">
                  {locale == "hi"
                    ? schemeDetails?.benefitsh?.map(
                        (point: string, index: number) => (
                          <li key={index}>{point}</li>
                        )
                      )
                    : schemeDetails?.benefits?.map(
                        (point: string, index: number) => (
                          <li key={index}>{point}</li>
                        )
                      )}
                </ul>
              </div>
              {/* <div className="border-b border-[#DC6127] font-demi text-primary mt-5 text-[14px] flex pb-1">
            <SchemeEligibilityIcon />{" "}
            <span className="ml-2 mt-[-2px]">Eligibility</span>
          </div>
          <div className="text-black font-medium text-[12px] mt-3">
            The point of using Lorem Ipsum is that it has a more-
            <ul className="mt-3 list-disc px-8">
              <li>
                Financial Assistance: Financial benefit of Rs. 6000/- per year
                in three equal installments of Rs. 2000 each.
              </li>
              <li>
                Direct Transfer: Aid transferred directly into the bank accounts
                of the beneficiaries
              </li>
            </ul>
          </div> */}
              <div className="border-b border-[#DC6127] font-demi text-primary mt-5 text-[14px] flex pb-1">
                <SchemeDocumentsIcon />{" "}
                <span className="ml-2 mt-[-2px]">{t("documents")}</span>
              </div>
              <div className="text-black font-medium text-[12px] mt-3 capitalize">
                <ul className="mt-3 list-disc px-8">
                  {locale == "hi"
                    ? schemeDetails?.documenth?.map(
                        (point: string, index: number) => (
                          <li key={index}>{point}</li>
                        )
                      )
                    : schemeDetails?.document?.map(
                        (point: string, index: number) => (
                          <li key={index}>{point}</li>
                        )
                      )}
                </ul>
              </div>
            </div>

            <div className="flex justify-center sticky bottom-[10%]">
              <Button
                text={t("confirm_eligibility_button")}
                className="font-medium mt-8 mb-4 w-full"
                onClick={handleEligibility}
              />
            </div>
          </div>
        )}
      </div>
      {login && <Bottombar />}
    </div>
  );
};

export default Schemes;
