import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import type { ActivitySession } from "../types/user";

interface DailyActivityProps {
  sessions: ActivitySession[];
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (active && payload && payload.length >= 2) {
    return (
      <div className="bg-[#E60000] text-white text-[7px] p-2 flex flex-col items-center gap-6">
        <p>{payload[0].value}kg</p>
        <p>{payload[1].value}kCal</p>
      </div>
    );
  }
  return null;
}

export default function DailyActivity({ sessions }: DailyActivityProps) {
  const { data, kgMin, kgMax } = useMemo(() => {
    const kgMin = Math.min(...sessions.map((s) => s.kilogram)) - 1;
    const kgMax = Math.max(...sessions.map((s) => s.kilogram)) + 2;
    const data = sessions.map((s, i) => ({
      name: (i + 1).toString(),
      kilogram: s.kilogram,
      calories: s.calories,
    }));
    return { data, kgMin, kgMax };
  }, [sessions]);

  return (
    <div className="bg-[#FBFBFB] rounded-[5px] p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[15px] font-medium text-[#20253A]">
          Activité quotidienne
        </h2>
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#282D30]" />
            <span className="text-[14px] text-[#74798C]">Poids (kg)</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#E60000]" />
            <span className="text-[14px] text-[#74798C]">
              Calories brûlées (kCal)
            </span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={8} barCategoryGap="35%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
            stroke="#DEDEDE"
            dy={15}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[kgMin, kgMax]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
            tickCount={3}
            allowDataOverflow
          />
          <YAxis yAxisId="left" hide domain={[0, 500]} allowDataOverflow />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(196,196,196,0.5)" }} />
          <Bar
            yAxisId="right"
            dataKey="kilogram"
            fill="#282D30"
            barSize={7}
            radius={[3, 3, 0, 0]}
          />
          <Bar
            yAxisId="left"
            dataKey="calories"
            fill="#E60000"
            barSize={7}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
