import UnregisteredUsers from "./UnRegisteredUser";
import RegisteredUsers from "./RegisteredUser";

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex">
      <div className="w-1/2">
        <UnregisteredUsers />
      </div>
      <div className="w-1/2">
        <RegisteredUsers />
      </div>
    </div>
  );
}
