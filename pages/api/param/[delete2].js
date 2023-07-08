import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  console.log("Hello Coco: ", request.query.delete2);
  let id = request.query.delete2;
  let sessions = await getServerSession(request, response, authOptions);

  try {
    const client = await connectDB;
    const db = client.db("forum");

    let post = await db.collection("post").deleteOne({
      _id: new ObjectId(id),
    });
    return response.status(200).json("Delete Completed!");
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
