// components/register/RegisterHero.tsx
import { Hero } from "../common/Hero";
import { RegisterInterestForm } from "./register-interest-form";

export const RegisterHero = () => {
  return (
    <>
    <Hero
      backgroundType="image"
      backgroundSrc="Booking3_uieo5a"
      overlay="dark"
      contentAlignment="center"
      enableAnimations={true}
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center text-start w-full">
        <div className="text-white space-y-6 flex flex-col items-start">
          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            Luxury Living Redefined
          </h1>
          <p className="leading-relaxed text-sm w-[30rem]">
            Experience unparalleled luxury in our meticulously crafted
            apartments. From one-bedroom sanctuaries to expansive two-bedroom
            residences, each space is designed to exceed your expectations.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end ml-16">
          <RegisterInterestForm />
        </div>
      </div>
    </Hero>
      </>
  );
};
