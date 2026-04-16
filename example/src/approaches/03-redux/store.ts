import { configureStore } from "@reduxjs/toolkit";
import { challengeSlice } from "./challengeSlice";

export function createChallengeStore() {
  return configureStore({
    reducer: {
      challenge: challengeSlice.reducer,
    },
  });
}

export type ChallengeStore = ReturnType<typeof createChallengeStore>;
export type RootState = ReturnType<ChallengeStore["getState"]>;
export type AppDispatch = ChallengeStore["dispatch"];
