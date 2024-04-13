import { useRouter } from "next/router";
import { Navbar, Header, Bottombar } from "components";
import { BackIcon, CasteCertiIcon, WalletIcon } from "assets/icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Button } from "ui";
import { digilockerSignin, setDigilockerIssuedFiles } from "api";
import swal from "sweetalert";
import { useStateContext } from "context";
import { useSyncLanguage } from "ni18n";
import { toast } from "react-toastify";

const FamilyMemberAddDocuments: React.FC = () => {
  const { t } = useTranslation("familyDetails");
  const router = useRouter();
  const { locale } = useStateContext();
  useSyncLanguage(locale);
  const [docStatus, setDocStatus] = useState({});
  const code = router?.query?.code;
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    if (code) {
      const sendCode = async () => {
        const res = await digilockerSignin(
          router?.query?.code,
          router?.query?.state
        );
        setDocuments(res);
      };
      sendCode();
    }
  }, [code]);

  const handleCheckboxClick = (event: any) => {
    const updatedDoc = documents.map((doc) => {
      if (doc?.doctype == event.target.name) {
        doc.imported = !doc.imported;
        setDocStatus({ ...docStatus, [event.target.name]: doc.imported });
      }
      return doc;
    });
    setDocuments(updatedDoc);
  };

  const handleAddDocuments = async () => {
    const res = await setDigilockerIssuedFiles(docStatus, router?.query?.state);
    if (res?.status == 201) {
      toast.success(t("documents_added_successfully"));
      // swal({
      //   text: t("documents_added_successfully"),
      //   icon: "success",
      // });
      router.push(`/family/${router?.query?.state}/documents`);
    }
  };

  return (
    <div className="mb-20">
      <Navbar />
      <Header />

      <div className="pt-40 sm:pt-48">
        <div className="bg-tertiary rounded-xl px-4 py-6 lg:py-10 mx-3">
          <div className="font-bold text-center text-[20px] uppercase text-appGray">
            {t("family_wallet")}
          </div>
          <div className="bg-white border-[#DC6127] border-2 border-solid rounded-xl pb-1 mt-4 px-3">
            <div className="mt-6 flex justify-between">
              <Link href={`/family`}>
                <BackIcon fill={"#e1703b"} />
              </Link>
              <div className="font-demi text-appGray mb-4 mx-3 text-[18px]">
                {t("add_documents")}
              </div>
              <WalletIcon />
            </div>

            {documents &&
              documents?.length > 0 &&
              documents?.map((document) => (
                <div className="border-2 border-[#e3e3e3] font-medium text-appGray px-2 grid grid-cols-7 mt-4 rounded">
                  <div className="form-control" key={document?.doctype}>
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox cursor-pointer"
                        name={document?.doctype}
                        onClick={handleCheckboxClick}
                        checked={document?.imported}
                      />
                      <div className="flex">
                        <div className="mr-3 ml-5 mt-2">
                          <CasteCertiIcon />
                        </div>
                        <div className="flex self-center w-[50vw] text-[14px]">
                          {document?.name}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              ))}

            <div className="flex justify-center mt-12 mb-5">
              <Button
                className="font-medium"
                onClick={handleAddDocuments}
                text={t("add_documents")}
              />
            </div>
          </div>
        </div>
      </div>
      <Bottombar />
    </div>
  );
};

export default FamilyMemberAddDocuments;
