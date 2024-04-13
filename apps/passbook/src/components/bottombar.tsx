import { HomeIcon, FamilyIcon, BenefitsIcon, DiscoverIcon } from "assets/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export const Bottombar = () => {
  const { t } = useTranslation("bottomBar");
  const pathname = usePathname();
  return (
    <>
      {pathname && (
        <div className="fixed bottom-0 medium-width w-full h-16 bg-white border-t border-gray-200 ">
          <div className="flex justify-between mx-auto font-medium">
            <Link href="/home">
              <div className="flex justify-center">
                <button
                  type="button"
                  className={
                    pathname.includes("/home")
                      ? "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 mt-2 group text-primary"
                      : "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 mt-2 group text-appGray "
                  }
                >
                  <HomeIcon />
                  <span
                    className={
                      pathname.includes("/home")
                        ? "text-[12px] text-primary"
                        : "text-[12px] text-appGray"
                    }
                  >
                    {t("home")}
                  </span>
                </button>
              </div>
            </Link>
            <Link href="/family">
              <div className="flex justify-center">
                <button
                  type="button"
                  className={
                    pathname.includes("/family")
                      ? "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 mt-2 group text-primary"
                      : "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 mt-2 group text-appGray "
                  }
                >
                  <FamilyIcon />
                  <span
                    className={
                      pathname.includes("/family")
                        ? "text-[12px] text-primary"
                        : "text-[12px] text-appGray"
                    }
                  >
                    {t("family")}
                  </span>
                </button>
              </div>
            </Link>
            <Link href="/benefits">
              <div className="flex justify-center">
                <button
                  type="button"
                  className={
                    pathname.includes("/benefits")
                      ? "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 mt-2 group text-primary"
                      : "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 mt-2 group text-appGray "
                  }
                >
                  <BenefitsIcon />
                  <span
                    className={
                      pathname.includes("/benefits")
                        ? "text-[12px] text-primary"
                        : "text-[12px] text-appGray"
                    }
                  >
                    {t("benefits")}
                  </span>
                </button>
              </div>
            </Link>
            <Link href="/discover">
              <div className="flex justify-center">
                <button
                  type="button"
                  className={
                    pathname.includes("/discover")
                      ? "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 mt-2 group text-primary"
                      : "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 mt-2 group text-appGray "
                  }
                >
                  <DiscoverIcon />
                  <span
                    className={
                      pathname.includes("/discover")
                        ? "text-[12px] text-primary"
                        : "text-[12px] text-appGray"
                    }
                  >
                    {t("discover")}
                  </span>
                </button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
