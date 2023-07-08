export default function Register() {
  return (
    <div>
      <form method="POST" action="/api/auth/signup">
        <input name="firstName" type="text" placeholder="First Name" />
        <input name="lastName" type="text" placeholder="Last Name" />
        <input name="email" type="text" placeholder="Your Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
