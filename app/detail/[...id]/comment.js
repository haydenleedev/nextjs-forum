"use client";

import { useState, useEffect } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");
  let [commentLists, setCommentLists] = useState([]);
  let [newComments, setNewComments] = useState(0);

  useEffect(() => {
    fetch(`/api/comment/list?id=${props.parent.toString()}`)
      .then((res) => {
        "comment res:", res;
        if (res.status == 200) {
          return res.json();
        } else {
          // Server가 에러코드 전송시 실행할 코드
          console.log(res.status);
        }
      })
      .then((res) => {
        // 성공시 실행할 코드
        let comments = [];
        res.forEach((comment) => comments.push(comment));
        setCommentLists(comments);
      })
      .catch((error) => {
        // 인터넷문제로 실패시 실행할 코드
        console.log(error);
      });
  }, [newComments]);

  function commentHandler(comment) {
    fetch("/api/comment/new", {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        parent: props.parent,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return console.log(res.status);
        }
      })
      .then((res) => {
        setNewComments(newComments + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div>Comments</div>
      <div className="commentList">
        {commentLists.length > 0 ? (
          commentLists.map((item, index) => (
            <div key={index} className="commentList">
              <p>{item.content}</p>
              <p>
                {item.firstName} {item.lastName}
              </p>
            </div>
          ))
        ) : (
          <p className="py-6">No Comments...</p>
        )}
      </div>
      <textarea
        name="comment"
        className="w-full h-20 rounded-md mb-6 px-3 py-2"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>

      <button
        className="btn-primary bg-indigo-950 rounded-lg text-white"
        onClick={() => {
          commentHandler(comment);
        }}
      >
        Add a Comment
      </button>
    </div>
  );
}
