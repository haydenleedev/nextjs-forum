import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const client = await connectDB;
  const db = client.db("forum");
  let postItem = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id[0]) });

  return (
    <div className="container max-w-3xl py-20">
      <h1 className="text-2xl font-bold">Edit Post</h1>
      <form action="/api/post/edit" method="POST" className="flex flex-col">
        <label for="title" className="mt-6">
          Subject
        </label>{" "}
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Enter Title"
          defaultValue={postItem.title}
          className="border-slate-400 rounded-md border-2 px-6 py-4 mt-2 mb-6"
        ></input>
        <label for="content">Content</label>
        <textarea
          id="content"
          name="content"
          placeholder="Enter Content"
          defaultValue={postItem.content}
          className="border-slate-400 rounded-md border-2 px-6 py-4 mt-2 mb-6"
        ></textarea>
        <input name="_id" type="hidden" value={postItem._id.toString()} />
        <div className="flex flex-col items-start">
          <button
            type="submit"
            className="bg-indigo-950 text-white py-3 px-6 rounded-xl inline-block"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
