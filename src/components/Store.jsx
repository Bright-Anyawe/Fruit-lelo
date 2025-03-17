import Icon from "@mdi/react";
import {
  mdiChevronDown,
  mdiChevronUp,
  // mdiWindowClose,
  mdiHeart,
  mdiHeartOutline,
  mdiCartOutline,
  mdiCart,
} from "@mdi/js";
import { Checkbox, ConfigProvider } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  COLOROPTIONS,
  FAMILYOPTIONS,
  FRUITS,
  VITAMINSOPTIONS,
} from "../utils/constants";
import { CartContext, FavContext } from "./App";
import { Link } from "react-router-dom";
import { Flipped, Flipper, spring } from "react-flip-toolkit";

function Tags({ text, setFilterTags }) {
  if (text === "") return null;
  let textToDisplay = '"' + text + '"';
  if (["C", "A", "K", "E", "B6"].includes(text))
    textToDisplay = "Vitamin " + text;
  else if (
    [
      "Rose",
      "Citrus",
      "Nightshade",
      "Gourd",
      "Palm",
      "Cashew",
      "Berry",
      "Laurel",
      "Other",
      "Purple",
      "Green",
      "Brown",
      "Red",
      "Orange",
      "Yellow",
      "Blue",
      "Black",
    ].includes(text)
  )
    textToDisplay = text;
  return (
    <div className="flex select-none items-center gap-1 rounded-full bg-accent px-3 py-1 font-mono text-xs font-black text-black">
      <span>{textToDisplay}</span>
      {/* Uncomment if you want to add a close button for removing the tag
      <Icon
        path={mdiWindowClose}
        size={0.6}
        className="cursor-pointer transition-all hover:scale-150"
        onClick={() => {
          setFilterTags((prev) => {
            const newFilters = [...prev];
            newFilters.splice(newFilters.indexOf(text), 1);
            return newFilters;
          });
        }}
      /> */}
    </div>
  );
}

function ColorCheckBox({ color }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color,
          colorText: "#fff",
          fontFamily: "Roboto",
          colorBgContainer: color,
          colorBorder: color,
          borderRadiusSM: 50,
          controlInteractiveSize: 25,
          colorWhite: color === "Yellow" || color === "Orange" ? "#000" : "#fff",
        },
      }}
    >
      {/* Use full width on mobile and quarter width on sm+ screens */}
      <Checkbox
        className="flex w-full sm:w-1/4 flex-col items-center justify-center gap-2"
        value={color}
      >
        {color}
      </Checkbox>
    </ConfigProvider>
  );
}

function Aside({ colors, setColors, family, setFamily, vitamins, setVitamins }) {
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isFamilyOpen, setIsFamilyOpen] = useState(true);
  const [isVitaminOpen, setIsVitaminOpen] = useState(true);

  function handleColorChange(checkedValues) {
    setColors(checkedValues);
  }
  function handleFamilyChange(checkedValues) {
    if (checkedValues.length === 0) setFamily("");
    else setFamily(checkedValues[0]);
  }
  function handleVitaminsChange(checkedValues) {
    setVitamins(checkedValues);
  }

  return (
    // On mobile use full width with smaller padding, fixed width on md+
    <div className="w-full md:w-72 shrink-0 select-none p-4 sm:p-6 md:p-10">
      <div>
        <div className="flex items-center justify-between bg-bg">
          <h1 className="text-2xl font-bold">
            Color {colors.length > 0 ? `(${colors.length})` : ""}
          </h1>
          <Icon
            path={isColorOpen ? mdiChevronDown : mdiChevronUp}
            size={1}
            color="#ae9b84"
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              setIsColorOpen((prev) => !prev);
            }}
          />
        </div>
        <div
          className={`m-6 origin-top overflow-hidden transition-all duration-500 ${
            isColorOpen ? "h-72" : "h-0"
          }`}
        >
          <Checkbox.Group
            className="flex flex-wrap gap-5"
            onChange={handleColorChange}
            value={colors}
          >
            {COLOROPTIONS.map((color, index) => (
              <ColorCheckBox color={color} key={color + index} />
            ))}
          </Checkbox.Group>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Family {family !== "" ? "(1)" : ""}
          </h1>
          <Icon
            path={isFamilyOpen ? mdiChevronDown : mdiChevronUp}
            size={1}
            color="#ae9b84"
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              setIsFamilyOpen((prev) => !prev);
            }}
          />
        </div>
        <div className="m-6">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ae9b84",
                colorText: "#fff",
                fontFamily: "Roboto",
                colorBgContainer: "#0f0f0f",
                colorBorder: "#ae9b84",
                borderRadiusSM: 0,
              },
            }}
          >
            <Checkbox.Group
              options={FAMILYOPTIONS}
              defaultValue={[]}
              className={`flex origin-top flex-col flex-nowrap gap-5 overflow-hidden transition-all duration-500 ${
                isFamilyOpen ? "h-[366px]" : "h-0"
              }`}
              onChange={handleFamilyChange}
              value={family}
            />
          </ConfigProvider>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Vitamins {vitamins.length > 0 ? `(${vitamins.length})` : ""}
          </h1>
          <Icon
            path={isVitaminOpen ? mdiChevronDown : mdiChevronUp}
            size={1}
            color="#ae9b84"
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              setIsVitaminOpen((prev) => !prev);
            }}
          />
        </div>
        <div className="m-6 flex flex-col gap-5">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ae9b84",
                colorText: "#fff",
                fontFamily: "Roboto",
                colorBgContainer: "#0f0f0f",
                colorBorder: "#ae9b84",
                borderRadiusSM: 0,
              },
            }}
          >
            <Checkbox.Group
              options={VITAMINSOPTIONS}
              defaultValue={[]}
              className={`flex origin-top flex-col flex-nowrap gap-5 overflow-hidden transition-all duration-500 ${
                isVitaminOpen ? "h-48" : "h-0"
              }`}
              onChange={handleVitaminsChange}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default function Store({ searchText, showFav }) {
  const [colors, setColors] = useState([]);
  const [family, setFamily] = useState("");
  const [vitamins, setVitamins] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filteredFruits, setFilteredFruits] = useState(FRUITS);
  const { favs, setFavs } = useContext(FavContext);
  const { cart, setCart } = useContext(CartContext);
  const fruitsFlipKey = `${filteredFruits.map((fruit) => fruit.id).join(",")}`;

  function getFavFruits() {
    return FRUITS.filter((fruit) => favs.includes(fruit.id));
  }

  useEffect(() => {
    setFilterTags(colors.concat(family).concat(vitamins).concat(searchText));
    let tempArr =
      searchText.length === 0
        ? showFav
          ? getFavFruits()
          : [...FRUITS]
        : (showFav ? getFavFruits() : FRUITS).filter((fruit) =>
            fruit.name.toLowerCase().includes(searchText.toLowerCase())
          );

    if (colors.length > 0) {
      tempArr = tempArr.filter((fruit) => {
        return (
          colors.filter((color) => fruit.colors.includes(color)).length ===
          colors.length
        );
      });
    }
    if (family !== "") {
      tempArr = tempArr.filter((fruit) => fruit.family === family);
    }
    if (vitamins.length > 0) {
      tempArr = tempArr.filter((fruit) => {
        return (
          vitamins.filter((vitamin) => fruit.vitamins.includes(vitamin))
            .length === vitamins.length
        );
      });
    }
    setFilteredFruits(tempArr);
  }, [colors, family, vitamins, searchText, showFav]);

  function isInCart(id) {
    return cart.some((item) => item.fruitId === id);
  }

  function onExit(element, index, removeElement) {
    spring({
      onUpdate: (value) => {
        element.style.opacity = `${1 - value}`;
      },
      onComplete: removeElement,
    });
  }

  return (
    // Use flex-col on mobile and row on medium+ screens
    <section className="flex flex-col md:flex-row overflow-hidden">
      <Aside
        colors={colors}
        setColors={setColors}
        family={family}
        setFamily={setFamily}
        vitamins={vitamins}
        setVitamins={setVitamins}
      />
      <div className="flex w-full flex-col items-start gap-5 p-4 sm:p-6 md:p-10">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>Items ({filteredFruits.length})</span>
          {showFav && (
            <span className="font-mono text-base text-accent">
              -- Favourite
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {filterTags.map((item, index) => (
            <Tags text={item} setFilterTags={setFilterTags} key={item + index} />
          ))}
        </div>
        <Flipper
          flipKey={fruitsFlipKey}
          // 1 column on mobile, 2 on small screens, 3 on md+ screens
          className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7"
        >
          {filteredFruits.map((fruit, index) => {
            return (
              <Flipped
                flipId={fruit.id}
                key={fruit.name + index}
                onExit={onExit}
                stagger
              >
                <div className="group relative shrink-0 select-none rounded-2xl border-2 border-dashed border-dash">
                  <Icon
                    path={favs.includes(fruit.id) ? mdiHeart : mdiHeartOutline}
                    size={1}
                    // Adjust positioning for responsiveness
                    className="absolute right-4 top-4 sm:right-10 sm:top-10 cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_red]"
                    color={favs.includes(fruit.id) ? "red" : "white"}
                    onClick={() => {
                      setFavs((prev) => {
                        const newArr = [...prev];
                        if (favs.includes(fruit.id)) {
                          newArr.splice(newArr.indexOf(fruit.id), 1);
                          return newArr;
                        }
                        newArr.push(fruit.id);
                        localStorage.setItem("favs", JSON.stringify(newArr));
                        return newArr;
                      });
                    }}
                  />
                  <Link to={`/store/${fruit.slug}`} className="rounded-2xl">
                    <div
                      className="flex items-center justify-center pt-8 pb-8 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16"
                    >
                      {/* Responsive image sizing */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
                        <img
                          src={fruit.src}
                          alt={fruit.name}
                          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_#AE9B84]"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="flex w-full items-center justify-between px-4 sm:px-6 md:px-10 pb-4 sm:pb-6 md:pb-10">
                    <div className="flex flex-col justify-between">
                      <h3 className="font-bold">{fruit.name}</h3>
                      <span className="text-gray">{fruit.family} family</span>
                      <span className="font-mono font-bold">
                        ${fruit.price}
                      </span>
                    </div>
                    <Icon
                      path={isInCart(fruit.id) ? mdiCart : mdiCartOutline}
                      size={1}
                      className="cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_#ae9b84]"
                      color="#ae9b84"
                      onClick={() => {
                        setCart((prev) => {
                          const newCart = [...prev];
                          if (!isInCart(fruit.id)) {
                            newCart.push({ fruitId: fruit.id, count: 1 });
                            localStorage.setItem("cart", JSON.stringify(newCart));
                            return newCart;
                          }
                          for (let i in newCart)
                            if (newCart[i].fruitId === fruit.id)
                              newCart.splice(i, 1);
                          localStorage.setItem("cart", JSON.stringify(newCart));
                          return newCart;
                        });
                      }}
                    />
                  </div>
                </div>
              </Flipped>
            );
          })}
        </Flipper>
      </div>
    </section>
  );
}
