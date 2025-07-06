
// FAQList.tsx
"use client";
import React, { useState } from "react";
import FAQItem from "./FAQitem";
import { faqData } from "@/data/faqs/data";

const FAQList: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="pr-6 lg:pr-8 ml-20" itemScope itemType="https://schema.org/FAQPage">
      {faqData.map((item, index) => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={openItem === item.id}
          onToggle={toggleItem}
          isLast={index === faqData.length - 1}
        />
      ))}
    </div>
  );
};

export default FAQList;
