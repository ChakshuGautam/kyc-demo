import { appWithI18Next } from "ni18n";
import { ni18nConfig } from "../../ni18n.config";
import "styles/tailwind.css";
import "styles/global.css";
import { StateProvider } from "context";
import { RouteGuard } from "components/routeGuard";
import flagsmith from "flagsmith/isomorphic";
import { FlagsmithProvider } from "flagsmith/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import {
  formatDate,
  getFromLocalForage,
  offlineChecklist,
  onlineChecklist,
} from "utils";
import { getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { posthog } from "posthog-js";

const MyApp = ({ Component, pageProps, flagsmithState }) => {
  const router = useRouter();

  const [startTime, setStartTime] = useState(Date.now());
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const handleRouteChange = (url) => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;

      posthog.capture("time_spent", {
        id: currentPage,
        time_spent: timeSpent,
        is_login: getCookie("token") ? true : false,
      });
      console.log(`Time spent on ${currentPage}: ${timeSpent} seconds`);

      // Update for new route
      setCurrentPage(url);
      setStartTime(endTime);
    };

    // Listen for route changes
    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup listener
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, startTime, currentPage]);

  useEffect(() => {
    if (getCookie("token") === "") {
      removeCookies("token");
      removeCookies("username");
      removeCookies("code_verifier");
      removeCookies("refreshToken");
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      toast.warning("This app is intended to be opened on a mobile device.");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("offline", offlineChecklist);
    return () => {
      window.removeEventListener("offline", offlineChecklist);
    };
  }, []);

  const syncOnline = async () => {
    const appOffline = await getFromLocalForage("appOffline");
    if (appOffline && navigator.onLine) {
      onlineChecklist();
    }
  };

  useEffect(() => {
    posthog.init("FID", {
      api_host: "https://api.dashboard.familyid.samagra.io",
    });
    syncOnline();
  }, []);

  // Telemetry: Link Accessed
  useEffect(() => {
    posthog.capture("link_accessed", {
      date: formatDate(new Date()),
      link_accessed: 1,
    });
  }, []);
  // Device ID = 0 for mobile and 1 for desktop

  return (
    <StateProvider>
      <FlagsmithProvider serverState={flagsmithState} flagsmith={flagsmith}>
        {/* <RouteGuard> */}
          <Component {...pageProps} />
        {/* </RouteGuard> */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="font-demi"
        />
      </FlagsmithProvider>
    </StateProvider>
  );
};

MyApp.getInitialProps = async () => {
  await flagsmith.init({
    environmentID: process.env.NEXT_PUBLIC_ENVIRONMENT_ID,
  });
  return { flagsmithState: flagsmith.getState() };
};

// @ts-ignore
export default appWithI18Next(MyApp, ni18nConfig);
