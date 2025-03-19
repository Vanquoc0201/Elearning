import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { fetchCourseForAdmin } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { CourseForAdmin } from "../../../models";
import { addCourseForAdmin } from "./slice";
export default function AdminCoursePage() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.courseForAdminReducer
  );
  const dispatch: AppDispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [course, setCourse] = useState<CourseForAdmin>({
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: "",
      danhGia: "",
      hinhAnh: "",
      maNhom: "GP01",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: ""
  });
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value} = e.target;
    setCourse({
      ...course,
      [name]: value
    })
  }
  const handleSubmit = async () => {
    try {
      await dispatch(addCourseForAdmin(course)).unwrap(); // Dispatch action để thêm khóa học
      setOpenModal(false); // Đóng modal sau khi thêm thành công
      setCourse({ // Reset form về giá trị mặc định
        maKhoaHoc: "",
        biDanh: "",
        tenKhoaHoc: "",
        moTa: "",
        luotXem: "",
        danhGia: "",
        hinhAnh: "",
        maNhom: "GP01",
        ngayTao: "",
        maDanhMucKhoaHoc: "",
        taiKhoanNguoiTao: "",
      });
    } catch (error) {
      console.error("Thêm khóa học thất bại:", error);
    }
  };
  

  // Fetch data khi component mount
  useEffect(() => {
    dispatch(fetchCourseForAdmin());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Courses</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setOpenModal(true)}
      >
        Thêm Khóa Học
      </button>

      {/* Bảng hiển thị danh sách khóa học */}
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Hình ảnh</th>
            <th className="border p-2">Tên khóa học</th>
            <th className="border p-2">Danh mục</th>
            <th className="border p-2">Lượt xem</th>
            <th className="border p-2">Ngày tạo</th>
            <th className="border p-2">Số học viên</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((course) => (
            <tr key={course.maKhoaHoc} className="border">
              <td className="border p-2">
                <img
                  src={course.hinhAnh || "https://via.placeholder.com/150"}
                  alt={course.tenKhoaHoc}
                  className="w-12 h-12"
                />
              </td>
              <td className="border p-2">{course.tenKhoaHoc}</td>
              <td className="border p-2">
                {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
              </td>
              <td className="border p-2">{course.luotXem}</td>
              <td className="border p-2">{course.ngayTao}</td>
              <td className="border p-2">{course.soLuongHocVien}</td>
              <td className="border p-2 space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Sửa
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Course */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Thêm Khóa Học</Modal.Header>
        <Modal.Body>
  <div className="space-y-4">
    <div>
      <label className="block font-medium">Mã khóa học</label>
      <input
      onChange={handleOnChange}
      name="maKhoaHoc"
        type="text"
        placeholder="Nhập mã khóa học"
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label className="block font-medium">Bí danh</label>
      <input
      onChange={handleOnChange}
      name="biDanh"
        type="text"
        placeholder="Nhập bí danh"
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label className="block font-medium">Tên khóa học</label>
      <input
      name="tenKhoaHoc"
      onChange={handleOnChange}
        type="text"
        placeholder="Nhập tên khóa học"
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label className="block font-medium">Mô tả</label>
      <input
      name="moTa"
      onChange={handleOnChange}
        type="text"
        placeholder="Nhập mô tả"
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label className="block font-medium">Lượt xem</label>
      <input
      name="luotXem"
      onChange={handleOnChange}
        type="number"
        placeholder="Nhập số lượt xem"
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label className="block font-medium">Đánh giá</label>
      <input
      name="danhGia"
      onChange={handleOnChange}
        type="text"
        placeholder="Nhập đánh giá"
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label className="block font-medium">Hình ảnh (URL)</label>
      <input
      name="hinhAnh"
      onChange={handleOnChange}
        type="text"
        placeholder="Nhập URL hình ảnh"
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label className="block font-medium">Ngày tạo</label>
      <input
      name="ngayTao"
      onChange={handleOnChange}
        type="date"
        placeholder="Nhập ngày tạo"
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label className="block font-medium">Mã danh mục khóa học</label>
      <input
      name="maDanhMucKhoaHoc"
      onChange={handleOnChange}
        type="text"
        placeholder="Nhập mã danh mục"
        className="w-full border p-2 rounded"
      />
    </div>
    <div>
      <label className="block font-medium">Tài khoản người tạo</label>
      <input
      name="taiKhoanNguoiTao"
      onChange={handleOnChange}
        type="text"
        placeholder="Nhập tài khoản người tạo"
        className="w-full border p-2 rounded"
      />
    </div>
  </div>
</Modal.Body>

        <Modal.Footer>
        <button
  className="bg-blue-500 text-white px-4 py-2 rounded"
  onClick={handleSubmit} // Gọi hàm handleSubmit để thêm khóa học
>
  Thêm Khóa Học
</button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}
