import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      if (!user || !token) {
        console.error("Invalid credentials payload");
        return;
      }

      state.user = user;
      state.isAuth = true;

      // ✅ Store token only in localStorage (not in Redux)
      try {
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Failed to save token:", error);
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuth = false;

      try {
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Failed to clear token from localStorage:", error);
      }
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    clearAuth: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setCredentials, logout, updateUser, clearAuth } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectUserRole = (state) => state.auth.user?.role;

export default authSlice.reducer;
