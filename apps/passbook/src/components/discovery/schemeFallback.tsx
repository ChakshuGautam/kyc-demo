import { useTranslation } from "react-i18next";

const SchemeFallback = () => {
  const { t } = useTranslation("discovery");

  return (
    <div className="flex justify-center items-center flex-col">
      <img
        src={`${process.env.NEXT_PUBLIC_URL}/images/schemes/schemesFallback.svg`}
        alt="No Schemes Found"
      />
      <div className="text-appGray font-medium text-center mt-4">
        {t("no_schemes_found")}
      </div>
    </div>
  );
};

export default SchemeFallback;
