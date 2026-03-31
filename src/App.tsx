import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DailyActivity from "./components/DailyActivity";
import AverageSessions from "./components/AverageSessions";
import Performance from "./components/Performance";
import Score from "./components/Score";
import KeyDataCard from "./components/KeyDataCard";
import { Fire, Protein, Glucid, Lipid } from "./svgs";
import {
  getUserMainData,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from "./services/userService";
import type { UserMainData, UserActivity, UserAverageSessions, UserPerformance } from "./types/user";

function App() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const userId = Number(id);
  const isMock = searchParams.get("mock") === "true";

  const [userData, setUserData] = useState<UserMainData | null>(null);
  const [activity, setActivity] = useState<UserActivity | null>(null);
  const [averageSessions, setAverageSessions] = useState<UserAverageSessions | null>(null);
  const [performance, setPerformance] = useState<UserPerformance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [mainData, activityData, sessionsData, perfData] =
          await Promise.all([
            getUserMainData(userId, isMock),
            getUserActivity(userId, isMock),
            getUserAverageSessions(userId, isMock),
            getUserPerformance(userId, isMock),
          ]);
        setUserData(mainData);
        setActivity(activityData);
        setAverageSessions(sessionsData);
        setPerformance(perfData);
      } catch (err) {
        const message = err instanceof Error ? err.message : "";
        if (message.includes("404")) {
          setError("Utilisateur non trouvé");
        } else {
          setError(message || "Une erreur est survenue");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId, isMock]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-[107px] py-[68px]">
            <p className="text-lg text-[#20253A]">Chargement...</p>
          </main>
        </div>
      </div>
    );
  }

  if (error || !userData || !activity || !averageSessions || !performance) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-[107px] py-[68px]">
            <p className="text-lg text-red-500">
              Erreur : {error ?? "Impossible de charger les données"}
            </p>
          </main>
        </div>
      </div>
    );
  }

  const { firstName } = userData.userInfos;
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
    userData.keyData;

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
              <DailyActivity sessions={activity.sessions} />
              <div className="grid grid-cols-3 gap-[30px]">
                <AverageSessions sessions={averageSessions.sessions} />
                <Performance kind={performance.kind} data={performance.data} />
                <Score todayScore={userData.todayScore} />
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
