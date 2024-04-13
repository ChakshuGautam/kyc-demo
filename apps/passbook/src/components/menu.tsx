import { useEffect, useState } from "react";
import { NavbarIcon, NotificationIcon, CloseIcon } from "assets/icons";
import { Button } from "ui";
import Link from "next/link";
import { useFlags } from "flagsmith/react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./languageSwitcher";
import { getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { logout } from "api";

const HamburgerMenu = ({ discovery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState("");
  const [login, setLogin] = useState(false);
  const flags = useFlags(["notifications"]);
  const { t } = useTranslation("sidebar");
  const router = useRouter();

  const drawerOpener = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      if (newIsOpen) {
        setHide("z-[20]");
      } else if (hide !== "") {
        setTimeout(() => {
          setHide("");
        }, 600);
      }
      return newIsOpen;
    });
  };

  useEffect(() => {
    if (getCookie("token")) {
      setLogin(true);
    }
  }, []);

  const fullPage = isOpen ? "z-[20]" : hide;

  const handleClick = (event: any) => {};

  const handleLogOut = async () => {
    const res = await logout();
    removeCookies("token");
    removeCookies("username");
    removeCookies("code_verifier");
    removeCookies("refreshToken");
    if (window) {
      window.location.href = process.env.NEXT_PUBLIC_URL || "/";
    }
  };
  return (
    <>
      <div className="fixed top-0 medium-width bg-white w-full border-t border-gray-200 h-[49px] z-[2]">
        <div
          className={
            !login
              ? `flex h-full max-w-lg justify-around mx-auto font-medium p-4`
              : `flex h-full max-w-lg justify-between mx-auto font-medium p-4`
          }
        >
          {login && (
            <label
              htmlFor="my-drawer"
              className="drawer-button w-5 cursor-pointer"
              onClick={drawerOpener}
            >
              <NavbarIcon />
            </label>
          )}

          <div className="inline-flex flex-col items-end justify-center group">
            <LanguageSwitcher />
          </div>
          {login && (
            <div className="inline-flex flex-col items-end justify-center group">
              <Link href="/notifications">
                <NotificationIcon />
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={`${fullPage} drawer fixed min-h-screen w-full z-[-1]`}>
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay cursor-pointer"
            onClick={drawerOpener}
          ></label>
          <ul className="overflow-y-auto w-72 bg-base-100 flex-col">
            {/* Sidebar close button */}
            <li className="pl-3 pt-3">
              <div
                className="w-fit"
                onClick={drawerOpener}
                style={{ cursor: "pointer" }}
              >
                <CloseIcon />
              </div>
            </li>
            <ul className="p-6 pt-6 overflow-y-auto w-72 bg-base-100">
              <li>
                <Link href="/about">
                  <Button
                    className="font-demi w-full"
                    onClick={handleClick}
                    text={t("about_us")}
                  />
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <Button
                    className="font-demi w-full mt-5"
                    onClick={handleClick}
                    text={t("help_faqs")}
                  />
                </Link>
              </li>
              <li>
                <Link href="/feedback">
                  <Button
                    className="font-demi w-full mt-5"
                    onClick={handleClick}
                    text={t("feedback")}
                  />
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <Button
                    className="font-demi w-full mt-5"
                    onClick={handleClick}
                    text={t("terms_conditions")}
                  />
                </Link>
              </li>
              <li>
                <Button
                  className="font-demi w-full mt-5"
                  onClick={handleLogOut}
                  text={t("log_out")}
                />
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
