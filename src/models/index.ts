export type ApiResponse<T = any> = {
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