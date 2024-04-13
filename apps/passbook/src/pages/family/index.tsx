import { useEffect } from "react";
import { Navbar, Header, Bottombar } from "components";
import { FemaleAvatar, InfoIcon, MaleAvatar } from "assets/icons";
import Link from "next/link";
import { getFamilyData } from "api";
import { useStateContext } from "context";
import Loading from "assets/icons/loading";
import Fallback from "components/fallback";
import { useTranslation } from "react-i18next";
import { posthog } from "posthog-js";
import { formatDate } from "utils";
import { getCookie } from "cookies-next";

const Family: React.FC = () => {
  const { t } = useTranslation("family");
  const { familyData, setFamilyData, locale } = useStateContext();

  useEffect(() => {
    posthog.capture("myfamily_screen", {
      date: formatDate(new Date()),
      myfamily_screen: 1,
      member_id: getCookie("username"),
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res: any = await getFamilyData();
      setFamilyData(res);
    };
    getData();
  }, []);
  return (
    <div className="mb-20">
      <Navbar />
      <Header />
      {familyData ? (
        familyData?.status !== 500 && familyData?.status !== 403 ? (
          <div className="pt-40 sm:pt-48">
            <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh]">
              <div className="bg-primary rounded-md text-white px-5 py-5 flex justify-between font-medium text-[22px]">
                {locale === "hi"
                  ? "परिवार मे कुल सदस्य"
                  : "Total family members"}
                <div className="bg-white text-primary px-4 rounded-md shadow-xl font-bold self-center">
                  {familyData?.count}
                </div>
              </div>
              {/* <div className="text-appGray font-bold text-center text-[20px] uppercase">
                {t("my_family")}
              </div> */}
              {familyData &&
                familyData?.familyMembers &&
                familyData?.familyMembers.map((familyMember: any) => (
                  <div
                    className="bg-white px-3 py-3 rounded-md mt-5"
                    key={familyMember?.familyMemberId}
                  >
                    <div className="flex">
                      <div className="mr-4 flex items-center w-[50px]">
                        {familyMember?.bs64Photo ? (
                          <img
                            src={`data:image/png;base64, ${familyMember?.bs64Photo}`}
                            alt="avatar"
                            className="rounded-full"
                          />
                        ) : familyMember?.gender == "M" ? (
                          <MaleAvatar size="" />
                        ) : (
                          <FemaleAvatar size="" />
                        )}
                      </div>
                      <div className="flex justify-between w-full uppercase self-center">
                        <div className="text-[12px] text-[#626161] font-demi">
                          {locale == "hi"
                            ? familyMember?.nameh
                            : familyMember?.namee}
                          <div className="font-regular text-[10px]">
                            {locale == "hi"
                              ? familyMember?.relationh
                              : familyMember?.relation}
                          </div>
                        </div>
                        <div className="ml-4 flex items-center">
                          <Link
                            href={`/family/${familyMember?.familyMemberId}`}
                          >
                            <InfoIcon />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
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

export default Family;
