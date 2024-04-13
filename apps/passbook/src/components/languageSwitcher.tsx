import { useEffect } from "react";
import { useSyncLanguage } from "ni18n";
import { useStateContext } from "context";

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useStateContext();
  useSyncLanguage(locale);
  return (
    <div>
      <button
        id="hindi"
        className={`${
          locale == "hi" ? "active-language" : ""
        } language-switcher font-medium cursor-pointer`}
        style={{ borderRadius: "5px 0px 0px 5px" }}
        onClick={() => setLocale("hi")}
      >
        हिंदी
      </button>
      <button
        id="eng"
        className={`${
          locale == "en"
            ? "language-switcher active-language"
            : "language-switcher"
        } language-switcher font-medium cursor-pointer`}
        style={{ borderRadius: "0px 5px 5px 0px" }}
        onClick={() => setLocale("en")}
      >
        English
      </button>
    </div>
  );
};
