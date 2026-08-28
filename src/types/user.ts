/* ------------------------------------------------------------------ *
 * Réponses brutes — la forme telle qu'elle arrive de l'API
 * ------------------------------------------------------------------ */

export interface UserInfos {
  firstName: string;
  lastName: string;
  age: number;
}

export interface KeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

export interface RawUserMainData {
  id: number;
  userInfos: UserInfos;
  /** L'API renvoie `todayScore` pour l'utilisateur 12... */
  todayScore?: number;
  /** ...et `score` pour l'utilisateur 18. */
  score?: number;
  keyData: KeyData;
}

export interface RawActivitySession {
  day: string;
  kilogram: number;
  calories: number;
}

export interface RawUserActivity {
  userId: number;
  sessions: RawActivitySession[];
}

export interface RawAverageSession {
  day: number;
  sessionLength: number;
}

export interface RawUserAverageSessions {
  userId: number;
  sessions: RawAverageSession[];
}

export interface RawPerformanceData {
  value: number;
  kind: number;
}

export interface RawUserPerformance {
  userId: number;
  kind: Record<number, string>;
  data: RawPerformanceData[];
}

/* ------------------------------------------------------------------ *
 * Modèles — la forme consommée par les composants
 * ------------------------------------------------------------------ */

export interface UserMainData {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  /** Ratio 0 → 1, tel que fourni par l'API */
  todayScore: number;
  /** Le même score en pourcentage entier, prêt à afficher */
  scorePercentage: number;
  keyData: KeyData & {
    /** Ex. « 1,930kCal » */
    calorieCountFormatted: string;
  };
}

export interface ActivitySession {
  /** Date ISO d'origine, conservée telle quelle */
  day: string;
  /** Numéro du jour affiché sous les barres (1 → 7) */
  label: string;
  kilogram: number;
  calories: number;
}

export interface UserActivity {
  userId: number;
  sessions: ActivitySession[];
  /** Bornes de l'axe des poids, calculées une fois pour toutes */
  kilogramMin: number;
  kilogramMax: number;
}

export interface AverageSession {
  day: number;
  /** Initiale du jour : L, M, M, J, V, S, D */
  label: string;
  /** Clé unique pour Recharts — les deux « M » se confondraient sinon */
  key: string;
  sessionLength: number;
}

export interface UserAverageSessions {
  userId: number;
  sessions: AverageSession[];
}

export interface PerformanceData {
  /** Libellé français déjà résolu depuis le dictionnaire `kind` de l'API */
  subject: string;
  value: number;
}

export interface UserPerformance {
  userId: number;
  data: PerformanceData[];
}
