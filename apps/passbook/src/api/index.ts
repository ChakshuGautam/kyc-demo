import axios from "axios";
// import { setCookie, getCookie } from "cookies-next";
import { setToLocalForage } from "utils";

const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

function setCookie(name, value, options = {}) {
  const defaults = {
    path: "/",
    secure: true,
    sameSite: "Strict",
  };

  const mergedOptions = { ...defaults, ...options };

  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + 24 * 60 * 60 * 1000); // 1 day in milliseconds

  // @ts-ignore
  mergedOptions.expires = expiresDate.toUTCString();

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  for (const [attrName, attrValue] of Object.entries(mergedOptions)) {
    cookieString += `; ${attrName}=${attrValue}`;
  }

  document.cookie = cookieString;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (aadhar: string) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login/${aadhar}`);
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/logout/${getCookie("username")}`,
      {
        refreshToken: getCookie("refreshToken"),
        global: true,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const verifyOtp = async (otp: string, aadhar: any, txn: any) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/verifyOTP/${aadhar}`, {
      otp,
      otptxn: txn,
    });
    setCookie(
      "refreshToken",
      response?.data?.token?.result?.data?.user?.refreshToken,
      { secure: true, sameSite: "Strict" }
    );

    setCookie("token", response?.data?.token?.result?.data?.user?.token, {
      secure: true,
      sameSite: "Strict",
    });

    setCookie("username", response?.data?.memberId, {
      secure: true,
      sameSite: "Strict",
    });

    return response;
  } catch (error) {
    return error?.response;
  }
};

export const getFamilySummary = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/family/${getCookie("username")}/summary`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    if (response?.data) {
      await setToLocalForage("lastUpdatedFamilySummary", new Date());
    }
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getFamilyData = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/family/${getCookie("username")}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getFamilySchemes = async (
  benefitType: any,
  beneficiary: any,
  fy: any
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/family/${getCookie(
        "username"
      )}/schemes?financialYear=${fy}&benefitType=${benefitType}&beneficiary=${beneficiary}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getFamilyTransactions = async (
  benefitType: any,
  beneficiary: any,
  fy: any
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/family/${getCookie(
        "username"
      )}/transactions?financialYear=${fy}&benefitType=${benefitType}&beneficiary=${beneficiary}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const digilockerSignin = async (code: any, familyMemberId: any) => {
  try {
    const response = await axios.post(
      `${baseUrl}/digilocker/signin/${getCookie("username")}/${familyMemberId}`,
      {
        code,
        code_verifier: getCookie("code_verifier"),
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getDigilockerIssuedFiles = async (familyMemberId: any) => {
  try {
    const response = await axios.get(
      `${baseUrl}/digilocker/filesIssued/${getCookie(
        "username"
      )}/${familyMemberId}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const setDigilockerIssuedFiles = async (
  body: any,
  familyMemberId: any
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/digilocker/filesIssued/${getCookie(
        "username"
      )}/${familyMemberId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const pullDigilockerDocument = async (
  body: any,
  familyMemberId: any
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/digilocker/files/${getCookie("username")}/${familyMemberId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const verifyToken = async () => {
  try {
    if (
      getCookie("username") &&
      getCookie("token") &&
      getCookie("refreshToken")
    ) {
      const response = await axios.post(
        `${baseUrl}/auth/verifyToken/${getCookie("username")}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      return response?.data;
    } else {
      throw new Error("No cookies found for the user");
    }
  } catch (error) {
    return error;
  }
};

export const getAccessTokenWithRefreshToken = async () => {
  try {
    const response = await axios.post(`${baseUrl}/auth/refreshToken`, {
      refresh_token: getCookie("refreshToken"),
      access_token: getCookie("token"),
    });
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const loginWithNumber = async (mobileNumber: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/loginMobile/${mobileNumber}`
    );
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const registerMember = async (mobileNumber: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/registerMember/${mobileNumber}`
    );
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const mappingAadharWithNumber = async (
  mobileNumber: any,
  otp: string
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/family/mapMobileWithMember/${getCookie(
        "username"
      )}/${mobileNumber}`,
      {
        otp,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const verifyOTPWithNumber = async (mobileNumber: any, otp: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/verifyOTPMobile/${mobileNumber}`,
      {
        otp,
      }
    );
    setCookie(
      "refreshToken",
      response?.data?.token?.result?.data?.user?.refreshToken
    );
    setCookie("token", response?.data?.token?.result?.data?.user?.token);
    setCookie("username", response?.data?.memberId);
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const getRecommendedSchemes = async (formData: any) => {
  try {
    const response = await axios.post(
      `${baseUrl}/discovery/recommendedSchemes`,
      {
        markerValuePair: formData,
      }
    );
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const getSchemeById = async (schemeId: any) => {
  try {
    const response = await axios.get(`${baseUrl}/discovery/scheme/${schemeId}`);
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getFamilyDetails = async (memberId: any) => {
  try {
    const response = await axios.get(
      `${baseUrl}/family/${getCookie("username")}/${memberId}/detail`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getSchemesByCategory = async () => {
  try {
    const response = await axios.get(`${baseUrl}/discovery/summary`);
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getAllSchemes = async (
  page = 0,
  categoryId = "",
  searchInput = ""
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/discovery/getAllSchemes?page=${page}&categoryId=${categoryId}&search=${searchInput}`
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const checkSchemeEligibility = async (schemeId: any, formData: any) => {
  try {
    const response = await axios.post(
      `${baseUrl}/discovery/checkSchemeEligibility/${schemeId}`,
      { markerValuePair: formData }
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getFeaturedSchemes = async () => {
  try {
    const response = await axios.get(`${baseUrl}/discovery/featuredSchemes`);
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const getUserRecommendedSchemes = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/discovery/userRecommendedSchemes/${getCookie("username")}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const submitFeedback = async (rating: any, feedback: any) => {
  try {
    const response = await axios.post(
      `${baseUrl}/family/${getCookie("username")}/feedback`,
      {
        feedback,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};
