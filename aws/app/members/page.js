export default function SignUp() {
  return (
    <div className="p-20">
      <h4>Sign Up</h4>
      <form action="/api/members/signup" method="POST">
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="text" name="userName" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
