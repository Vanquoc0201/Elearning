import { useEffect, useState, useCallback } from "react";
import { Modal } from "flowbite-react";
import {
  fetchCourseForAdmin,
  addCourseForAdmin,
  deleteCourseForAdmin,
} from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { CourseForAdmin, Course } from "../../../models";
import { toast, ToastContainer } from "react-toastify"; // Import thư viện
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho ToastContainer

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
    luotXem: 0,
    danhGia: 0,
    hinhAnh: "",
    maNhom: "GP01",
    ngayTao: "",
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: "",
    danhMucKhoaHoc: { maDanhMucKhoaHoc: "" },
    nguoiTao: { taiKhoan: "" },
  });
  const resetCourseData = () => {
    setCourse({
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "GP01",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: "",
      danhMucKhoaHoc: { maDanhMucKhoaHoc: "" }, 
      nguoiTao: { taiKhoan: "" },
    });
  };

  useEffect(() => {
    dispatch(fetchCourseForAdmin());
  }, [dispatch]);

  const handleDeleteCourse = async (maKhoaHoc: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa khóa học này?")) return;
  
    try {
      await dispatch(deleteCourseForAdmin(maKhoaHoc)).unwrap();
      toast.success("Xóa khóa học thành công!");
  
      // Chờ 1 giây trước khi fetch danh sách khóa học mới
      setTimeout(() => {
        dispatch(fetchCourseForAdmin());
      }, 1000);
    } catch (error) {
      console.error("Xóa khóa học thất bại:", error);
      toast.error("Xóa khóa học thất bại!");
    }
  };
  

  const handleSubmit = useCallback(async () => {
    if (
      !course.maKhoaHoc ||
      !course.tenKhoaHoc ||
      !course.maDanhMucKhoaHoc ||
      !course.taiKhoanNguoiTao
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const courseToSubmit: Course = {
        ...course,
        danhMucKhoaHoc: { maDanhMucKhoaHoc: course.maDanhMucKhoaHoc },
        nguoiTao: { taiKhoan: course.taiKhoanNguoiTao },
      };

      await dispatch(addCourseForAdmin(courseToSubmit)).unwrap();
      toast.success("Thêm khóa học thành công!"); // 
      setOpenModal(false);
      resetCourseData();
    } catch (error) {
      console.error("Thêm khóa học thất bại:", error);
      toast.error("Thêm khóa học thất bại!"); // 
    }
  }, [dispatch, course]);

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Courses</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setOpenModal(true)}
      >
        Thêm Khóa Học
      </button>
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
                {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
              </td>
              <td className="border p-2">{course.luotXem}</td>
              <td className="border p-2">{course.ngayTao}</td>
              <td className="border p-2">{course.soLuongHocVien}</td>
              <td className="border p-2 space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.maKhoaHoc)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Thêm Khóa Học</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Mã khóa học</label>
              <input
                type="text"
                name="maKhoaHoc"
                value={course.maKhoaHoc}
                onChange={(e) =>
                  setCourse({ ...course, maKhoaHoc: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Tên khóa học</label>
              <input
                type="text"
                name="tenKhoaHoc"
                value={course.tenKhoaHoc}
                onChange={(e) =>
                  setCourse({ ...course, tenKhoaHoc: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Thêm Khóa Học
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
