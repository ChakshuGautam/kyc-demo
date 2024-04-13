import { LanguageSwitcher } from "components/languageSwitcher";
import { useStateContext } from "context";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Button } from "ui";
import { getCodeChallenge } from "utils";

const Home: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locale, setForm, setFormData, setLoginData, setModaleOpen } =
    useStateContext();
  const handleClick = () => {
    router.push(
      `${
        process.env.NEXT_PUBLIC_DIGILOCKER_URL
      }/public/oauth2/1/authorize?response_type=code&client_id=${
        process.env.NEXT_PUBLIC_DIGILOCKER_CLIENT_ID
      }&redirect_uri=${
        process.env.NEXT_PUBLIC_URL
      }/family/addDocuments&code_challenge_method=S256&code_challenge=${getCodeChallenge()}&state=${
        router?.query?.slug
      }`
    );
  };
  return (
    <div
        id="login"
        className={`xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary min-h-[100vh] ${locale}`}
      >
        <div className="flex justify-center text-[2rem] text-appGray mb-6 font-demi">
          {t("welcome")}
        </div>
        <div className="flex justify-center" justify-center>
          {" "}
          <LanguageSwitcher />
        </div>
        <div className="flex justify-center mt-8">
          <Button
            className="font-medium mx-auto"
            onClick={handleClick}
            text='click Me'
            id="find-schemes-button"
          />
        </div>
      </div>
  );
};

export default Home;
