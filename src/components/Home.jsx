import { FRUITS } from "../utils/constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

function SliderArrows() {
  return null;
}

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1, // Default to 1 slide on smaller screens
    slidesToScroll: 1,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    pauseOnHover: true,
    variableWidth: true,
    nextArrow: <SliderArrows />,
    prevArrow: <SliderArrows />,
    responsive: [ // Add responsive settings
      {
        breakpoint: 768, // Medium screens and up
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024, // Large screens and up
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const navigate = useNavigate();

  return (
    <main className="flex h-full flex-col items-center justify-center gap-10 md:gap-20 py-10 md:py-20 px-4">
      <div className="flex flex-col items-center gap-8 md:gap-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome to Fruits Lelo.</h1>
        <p className="w-full md:w-3/5 text-lg md:text-xl">
          Hamari fresh fruits ki selection ko discover karo, jo flavor aur
          vitality se bharpur hai. Seedha farm se aapke table tak deliver kiya
          jata hai.
        </p>
        <button
          className="rounded-xl bg-accent px-5 py-2 md:px-6 md:py-3 font-mono font-medium text-black transition-all duration-500 hover:bg-bg hover:text-white hover:shadow-[0_0_15px] hover:shadow-accent"
          onClick={() => {
            navigate("/store");
          }}
        >
          Shop Now
        </button>
      </div>
      <div className="w-full md:w-[810px]">
        <Slider {...settings}>
          {FRUITS.map((fruit, index) => {
            if (index > 5) return;
            return (
              <Link to={`/store/${fruit.slug}`} key={fruit.name}>
                <div className="group relative rounded-2xl border-2 border-dashed border-dash p-8 md:p-[75px]">
                  <img
                    src={fruit.src}
                    alt={fruit.name}
                    className="size-[50px] md:size-[75px] transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_#AE9B84]"
                  />
                  <span className="absolute bottom-2 left-2 md:bottom-4 md:left-4 font-bold text-sm md:text-base">
                    {fruit.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </main>
  );
}