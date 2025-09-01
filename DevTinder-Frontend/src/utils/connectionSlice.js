import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

// 🔹 Thunk to fetch connections from backend
export const fetchConnections = createAsyncThunk(
  "connection/fetchConnections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/connections");
      return res.data; // make sure backend sends array
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch connections"
      );
    }
  }
);

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addConnections: (state, action) => {
      state.data = action.payload;
    },
    removeConnection: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConnections.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchConnections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addConnections, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
