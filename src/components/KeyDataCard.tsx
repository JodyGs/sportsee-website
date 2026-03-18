import type { ReactNode } from "react";

interface KeyDataCardProps {
  icon: ReactNode;
  bgColor: string;
  value: string;
  label: string;
}

export default function KeyDataCard({
  icon,
  bgColor,
  value,
  label,
}: KeyDataCardProps) {
  return (
    <div className="flex items-center gap-6 bg-[#FBFBFB] rounded-[5px] px-8 py-5">
      <div
        className="w-[60px] h-[60px] rounded-[6px] flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-[#282D30]">{value}</p>
        <p className="text-sm text-[#74798C]">{label}</p>
      </div>
    </div>
  );
}
