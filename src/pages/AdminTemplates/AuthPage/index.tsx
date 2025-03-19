import React from "react";
import { useState } from "react";
import { actLogin } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
export default function AuthPage() {
  const dispatch : AppDispatch = useDispatch();
  const {data, error} = useSelector((state: RootState) => state.authReducer); 
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  })
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actLogin(user));
  }
  if(data){
    return <Navigate to="/admin/list-user" />
  }
  const handleErrorMessage = () =>{
    if (!error) return null;
    const messageError = typeof error === "string" ? error : error|| "Đã xảy ra lỗi";
    return (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">{messageError}</span>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      {handleErrorMessage()}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tài khoản
        </label>
        <input
          onChange={handleOnChange}
          name="taiKhoan"
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Vui lòng nhập tài khoản"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mật khẩu
        </label>
        <input
          onChange={handleOnChange}
          name="matKhau"
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Vui lòng nhập mật khẩu"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
