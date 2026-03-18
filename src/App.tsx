import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DailyActivity from "./components/DailyActivity";
import AverageSessions from "./components/AverageSessions";
import Performance from "./components/Performance";
import Score from "./components/Score";
import KeyDataCard from "./components/KeyDataCard";
import { Fire, Protein, Glucid, Lipid } from "./svgs";
import { USER_MAIN_DATA } from "./mocks/userData";

function App() {
  const { firstName } = USER_MAIN_DATA.userInfos;
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
    USER_MAIN_DATA.keyData;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-[107px] py-[68px]">
          <h1 className="text-5xl font-medium mb-2">
            Bonjour <span className="text-[#FF0101]">{firstName}</span>
          </h1>
          <p className="text-lg text-[#20253A] mb-[77px]">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>

          <div className="flex gap-[31px]">
            {/* Left: Charts */}
            <div className="flex-1 flex flex-col gap-[28px]">
              <DailyActivity />
              <div className="grid grid-cols-3 gap-[30px]">
                <AverageSessions />
                <Performance />
                <Score />
              </div>
            </div>

            {/* Right: Key data cards */}
            <div className="flex flex-col gap-[39px] w-[258px]">
              <KeyDataCard
                icon={<Fire className="w-4 h-5" />}
                bgColor="rgba(255,0,0,0.07)"
                value={`${calorieCount.toLocaleString("en-US")}kCal`}
                label="Calories"
              />
              <KeyDataCard
                icon={<Protein className="w-[19px] h-[19px]" />}
                bgColor="rgba(74,184,255,0.1)"
                value={`${proteinCount}g`}
                label="Protéines"
              />
              <KeyDataCard
                icon={<Glucid className="w-[17px] h-5" />}
                bgColor="rgba(253,204,12,0.1)"
                value={`${carbohydrateCount}g`}
                label="Glucides"
              />
              <KeyDataCard
                icon={<Lipid className="w-5 h-[19px]" />}
                bgColor="rgba(253,81,129,0.1)"
                value={`${lipidCount}g`}
                label="Lipides"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
