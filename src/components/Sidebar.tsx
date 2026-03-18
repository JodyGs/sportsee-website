import { Meditation, Swim, Cycling, Dumbell } from "../svgs";

const icons = [
  { Icon: Meditation, label: "Méditation" },
  { Icon: Swim, label: "Natation" },
  { Icon: Cycling, label: "Cyclisme" },
  { Icon: Dumbell, label: "Musculation" },
];

export default function Sidebar() {
  return (
    <aside className="w-[117px] min-h-[calc(100vh-91px)] bg-[#020203] flex flex-col items-center justify-center relative">
      <div className="flex flex-col gap-5">
        {icons.map(({ Icon, label }) => (
          <button
            key={label}
            className="w-16 h-16 bg-white rounded-[6px] flex items-center justify-center"
          >
            <Icon className="w-8 h-8" />
          </button>
        ))}
      </div>
      <p className="text-white text-xs absolute bottom-[59px] -rotate-90 whitespace-nowrap">
        Copyright, SportSee 2020
      </p>
    </aside>
  );
}
