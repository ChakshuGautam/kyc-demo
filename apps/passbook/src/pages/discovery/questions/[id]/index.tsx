import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import FormStep from "components/discovery/formStep";
import { getSchemeById } from "api";
import { Bottombar, Header, Modal, Navbar } from "components";
import { Button } from "ui";
import { useStateContext } from "context";
import Loading from "assets/icons/loading";
import { getCookie } from "cookies-next";
import { BackIcon } from "assets/icons";
import { toast } from "react-toastify";
import EditIcon from "assets/icons/editIcon";
import BackButtonIcon from "assets/icons/backButton";

const SchemeQuestions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [schemeDetails, setSchemeDetails] = useState<any>();
  const [isAnswersCorrect, setIsAnswersCorrect] = useState(false);
  const [login, setLogin] = useState(false);

  const { locale, modaleOpen, setModaleOpen } = useStateContext();
  const router = useRouter();
  const { t } = useTranslation("discovery");

  useEffect(() => {
    const getSchemeDetails = async () => {
      const response = await getSchemeById(router?.query?.id);
      if (response?.status === 500) {
        toast.error(t("error_message"));
        return;
      }
      setSchemeDetails(response);
    };

    if (router.asPath !== router.route) {
      getSchemeDetails();
    }
  }, [router]);

  useEffect(() => {
    if (getCookie("token")) {
      setLogin(true);
    }
  }, []);

  const handleInputChange = (fieldName: string, value: string) => {
    setUserAnswers((prevAnswers) => ({ ...prevAnswers, [fieldName]: value }));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleNextQuestion = () => {
    const currentQuestion = schemeDetails?.question[currentQuestionIndex];
    const userAnswer =
      userAnswers[`question_${currentQuestion?.questionNumber}`];

    if (!userAnswer) {
      toast.warn(t("please_answer_the_question"));
      return;
    }

    if (!currentQuestion?.answer?.some((ans) => ans === userAnswer)) {
      setIsAnswersCorrect(false);
      setModaleOpen(true);
      return;
    } else {
      setIsAnswersCorrect(true);
    }

    if (currentQuestionIndex < schemeDetails?.question?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const allAnswersCorrect = checkAnswers();
      if (allAnswersCorrect) {
        if (router.query?.eligibility == "true") {
          router.push("/discovery/eligible?eligibility=true");
        } else {
          router.push("/discovery/eligible");
        }
      } else {
        setModaleOpen(true);
      }
    }
  };

  const handleNotEligible = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setModaleOpen(false);
  };

  const checkAnswers = () => {
    let allAnswersCorrect = true;

    schemeDetails?.question?.forEach((question) => {
      const userAnswer = userAnswers[question?.questionNumber];
      const correctAnswer = question?.answer;

      if (correctAnswer?.some((ans) => ans === userAnswer)) {
        allAnswersCorrect = false;
      }
    });

    return allAnswersCorrect;
  };

  const currentQuestion =
    schemeDetails &&
    schemeDetails?.question &&
    schemeDetails?.question[currentQuestionIndex];
  const schema = currentQuestion
    ? {
        title: "Scheme Questions",
        fields: [
          {
            name: `question_${currentQuestion?.questionNumber}`,
            label: currentQuestion?.question,
            labelh: currentQuestion?.questionh,
            type: currentQuestion?.type,
            required: true,
            dropdownLabel: currentQuestion?.question,
            dropdownLabelh: currentQuestion?.questionh,
            options: currentQuestion?.options?.map((option) => ({
              value: option?.label,
              label: option?.label,
              labelh: option?.labelh,
            })),
            answer:
              userAnswers[`question_${currentQuestion?.questionNumber}`] || "",
          },
        ],
      }
    : null;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <div className={login ? "mb-20" : "mb-10"} key={currentQuestionIndex}>
        <Navbar discovery={true} />
        <Header />
        {schemeDetails ? (
          <div className="pt-40 sm:pt-48">
            <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh]">
              <div className="flex">
                <div
                  className="cursor-pointer mt-[0.3rem]"
                  onClick={handleGoBack}
                >
                  <BackIcon fill={"#626161"} />
                </div>
                <h1
                  className={`${
                    locale == "hi" ? "font-extrabold hi" : "font-demi"
                  } text-[20px] pb-3 px-3 text-appGray text-center`}
                >
                  {locale == "hi"
                    ? schemeDetails?.schemeNameh
                    : schemeDetails?.schemeName}
                </h1>
              </div>

              <div className="bg-white border-[#DC6127] border-2 border-solid rounded-xl px-5 py-8 mt-4 min-h-[50vh]">
                <FormStep
                  step=""
                  schema={schema}
                  formData={schemeDetails}
                  onInputChange={handleInputChange}
                />
                <div className="flex justify-around mt-10 mb-2">
                  {currentQuestionIndex > 0 && (
                    <Button
                      onClick={handlePreviousQuestion}
                      text={t("previous_button")}
                      className="px-5 font-medium w-[45%]"
                    />
                  )}
                  <Button
                    text={t("next_button")}
                    onClick={handleNextQuestion}
                    className="px-5 font-medium w-[45%]"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-tertiary min-h-screen flex flex-col justify-center items-center">
            <Loading color="#e1703b" />
          </div>
        )}
        {login && <Bottombar />}
      </div>
      <Modal open={modaleOpen} onClose={() => setModaleOpen(false)}>
        <div className="xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary flex justify-center items-center flex-col">
          {!isAnswersCorrect && (
            <>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/images/notEligible.png`}
                className="px-10"
              />
              <h1 className="text-[20px] text-center mt-4 mb-2 font-demi text-appGray border-[#DC6127] border-b pb-2">
                {t("not_eligible_title")}
              </h1>
              <div className="font-regular text-center text-appGray text-[14px] mb-6">
                {t("not_eligible_message")}
              </div>

              <div className="flex justify-center">
                <Button
                  text={t("edit_response_button")}
                  className="font-demi mt-2 w-full"
                  onClick={handleNotEligible}
                  icon={<EditIcon />}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  text={t("explore_other_schemes_button")}
                  className="font-demi mt-2 w-full"
                  onClick={() => router.push("/discovery/schemes")}
                  icon={<BackButtonIcon />}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SchemeQuestions;
