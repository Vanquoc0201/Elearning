import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { Course, ApiResponse } from "../../../models";
import apiService from "../../../services/apiService";
type ResponseCourse = ApiResponse<Course[]>;
export const fetchCourse = createAsyncThunk('course/fetchCourse', async ()=>{
    try {   
        const result = await apiService.get<ResponseCourse>('/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01');        
        console.log("API response:", result.data); // Log ra dữ liệu thực tế
        return result.data?.content ?? []; // Nếu content không tồn tại, trả về []
    } catch(error) {
        console.log(error);
    }
})
type TState = {
    data?: Course[];
    isLoading: boolean;
    error: any;
}
const initialState: TState = {
    isLoading: false,
    data: undefined,
    error: null,
}
const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers : {},
    extraReducers: (builder) =>{
        builder.addCase(fetchCourse.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchCourse.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.data = action.payload ?? [];
        })
        builder.addCase(fetchCourse.rejected, (state,action)=>{
            state.isLoading = false;
            state.error = action.payload
        })
    }
})
export default courseSlice.reducer