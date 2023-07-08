import Link from "next/link";
import Comment from "./comment";

export default function DetailContent(props) {
  return (
    <>
      <h2 className="font-bold text-xl">{props.postItem.title}</h2>
      <p>{props.postItem.content}</p>

      <div className="mt-8">
        <Link
          href={`/edit/${props.postItem._id}`}
          className="rounded-lg border-solid border-2 border-gray-400 px-4 py-1"
        >
          Edit Post
        </Link>
      </div>
      <div className="bg-gray-200 rounded-lg px-12 py-8 my-10">
        <Comment parent={props.postItem._id.toString()} />
      </div>
    </>
  );
}
