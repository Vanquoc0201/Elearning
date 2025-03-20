export type ApiResponse<T=any> = {
    statusCode : number,
    message:string,
    content: T,
    dateTime: Date,
    messageConstants: null,
}
export type Course = {
     maKhoaHoc: string;
    biDanh: string;
    tenKhoaHoc: string;
    moTa: string;
    luotXem: number | string;
    danhGia?: number | string; // Course không có, nhưng CourseForAdmin có, nên để optional
    hinhAnh: string;
    maNhom: string;
    ngayTao: string;
    soLuongHocVien? : number
    // Thay vì chỉ có mã danh mục, giữ cả thông tin danh mục
    danhMucKhoaHoc: {
      maDanhMucKhoaHoc?: string;
      tenDanhMucKhoaHoc?: string; // Optional vì CourseForAdmin không có
    };

    // Thay vì chỉ có tài khoản, giữ cả thông tin người tạo
    nguoiTao: {
      taiKhoan: string;
      hoTen?: string; // Optional vì CourseForAdmin không có
      maLoaiNguoiDung?: string;
      tenLoaiNguoiDung?: string;
    };
  };
  
export type User = {
    taiKhoan: string;
    matKhau : string;
    hoTen: string;
    email: string;
    soDt: string;
    maNhom: string;
    maLoaiNguoiDung: string;
}
export type CourseForAdmin = {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number | string;
  danhGia: number | string;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
  danhMucKhoaHoc?: { 
    maDanhMucKhoaHoc: string;
    tenDanhMucKhoaHoc?: string;
  };  
  nguoiTao?: {  
    taiKhoan: string;
    hoTen?: string;
  };
};


export interface DanhMucKhoaHoc {
  maDanhMucKhoaHoc: string;
  tenDanhMucKhoaHoc: string;
}

export interface NguoiDung {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
}