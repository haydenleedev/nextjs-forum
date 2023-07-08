"use client";
import Link from "next/link";
import style from "./list.module.css";
import { useEffect, useState } from "react";

export default function ListItem(props) {
  let postArray = props.postArray;

  let deleteClassDefaultValues = [];
  for (let i = 0; i < postArray.length; i++) {
    deleteClassDefaultValues.push("");
  }

  let [deleteClass, setDeleteClass] = useState(deleteClassDefaultValues);
  let [deletePostId, setDeletePostId] = useState("");

  /* let defaultLikes = [];
  for (let i = 0; i < postArray.length; i++) {
    defaultLikes.push(0);
  } */

  let [likesData, setLikesData] = useState({});
  let [likedPost, setLikedPost] = useState("");
  let [isAuthorLiked, setIsAuthorLiked] = useState({});

  // Ajax Get, Post, Delete request -> Ajax can only be used on client side.

  // Post request example
  /* 
     fetch('/api/delete', {
        method: 'Post',
        body: JSON.stringify([1,2,3])
    }).then((res) => {
        console.log(res)
    })
  */

  function deleteBtnHandler(index) {
    let deleteClassCopy = [...deleteClass];
    deleteClassCopy[index] = deleteClass[index];
    deleteClassCopy[index] = "delete";
    setDeleteClass(deleteClassCopy);
  }

  function deleteFetchHandler(deletePostId, index, author) {
    if (deletePostId.length != 0) {
      fetch("/api/post/delete", {
        method: "POST",
        body: JSON.stringify({ _id: deletePostId.toString(), author: author }),
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          } else {
            // Server가 에러코드 전송시 실행할 코드
            console.log(res.status);
          }
        })
        .then((res) => {
          // 성공시 실행할 코드
          if (res != false) {
            deleteBtnHandler(index);
            setTimeout(function () {
              let deleteClassCopy = [...deleteClass];
              deleteClassCopy[index] = deleteClass[index];
              deleteClassCopy[index] = "delete remove";
              setDeleteClass(deleteClassCopy);
            }, 1000);
          } else {
            console.log("The author doesn't match");
          }

          console.log("server response", res); // server에서 보낸 메세지를 보고싶으면, then을 한번 더쓰고 콘솔 출력.
          if (res == true) {
            deleteBtnHandler(index);
          }
        })
        .catch((error) => {
          // 인터넷문제로 실패시 실행할 코드
          console.log(error);
        });
    }
  }

  function fetchLikesData() {
    fetch("/api/post/likes")
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          // Server가 에러코드 전송시 실행할 코드
          console.log(res.status);
        }
      })
      .then((res) => {
        // create an object with id and the number of duplications to count the likes
        let obj = {};
        let resCopy = [...res];
        let result = resCopy.forEach((item) => {
          if (obj[item.parent] > 0) {
            obj[item.parent] += 1;
          } else {
            obj[item.parent] = 1;
          }
        });
        setLikesData(obj);

        // create and object with id and author email to block multiple likes
        let authorObj = {};
        let resCopy2 = [...res];
        let authorHandle = resCopy.forEach((item) => {
          authorObj[item.parent] = item.author;
        });
        setIsAuthorLiked(authorObj);
      });
  }

  useEffect(() => {
    fetchLikesData();
  }, [likedPost]);

  useEffect(() => {
    if (likedPost) {
      fetch("/api/post/likes", {
        method: "POST",
        body: JSON.stringify({
          _id: likedPost,
        }),
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          } else {
            // Server가 에러코드 전송시 실행할 코드
            console.log(res.status);
          }
        })
        .then((res) => {
          // 성공시 실행할 코드
          fetchLikesData();
        })
        .catch((error) => {
          // 인터넷문제로 실패시 실행할 코드
          console.log(error);
        });
    }
  }, [likedPost]);

  function likeDataHandler(id) {
    let isItem = Object.keys(likesData).filter((x) => {
      return x == id;
    });
    return likesData[isItem] || 0;
  }

  /* useEffect(() => {
    if (deletePostId.length != 0) {
      fetch("/api/post/delete", {
        method: "POST",
        body: JSON.stringify({ _id: deletePostId }),
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          } else {
            // Server가 에러코드 전송시 실행할 코드
            console.log(res.status);
          }
        })
        .then((res) => {
          // 성공시 실행할 코드

          console.log(res); // server에서 보낸 메세지를 보고싶으면, then을 한번 더쓰고 콘솔 출력.
        })
        .catch((error) => {
          // 인터넷문제로 실패시 실행할 코드
          console.log(error);
        });
    }
  }, [deletePostId]); */
  return (
    <div className="grid grid-cols-1 gap-4">
      {postArray.map((item, index) => {
        return (
          <div
            className={`card-hover border-2 px-5 py-5 rounded-lg drop-shadow-sm ${deleteClass[index]}`}
            key={index}
          >
            <h2 className="font-bold text-xl">{item.title}</h2>
            <p className="font-normal text-sm py-3">{item.content}</p>
            <div></div>
            <button
              onClick={() => {
                isAuthorLiked[postArray[index]._id] != props.currentAuthor
                  ? setLikedPost(postArray[index]._id.toString())
                  : null;
              }}
            >
              👍
            </button>{" "}
            {
              // 1. 현제 클릭한 포스트의 아이디를 likes 콜렉션에서 찾는다.
              // 2. 찾은 아이디의 갯수를 세어 디스플레이한다.
              likeDataHandler(item._id)
            }
            {/*  <Link
              className="px-2 py-2 mx-3"
              href={`/detail/${postArray[index]._id.toString()}`}
            >
              Read more
            </Link> */}
            <Link
              className="inline-block mx-3 mt-3 rounded-lg border-solid border-2 border-gray-400 px-4 py-1"
              href={`/edit/${postArray[index]._id.toString()}`}
            >
              Edit Post
            </Link>
            {(props.currentAuthor && item.author == props.currentAuthor) ||
            props.currentUserRole == "admin" ? (
              <>
                <button
                  className="deleteBtn"
                  onClick={(e) => {
                    setDeletePostId(postArray[index]._id.toString());
                    deleteFetchHandler(
                      postArray[index]._id?.toString(),
                      index,
                      postArray[index].author?.toString()
                    );
                  }}
                >
                  Delete
                </button>

                <button
                  className="deleteBtn2"
                  onClick={() => {
                    fetch("/api/test?name=lee&content=hey girl Coco!");
                  }}
                >
                  Delete 2
                </button>
                <button
                  className="deleteBtn3"
                  onClick={(e) => {
                    fetch(`/api/param/${postArray[index]._id.toString()}`)
                      .then((res) => {
                        if (res.status == 200) {
                          return res.json();
                        } else {
                          // Server가 에러코드 전송시 실행할 코드
                          return console.log(res.status);
                        }
                      })
                      .then((res) => {
                        // 성공시 실행할 코드

                        if (res != false) {
                          let clickedEle = e.target.parentElement;
                          clickedEle.classList.add("delete");
                          setTimeout(function () {
                            clickedEle.classList.add("remove");
                          }, 1000);
                        } else {
                          console.log("The author doesn't match.");
                        }
                      });
                  }}
                >
                  Delete 3
                </button>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
