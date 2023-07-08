import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  let sessions = await getServerSession(request, response, authOptions);
  if (request.method == "POST") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      request.body.author = sessions?.user.email;
      const { title, content, author } = request.body;

      if (title.length < 2 || content.length < 4) {
        return response.status(500).json("Please enter title and content");
      }

      let post = await db.collection("post").insertOne({
        title,
        content,
        author,
      });
      return response.status(200).redirect(302, "/list");

      // let post = await db.collection("post").insertOne(request.body);
      // return response.status(200).json("success!");
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }
}
