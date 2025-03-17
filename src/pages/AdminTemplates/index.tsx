import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
export default function AdminPage() {
  const {data} = useSelector((state: RootState) => state.authReducer)
  if(!data){
    return <Navigate to="/auth" />
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}
