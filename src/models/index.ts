export type ApiResponse<T=any> = {
    statusCode : number,
    message:string,
    content: T,
    dateTime: Date,
    messageConstants: null,
}
export type Course =  {
    maKhoaHoc : string,
    bidanh : string,
    tenKhoaHoc : string,
    mota : string,
    luotxem : number,
    hinhAnh : string,
    maNhom : string,
    ngayTao : string,
    soluongHocVien : number,
    danhMucKhoaHoc : {
        maDanhMucKhoahoc : string,
        tenDanhMucKhoaHoc : string,
    }
}
export type User = {
    taiKhoan: string;
    matKhau : string;
    hoTen: string;
    email: string;
    soDT: string;
    maNhom: string;
    maLoaiNguoiDung: string;
}