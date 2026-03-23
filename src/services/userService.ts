import type {
  UserMainData,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
} from "../types/user";

const API_BASE_URL = "http://localhost:3000";

export async function getUserMainData(id: number): Promise<UserMainData> {
  const response = await fetch(`${API_BASE_URL}/user/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user main data: ${response.status}`);
  }
  const json = await response.json();
  const data = json.data;

  // Normalize: API returns `score` for user 18 and `todayScore` for user 12
  if (data.todayScore === undefined && data.score !== undefined) {
    data.todayScore = data.score;
  }

  return data as UserMainData;
}

export async function getUserActivity(id: number): Promise<UserActivity> {
  const response = await fetch(`${API_BASE_URL}/user/${id}/activity`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user activity: ${response.status}`);
  }
  const json = await response.json();
  return json.data as UserActivity;
}

export async function getUserAverageSessions(
  id: number
): Promise<UserAverageSessions> {
  const response = await fetch(`${API_BASE_URL}/user/${id}/average-sessions`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user average sessions: ${response.status}`);
  }
  const json = await response.json();
  return json.data as UserAverageSessions;
}

export async function getUserPerformance(
  id: number
): Promise<UserPerformance> {
  const response = await fetch(`${API_BASE_URL}/user/${id}/performance`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user performance: ${response.status}`);
  }
  const json = await response.json();
  return json.data as UserPerformance;
}
