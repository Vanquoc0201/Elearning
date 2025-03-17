import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchListUser } from "./slice";
import { RootState, AppDispatch } from "../../../store";
import EditUserModal from "./modalUser";
import apiService from "../../../services/apiService";
import { toast, ToastContainer } from "react-toastify";
import { User } from "../../../models";
export default function DashBoardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data, loading } = useSelector(
    (state: RootState) => state.listUserReducer
  );
  const dispatch: AppDispatch = useDispatch();
  const handleDeleteUser = async (taiKhoan: string) => {
    console.log("🔹 Tài khoản cần xóa:", taiKhoan);

    const apiURL = `QuanLyNguoiDung/XoaNguoiDung/${taiKhoan}`;
    console.log("🔹 URL API gọi:", apiURL);

    try {
      const result = await apiService.delete(apiURL);

      console.log("✅ Response từ server:", result);

      if (result.status === 200) {
        toast.success("Xóa user thành công! 🎉");
        dispatch(fetchListUser());
      } else {
        console.warn(
          "⚠ Không thể xóa user, server trả về status:",
          result.status
        );
        toast.warn("Không thể xóa user, vui lòng thử lại!");
      }
    } catch (error: any) {
      console.error("❌ Lỗi khi xóa user:", error);

      // Kiểm tra response từ server có gì
      if (error.response) {
        console.error("❌ Chi tiết lỗi từ server:", error.response.data);
        toast.error(error.response.data || "Lỗi từ server. Vui lòng thử lại!");
      } else {
        toast.error("Không thể kết nối đến server. Vui lòng thử lại!");
      }
    }
  };
  const handleEditUser = (user: User) => {
    setSelectedUser(user); // Lưu user cần chỉnh sửa
    setIsModalOpen(true); // Mở Modal
  };

  useEffect(() => {
    dispatch(fetchListUser());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-xl font-semibold text-gray-700 mb-4">
        Danh sách người mua khóa học
      </h1>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-auto text-sm text-gray-700 dark:text-gray-300 border border-gray-300">
          <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              {[
                "Tài khoản",
                "Họ tên",
                "Email",
                "Số ĐT",
                "Mã loại người dùng",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-2 py-2 text-center border border-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr
                key={user.taiKhoan}
                className="odd:bg-gray-100 even:bg-white dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-2 py-2 text-center border border-gray-300">
                  {user.taiKhoan}
                </td>
                <td className="px-2 py-2 text-center border border-gray-300">
                  {user.hoTen}
                </td>
                <td className="px-2 py-2 text-center border border-gray-300">
                  {user.email}
                </td>
                <td className="px-2 py-2 text-center border border-gray-300">
                  {user.soDt}
                </td>
                <td className="px-2 py-2 text-center border border-gray-300">
                  {user.maLoaiNguoiDung}
                </td>
                <td className="px-2 py-2 text-center border border-gray-300">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.taiKhoan)}
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
