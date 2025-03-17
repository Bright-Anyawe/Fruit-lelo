import Icon from "@mdi/react";
import {
  mdiMagnify,
  mdiWindowClose,
  mdiHeart,
  mdiCart,
  mdiHeartOutline,
  mdiMenu,
} from "@mdi/js";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Badge, ConfigProvider, Popover, Drawer } from "antd";
import CartCard from "./cartCard";
import { CartContext, FavContext } from "./App";

export default function Header({ setSearchText, showFav, setShowFav }) {
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();
  const { favs } = useContext(FavContext);
  const { cart } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Focus on mobile search input when opened
  useEffect(() => {
    if (searchOpen && mobileSearchRef.current) {
      setTimeout(() => {
        mobileSearchRef.current.focus();
      }, 300);
    }
  }, [searchOpen]);

  // Mobile search component
  const MobileSearch = () => (
    <div className={`
      fixed top-0 left-0 w-full bg-black p-4 z-50
      transform transition-all duration-300 ease-in-out
      ${searchOpen ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <form
        action=""
        className="flex select-none items-center rounded-3xl bg-secondary p-3 w-full"
      >
        <Icon path={mdiMagnify} size={1} color="#ae9b84" />
        <input
          type="text"
          className="flex-1 border-none bg-secondary px-3 text-white caret-accent outline-none placeholder:text-gray-400"
          ref={mobileSearchRef}
          placeholder="Search"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              navigate("/store");
              setSearchOpen(false);
            }
          }}
        />
        <Icon
          path={mdiWindowClose}
          size={0.9}
          className="cursor-pointer transition-all hover:scale-125"
          onClick={() => {
            if (mobileSearchRef.current) {
              mobileSearchRef.current.value = "";
            }
            setSearchText("");
            setSearchOpen(false);
          }}
        />
      </form>
    </div>
  );

  return (
    <>
      <MobileSearch />
      
      <header className="flex justify-between items-center px-4 md:px-10 py-4 md:py-6">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Icon
            path={mdiMenu}
            size={1.2}
            className="cursor-pointer text-accent"
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>

        {/* Logo and navigation */}
        <div className="flex select-none items-center gap-2 md:gap-6">
          <Link
            to={"/"}
            className="cursor-pointer text-xl md:text-3xl font-bold text-accent transition-all hover:drop-shadow-[0_0_10px]"
          >
            Fruits Lelo.
          </Link>
          
          {/* Navigation links - Hidden on mobile */}
          <nav className="hidden md:flex gap-3">
            <Link
              className="cursor-pointer border-b-2 border-bg px-1 transition-all hover:border-b-2 hover:border-accent hover:drop-shadow-[0_0_20px_#AE9B84]"
              to={"/"}
            >
              Home
            </Link>
            <Link
              className="cursor-pointer border-b-2 border-bg px-1 transition-all hover:border-b-2 hover:border-accent hover:drop-shadow-[0_0_20px_#AE9B84]"
              to={"/store"}
            >
              Store
            </Link>
          </nav>
        </div>

        {/* Search and icons */}
        <div className="flex items-center gap-3 md:gap-11">
          {/* Search bar - Hidden on mobile */}
          <form
            action=""
            className="hidden md:flex select-none items-center rounded-3xl bg-secondary p-3"
            onClick={() => {
              searchRef.current.focus();
            }}
          >
            <Icon path={mdiMagnify} size={1} color="#ae9b84" />
            <input
              type="text"
              className="border-none bg-secondary px-3 text-white caret-accent outline-none placeholder:text-gray-400"
              ref={searchRef}
              placeholder="Search"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  navigate("/store");
                }
              }}
            />
            <Icon
              path={mdiWindowClose}
              size={0.9}
              className="cursor-pointer transition-all hover:scale-125"
              onClick={() => {
                searchRef.current.value = "";
                setSearchText("");
              }}
            />
          </form>

          {/* Search icon - Only visible on mobile */}
          <div className="md:hidden">
            <Icon
              path={mdiMagnify}
              size={1}
              color="#ae9b84"
              className="cursor-pointer transition-all hover:scale-125"
              onClick={() => setSearchOpen(true)}
            />
          </div>

          {/* Favorites and Cart icons */}
          <div className="flex gap-4 md:gap-7">
            <ConfigProvider
              theme={{
                token: {
                  colorBorderBg: "#AE9B84",
                },
              }}
            >
              <Badge
                count={favs.length}
                color="#00000000"
                offset={[5, -5]}
                showZero
                className="select-none"
              >
                <Link to={"/store"}>
                  <Icon
                    path={showFav ? mdiHeart : mdiHeartOutline}
                    size={1}
                    color="#ae9b84"
                    className="cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84]"
                    onClick={() => {
                      setShowFav((prev) => !prev);
                    }}
                  />
                </Link>
              </Badge>
              <Popover
                content={<CartCard />}
                placement="bottomRight"
                arrow={false}
                color="#0f0f0f"
                trigger={isMobile ? "click" : "hover"}
              >
                <Badge
                  count={cart.length}
                  color="#00000000"
                  offset={[5, -5]}
                  showZero
                  className="select-none"
                >
                  <Icon
                    path={mdiCart}
                    size={1}
                    color="#ae9b84"
                    className="cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84]"
                    onClick={() => {
                      navigate("/cart");
                    }}
                  />
                </Badge>
              </Popover>
            </ConfigProvider>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col p-4">
          <Link
            className="cursor-pointer py-4 text-lg border-b border-gray-700 hover:text-accent"
            to={"/"}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="cursor-pointer py-4 text-lg border-b border-gray-700 hover:text-accent"
            to={"/store"}
            onClick={() => setMobileMenuOpen(false)}
          >
            Store
          </Link>
          <Link
            className="cursor-pointer py-4 text-lg border-b border-gray-700 hover:text-accent"
            to={"/cart"}
            onClick={() => setMobileMenuOpen(false)}
          >
            Cart
          </Link>
        </div>
      </Drawer>
    </>
  );
}