import { Navbar, Header, Bottombar } from "components";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import BulbIcon from "assets/icons/bulb";
import { useEffect, useRef, useState } from "react";
import {
  getFeaturedSchemes,
  getSchemesByCategory,
  getUserRecommendedSchemes,
} from "api";
import { useStateContext } from "context";
import { CheveronIcon, NextIcon } from "assets/icons";
import Fallback from "components/fallback";
import Loading from "assets/icons/loading";
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
import { posthog } from "posthog-js";
import { formatDate } from "utils";
import FindSchemes from "assets/icons/findSchemes";
import RightCheveron from "assets/icons/rightCheveron";
import Carousel from "components/carousel";
import { getCookie } from "cookies-next";

let slides = [
  "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
  "https://wallpapercave.com/wp/wp3386769.jpg",
  "https://wallpaperaccess.com/full/809523.jpg",
  "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
];

const Discover: React.FC = () => {
  const { t } = useTranslation("discovery");
  const router = useRouter();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [featuredSchemes, setFeaturedSchemes] = useState<any[]>();
  const [recommendedSchemes, setRecommendedSchemes]: any = useState<any[]>();
  const { locale, setDiscoveryMember } = useStateContext();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isRecommendedAccordion, setIsRecommendedAccordion] = useState(false);
  const [activeRecommendedSlide, setActiveRecommendedSlide] = useState(0);
  const [activeFeaturedSlide, setActiveFeaturedSlide] = useState(0);

  useEffect(() => {
    posthog.capture("discovery_screen", {
      date: formatDate(new Date()),
      discovery_screen: 1,
      member_id: getCookie("username"),
    });
  }, []);

  useEffect(() => {
    const getSchemes = async () => {
      const res = await getSchemesByCategory();
      setSchemes(res);
    };
    getSchemes();
  }, []);

  useEffect(() => {
    const getFeatureSchemes = async () => {
      const res = await getFeaturedSchemes();
      setFeaturedSchemes(res);
    };
    getFeatureSchemes();
  }, []);

  useEffect(() => {
    const getRecommendedSchemes = async () => {
      const res = await getUserRecommendedSchemes();
      setRecommendedSchemes(res);
    };
    getRecommendedSchemes();
  }, []);

  const handlePrevSlide = (length: any) => {
    const newIndex = (activeSlide - 1 + length) % length;
    setActiveSlide(newIndex);
  };

  const handleAccordionToggle = () => {
    setIsAccordionOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleRecommendedAccordion = () => {
    setIsRecommendedAccordion((prevIsOpen) => !prevIsOpen);
  };

  const handleFeatureIndicator = (index) => {
    setActiveFeaturedSlide(index);
  };

  const handleRecommendedIndicator = (index) => {
    setActiveFeaturedSlide(index);
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

  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimationActive(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleDiscoveryClick = () => {
    posthog.capture("discover_discovery", {
      date: formatDate(new Date()),
      discover_discovery: 1,
      member_id: getCookie("username"),
    });
    router.push("/discover/members");
  };

  return (
    <div className="mb-20">
      <Navbar />
      <Header />
      {recommendedSchemes ? (
        recommendedSchemes?.status != 500 &&
        recommendedSchemes?.status != 403 ? (
          <div className="pt-40 sm:pt-48">
            <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh]">
              <div className="text-appGray font-bold text-[18px]">
                {t("discover_schemes")}
              </div>
              <div
                className={`flex justify-center mt-8 ${
                  animationActive ? "animate-bounce" : ""
                } cursor-pointer`}
                onClick={() => handleDiscoveryClick()}
              >
                <div className="bg-primary text-white font-demi flex justify-between w-full px-4 py-3 rounded-xl">
                  <div className="flex self-center">
                    <div className="flex self-center">
                      {" "}
                      <FindSchemes fill="white" />
                    </div>

                    <div className="flex self-center ml-4 text-[18px]">
                      {t("click_to_find_schemes")}
                    </div>
                  </div>

                  <div className="flex justify-end ml-3 self-center">
                    <RightCheveron />
                  </div>
                </div>
              </div>

              {recommendedSchemes && recommendedSchemes?.count > 0 && (
                <>
                  <div className="text-appGray font-bold text-[18px] mt-8">
                    {t("recommended_schemes")}
                  </div>
                  <div className="bg-primary py-4 px-3 mt-3 rounded-xl text-appGray text-center">
                    <div
                      className="flex items-center justify-between"
                      onClick={handleRecommendedAccordion}
                    >
                      <div className="flex">
                        <div className="flex self-center ml-2">
                          <BulbIcon fill={"white"} />
                        </div>
                        <div className="text-white ml-3 flex flex-col items-start">
                          <h1 className="font-bold text-[18px] ">
                            {/* @ts-ignore */}
                            {recommendedSchemes?.count}{" "}
                            {recommendedSchemes?.count > 1
                              ? t("schemes")
                              : t("scheme")}
                          </h1>
                          <div className="text-white font-regular text-[15px] text-left">
                            {t("family_eligible")}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`chevron-icon px-2 ${
                          isRecommendedAccordion ? "open" : ""
                        }`}
                      >
                        <RightCheveron />
                      </div>
                    </div>
                  </div>
                  {isRecommendedAccordion && (
                    <>
                      <Carousel slides={recommendedSchemes?.data} />
                    </>
                  )}
                </>
              )}

              <div className="text-appGray font-bold text-[18px] mt-5">
                {t("schemes_category")}
              </div>
              <div className="carousel carousel-center space-x-4 bg-neutral rounded-box">
                <div
                  className={`shadow-lg border flex justify-center items-center flex-col rounded my-4 py-2 px-3 bg-white min-w-[130px]`}
                  onClick={() => {
                    setDiscoveryMember({
                      nameh: "",
                      namee: "",
                    });
                    router.push("/discovery/schemes/all");
                  }}
                >
                  <div className="text-primary flex justify-center my-2">
                    <FindSchemes fill="#e1703b" width={50} height={51} />
                  </div>
                  <div className="text-primary text-center text-[14px] w-full">
                    <div
                      className="font-demi"
                      style={{
                        overflowWrap: "break-word",
                      }}
                    >
                      {t("explore_more_schemes")}
                    </div>
                  </div>
                </div>
                {schemes.map((scheme) => (
                  <div
                    className={`shadow-lg border flex justify-center items-center flex-col rounded my-4 py-2 px-3 bg-white min-w-[130px]`}
                    onClick={() =>
                      router.push(
                        `/discovery/schemes/all?category=${scheme?.id}`
                      )
                    }
                    key={scheme?.id}
                  >
                    <div className="text-primary flex justify-center my-2">
                      {handleCategoryIcons(scheme?.name)}
                    </div>
                    <div className="text-appGray text-center text-[14px] w-full">
                      <div
                        className="font-demi"
                        style={{
                          overflowWrap: "break-word",
                        }}
                      >
                        {locale == "hi" ? scheme?.nameh : scheme?.name}
                      </div>
                      <div className="font-demi text-primary text-[12px]">
                        {scheme?.count}{" "}
                        {scheme?.count > 1 ? t("schemes") : t("sc")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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

export default Discover;
