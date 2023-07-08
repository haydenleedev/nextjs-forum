import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  let sessions = await getServerSession(request, response, authOptions);

  if (request.method == "POST") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      const result = JSON.parse(request.body);

      let isAuthorMatched = false;

      if (!result._id) {
        return response.status(500).json("The post doesn't exit.");
      }
      if (result?.author != sessions.user.email) {
        let isAuthorMatched = false;
        return response.status(200).json(isAuthorMatched);
      }

      let post = await db.collection("post").deleteOne({
        _id: new ObjectId(result._id),
      });
      return response.status(200).json("Delete completed");
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }
}
