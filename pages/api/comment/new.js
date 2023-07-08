import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  console.log("comment2", JSON.parse(request.body));
  /* let result = JSON.parse(request.body); */
  let result = JSON.parse(request.body);
  result.parent = new ObjectId(result.parent);

  let sessions = await getServerSession(request, response, authOptions);
  result.author = sessions.user.email;
  const { content, parent, author } = result;

  if (request.method == "POST") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      if (content?.length < 5 || author == null) {
        return response
          .status(200)
          .json("Please enter more than 5 characters.");
      }
      // get the author's first and last name
      let getAuthorName = await db
        .collection("user_cred")
        .find({ email: author })
        .toArray();

      const firstName = getAuthorName[0]?.firstName;
      const lastName = getAuthorName[0]?.lastName;

      let post = await db.collection("comment").insertOne({
        author,
        firstName,
        lastName,
        content,
        parent,
      });
      response.status(200).json(post);
    } catch (e) {
      throw new Error(e).message;
    }
  }
}
