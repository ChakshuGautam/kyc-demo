import { useEffect, useState } from "react";
import FormStep from "components/discovery/formStep";
import { discovery } from "config/discovery";
import { useStateContext } from "context";
import { Bottombar, Header, Modal, Navbar } from "components";
import { Button } from "ui";
import { useRouter } from "next/router";
import {
  checkSchemeEligibility,
  getFamilyDetails,
  getRecommendedSchemes,
} from "api";
import { toast } from "react-toastify";
import ResetIcon from "assets/icons/reset";
import { useTranslation } from "react-i18next";
import { getCookie } from "cookies-next";
import { BackIcon } from "assets/icons";
import Link from "next/link";
import EditIcon from "assets/icons/editIcon";

const Discovery = () => {
  const { t } = useTranslation("discovery");
  const {
    form,
    setForm,
    formData,
    setFormData,
    locale,
    modaleOpen,
    setModaleOpen,
    setRecommendedSchemes,
    setDiscoveryMember,
  } = useStateContext();
  const [step, setStep] = useState(0);
  const [login, setLogin] = useState(false);
  const [details, setDetails] = useState();
  const steps = Object?.keys(discovery?.steps);
  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;
  // const [viewEditButton, setViewEditButton] = useState(true);

  const router = useRouter();
  // @ts-ignore
  const progress = ((Number(currentStep) + 1) / steps?.length) * 100;

  const handleNextStep = () => {
    const currentStepFields = form.steps[step]?.fields;
    const allRequiredFieldsFilled = currentStepFields?.every((field) => {
      if (field?.required) {
        const formField = formData.find((data) => data?.marker === field?.name);
        return formField?.value !== "" && formField?.value !== undefined;
      }
      return true;
    });

    if (allRequiredFieldsFilled) {
      setStep((prevStep) => prevStep + 1);
    } else {
      toast.warn(t("fill_required_fields"));
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = async () => {
    const currentStepFields = form.steps[step]?.fields;
    const allRequiredFieldsFilled = currentStepFields?.every((field) => {
      if (field?.required) {
        const formField = formData.find((data) => data?.marker === field?.name);
        return formField?.value !== "" && formField?.value !== undefined;
      }
      return true;
    });

    if (!allRequiredFieldsFilled) {
      toast.warn(t("fill_required_fields"));
      return;
    }

    setDiscoveryMember({
      //@ts-ignore
      namee: details ? details.response?.[0]?.valuee : "",
      //@ts-ignore
      nameh: details ? details.response?.[0]?.valueh : "",
    });

    if (router?.query?.eligibility == "true") {
      const checkEligibility = async () => {
        const res: any = await checkSchemeEligibility(
          router?.query?.schemeId,
          formData
        );
        if (res?.isEligible == true) {
          router.push(
            `/discovery/questions/${router?.query?.schemeId}?eligibility=true`
          );
        } else {
          setModaleOpen(true);
        }
      };
      checkEligibility();
    } else {
      const response = await getRecommendedSchemes(formData);
      setRecommendedSchemes(response?.data);
      if (response?.status == 201) {
        toast.success(t("schemes_found_success"));
        router.push("/discovery/schemes");
      } else {
        toast.error(t("no_schemes_found"));
      }
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setForm((prevForm: any) => {
      const updatedStep = { ...prevForm.steps[step] };
      updatedStep?.fields?.forEach((field: any) => {
        if (field?.name === fieldName) {
          field.answer = value;
          field.disabled = false;
        }
      });
      const updatedForm = { ...prevForm };
      updatedForm.steps[step] = updatedStep;
      return updatedForm;
    });

    if (fieldName === "name" || fieldName === undefined) return;
    setFormData((prevData) => {
      const existingFieldIndex = prevData?.findIndex(
        (item: any) => item?.marker === fieldName
      );
      if (existingFieldIndex !== -1 && existingFieldIndex !== undefined) {
        const updatedData = [...prevData];
        updatedData[existingFieldIndex] = {
          marker: fieldName,
          value,
        };
        return updatedData;
      } else {
        return [
          ...prevData,
          {
            marker: fieldName,
            value,
          },
        ];
      }
    });
  };

  // const handleEditButton = () => {
  //   setViewEditButton(false);
  //   setForm((prevForm: any) => {
  //     const updatedForm = { ...prevForm };
  //     const currentStepFields = updatedForm.steps[step]?.fields;

  //     currentStepFields.forEach((field: any) => {
  //       field.disabled = false;
  //     });

  //     return updatedForm;
  //   });
  // };

  const clearData = () => {
    setForm((prevForm: any) => {
      const updatedForm = { ...prevForm };
      Object.keys(updatedForm.steps).forEach((stepKey: string) => {
        const updatedStep = { ...updatedForm.steps[stepKey] };
        updatedStep.fields.forEach((field: any) => {
          field.answer = "";
          field.disabled = false;
        });
        updatedForm.steps[stepKey] = updatedStep;
      });
      return updatedForm;
    });
    setFormData([]);
  };

  const handleResetForm = () => {
    clearData();
    if (router?.query?.memberId && router?.query?.schemeId) {
      router.push(
        `/discovery?memberId=${router.query?.memberId}&schemeId=${router.query?.schemeId}&eligibility=true`
      );
    } else if (router?.query?.memberId) {
      router.push(`/discovery?memberId=${router.query?.memberId}`);
    } else {
      router.push("/discovery");
    }
  };

  const handleGoBack = () => {
    if (router?.query?.eligibility === "true") {
      router.push(
        `/discover/members?schemeId=${router?.query?.schemeId}&eligibility=true`
      );
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (router?.query?.memberId) {
      const getDetails = async () => {
        const res: any = await getFamilyDetails(router?.query?.memberId);
        setDetails(res);
      };
      getDetails();
    }
  }, []);

  useEffect(() => {
    if (getCookie("token")) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (router?.query?.memberId && details?.response) {
      const memberId = router?.query?.memberId;
      // @ts-ignore
      const responseData = details?.response;

      const updatedFormData = [...formData];
      responseData.forEach((fieldData: any) => {
        const existingFieldIndex = updatedFormData.findIndex(
          (item) => item?.marker === fieldData.markerLabel
        );
        if (existingFieldIndex !== -1) {
          if (fieldData?.markerLabel === "name") {
            updatedFormData[existingFieldIndex] = {
              marker: fieldData?.markerLabel,
              value: locale === "hi" ? fieldData?.valueh : fieldData?.valuee,
            };
          } else {
            updatedFormData[existingFieldIndex] = {
              marker: fieldData?.markerLabel,
              value: fieldData?.value,
            };
          }
        } else {
          // Handle the case when existingFieldIndex is -1 separately
          const fieldValue =
            fieldData?.markerLabel === "name"
              ? locale === "hi"
                ? fieldData?.valueh
                : fieldData?.valuee
              : fieldData?.value;

          updatedFormData.push({
            marker: fieldData?.markerLabel,
            value: fieldValue,
          });
        }
      });
      setFormData(updatedFormData);

      const updatedForm = { ...form };
      updatedForm?.steps?.forEach((step: any) => {
        step?.fields?.forEach((field) => {
          const responseField = responseData?.find(
            (data) => data.markerLabel === field.name
          );
          if (responseField?.markerLabel === "name" && responseField) {
            field.answer =
              locale === "hi" ? responseField?.valueh : responseField?.valuee;
            field.disabled = true;
          } else if (responseField) {
            field.answer = responseField?.value;
            field.disabled = true;
          }
        });
      });
      setForm(updatedForm);
    }
  }, [router?.query?.memberId, details, locale]);

  return (
    <div className={login ? "mb-20" : "mb-10"}>
      <Navbar discovery={true} />
      <Header />
      <div className="pt-40 sm:pt-48">
        <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh]">
          <div className="flex">
            <div className="cursor-pointer mt-[0.3rem]" onClick={handleGoBack}>
              <BackIcon fill={"#626161"} />
            </div>
            <h1
              className={`${
                locale == "hi" ? "font-extrabold hi" : "font-demi"
              } text-[20px] text-center pb-3 px-3 text-appGray mx-auto`}
            >
              {t("page_title")}
            </h1>
          </div>
          <div className="text-appGray mt-4 text-[14px] font-medium flex justify-between">
            <div>
              {details &&
                (locale === "hi" // @ts-ignore
                  ? details?.response?.[0]?.valueh // @ts-ignore
                  : details?.response?.[0]?.valuee)}
            </div>
            {/* @ts-ignore */}
            {details?.response && (
              <Link href="/discover/members">
                <div className="text-primary font-medium underline">
                  {t("change_user")}
                </div>
              </Link>
            )}
          </div>
          <div className="bg-white border-[#DC6127] border-2 border-solid rounded-xl px-3 pb-1 mt-4 min-h-[50vh]">
            <div className="pt-1 mx-3">
              <div className="flex mb-2 mt-2 items-center justify-between">
                <div>
                  <span className="text-xs font-demi inline-block py-1 px-2 rounded-full text-gray-600 bg-gray-200">
                    {t("step_text")} {Number(currentStep) + 1} {t("of")}{" "}
                    {steps?.length}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-tertiary">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                ></div>
              </div>
            </div>
            <div className="mt-6 mx-3">
              <FormStep
                step={currentStep}
                schema={form?.steps[step]}
                formData={formData}
                onInputChange={handleInputChange}
              />

              <div className="flex justify-around mt-10 mb-2">
                {/* {step == 0 && login && viewEditButton && (
                  <Button
                    onClick={handleEditButton}
                    text={t("edit")}
                    className="px-7 font-medium"
                  />
                )} */}
                {step > 0 && (
                  <Button
                    onClick={handlePreviousStep}
                    text={t("previous_button")}
                    className="px-5 font-medium w-[45%]"
                  />
                )}
                {!isLastStep ? (
                  <Button
                    onClick={handleNextStep}
                    text={t("next_button")}
                    className="px-5 font-medium w-[45%]"
                  />
                ) : (
                  <Button
                    onClick={handleFormSubmit}
                    text={t("submit_button")}
                    className="px-5 font-medium w-[45%]"
                  />
                )}
              </div>
              <div
                className="flex justify-center text-primary font-medium mb-10 mt-8"
                onClick={handleResetForm}
              >
                <ResetIcon />
                <div className="mt-[-3px] text-[14px]">
                  {t("reset_form_button")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {login && <Bottombar />}
      <Modal open={modaleOpen} onClose={() => setModaleOpen(false)}>
        <div className="xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary flex justify-center items-center flex-col">
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
                onClick={() => setModaleOpen(false)}
                icon={<EditIcon />}
              />
            </div>
          </>
        </div>
      </Modal>
    </div>
  );
};

export default Discovery;
