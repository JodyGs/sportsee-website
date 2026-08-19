import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { AverageSession } from "../types/user";

interface AverageSessionsProps {
  sessions: AverageSession[];
}

const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

// Darkens the card to the right of the hovered point, like the mockup's hover state
function CustomCursor({ points }: { points?: Array<{ x: number }> }) {
  if (!points || !points.length) return null;
  return (
    <rect
      x={points[0].x}
      y={0}
      width="100%"
      height="100%"
      fill="rgba(0,0,0,0.1)"
    />
  );
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-black text-[8px] px-2 py-1">
        <p>{payload[0].value} min</p>
      </div>
    );
  }
  return null;
}

export default function AverageSessions({ sessions }: AverageSessionsProps) {
  const data = useMemo(
    () =>
      sessions.map((s, i) => ({
        day: `${dayLabels[i]}_${i}`,
        label: dayLabels[i],
        sessionLength: s.sessionLength,
      })),
    [sessions]
  );

  return (
    <div className="bg-[#FF0000] rounded-[5px] relative overflow-hidden w-full h-[263px]">
      <h2 className="text-white/50 text-[15px] font-medium px-7 pt-7 absolute z-10">
        Durée moyenne des sessions
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 70, right: 10, bottom: 20, left: 10 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            tickFormatter={(value: string) => value.split("_")[0]}
          />
          <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <defs>
            <linearGradient id="sessionLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,1)" />
            </linearGradient>
          </defs>
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#sessionLineGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#FFF",
              stroke: "rgba(255,255,255,0.3)",
              strokeWidth: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
