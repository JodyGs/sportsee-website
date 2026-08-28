import { useMemo } from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface ScoreProps {
  percentage: number;
}

export default function Score({ percentage }: ScoreProps) {
  const data = useMemo(() => [{ value: percentage }], [percentage]);

  return (
    <div className="bg-[#FBFBFB] rounded-[5px] w-full h-[263px] relative">
      <h2 className="text-[15px] font-medium text-[#20253A] absolute top-6 left-5 xl:left-7 z-10">
        Score
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="59%"
          outerRadius="67%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            dataKey="value"
            fill="#FF0000"
            cornerRadius={10}
            background={false}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Recharts dimensionne l'anneau sur min(largeur, hauteur) de la carte.
            Le disque doit suivre la même base, sinon il recouvre l'anneau sur
            une carte plus large que haute. La hauteur étant fixée à 263px,
            min(52%, 137px) reproduit ce min() côté CSS. */}
        <div className="w-[min(52%,137px)] aspect-square bg-white rounded-full flex flex-col items-center justify-center">
          <span className="text-xl xl:text-[26px] font-bold text-[#282D30]">
            {percentage}%
          </span>
          <span className="text-[13px] xl:text-[16px] text-[#74798C]">de votre</span>
          <span className="text-[13px] xl:text-[16px] text-[#74798C]">objectif</span>
        </div>
      </div>
    </div>
  );
}
