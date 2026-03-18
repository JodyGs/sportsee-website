import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { USER_PERFORMANCE } from "../mocks/userData";

const kindLabels: Record<string, string> = {
  cardio: "Cardio",
  energy: "Énergie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};

const data = USER_PERFORMANCE.data.map((d) => ({
  subject: kindLabels[USER_PERFORMANCE.kind[d.kind]] ?? USER_PERFORMANCE.kind[d.kind],
  value: d.value,
}));

export default function Performance() {
  return (
    <div className="bg-[#282D30] rounded-[5px] w-full h-[263px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#FFF", fontSize: 12 }}
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
