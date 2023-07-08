import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  try {
    const client = await connectDB;
    const db = client.db("forum");

    if (request.method == "POST") {
      request.body = JSON.parse(request.body);

      let session = await getServerSession(request, response, authOptions);

      /* let findPost = await db
        .collection("likes")
        .findOne({ parent: new ObjectId(request.body._id) });

      console.log("findPost: ", findPost);
      let newLikes = findPost.likes ? parseInt(findPost.likes) + 1 : 1; */

      let likes = await db.collection("likes").insertOne({
        parent: new ObjectId(request.body._id),
        author: session?.user.email,
      });
      response.status(200).json("successfully posted");
    }

    if (request.method == "GET") {
      let getLikes = await db.collection("likes").find().toArray();
      return response.status(200).json(getLikes);
    }
  } catch (e) {
    console.log(e);
    throw new Error(e).message;
  }
}
