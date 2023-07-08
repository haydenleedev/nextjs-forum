import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(request, response) {
  let db = (await connectDB).db("forum");

  if (request.method == "POST") {
    try {
      let { firstName, lastName, email, password } = request.body;

      // 1. Check if the email already exists in DB
      let emailFromDB = await db.collection("user_cred").findOne({ email });
      if (emailFromDB) {
        return response.status(200).json("The email already exists");
      }

      // 2. Verify if the email is the correct format
      const emailFormat =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(emailFormat)) {
        return response.status(200).json("The email is not a valid format.");
      }

      if (
        firstName.length > 2 &&
        lastName.length > 2 &&
        email.length > 4 &&
        password.length > 6
      ) {
        const hash = await bcrypt.hash(request.body.password, 10);
        request.body.password = hash;
        request.body.role = "normal";

        let db = (await connectDB).db("forum");

        await db.collection("user_cred").insertOne(request.body);
        return response.status(200).redirect(302, "/list");
      } else {
        return response.json("All fields must be entered properly");
      }
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }
}
