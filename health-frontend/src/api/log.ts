import type { Log } from "../types/log";
import { API_URL } from '../config';


export async function getLog(date: string): Promise<Log> {
  console.log("GET SINGLE LOG FUNCTION")
  const url = new URL(`${API_URL}/health/log`);
  console.log("AFTER URL...")
  url.searchParams.append("date", date)
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch log");
  }

  return response.json();
}

export async function postLog(data: Log): Promise<string> {
  console.log("POST LOG FUNCTION")
  const url = new URL(`${API_URL}/health/log`);
  console.log("AFTER URL...")
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  console.log("response POSTING LOG in api:", response);

  if (!response.ok) {
    throw new Error("Failed to save log");
  }
  const responseData: string = await response.text(); 
  return responseData;
}