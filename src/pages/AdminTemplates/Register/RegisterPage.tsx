import RegisteredCourse from "./RegisteredCourse";
import UnregisteredCourse from "./UnregisteredCourse";


export default function RegisterPage() {
  return (
    <div className="container mx-auto w-full">
      <UnregisteredCourse />
      <RegisteredCourse />
    </div>
  );
}
