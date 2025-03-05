import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCourse } from "./slice"
import { AppDispatch, RootState } from "../../../store";
import CourseCard from "./course";
export default function HomePage() {
  const dispatch : AppDispatch = useDispatch();
  const {data, error, isLoading} = useSelector((state: RootState)=>state.courseReducer);
  console.log(error);
  
  
  useEffect(()=> {dispatch(fetchCourse)}, [])
  if(isLoading) return <p>Loading...</p>
  if(error) return <div>Error</div>
  if(data?.length === 0) return <div>No data</div>
  return (
    <div className="container mx-auto">
      <h1>List Course</h1>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((course, index) => (
          <CourseCard course={course} key={index}/>
        ))}
      </div>
    </div>
  )
}
