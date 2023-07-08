import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method == "POST") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      const { _id, title, content } = request.body;

      let sessions = await getServerSession(request, response, authOptions);

      if (title.length < 2 || content.length < 4) {
        return response.status(500).json("Please enter title and content");
      }

      let post = await db.collection("post").updateOne(
        {
          _id: new ObjectId(_id),
        },
        {
          $set: {
            title: title,
            content: content,
          },
        }
      );
      return response.status(200).redirect(302, "/list");
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }
}
