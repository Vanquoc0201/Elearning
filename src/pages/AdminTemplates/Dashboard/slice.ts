import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";
import { User } from "../../../models";

export const fetchListUser = createAsyncThunk<User[], void, { rejectValue: string }>(
  "listUser/fetchListUser",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiService.get<User[]>("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
      return result.data;
    }
    catch (error: unknown) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue("Lỗi không xác định");
      }
      
  }
);

type TState = {
  loading: boolean;
  data?: User[] | null;
  error: string | null;
};

const initialState: TState = {
  loading: false,
  data: null,
  error: null,
};

const listUserSlice = createSlice({
  name: "listUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListUser.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchListUser.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Lỗi không xác định";
    });
  },
});

export default listUserSlice.reducer;
