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
import {
  modelUserMainData,
  modelUserActivity,
  modelUserAverageSessions,
  modelUserPerformance,
} from "../models/userModels";
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

async function fetchData(endpoint: string): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

export async function getUserMainData(
  id: number,
  mock = false
): Promise<UserMainData> {
  const raw = mock
    ? getMockData(USER_MAIN_DATA, id)
    : ((await fetchData(`/user/${id}`)) as RawUserMainData);

  return modelUserMainData(raw);
}

export async function getUserActivity(
  id: number,
  mock = false
): Promise<UserActivity> {
  const raw = mock
    ? getMockData(USER_ACTIVITY, id)
    : ((await fetchData(`/user/${id}/activity`)) as RawUserActivity);

  return modelUserActivity(raw);
}

export async function getUserAverageSessions(
  id: number,
  mock = false
): Promise<UserAverageSessions> {
  const raw = mock
    ? getMockData(USER_AVERAGE_SESSIONS, id)
    : ((await fetchData(
        `/user/${id}/average-sessions`
      )) as RawUserAverageSessions);

  return modelUserAverageSessions(raw);
}

export async function getUserPerformance(
  id: number,
  mock = false
): Promise<UserPerformance> {
  const raw = mock
    ? getMockData(USER_PERFORMANCE, id)
    : ((await fetchData(`/user/${id}/performance`)) as RawUserPerformance);

  return modelUserPerformance(raw);
}
