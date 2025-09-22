import type { Log } from "../types/log";
import { API_URL } from '../config';

export async function getChart(today: string): Promise<Log[]> {
  const url = new URL(`${API_URL}/health/logs/week`);
  url.searchParams.append("date", today); 
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weekly logs");
  }

  return response.json();
}