import { Navbar, Header, Bottombar } from "components";
import { BenefitsIcon, SchemesAvailed } from "assets/icons";
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
import { RupeeIcon } from "assets/icons/rupee";
import { useEffect, useState } from "react";
import { getFamilyData, getFamilySchemes, getFamilyTransactions } from "api";
import Fallback from "components/fallback";
import Loading from "assets/icons/loading";
import Dropdown from "components/dropdown";
import { useTranslation } from "react-i18next";
import { useStateContext } from "context";
import { useRouter } from "next/router";
import { departmentLogos } from "config/departmentLogos";
import { formatDate, formatIndianCurrency } from "utils";
import { posthog } from "posthog-js";
import { getCookie } from "cookies-next";

const Benefits: React.FC = () => {
  const router = useRouter();
  const [data, setData]: any = useState();
  const [transactions, setTransactions]: any = useState();
  const [checked, setChecked] = useState(
    router?.query?.transactions ? true : false
  );
  const [beneficiaryData, setBeneficiaryData]: any = useState();
  const [benefitType, setBenefitType] = useState([]);
  const [fy, setFy] = useState(["2022-23"]);
  const [beneficiary, setBeneficiary] = useState([]);

  const { t } = useTranslation("benefits");
  const { locale } = useStateContext();
  const benefitTypeOptions = [
    { value: "C", label: t("cash") },
    { value: "IK", label: t("in_kind") },
    { value: "CE", label: t("certificates") },
  ];
  const fyOptions = [
    { value: "2021-22", label: "2021-22" },
    { value: "2022-23", label: "2022-23" },
  ];
  const handleBenefitTypeChange = (event: any) => {
    const selectedValue = event?.target?.getAttribute("value");

    const isSelected = benefitType?.includes(selectedValue);

    if (isSelected) {
      setBenefitType([]);
    } else {
      setBenefitType([selectedValue]);
    }
  };

  const handleFyChange = (event: any) => {
    const selectedValue = event?.target?.getAttribute("value");

    const isSelected = fy.includes(selectedValue);

    if (isSelected) {
      setFy([]);
    } else {
      setFy([selectedValue]);
    }
  };

  const handleBeneficiaryChange = (event: any) => {
    const selectedValue = event?.target?.getAttribute("value");

    const isSelected = beneficiary.includes(selectedValue);

    if (isSelected) {
      setBeneficiary([]);
    } else {
      setBeneficiary([selectedValue]);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res: any = await getFamilySchemes(benefitType, beneficiary, fy);
      const transactions: any = await getFamilyTransactions(
        benefitType,
        beneficiary,
        fy
      );
      setData(res);
      setTransactions(transactions);
    };
    getData();
  }, [benefitType, beneficiary, fy]);

  useEffect(() => {
    const getData = async () => {
      const beneficiaryOptions = [];
      const res: any = await getFamilyData();
      res?.familyMembers?.forEach((familyMember: any) => {
        beneficiaryOptions.push({
          value: familyMember?.familyMemberId,
          label: locale == "hi" ? familyMember?.nameh : familyMember?.namee,
        });
      });
      setBeneficiaryData(beneficiaryOptions);
    };
    getData();
  }, [locale]);

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

  useEffect(() => {
    posthog.capture("ledger_screen", {
      date: formatDate(new Date()),
      ledger_screen: 1,
      member_id: getCookie("username"),
    });
  }, []);

  return (
    <div className="mb-20">
      <Navbar />
      <Header />
      {data ? (
        data?.status !== 500 && data?.status !== 403 ? (
          <>
            <div className="pt-40 sm:pt-48">
              <div className="bg-tertiary rounded-xl px-4 py-5 mx-3 min-h-[70vh]">
                <div className="form-control">
                  <label className="flex cursor-pointer justify-center w-full shadow-lg">
                    <span
                      className={`font-bold text-[12px] text-[#695F5F] uppercase flex items-center justify-center p-3 rounded-tl-md rounded-bl-md ${
                        !checked && "bg-primary text-white"
                      } bg-white flex-1`}
                      onClick={() => setChecked(!checked)}
                    >
                      {data?.schemeCount > 1 ? t("schemes") : t("scheme")}
                    </span>
                    <span
                      className={`font-bold text-[12px] text-[#695F5F] uppercase flex items-center justify-center p-3 rounded-tr-md rounded-br-md ${
                        checked && "bg-primary text-white"
                      } bg-white flex-1`}
                      onClick={() => setChecked(!checked)}
                    >
                      {t("transactions")}
                    </span>
                  </label>
                </div>
                {data && (
                  <div className="bg-primary py-4 px-5 mt-5 rounded-md">
                    <div className="flex justify-between">
                      <div className="flex flex-col text-center">
                        <div className="text-white font-bold text-[16px]">
                          {t("total_family_benefits")}
                        </div>
                        <div className="text-primary font-bold bg-white text-[16px] rounded-md py-1 mt-2 shadow-xl">
                          {t("Rs")} {formatIndianCurrency(data?.totalAmount)} /-
                        </div>
                      </div>
                      <div className="flex flex-col justify-center text-center">
                        <div className="text-white font-bold text-[16px]">
                          {t("schemes")}
                        </div>
                        <div className="text-primary font-bold bg-white text-[16px] rounded-md py-1 mt-2 shadow-xl">
                          {data?.schemeCount}
                        </div>
                        {/* <div className="text-white font-bold text-[12px]">
                          {t("services")} : 0
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 pb-3 grid grid-cols-3 gap-2">
                  <Dropdown
                    heading={benefitType && t("benefit_type")}
                    options={benefitTypeOptions}
                    handleChange={handleBenefitTypeChange}
                    setter={setBenefitType}
                    value={benefitType}
                    id="benefit-type-dropdown"
                    showCross
                  />
                  <Dropdown
                    heading={beneficiary && t("beneficiary")}
                    options={beneficiaryData}
                    handleChange={handleBeneficiaryChange}
                    setter={setBeneficiary}
                    value={beneficiary}
                    id="beneficiary-dropdown"
                    showCross
                  />
                  <Dropdown
                    heading={fy && t("fy")}
                    options={fyOptions}
                    handleChange={handleFyChange}
                    setter={setFy}
                    value={fy}
                    id="fy-dropdown"
                    showCross
                  />
                </div>

                {checked ? (
                  transactions &&
                  transactions?.transactions &&
                  transactions?.transactions?.length > 0 ? (
                    transactions?.transactions
                      ?.filter(
                        (e: any) =>
                          beneficiary.length === 0 ||
                          beneficiary.includes(e.familymemberID)
                      )
                      // Sorting transaciton in chronological order
                      .sort((a: any, b: any) => {
                        const dateA = new Date(a.transactionDate);
                        const dateB = new Date(b.transactionDate);
                        return dateB.getTime() - dateA.getTime();
                      })
                      .map((transaction: any, index: number) => (
                        <div
                          className="grid grid-cols-7 mt-4 border-b border-[#B4B0B0] pb-2"
                          key={index}
                        >
                          <div className="group flex items-center text-primary">
                            {handleDepartmentIcons(transaction?.schemeCode)}
                          </div>
                          <div className="group text-[14px] text-appGray col-span-4 flex-col items-center">
                            {locale == "hi"
                              ? transaction?.schemeNameh
                              : transaction?.schemeName}
                            <div className="text-[11px]">{`${new Date(
                              transaction?.transactionDate
                            ).getDate()}-${new Date(
                              transaction?.transactionDate
                            ).getMonth()}-${new Date(
                              transaction?.transactionDate
                            ).getFullYear()}`}</div>
                          </div>
                          <div className="flex items-end justify-end text-appGray ml-2 flex-col col-span-2">
                            <div className="flex items-center">
                              <div className="text-[#23C96F] uppercase text-[11px] font-demi">
                                {formatIndianCurrency(transaction?.amount)}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-appGray text-right uppercase text-[9px] font-demi">
                                {locale == "hi"
                                  ? transaction?.beneficiaryNameh
                                  : transaction?.beneficiaryNamee}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="font-medium py-5 text-primary">
                      {t("no_transactions_available")}
                    </div>
                  )
                ) : data && data?.schemes && data?.schemes?.length > 0 ? (
                  data?.schemes
                    .filter((scheme: any) =>
                      scheme.beneficariesList.some(
                        (b: any) =>
                          beneficiary.length === 0 ||
                          beneficiary.includes(b.beneficiaryID)
                      )
                    )
                    .sort(
                      (a: any, b: any) =>
                        b.totalBeneficiary - a.totalBeneficiary
                    )
                    .map((scheme: any) => (
                      <div
                        className="grid grid-cols-7 mt-4 border-b border-[#B4B0B0] pb-2"
                        key={scheme?.code}
                      >
                        <div className="group flex items-center text-primary">
                          {handleDepartmentIcons(scheme?.schemeCode)}
                        </div>
                        <div className="group text-[14px] text-appGray col-span-4 flex items-center">
                          {locale == "hi"
                            ? scheme?.schemeNameh
                            : scheme?.schemeNamee}
                        </div>
                        <div className="flex items-center justify-end text-[12px] text-appGray ml-2 col-span-2">
                          <div className="flex items-center">
                            {scheme?.totalBeneficiary} {t("member")}
                          </div>
                          {/* <SchemesAvailed /> */}
                        </div>
                        {/* <div className="flex items-center justify-end text-[12px] text-appGray">
                          <RupeeIcon />
                        </div> */}
                      </div>
                    ))
                ) : (
                  <div className="font-medium py-5 text-primary">
                    {t("no_schemes_available")}
                  </div>
                )}
                {}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-tertiary min-h-screen flex flex-col justify-center items-center">
            <Fallback />
          </div>
        )
      ) : (
        <div className="bg-tertiary min-h-screen flex flex-col justify-center items-center">
          <Loading color="#e1703b" />
        </div>
      )}

      <Bottombar />
    </div>
  );
};

export default Benefits;
