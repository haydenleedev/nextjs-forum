import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == "POST") {
    try {
      const { firstName, lastName, userName, password } = request.body;

      const client = await connectDB;
      const db = client.db("forum");

      let getMembersItem = await db
        .collection("members")
        .findOne({ userName: userName });

      if (
        firstName.length < 2 ||
        lastName.length < 2 ||
        userName.length < 6 ||
        password.length < 8 ||
        getMembersItem != null
      ) {
        return response
          .status(500)
          .json("Please enter first name, last name, username, and password");
      }

      let members = await db.collection("members").insertOne({
        firstName,
        lastName,
        userName,
        password,
      });
      return response.status(200).redirect("/");
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }
}
