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
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

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
    });
  };

  useEffect(() => {
    dispatch(fetchCourseForAdmin());
  }, [dispatch]);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };
  const handleDeleteCourse = async (maKhoaHoc: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa khóa học này?")) return;  
    try {
      await dispatch(deleteCourseForAdmin(maKhoaHoc)).unwrap();
      toast.success("Xóa khóa học thành công!");
      setTimeout(() => {
        dispatch(fetchCourseForAdmin());
      }, 1000);
    } catch (error: any) {
      console.log("Lỗi khi xóa khóa học:", error);
  
      if (error.response) {
        const errorMessage = error.response.data?.message || error.response.data || "Có lỗi xảy ra, vui lòng thử lại!";
        toast.error(`❌ Lỗi: ${errorMessage}`);
      } else if (error.message) {
        toast.error(`❌ Lỗi: ${error.message}`);
      } else {
        toast.error("❌ Lỗi không xác định!");
      }
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
            {/* Các input bình thường */}
            {[
              { label: "Mã khóa học", name: "maKhoaHoc" },
              { label: "Bí danh", name: "biDanh" },
              { label: "Tên khóa học", name: "tenKhoaHoc" },
              { label: "Mô tả", name: "moTa" },
              { label: "Hình ảnh (URL)", name: "hinhAnh" },
              { label: "Ngày tạo", name: "ngayTao", type: "date" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={course[name as keyof CourseForAdmin] as string}
                  onChange={handleOnChange}
                  placeholder={`Nhập ${label.toLowerCase()}`}
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}

            {/* Dropdown cho Mã danh mục khóa học */}
            <div>
              <label className="block font-medium">Mã danh mục khóa học</label>
              <select
                name="maDanhMucKhoaHoc"
                value={course.maDanhMucKhoaHoc}
                onChange={handleOnChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Chọn danh mục</option>
                {data?.map((course, index) => (
                  <option
                    key={`${course.danhMucKhoaHoc.maDanhMucKhoaHoc}-${index}`}
                    value={course.danhMucKhoaHoc.maDanhMucKhoaHoc}
                  >
                    {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown cho Tài khoản người tạo */}
            <div>
              <label className="block font-medium">Tài khoản người tạo</label>
              <select
                name="taiKhoanNguoiTao"
                value={course.taiKhoanNguoiTao}
                onChange={handleOnChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Chọn tài khoản giảng viên</option>
                {data
                  ?.filter((c) => c.nguoiTao.maLoaiNguoiDung === "GV")
                  .map((c, index) => (
                    <option
                      key={`${c.nguoiTao.taiKhoan}-${index}`}
                      value={c.nguoiTao.taiKhoan}
                    >
                      {c.nguoiTao.taiKhoan}
                    </option>
                  ))}
              </select>
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
