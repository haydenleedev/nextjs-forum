import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

export default async function Write() {
  // Only members should allow to see the write page content.
  let sessions = await getServerSession(authOptions);
  return (
    <>
      {sessions?.user.email ? (
        <div className="p-20">
          <h4>Create a New Post</h4>
          <form action="/api/post/new" method="POST">
            <input type="text" name="title" placeholder="Enter Title" />
            <textarea name="content" placeholder="Enter Content" />
            <button type="submit">New Post</button>
          </form>
        </div>
      ) : (
        <div className="p-20">
          <h4>Please Login</h4>
          <Link href="/register">Log In</Link>
        </div>
      )}
    </>
  );
}
