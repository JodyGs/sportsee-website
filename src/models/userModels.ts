import type {
  RawUserMainData,
  RawUserActivity,
  RawUserAverageSessions,
  RawUserPerformance,
  UserMainData,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
} from "../types/user";

const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

const KIND_LABELS: Record<string, string> = {
  cardio: "Cardio",
  energy: "Énergie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};


export function modelUserMainData(raw: RawUserMainData): UserMainData {
  // L'API nomme ce champ `todayScore` pour l'utilisateur 12 et `score` pour le 18
  const todayScore = raw.todayScore ?? raw.score ?? 0;

  return {
    id: raw.id,
    firstName: raw.userInfos.firstName,
    lastName: raw.userInfos.lastName,
    age: raw.userInfos.age,
    todayScore,
    scorePercentage: Math.round(todayScore * 100),
    keyData: {
      ...raw.keyData,
      calorieCountFormatted: `${raw.keyData.calorieCount.toLocaleString(
        "en-US"
      )}kCal`,
    },
  };
}

export function modelUserActivity(raw: RawUserActivity): UserActivity {
  const kilograms = raw.sessions.map((session) => session.kilogram);

  return {
    userId: raw.userId,
    sessions: raw.sessions.map((session, index) => ({
      day: session.day,
      label: String(index + 1),
      kilogram: session.kilogram,
      calories: session.calories,
    })),
    // Marges de l'axe des poids reprises de la maquette
    kilogramMin: kilograms.length ? Math.min(...kilograms) - 1 : 0,
    kilogramMax: kilograms.length ? Math.max(...kilograms) + 2 : 0,
  };
}

export function modelUserAverageSessions(
  raw: RawUserAverageSessions
): UserAverageSessions {
  return {
    userId: raw.userId,
    sessions: raw.sessions.map((session, index) => ({
      day: session.day,
      label: DAY_LABELS[index] ?? String(session.day),
      key: `${DAY_LABELS[index] ?? session.day}_${index}`,
      sessionLength: session.sessionLength,
    })),
  };
}

export function modelUserPerformance(
  raw: RawUserPerformance
): UserPerformance {
  return {
    userId: raw.userId,
    data: [...raw.data].reverse().map((entry) => {
      const kindName = raw.kind[entry.kind];
      return {
        subject: KIND_LABELS[kindName] ?? kindName,
        value: entry.value,
      };
    }),
  };
}
