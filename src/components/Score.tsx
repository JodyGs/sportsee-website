import { useMemo } from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface ScoreProps {
  todayScore: number;
}

export default function Score({ todayScore }: ScoreProps) {
  const percentage = Math.round(todayScore * 100);
  const data = useMemo(() => [{ value: percentage }], [percentage]);

  return (
    <div className="bg-[#FBFBFB] rounded-[5px] w-full h-[263px] relative">
      <h2 className="text-[15px] font-medium text-[#20253A] absolute top-6 left-7 z-10">
        Score
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius={75}
          outerRadius={85}
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
        <div className="w-[130px] h-[130px] bg-white rounded-full flex flex-col items-center justify-center">
          <span className="text-[26px] font-bold text-[#282D30]">
            {percentage}%
          </span>
          <span className="text-[16px] text-[#74798C]">de votre</span>
          <span className="text-[16px] text-[#74798C]">objectif</span>
        </div>
      </div>
    </div>
  );
}
