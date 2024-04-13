import { Navbar, Header, Bottombar } from "components";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getFamilyData } from "api";
import { useEffect } from "react";
import { useStateContext } from "context";
import { BackIcon, FemaleAvatar, MaleAvatar } from "assets/icons";
import Fallback from "components/fallback";
import Loading from "assets/icons/loading";

const Members = () => {
  const router = useRouter();
  const { t } = useTranslation("discovery");
  const { setForm, setFormData } = useStateContext();

  const handleClick = async (id: any) => {
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

    if (router?.query?.eligibility == "true") {
      router.push(
        `/discovery?memberId=${id}&schemeId=${router?.query?.schemeId}&eligibility=true`
      );
    } else {
      router.push(`/discovery?memberId=${id}`);
    }
  };
  const { familyData, setFamilyData, locale } = useStateContext();

  const handleGoBack = () => {
    if (router?.query?.eligibility == "true") {
      router.push(
        `/discovery/schemes/${router?.query?.schemeId}?eligibility=true`
      );
    } else {
      router.back();
    }
  };

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
        familyData?.status != 500 && familyData?.status != 403 ? (
          <div className="pt-40 sm:pt-48">
            <div className="bg-tertiary rounded-xl px-5 py-5 mx-3 min-h-[70vh]">
              <div className="flex border-b pb-3 border-[#B7B7B7]">
                <div className="cursor-pointer mt-1" onClick={handleGoBack}>
                  <BackIcon fill={"#626161"} />
                </div>
                <div className="text-appGray self-center mx-auto font-bold text-[20px] text-center px-3">
                  {t("find_eligible_schemes")}
                </div>
              </div>
              <div className="text-appGray font-demi text-center my-4 border-[#B7B7B7]">
                {t("please_select_family_member")}
              </div>
              <div
                className="grip grid-cols-3 gap-4"
                style={{ display: "grid" }}
              >
                {familyData?.familyMembers?.map((member: any) => (
                  <div
                    key={member?.familyMemberId}
                    className="cursor-pointer bg-white rounded-2xl py-4 px-2 shadow mt-2 inline-block"
                    onClick={() => handleClick(member?.familyMemberId)}
                  >
                    <div className="flex justify-center">
                      {member?.gender == "F" ? (
                        <FemaleAvatar size="" />
                      ) : (
                        <MaleAvatar size="" />
                      )}
                    </div>

                    <div className="text-[12px] text-[#626161] font-demi text-center mt-2">
                      {locale == "hi" ? member?.nameh : member?.namee}
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

export default Members;
