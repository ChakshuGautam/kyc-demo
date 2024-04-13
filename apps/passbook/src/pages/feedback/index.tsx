import { submitFeedback } from "api";
import { Navbar, Header, Bottombar, Modal } from "components";
import { useStateContext } from "context";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import { Button } from "ui";
import { getFromLocalForage, setToLocalForage } from "utils";
import { toast } from "react-toastify";

const Feedback: React.FC = () => {
  const { t } = useTranslation("feedback");
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const { setModaleOpen } = useStateContext();

  const submitReview = async () => {
    if (navigator.onLine) {
      const res = await submitFeedback(rating, ratingText);
      if (res?.status == 201) {
        toast.success(t("success_message"));
      } else {
        toast.error(t("error_message"));
      }
    } else {
      let offlineSyncData: any =
        (await getFromLocalForage("offlineSyncData")) || [];
      offlineSyncData = [
        ...offlineSyncData,
        {
          id: "Feedback",
          body: {
            user: getCookie("username"),
            feedback: rating.toString(),
            feedback_text: ratingText,
          },
          endpoint:
            "https://data-staging.affiliation.samagra.io/api/rest/pwa-poc",
          method: "post",
          headers: { "x-hasura-admin-secret": "myadminsecretkey" },
        },
      ];
      await setToLocalForage("offlineSyncData", offlineSyncData);
      setModaleOpen(true);
    }
  };

  return (
    <>
      <div className="mb-20">
        <Navbar />
        <Header />
        <div className="pt-40 sm:pt-48 ">
          <div className="bg-tertiary rounded-xl px-4 py-5 mx-3 min-h-[70vh]">
            <h1 className="text-appGray text-[20px] text-center pb-3 font-bold border-b border-[#DB6027]">
              {t("feedback")}
            </h1>
            <div className="bg-white py-3 px-4 mt-3 rounded-lg flex justify-center flex-col items-center">
              <div className="text-[18px] font-demi text-appGray mb-3 mt-2">
                {t("did_you_find_this_useful")}
              </div>
              <StarRatings
                rating={rating}
                starDimension="32px"
                starSpacing="5px"
                changeRating={(rate: any) => setRating(rate)}
                starRatedColor="#E1703B"
                starHoverColor="#E1703B"
              />
              <div className="font-regular text-appGray mb-4 mt-6  text-[15px]">
                {t("write_your_review")}
              </div>
              <textarea
                className="w-full px-3 py-2 text-[14px]"
                placeholder={t("please_write_your_review")}
                onChange={(e: any) => setRatingText(e.target.value)}
                value={ratingText}
              />
              <Button
                className="font-medium mt-5 mb-3"
                onClick={() => submitReview()}
                text={t("submit_review")}
              />
            </div>
          </div>
        </div>
        <Bottombar />
      </div>
      <Modal>
        <div
          id="login"
          className="xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary flex justify-center items-center flex-col"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_URL}/images/green-check.png`}
            className="h-[70px]"
          />
          <div className="text-appGray font-bold text-[22px] mt-3">
            Your data is saved
          </div>
          <div className="text-primary font-regular text-[15px] text-center mt-2">
            Your response has been saved successfully and will be synced with
            our database once you're back online
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Feedback;
