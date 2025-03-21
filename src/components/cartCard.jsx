import { FRUITS } from "../utils/constants";
import Icon from "@mdi/react";
import { mdiCart, mdiCheckAll, mdiTrashCan } from "@mdi/js";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./App";

export default function CartCard() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cart.length; i++)
      temp += FRUITS[cart[i].fruitId].price * cart[i].count;
    setTotal(temp);
  }, [cart]);

  function handleDelete(index) {
    setCart((prev) => {
      const newCart = [...prev];
      newCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-dash p-6 sm:p-9 text-white shadow-[0_0_15px_#AE9B84] w-full max-w-lg mx-auto">
      <h2 className="border-b-[1px] border-gray pb-4 sm:pb-6 text-xl sm:text-2xl font-bold">
        Shopping Cart
      </h2>
      <div className="scrollbar-thin scrollbar-webkit max-h-[300px] sm:max-h-[362px] overflow-y-auto py-6 sm:py-9 pr-2 sm:pr-5">
        {cart.map((item, index) => {
          const fruit = FRUITS[item.fruitId];

          return (
            <div className="flex items-center gap-4 sm:gap-[25px] mb-4 sm:mb-0" key={fruit.id}>
              <div className="shrink-0 rounded-2xl border-2 border-dashed border-dash p-4 sm:p-[25px]">
                <img src={fruit.src} alt={fruit.name} className="size-[20px] sm:size-[25px]" />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex w-2/5 items-center justify-between">
                  <div className="flex flex-col justify-between">
                    <h3 className="font-bold text-sm sm:text-base">{fruit.name}</h3>
                    <span className="text-gray text-xs sm:text-sm">{fruit.family}</span>
                    <span className="text-gray text-xs sm:text-sm">Qty: {item.count}</span>
                  </div>
                  <Icon
                    path={mdiTrashCan}
                    size={0.9} sm:size={1.1}
                    color="red"
                    className="cursor-pointer rounded-md bg-secondary p-1 transition-all hover:scale-125"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  />
                </div>
                <div className="flex h-full items-center gap-3 sm:gap-5 font-mono font-bold text-xs sm:text-sm">
                  <span>
                    ${fruit.price} x {item.count} = $
                    {(fruit.price * item.count).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {cart.length === 0 && (
          <p className="text-center font-mono text-sm sm:text-lg text-accent">
            CART IS EMPTY.
          </p>
        )}
      </div>
      <div className="flex justify-between border-t-[1px] border-gray py-4 sm:py-6 font-mono text-lg sm:text-2xl font-bold">
        <span>Total</span>
        <span>${total.toFixed(1)}</span>
      </div>
      <div className="flex flex-col gap-2 sm:gap-3">
        <button
          className="flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-accent px-8 sm:px-24 py-2 sm:py-4 font-mono font-bold text-black transition-all duration-500 hover:bg-secondary hover:text-accent hover:shadow-[0_0_10px_#AE9B84] text-sm sm:text-base"
          onClick={() => {
            if (cart.length === 0) {
              alert(
                "You cannot checkout with an empty cart, put some fruits in the cart first.",
              );
              return;
            }

            alert(
              "Yay! You have bought the fruits! It will be delivered to you.",
            );
            setCart([]);
            localStorage.setItem("cart", JSON.stringify([]));
          }}
        >
          <Icon path={mdiCheckAll} size={0.7} sm:size={0.8} />
          Checkout
        </button>
        <button
          className="flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-secondary px-8 sm:px-24 py-2 sm:py-4 font-mono font-bold text-accent transition-all duration-500 hover:bg-accent hover:text-black hover:shadow-[0_0_10px] hover:shadow-accent text-sm sm:text-base"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <Icon path={mdiCart} size={0.7} sm:size={0.8} />
          Open Cart
        </button>
      </div>
    </div>
  );
}