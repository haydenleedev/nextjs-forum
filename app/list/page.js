import { connectDB } from "@/util/database";
import Link from "next/link";
import style from "./list.module.css";
import DetailLink from "../detail/[...id]/detailLink";
import ListItem from "./listItem";

export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let postArray = await db.collection("post").find().toArray();
  const currentAuthor = await getServerSession(authOptions);

  return (
    <ListItem
      postArray={postArray}
      currentAuthor={currentAuthor?.user.email}
      currentUserRole={currentAuthor?.user.role}
    />
  );
}
