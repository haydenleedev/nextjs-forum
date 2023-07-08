import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

import { notFound } from "next/navigation";
import DetailContent from "./detailContent";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("forum");
  let postItem = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id[0]) });

  if (postItem === null) {
    return notFound();
  }

  return <DetailContent postItem={postItem} />;
}
