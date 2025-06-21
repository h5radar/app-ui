import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthContextProps } from "react-oidc-context";
import { z } from "zod";

import { ACCOUNT_API_URL } from "@/constants/application";

import { UserState } from "@/types/user-state";

import { userSchema } from "@/schemas/user";

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

interface AccountUserArgs {
  auth: AuthContextProps;
  user: z.infer<typeof userSchema>;
}

export const fetchAccountUser = createAsyncThunk<z.infer<typeof userSchema>, AccountUserArgs>(
  "accountUser/fetchAccountUser",
  async ({ user, auth }) => {
    const res = await fetch(`${ACCOUNT_API_URL}/account-users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to create account user");
    return (await res.json()) as z.infer<typeof userSchema>;
  },
);

const accountUserSlice = createSlice({
  name: "accountUser",
  initialState,
  reducers: {
    setAccountUser(state, action: PayloadAction<z.infer<typeof userSchema>>) {
      state.user = action.payload;
    },
    clearAccountUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAccountUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setAccountUser, clearAccountUser } = accountUserSlice.actions;
export const accountUserReducer = accountUserSlice.reducer;
