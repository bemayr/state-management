import type { DadJokeResponse } from "../types/api";

export async function fetchDadJoke(): Promise<string> {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data: DadJokeResponse = await response.json();
  return data.joke;
}
