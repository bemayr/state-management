import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { MousePosition, PanelSide, JokeResult } from "../../types/state";
import { TARGET_CROSSINGS, INITIAL_MOUSE_POSITION, INITIAL_JOKE } from "../../types/state";
import { fetchDadJoke } from "../../api/fetchJoke";

interface ChallengeSliceState {
  mousePosition: MousePosition;
  currentSide: PanelSide | null;
  previousSide: PanelSide | null;
  crossings: number;
  joke: JokeResult;
}

const initialState: ChallengeSliceState = {
  mousePosition: INITIAL_MOUSE_POSITION,
  currentSide: null,
  previousSide: null,
  crossings: 0,
  joke: INITIAL_JOKE,
};

export const fetchJokeThunk = createAsyncThunk(
  "challenge/fetchJoke",
  async () => fetchDadJoke(),
);

export const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    mouseMove(state, action: PayloadAction<{ position: MousePosition; side: PanelSide }>) {
      const { position, side } = action.payload;
      const crossed =
        state.currentSide !== null &&
        side !== state.currentSide &&
        state.crossings < TARGET_CROSSINGS;

      state.mousePosition = position;
      state.previousSide = state.currentSide;
      state.currentSide = side;
      if (crossed) state.crossings += 1;
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokeThunk.pending, (state) => {
        state.joke = { status: "loading", joke: null, error: null };
      })
      .addCase(fetchJokeThunk.fulfilled, (state, action) => {
        state.joke = { status: "success", joke: action.payload, error: null };
      })
      .addCase(fetchJokeThunk.rejected, (state, action) => {
        state.joke = { status: "error", joke: null, error: action.error.message ?? "Unknown error" };
      });
  },
});

export const { mouseMove, reset } = challengeSlice.actions;
