import { useEffect, useState } from "react";
import { Navbar, Header, Bottombar } from "components";
import { getFamilySummary } from "api";
import Fallback from "components/fallback";
import Loading from "assets/icons/loading";
import { useTranslation } from "react-i18next";
import { CoinIcon } from "assets/icons";
import { useStateContext } from "context";
import Link from "next/link";
import { formatDate, formatIndianCurrency, getFromLocalForage } from "utils";
import { posthog } from "posthog-js";
import { getCookie } from "cookies-next";

const Home: React.FC = () => {
  const { t } = useTranslation("home");
  const { locale } = useStateContext();
  const [summary, setSummary]: any = useState();
  const [lastUpdatedAt, setLastUpdatedAt] = useState<any>("");

  useEffect(() => {
    posthog.capture("home_screen", {
      date: formatDate(new Date()),
      home_screen: 1,
      member_id: getCookie("username"),
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res: any = await getFamilySummary();
      setSummary(res);
      const lastUpdatedAt = await getFromLocalForage(
        "lastUpdatedFamilySummary"
      );
      setLastUpdatedAt(lastUpdatedAt);
    };
    getData();
  }, []);

  const getOfflineText = () => {
    return (
      "Last updated at " +
      lastUpdatedAt.toLocaleString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  };
  return (
    <div className="mb-20">
      <Navbar />
      <Header />
      {summary ? (
        summary?.status != 500 && summary?.status != 403 ? (
          <div className="pt-40 sm:pt-48" key={summary?.familyID}>
            <Link href="/family">
              <div className="bg-summary-card py-7 px-5 mx-5 rounded-lg text-white">
                <div className="flex justify-between">
                  <div
                    className={`text-[11px] uppercase ${
                      locale === "hi" ? "hi" : "font-demi"
                    }`}
                  >
                    {t("family_id")}
                  </div>
                </div>

                <h1 className="font-demi text-[24px] mt-6">
                  {summary?.familyID?.match(/.{1,4}/g)?.map((char: any) => (
                    <>{char}&nbsp;&nbsp;</>
                  ))}
                </h1>

                <h1
                  className={`${
                    locale === "hi" ? "hi" : "font-demi"
                  } text-[20px] mt-6`}
                >
                  {locale == "hi" ? summary?.nameh : summary?.namee}
                </h1>
                <div
                  className={`${
                    locale === "hi" ? "hi" : "font-demi"
                  } text-[11px]`}
                >
                  {locale == "hi"
                    ? summary?.districtNameh
                    : summary?.districtNamee}
                  {summary?.blockName && `,${summary?.blockName}`}
                </div>
                <div className="flex justify-between mt-1">
                  <div
                    className={`${
                      locale === "hi" ? "hi" : "font-medium"
                    } text-[11px]`}
                  >
                    #{summary?.numberOfMembers} {t("members")}
                  </div>
                  <div
                    className={`${
                      locale === "hi" ? "hi" : "font-regular"
                    } text-[14px] flex items-center`}
                  >
                    {t("fy")}
                    <div className="text-primary font-bold bg-white text-[16px] rounded-md py-1 px-2 shadow-lg ml-2">
                      {summary?.fy}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/benefits?transactions=true">
              <div className="bg-tertiary py-4 px-3 mt-10 mx-5 rounded-lg text-appGray text-center">
                <div className="flex justify-center">
                  {/* <CoinIcon /> */}
                  <h1 className="font-bold text-[24px] ml-3">
                    {summary?.amountAvailed
                      ? `${t("Rs")} ${formatIndianCurrency(
                          summary?.amountAvailed
                        )}`
                      : `${t("Rs")} 0`}
                  </h1>
                </div>
                <div
                  className={`${
                    locale === "hi" ? "hi" : "font-regular"
                  } text-[11px]`}
                >
                  {t("benefits_availed")}
                </div>
              </div>
            </Link>
            <Link href="/benefits">
              <div className="py-2 px-3 mt-4 mx-5 rounded-lg text-center bg-tertiary font-regular uppercase text-appGray flex justify-center items-center">
                <span className="font-bold text-[24px]">
                  {summary?.schemesAvailed}
                </span>
                <span
                  className={`ml-2 ${
                    locale === "hi" ? "hi text-[14px]" : "font-demi text-[12px]"
                  } mt-[3px]`}
                >
                  {t("schemes_availed")}
                </span>
              </div>
            </Link>
            <div className="flex items-center pt-5 px-5">
              <div className="border border-gray-300 my-4 flex-1 mr-2"></div>
              <div className="text-appGray">{t("or")}</div>
              <div className="border border-gray-300 my-4 flex-1 ml-2"></div>
            </div>
            <Link href="/discover">
              <div className="flex justify-center bg-tertiary mx-5 rounded-lg">
                <div className="font-demi text-appGray text-center p-5">
                  {t("discoverSchemes")}
                </div>
              </div>
            </Link>

            {!navigator.onLine && lastUpdatedAt && (
              <div className="m-5 font-medium text-center text-primary">
                {getOfflineText()}
              </div>
            )}
          </div>
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

export default Home;
