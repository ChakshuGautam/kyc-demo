const supportedLngs = ["en", "hi"];
const localePath = "locales/{{lng}}/{{ns}}.json";

export const ni18nConfig = {
  supportedLngs,
  ns: [
    "common",
    "benefits",
    "bottomBar",
    "comingSoon",
    "family",
    "familyDetails",
    "home",
    "otp",
    "sidebar",
    "discovery",
    "menu",
    "feedback",
  ],
  backend: {
    loadPath: process.env.NEXT_PUBLIC_ASSET_PREFIX
      ? `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/${localePath}`
      : localePath,
  },
};
