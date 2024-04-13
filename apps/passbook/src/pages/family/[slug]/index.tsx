import { useRouter } from "next/router";
import { Navbar, Header, Bottombar, Modal } from "components";
import {
  AddIcon,
  BackIcon,
  BirthCertiIcon,
  CasteCertiIcon,
  ComingSoon,
  DomicileCertiIcon,
  IncomeCertiIcon,
  ProfileFemaleIcon,
  ProfileMaleIcon,
} from "assets/icons";
import Link from "next/link";
import { useStateContext } from "context";
import { useTranslation } from "react-i18next";
import { ActionSheet } from "components/actionSheet";
import { useEffect, useState } from "react";
import { getDigilockerIssuedFiles } from "api";
import { formatDate } from "utils";

const FamilyMemberDetails: React.FC = () => {
  const { t } = useTranslation("familyDetails");
  const router = useRouter();
  const [showBox, setShowBox] = useState(false);

  const toggleBox = () => {
    setShowBox(!showBox);
  };

  const { familyData, locale, modaleOpen, setModaleOpen } = useStateContext();
  const { slug } = router.query;

  useEffect(() => {
    const getIssuedFiles = async () => {
      const res = await getDigilockerIssuedFiles(slug);
    };
    getIssuedFiles();
  }, []);

  return (
    <>
      <div className="mb-20">
        <Navbar />
        <Header />
        {familyData &&
          familyData?.familyMembers &&
          familyData?.familyMembers.map(
            (familyMember: any) =>
              familyMember?.familyMemberId == slug && (
                <div className="pt-40 sm:pt-48">
                  <div className="bg-tertiary rounded-xl px-4 py-6 lg:py-10 mx-3 min-h-[70vh]">
                    <div className="bg-white border-[#e1703b] border-2 border-solid rounded-xl px-3 pb-1 mt-4">
                      <div className="mt-3">
                        <Link href="/family">
                          <BackIcon fill={"#e1703b"} />
                        </Link>
                      </div>
                      <div
                        className="flex justify-center my-3 mt-2 cursor-pointer"
                        // onClick={toggleBox}
                      >
                        {familyMember?.bs64Photo ? (
                          <img
                            src={`data:image/png;base64, ${familyMember?.bs64Photo}`}
                            alt="avatar"
                            width="24%"
                            className="rounded-full"
                          />
                        ) : familyMember?.gender == "M" ? (
                          <ProfileMaleIcon />
                        ) : (
                          <ProfileFemaleIcon />
                        )}
                      </div>
                      <div className="font-bold text-center text-[20px] uppercase text-appGray">
                        {locale == "hi"
                          ? familyMember?.nameh
                          : familyMember?.namee}
                      </div>
                      <table className="table-auto mt-5 pt-8 font-regular mx-auto">
                        <tbody>
                          <tr>
                            <td className="pt-2 text-appGray">
                              {t("relation")}
                            </td>
                            <td className="text-primary font-demi pt-2">
                              <span className="text-appGray font-regular">
                                : &nbsp;&nbsp;
                              </span>
                              {locale == "hi"
                                ? familyMember?.relationh
                                : familyMember?.relation}
                            </td>
                          </tr>
                          <tr>
                            <td className="pt-2 text-appGray">{t("gender")}</td>
                            <td className="text-primary font-demi pt-2 capitalize">
                              <span className="text-appGray font-regular">
                                : &nbsp;&nbsp;
                              </span>
                              {familyMember?.gender === "F"
                                ? t("female")
                                : t("male")}
                            </td>
                          </tr>
                          <tr>
                            <td className="pt-2 text-appGray">{t("age")}</td>
                            <td className="text-primary font-demi pt-2">
                              <span className="text-appGray font-regular">
                                : &nbsp;&nbsp;
                              </span>
                              {familyMember?.age}
                            </td>
                          </tr>
                          <tr>
                            <td className="pt-2 text-appGray">
                              {t("dob")}&nbsp;&nbsp;&nbsp;
                            </td>
                            <td className="text-primary font-demi pt-2">
                              <span className="text-appGray font-regular">
                                : &nbsp;&nbsp;
                              </span>
                              {familyMember?.dob}
                            </td>
                          </tr>
                          {familyMember?.occupation && (
                            <tr>
                              <td className="pt-2 text-appGray">
                                {t("occupation")}
                              </td>
                              <td className="text-primary font-demi pt-2">
                                <span className="text-appGray font-regular">
                                  : &nbsp;&nbsp;
                                </span>
                                {familyMember?.occupation}
                              </td>
                            </tr>
                          )}
                          {familyMember?.schemesAvailed && (
                            <tr>
                              <td className="pt-2 text-appGray">
                                Schemes Availed&nbsp;
                              </td>
                              <td className="text-primary font-demi pt-2">
                                <span className="text-appGray font-regular">
                                  : &nbsp;&nbsp;
                                </span>
                                {familyMember?.schemesAvailed}
                              </td>
                            </tr>
                          )}
                          {familyMember?.caste && (
                            <tr>
                              <td className="pt-2 text-appGray">
                                {t("caste")}&nbsp;
                              </td>
                              <td className="text-primary font-demi pt-2">
                                <span className="text-appGray font-regular">
                                  : &nbsp;&nbsp;
                                </span>
                                {familyMember?.caste}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <div className="mt-11 mb-12">
                        <h1 className="uppercase text-lightGray text-[15px] font-bold text-center">
                          {t("issued_documents")}
                        </h1>
                        <div className="flex justify-around mt-3">
                          <div
                            className="text-center font-medium text-[11px] text-lightGray flex justify-center flex-col items-center"
                            onClick={() => setModaleOpen(true)}
                          >
                            <CasteCertiIcon />
                            <p className="mt-2">
                              {t("caste_certificate")}
                              <br />
                              {t("certificate")}
                            </p>
                          </div>
                          <div
                            className="text-center font-medium text-[11px] text-lightGray flex justify-center flex-col items-center"
                            onClick={() => setModaleOpen(true)}
                          >
                            <DomicileCertiIcon />
                            <p className="mt-2">
                              {t("domicile_certificate")}
                              <br />
                              {t("certificate")}
                            </p>
                          </div>
                          <div
                            className="text-center font-medium text-[11px] text-lightGray flex justify-center flex-col items-center"
                            onClick={() => setModaleOpen(true)}
                          >
                            <IncomeCertiIcon />
                            <p className="mt-2">
                              {t("income_certificate")}
                              <br />
                              {t("certificate")}
                            </p>
                          </div>
                          <div
                            className="text-center font-medium text-[11px] text-lightGray flex mt-[0.4rem] flex-col items-center cursor-pointer"
                            onClick={() => setModaleOpen(true)}
                          >
                            <AddIcon />
                            <p className="mt-6">{t("add_more")}</p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="mt-6 text-appGray text-[11px] text-center font-regular absolute bottom-1 left-1/2 translate-x-[-50%] w-max"> */}
                      <div className="mt-6 text-appGray text-[11px] text-center font-regular">
                        {t("family_data_updated")}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        <ActionSheet showBox={showBox} toggleBox={toggleBox} />
        <Bottombar />
      </div>
      <Modal open={modaleOpen} onClose={() => setModaleOpen(false)}>
        <div className="flex justify-center items-center flex-col py-10 bg-tertiary">
          <h1 className="text-primary font-bold text-[34px]">
            {t("coming_soon")} !
          </h1>
          <ComingSoon />
          <div className="font-regular text-appGray text-center px-7">
            {t("coming_soon_description")}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FamilyMemberDetails;
