// app/components/creemson/product.tsx

import React from 'react';
import { BentoGrid, BentoGridItem } from '#app/ellemment-ui/components/layout/bento-grid';
import { IconBulb, IconGitBranch, IconTrophy } from "@tabler/icons-react";

const Product: React.FC = () => {
  const productData = [
    {
      title: "Solution Overview",
      description: "Brief description of your product and key features",
      icon: <IconBulb className="h-4 w-4 text-neutral-500" />
    },
    {
      title: "How It Works",
      description: "Step-by-step breakdown and visual representation",
      icon: <IconGitBranch className="h-4 w-4 text-neutral-500" />
    },
    {
      title: "Key Benefits",
      description: "Main benefits and quantifiable results",
      icon: <IconTrophy className="h-4 w-4 text-neutral-500" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="max-w-5xl mx-auto text-3xl font-semi-bold mb-10 text-start">Product</h2>
      <BentoGrid className="max-w-5xl mx-auto grid-cols-4">
        {productData.map((item, index) => {
          const config = getItemConfig(index, 3);
          return (
            <BentoGridItem
              key={index}
              title={item.title}
              description={item.description}
              header={<Skeleton />}
              icon={item.icon}
              className={config.className}
            />
          );
        })}
      </BentoGrid>
    </div>
  );
};

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const getItemConfig = (index: number, total: number) => {
  const configs = {
    3: [
      { className: "md:col-span-4" },
      { className: "md:col-span-2" },
      { className: "md:col-span-2" },
    ],
  };
  const defaultConfig = { className: "" };
  return (configs[total as keyof typeof configs] || [])[index] || defaultConfig;
};

export default Product;