import { API_URL } from '../config';

export async function getRecommendation(): Promise<string> {
  const url = new URL(`${API_URL}/health/recommendations`);
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("response recs in api:", response);

  if (!response.ok) {
    throw new Error("Failed to fetch weekly logs");
  }
  const data: string = await response.text(); 
  return data;
}