import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import type { PerformanceData } from "../types/user";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface PerformanceProps {
  data: PerformanceData[];
}

export default function Performance({ data }: PerformanceProps) {
  // The card shrinks below xl, so pull the radar in to keep the labels inside it
  const isWide = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="bg-[#282D30] rounded-[5px] w-full h-[263px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius={isWide ? "65%" : "55%"} data={data}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#FFF", fontSize: isWide ? 12 : 10 }}
          />
          <Radar
            dataKey="value"
            fill="#FF0101"
            fillOpacity={0.7}
            stroke="transparent"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
