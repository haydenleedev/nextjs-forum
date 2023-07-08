import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "GET") {
    try {
      const client = await connectDB;
      const db = client.db("forum");

      let postArray = await db
        .collection("comment")
        .find({ parent: new ObjectId(request.query.id) })
        .toArray();

      return response.status(200).json(postArray);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }
}
