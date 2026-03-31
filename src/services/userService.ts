import type {
  UserMainData,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
} from "../types/user";
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../mocks/userData";

const API_BASE_URL = "http://localhost:3000";

function getMockData<T>(store: Record<number, T>, id: number): T {
  const data = store[id];
  if (!data) {
    throw new Error(`Failed to fetch: 404`);
  }
  return data;
}

export async function getUserMainData(
  id: number,
  mock = false
): Promise<UserMainData> {
  if (mock) return getMockData(USER_MAIN_DATA, id);

  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const json = await response.json();
    const data = json.data;

    // Normalize: API returns `score` for user 18 and `todayScore` for user 12
    if (data.todayScore === undefined && data.score !== undefined) {
      data.todayScore = data.score;
    }

    return data as UserMainData;
  } catch {
    return getMockData(USER_MAIN_DATA, id);
  }
}

export async function getUserActivity(
  id: number,
  mock = false
): Promise<UserActivity> {
  if (mock) return getMockData(USER_ACTIVITY, id);

  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}/activity`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const json = await response.json();
    return json.data as UserActivity;
  } catch {
    return getMockData(USER_ACTIVITY, id);
  }
}

export async function getUserAverageSessions(
  id: number,
  mock = false
): Promise<UserAverageSessions> {
  if (mock) return getMockData(USER_AVERAGE_SESSIONS, id);

  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}/average-sessions`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const json = await response.json();
    return json.data as UserAverageSessions;
  } catch {
    return getMockData(USER_AVERAGE_SESSIONS, id);
  }
}

export async function getUserPerformance(
  id: number,
  mock = false
): Promise<UserPerformance> {
  if (mock) return getMockData(USER_PERFORMANCE, id);

  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}/performance`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const json = await response.json();
    return json.data as UserPerformance;
  } catch {
    return getMockData(USER_PERFORMANCE, id);
  }
}
