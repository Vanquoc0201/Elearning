import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { fetchCourseNotRegister } from "./slice";
import { UnregisteredUser } from "../../../models";
import { Switch } from "@headlessui/react";

export default function UnregisteredUsers() {
  const [maKhoaHoc, setMaKhoaHoc] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});

  const dispatch: AppDispatch = useDispatch();
  const { unregisteredUsers, loadingUnregistered, errorUnregistered } = useSelector(
    (state: RootState) => state.registerCourseReducer
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaKhoaHoc(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (maKhoaHoc.trim()) {
      dispatch(fetchCourseNotRegister(maKhoaHoc));
    }
  };

  const handleToggle = (taiKhoan: string) => {
    setSelectedUsers((prevState) => ({
      ...prevState,
      [taiKhoan]: !prevState[taiKhoan],
    }));

    // TODO: Gọi API để ghi danh người dùng (hiện tại chỉ đang toggle switch)
    console.log(`Ghi danh người dùng: ${taiKhoan} vào khóa học: ${maKhoaHoc}`);
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">
        Danh sách người dùng chưa ghi danh theo mã khóa học
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={maKhoaHoc}
          onChange={handleOnChange}
          placeholder="Nhập mã khóa học..."
          className="border p-2 flex-1 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loadingUnregistered || !maKhoaHoc.trim()}
        >
          {loadingUnregistered ? "Đang tìm..." : "Tìm kiếm"}
        </button>
      </form>

      {errorUnregistered && <p className="text-red-500">{errorUnregistered}</p>}
      {loadingUnregistered && <p className="text-center text-gray-500">Đang tải...</p>}

      {unregisteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 border">Tài khoản</th>
                <th className="px-4 py-2 border">Họ tên</th>
                <th className="px-4 py-2 border">Bí Danh</th>
                <th className="px-4 py-2 border">Ghi danh</th>
              </tr>
            </thead>
            <tbody>
              {unregisteredUsers.map(({ taiKhoan, hoTen, biDanh }: UnregisteredUser, index) => (
                <tr
                  key={taiKhoan}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 border text-center">{taiKhoan}</td>
                  <td className="px-4 py-2 border text-center">{hoTen}</td>
                  <td className="px-4 py-2 border text-center">{biDanh}</td>
                  <td className="px-4 py-2 border text-center">
                    <Switch
                      checked={selectedUsers[taiKhoan] || false}
                      onChange={() => handleToggle(taiKhoan)}
                      className={`${
                        selectedUsers[taiKhoan] ? "bg-blue-600" : "bg-gray-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span className="sr-only">Ghi danh</span>
                      <span
                        className={`${
                          selectedUsers[taiKhoan] ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                      />
                    </Switch>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">Vui lòng nhập mã khóa học.</p>
      )}
    </div>
  );
}
