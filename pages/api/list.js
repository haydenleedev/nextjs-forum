import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

// Get request

export default async function handler(request, response) {
  const client = await connectDB;
  const db = client.db("forum");
  let postArray = await db.collection("post").find().toArray();

  let sessions = await getServerSession(request, response, authOptions);
  let currentLoggedInUser = sessions.user.email;
  let authorFromDB = postArray;

  if (request.method == "GET") {
    return response.status(200).json(postArray);
  }
}
