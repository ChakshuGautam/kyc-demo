import HamburgerMenu from "./menu";

export const Navbar = (props: any) => {
  return (
    <>
      <HamburgerMenu discovery={props?.discovery} />
      {/* <div className="fixed top-0 md:w-[470px] w-full z-50 h-12 bg-white border-t border-gray-200 ">
        <div className="flex h-full max-w-lg justify-between mx-auto font-medium">
          <div className="inline-flex flex-col items-start justify-center px-5 group">
            <NavbarIcon />
          </div>
          <div className="inline-flex flex-col items-end justify-center px-5 group">
            <Link href="/notifications">
              <NotificationIcon />
            </Link>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
