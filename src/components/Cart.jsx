import Icon from "@mdi/react";
import {
  mdiKeyboardBackspace,
  mdiTrashCan,
  mdiCubeOutline,
  mdiMinus,
  mdiPlus,
  mdiCheckAll,
} from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import { FRUITS } from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./App";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  function handleDelete(index) {
    setCart((prev) => {
      const newCart = [...prev];
      newCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  }

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cart.length; i++) {
      temp += FRUITS[cart[i].fruitId].price * cart[i].count;
    }
    setTotal(temp);
  }, [cart]);

  return (
    <div className="flex flex-col md:flex-row items-start justify-between px-4 sm:px-8 md:px-14 py-8 sm:py-16 md:py-32">
      {/* Header */}
      <div className="w-full mb-6 md:mb-0">
        <div className="flex items-center gap-3">
          <Icon
            path={mdiKeyboardBackspace}
            size={1.5}
            className="cursor-pointer text-accent transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84]"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full gap-8">
        {/* Cart Items List */}
        <div className="flex-1 flex flex-col gap-6">
          {cart.map((item, index) => {
            const fruit = FRUITS[item.fruitId];
            return (
              <div
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                key={fruit.id}
              >
                <Link
                  to={`/store/${fruit.slug}`}
                  className="group shrink-0 select-none"
                >
                  <div className="rounded-2xl border-2 border-dashed border-dash p-4 sm:p-6 md:p-10">
                    <img
                      src={fruit.src}
                      alt={fruit.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_15px_#AE9B84]"
                    />
                  </div>
                </Link>
                <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg">{fruit.name}</h3>
                    <span className="text-gray text-sm">
                      {fruit.family} family
                    </span>
                    <div className="flex items-center gap-1 text-accent">
                      <Icon path={mdiCubeOutline} size={0.8} />
                      <h4 className="font-mono text-sm font-bold">In Stock</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <button
                        className="w-6 h-6 rounded-md bg-secondary p-1 transition-all hover:scale-125"
                        onClick={() => {
                          setCart((prev) => {
                            const newCart = [...prev];
                            for (let i in newCart) {
                              if (newCart[i].fruitId === fruit.id) {
                                if (newCart[i].count === 1) {
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify(newCart)
                                  );
                                  return newCart;
                                }
                                newCart[i].count -= 1;
                              }
                            }
                            localStorage.setItem("cart", JSON.stringify(newCart));
                            return newCart;
                          });
                        }}
                      >
                        <Icon path={mdiMinus} size={0.45} />
                      </button>
                      <span className="text-base">{item.count}</span>
                      <button
                        className="w-6 h-6 rounded-md bg-secondary p-1 transition-all hover:scale-125"
                        onClick={() => {
                          setCart((prev) => {
                            const newCart = [...prev];
                            for (let i in newCart) {
                              if (newCart[i].fruitId === fruit.id) {
                                newCart[i].count += 1;
                              }
                            }
                            localStorage.setItem("cart", JSON.stringify(newCart));
                            return newCart;
                          });
                        }}
                      >
                        <Icon path={mdiPlus} size={0.45} />
                      </button>
                    </div>
                    <Icon
                      path={mdiTrashCan}
                      size={1.1}
                      color="red"
                      className="cursor-pointer rounded-md bg-secondary p-1 transition-all hover:scale-125"
                      onClick={() => handleDelete(index)}
                    />
                    <span className="font-mono font-bold">${fruit.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {cart.length === 0 && (
            <p className="w-full text-center rounded-2xl border-2 border-dashed border-dash p-6 font-mono text-xl text-accent">
              CART IS EMPTY.
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-[400px] flex flex-col gap-6 rounded-2xl border-2 border-dashed border-dash p-6 sm:p-9 text-white transition-all duration-500 hover:shadow-[0_0_15px_#AE9B84] md:sticky md:top-8">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <div className="flex flex-col gap-2 border-y border-gray py-4 font-mono">
            {cart.map((item) => {
              const fruit = FRUITS[item.fruitId];
              return (
                <div
                  className="flex justify-between text-sm"
                  key={fruit.name + item.count}
                >
                  <span>
                    ${fruit.price} x {item.count}
                  </span>
                  <span>${(fruit.price * item.count).toFixed(1)}</span>
                </div>
              );
            })}
            {cart.length === 0 && (
              <p className="text-center font-mono text-lg text-accent">
                CART IS EMPTY.
              </p>
            )}
          </div>
          <div className="flex justify-between text-2xl font-bold">
            <div className="flex items-center gap-2">
              <span>Total</span>
              <span className="text-base font-normal text-gray">
                ({cart.length} Items)
              </span>
            </div>
            <span className="font-mono">${total.toFixed(1)}</span>
          </div>
          <button
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-accent px-8 sm:px-12 md:px-16 py-4 font-mono font-bold text-black transition-all duration-500 hover:bg-secondary hover:text-accent hover:shadow-[0_0_10px_#AE9B84]"
            onClick={() => {
              if (cart.length === 0) {
                alert(
                  "You cannot checkout with an empty cart, put some fruits in the cart first."
                );
                return;
              }
              alert("Yay! You have bought the fruits! It will be delivered to you.");
              setCart([]);
              localStorage.setItem("cart", JSON.stringify([]));
            }}
          >
            <Icon path={mdiCheckAll} size={0.8} />
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
