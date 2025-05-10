import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type T_THEME = "light" | "dark";
export interface AppState {
  theme: T_THEME;
}

export const initialState: AppState = {
  theme: "light",
};

const AppStateSlice = createSlice({
  name: "AppState",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
    },
  },
});
export const AppStateSelector = (state: RootState) => state.AppState.theme;
export const { setTheme } = AppStateSlice.actions;
export default AppStateSlice.reducer;
