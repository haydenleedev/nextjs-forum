import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == "GET") {
    response.status(200).json({ title: "Response is completed successfully." });
  }
  if (request.method == "POST") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      const { title, content } = request.body;
      let post = await db.collection("post").insertOne({
        title,
        content,
      });
      response.status(200).json(post);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }
}
