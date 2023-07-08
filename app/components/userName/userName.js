import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function UserName() {
  let sessions = await getServerSession(authOptions);
  return (
    <>
      {sessions?.user.email && (
        <p className="font-bold text-indigo-950">{sessions?.user.email}</p>
      )}
    </>
  );
}
