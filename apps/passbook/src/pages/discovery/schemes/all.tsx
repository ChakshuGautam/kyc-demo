import { useTranslation } from "react-i18next";
import { useStateContext } from "context";
import { Bottombar, Header, Navbar } from "components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { getAllSchemes } from "api";
import ButtonForwardIcon from "assets/icons/buttonForward";
import { BackIcon, PrevIcon, NextIcon } from "assets/icons";
import Loading from "assets/icons/loading";

const AllSchemes = () => {
  const { t } = useTranslation("discovery");
  const { locale } = useStateContext();
  const [login, setLogin] = useState(false);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  let debounceTimer;

  const router = useRouter();

  useEffect(() => {
    const getSchemes = async () => {
      const res = await getAllSchemes(
        currentPage, //@ts-ignore
        router?.query?.category || "",
        searchInput
      );
      setSchemes(res);
      setTotalPages(Math.ceil(res.total / 10));
    };

    // Initial call
    getSchemes();

    // Cleanup timer on component unmount
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [currentPage, router?.query?.category, searchInput]);

  useEffect(() => {
    if (getCookie("token")) {
      setLogin(true);
    }
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const debouncedSearch = () => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const currentPageSnapshot = 0;

    debounceTimer = setTimeout(() => {
      getAllSchemes(
        currentPageSnapshot, //@ts-ignore
        router?.query?.category || "",
        searchInput
      ).then((res) => {
        setSchemes(res);
        setLoading(false);
      });
    }, 500);
  };

  const handleSearchInputChange = (e) => {
    setLoading(true);
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    debouncedSearch();
  };

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
                locale == "hi" ? "font-extrabold hi" : "font-bold"
              } text-[20px] text-center pb-3 mx-auto text-appGray`}
            >
              {t("all_schemes")}
            </h1>
          </div>

          <div className="mb-4 py-4 border-b border-[#e1703b] flex">
            <input
              type="text"
              name="search"
              className={
                "shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-1"
              }
              onChange={handleSearchInputChange}
              value={searchInput}
              placeholder={`${t("search")}...`}
            />
            <button
              className="text-sm bg-primary font-demi mt-1 text-white px-3"
              onClick={() => setSearchInput("")}
            >
              {t("clear")}
            </button>
          </div>

          <div>
            {!loading ? (
              <>
                {/* @ts-ignore */}
                {schemes?.data
                  ?.filter((scheme) =>
                    locale === "hi"
                      ? scheme?.schemeNameh
                          ?.toLowerCase()
                          .includes(searchInput.toLowerCase())
                      : scheme?.schemeName
                          ?.toLowerCase()
                          .includes(searchInput.toLowerCase())
                  )
                  .map((scheme) => (
                    <div
                      className="bg-primary text-white font-demi py-2 px-3 my-2 text-[14px] rounded-lg flex justify-between"
                      key={scheme?.id}
                      onClick={() =>
                        router.push(
                          `/discovery/schemes/${scheme?.id}?eligibility=true&schemeCode=${scheme?.schemeCode}`
                        )
                      }
                    >
                      <div>
                        {locale === "hi"
                          ? scheme?.schemeNameh
                          : scheme?.schemeName}
                        {scheme?.stage
                          ? locale === "hi"
                            ? ` - ${scheme?.stageh}`
                            : ` - ${scheme?.stage}`
                          : ""}
                      </div>
                      <div className="w-[20px] flex justify-end items-center">
                        <ButtonForwardIcon />
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div className="min-h-[40vh] flex flex-col justify-center items-center">
                <Loading color="#e1703b" />
              </div>
            )}
            {/* @ts-ignore */}
          </div>

          {/* Pagination */}
          {!searchInput && (
            <div className="flex justify-between items-center mt-4">
              <button onClick={() => handlePageChange(currentPage - 1)}>
                <PrevIcon />
              </button>
              <div className="text-appGray font-demi text-[18px] mx-4">
                {currentPage} / {totalPages}
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)}>
                <NextIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {login && <Bottombar />}
    </div>
  );
};

export default AllSchemes;
