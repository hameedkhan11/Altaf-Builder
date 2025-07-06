// FAQHeader.tsx
import React from "react";

const FAQHeader: React.FC = () => {
  return (
    <header className="mb-12 lg:mb-16 pt-8 lg:pt-12 pl-6 lg:pl-8">
      <div className="text-lg uppercase tracking-wider text-gray-500 mb-4 font-medium font-optima">
        FAQ&apos;S
      </div>
      <h2 className="text-4xl lg:text-5xl font-light mb-6 tracking-tight leading-tight flex flex-col gap-y-4">
        Frequently
        <span className="text-4xl lg:text-5xl">Asked Questions</span>
      </h2>
    </header>
  );
};

export default FAQHeader;
