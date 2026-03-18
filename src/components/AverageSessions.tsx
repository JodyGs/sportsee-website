import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { USER_AVERAGE_SESSIONS } from "../mocks/userData";

const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

const data = USER_AVERAGE_SESSIONS.sessions.map((s, i) => ({
  day: `${dayLabels[i]}_${i}`,
  label: dayLabels[i],
  sessionLength: s.sessionLength,
}));

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

export default function AverageSessions() {
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
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="rgba(255,255,255,0.7)"
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
