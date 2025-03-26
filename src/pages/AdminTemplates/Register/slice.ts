import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";
import { UnregisteredUser } from "../../../models";

// Fetch danh sách người dùng chưa ghi danh
export const fetchCourseNotRegister = createAsyncThunk(
  "courses/fetchUnregisteredUsers",
  async (maKhoaHoc: string, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`,
        { maKhoaHoc }
      );

      if (!response.data || response.data.length === 0) {
        return rejectWithValue("Không tìm thấy người dùng nào chưa ghi danh.");
      }

      return response.data
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách người dùng chưa ghi danh:", error);
      return rejectWithValue("Không thể lấy danh sách người dùng chưa ghi danh.");
    }
  }
);

// Fetch danh sách học viên đã ghi danh
export const fetchRegisteredStudents = createAsyncThunk(
  "courses/fetchRegisteredStudents",
  async (maKhoaHoc: string, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
        { maKhoaHoc }
      );

      if (!response.data || response.data.length === 0) {
        return rejectWithValue("Không có học viên nào ghi danh vào khóa học này.");
      }

      return response.data
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách học viên đã ghi danh:", error);
      return rejectWithValue("Không thể lấy danh sách học viên đã ghi danh.");
    }
  }
);

// Define state
interface CoursesState {
  registeredStudents: UnregisteredUser[];
  unregisteredUsers: UnregisteredUser[];
  loadingRegistered: boolean;
  loadingUnregistered: boolean;
  errorRegistered: string | null;
  errorUnregistered: string | null;
}

const initialState: CoursesState = {
  registeredStudents: [],
  unregisteredUsers: [],
  loadingRegistered: false,
  loadingUnregistered: false,
  errorRegistered: null,
  errorUnregistered: null,
};

const registerCourseSlice = createSlice({
  name: "registerCourse",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      // Xử lý fetch danh sách chưa ghi danh
      .addCase(fetchCourseNotRegister.pending, (state) => {
        state.loadingUnregistered = true;
        state.errorUnregistered = null;
      })
      .addCase(fetchCourseNotRegister.fulfilled, (state, action) => {
        state.unregisteredUsers = action.payload;
        state.loadingUnregistered = false;
      })
      .addCase(fetchCourseNotRegister.rejected, (state, action) => {
        state.loadingUnregistered = false;
        state.errorUnregistered = action.payload as string;
        state.unregisteredUsers = [];
      })
      
      // Xử lý fetch danh sách đã ghi danh
      .addCase(fetchRegisteredStudents.pending, (state) => {
        state.loadingRegistered = true;
        state.errorRegistered = null;
      })
      .addCase(fetchRegisteredStudents.fulfilled, (state, action) => {
        state.registeredStudents = action.payload;
        state.loadingRegistered = false;
      })
      .addCase(fetchRegisteredStudents.rejected, (state, action) => {
        state.loadingRegistered = false;
        state.errorRegistered = action.payload as string;
        state.registeredStudents = [];
      });
  },
});

export default registerCourseSlice.reducer;
