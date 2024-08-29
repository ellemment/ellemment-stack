// app/components/creemson-utility/bento-grid.tsx

import React from 'react';
import { BentoGrid, BentoGridItem } from '#app/ellemment-ui/components/layout/bento-grid';
import { IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from "@tabler/icons-react";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const getItemConfig = (index: number, total: number) => {
  const configs = {
    1: [
      { className: "md:col-span-4" },
    ],
    2: [
      { className: "md:col-span-3" },
      { className: "md:col-span-2" },
    ],
    3: [
      { className: "md:col-span-4" },
      { className: "md:col-span-2" },
      { className: "md:col-span-2" },
    ],
    4: [
      { className: "md:col-span-2" },
      { className: "md:col-span-1" },
      { className: "md:col-span-1" },
      { className: "md:col-span-2" },
    ],
  };

  const defaultConfig = { className: "" };
  return (configs[total as keyof typeof configs] || [])[index] || defaultConfig;
};

const icons = [
  <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  <IconSignature className="h-4 w-4 text-neutral-500" />,
  <IconTableColumn className="h-4 w-4 text-neutral-500" />,
];

const ProductGrid = ({ cardCount = 4 }: { cardCount?: number }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <BentoGrid className="max-w-5xl mx-auto px-4 grid-cols-4">
        {[...Array(cardCount)].map((_, index) => {
          const config = getItemConfig(index, cardCount);
          return (
            <BentoGridItem
              key={index}
              title={`Card ${index + 1}`}
              description={`This is a description for Card ${index + 1}.`}
              header={<Skeleton />}
              icon={icons[index % icons.length]}
              className={config.className}
            />
          );
        })}
      </BentoGrid>
    </div>
  );
};

export default ProductGrid;