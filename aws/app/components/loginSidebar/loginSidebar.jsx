import LoginBtn from "@/app/loginBtn";
import UserName from "../userName/userName";

export default function LoginSidebar(props) {
  return (
    <aside>
      <LoginBtn isLoggedIn={props.session?.user.email} btnStyle="text" />
      <UserName />
    </aside>
  );
}
