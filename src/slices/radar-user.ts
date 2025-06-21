import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthContextProps } from "react-oidc-context";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { UserState } from "@/types/user-state";

import { userSchema } from "@/schemas/user";

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

interface RadarUserArgs {
  auth: AuthContextProps;
  user: z.infer<typeof userSchema>;
}

export const fetchRadarUser = createAsyncThunk<z.infer<typeof userSchema>, RadarUserArgs>(
  "radarUser/fetchRadarUser",
  async ({ user, auth }) => {
    const res = await fetch(`${RADAR_API_URL}/radar-users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to create radar user");
    return (await res.json()) as z.infer<typeof userSchema>;
  },
);

const radarUserSlice = createSlice({
  name: "radarUser",
  initialState,
  reducers: {
    setRadarUser(state, action: PayloadAction<z.infer<typeof userSchema>>) {
      state.user = action.payload;
    },
    clearRadarUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRadarUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRadarUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchRadarUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setRadarUser, clearRadarUser } = radarUserSlice.actions;
export const radarUserReducer = radarUserSlice.reducer;
