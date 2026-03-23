import { useMemo } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

interface ScoreProps {
  todayScore: number;
}

export default function Score({ todayScore }: ScoreProps) {
  const data = useMemo(
    () => [
      { value: 100, fill: "#FBFBFB" },
      { value: todayScore * 100, fill: "#FF0000" },
    ],
    [todayScore]
  );

  return (
    <div className="bg-[#FBFBFB] rounded-[5px] w-full h-[263px] relative">
      <h2 className="text-[15px] font-medium text-[#20253A] absolute top-6 left-7 z-10">
        Score
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="0%"
          outerRadius="80%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <RadialBar dataKey="value" cornerRadius={10} background={false} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-[130px] h-[130px] bg-white rounded-full flex flex-col items-center justify-center">
          <span className="text-[26px] font-bold text-[#282D30]">
            {todayScore * 100}%
          </span>
          <span className="text-[16px] text-[#74798C]">de votre</span>
          <span className="text-[16px] text-[#74798C]">objectif</span>
        </div>
      </div>
    </div>
  );
}
