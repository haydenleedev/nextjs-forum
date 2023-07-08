import Image from "next/image";
import styles from "./page.module.css";
import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";
import Link from "next/link";
import CloudImage from "./components/image/image";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");
  let postArray = await db.collection("post").find().toArray(); // post collection에있는 모든 데이터를 가져와서 어레이로 바꿔주세요.

  /* 
  1. url로 caching 하기
     await fetch('/url', {cache: 'force-cache'})å

  2. 60초마다 캐싱된 데이터 갱신해주기
     await fetch('/url', {next : {revalidate: 60}})

  3. 페이지 단위로 캐싱하기. - 페이지별로 60초마다 캐싱된 데이터 갱신해주기
     export const revalidate = 60
  */

  return (
    <>
      <div className="bg-indigo-950 w-full md:min-h-[17rem] flex flex-col items-center justify-center">
        <p className="text-white font-semibold text-5xl">
          Welcome to Swayden Forum!
        </p>
      </div>
      <div className="container max-w-5xl grid grid-cols-3 gap-4 mt-16">
        {postArray.map((item, index) => {
          return (
            <div
              key={index}
              className="card-hover border-2 rounded-lg drop-shadow-sm overflow-hidden"
            >
              <Link
                href={`/detail/${item._id.toString()}`}
                className="font-bold"
              >
                <div className="px-5 py-5">
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="font-normal">{item.content}</p>
                </div>
                <div className="max-h-52">
                  <CloudImage />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
