import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchListUser } from "./slice";
import { RootState, AppDispatch } from "../../../store";
import EditUserModal from "./modalUser";
import apiService from "../../../services/apiService";
import { toast, ToastContainer } from "react-toastify";
import { User } from "../../../models";

export default function UserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.listUserReducer
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListUser());
  }, [dispatch]);

  const handleDeleteUser = async (taiKhoan: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      return;
    }

    try {
      const response = await apiService.delete(
        `QuanLyNguoiDung/XoaNguoiDung/${taiKhoan}`
      );
      if (response.status === 200) {
        toast.success("Xóa user thành công! 🎉");
        dispatch(fetchListUser());
      } else {
        toast.warn("Không thể xóa user, vui lòng thử lại!");
      }
    } catch (error: any) {
      console.error("❌ Lỗi khi xóa user:", error);
      toast.error(error.response?.data || "Lỗi từ server. Vui lòng thử lại!");
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    setTimeout(() => {
      dispatch(fetchListUser());
    }, 1000); // Chờ 1 giây rồi fetch lại danh sách
  };
  

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div className="text-red-500">Lỗi tải dữ liệu người dùng!</div>;

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-xl font-semibold text-gray-700 mb-4">
        Danh sách người mua khóa học
      </h1>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-auto text-sm text-gray-700 border border-gray-300">
          <thead className="text-xs uppercase bg-gray-200">
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
                className="odd:bg-gray-100 even:bg-white border-b"
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
                      className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.taiKhoan)}
                      className="text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-4 py-2"
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
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
}
