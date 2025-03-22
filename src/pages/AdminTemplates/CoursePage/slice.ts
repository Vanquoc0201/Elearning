import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";
import { Course } from "../../../models";

export const fetchCourseForAdmin = createAsyncThunk<Course[], void>(
  "course/fetchCourseForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiService.get(
        "QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01"
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi không xác định");
    }
  }
);
export const addCourseForAdmin = createAsyncThunk<Course, Course>(
    "course/addCourseForAdmin",
    async (course, { rejectWithValue }) => {
      try {
        const result = await apiService.post("QuanLyKhoaHoc/ThemKhoaHoc", course);
        return result.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Lỗi không xác định");
      }
    }
  );
  export const deleteCourseForAdmin = createAsyncThunk<string, string>(
    "course/deleteCourseForAdmin",
    async (courseId, { rejectWithValue }) => {
      console.log("Deleting course with ID:", courseId); // Kiểm tra mã khóa học
  
      try {
        const result = await apiService.delete(`QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${courseId}`);
        return result.data; 
      } catch (error: any) {
        console.log("Lỗi khi gọi API:", error.response);
        return rejectWithValue(error.response?.data || "Lỗi không xác định");
      }
    }
  );
  
  

type TState = {
  loading: boolean;
  data: Course[] | null;
  error: string | null;
};

const initialState: TState = {
  loading: false,
  data: null,
  error: null,
};

const courseForAdminSlice = createSlice({
  name: "courseForAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset lỗi trước mỗi lần fetch
      })
      .addCase(fetchCourseForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCourseForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
      builder
      .addCase(addCourseForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(addCourseForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          state.data.push(action.payload); // ✅ Thêm khóa học vào danh sách hiện tại
        } else {
          state.data = [action.payload]; // ✅ Nếu chưa có dữ liệu, tạo mảng mới
        }
      })
      
      .addCase(addCourseForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
      builder
      .addCase(deleteCourseForAdmin.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
      .addCase(deleteCourseForAdmin.fulfilled, (state, action) => {
    state.loading = false;
    if (state.data) {
      state.data = state.data.filter((course) => course.maKhoaHoc !== action.payload);
    }
  })
      .addCase(deleteCourseForAdmin.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });

  },
});

export default courseForAdminSlice.reducer;
