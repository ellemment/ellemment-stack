// app/components/creemson/reports.tsx


// app/components/creemson/reports.tsx
import React from 'react';
import { BentoGrid, BentoGridItem } from '#app/ellemment-ui/components/layout/bento-grid';
import { IconFileText, IconChartBar, IconAward } from "@tabler/icons-react";

const Reports: React.FC = () => {
  const reportsData = [
    {
      title: "Case Studies",
      description: "Overview of case study context and user interview highlights",
      icon: <IconFileText className="h-4 w-4 text-neutral-500" />
    },
    {
      title: "Product Fit Analysis",
      description: "Market segment alignment and user needs addressed",
      icon: <IconChartBar className="h-4 w-4 text-neutral-500" />
    },
    {
      title: "Competitive Advantage",
      description: "Unique selling points and comparison with key competitors",
      icon: <IconAward className="h-4 w-4 text-neutral-500" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="max-w-5xl mx-auto text-3xl font-semi-bold mb-10 text-start">Reports</h2>
      <BentoGrid className="max-w-5xl mx-auto grid-cols-4">
        {reportsData.map((item, index) => {
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

export default Reports;