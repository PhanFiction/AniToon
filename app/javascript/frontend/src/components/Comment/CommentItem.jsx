import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown, FaReply } from "react-icons/fa";

const fakeComments = [
  {
    comment: "23:59 HOLY ****! Is that a JJK reference!???",
    userId: 1,
    username: "Jackie"
  },
  {
    comment: "done on 28/11/24",
    userId: 2,
    username: "Asuna"
  },
  {
    comment: "24:00 bro is mimicking gojo",
    userId: 3,
    username: "itz_cylina"
  },
  {
    comment: "My boy nagi🔥",
    userId: 4,
    username: "Jin"
  },
  {
    comment: "This is one of the best movie I have ever seen it looks like underrated way there is only 800 comments",
    userId: 5,
    username: "Hamza boss"
  },
  {
    comment: "fire",
    userId: 6,
    username: "BalrajBali"
  },
  {
    comment: "I guess this is where all of the budget of season 2 went",
    userId: 7,
    username: "JOICEJVARGHESE"
  },
  {
    comment: "still better than Haikyu",
    userId: 8,
    username: "Anguished6"
  },
]

export default function CommentItem() {
  return (
    <>
      {
        fakeComments.map((c, index) => 
          <div key={index} className="flex gap-4 my-8">
            <img src="https://cdn.noitatnemucod.net/avatar/100x100/jujutsu_kaisen/File14.png" alt="profile" className="rounded-full w-16 h-16" />
            <div className="flex flex-col">
              <div>
                <span className="text-sm font-bold mb-2">{c.username}</span>
                <p className="text-lightGray">{c.comment}</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 hover:cursor-pointer">
                  <FaReply />
                  <span>Reply</span>
                </button>
                <button className="flex items-center gap-2 hover:cursor-pointer">
                  <FaRegThumbsUp />
                  <span>24</span>
                </button>
                <button className="flex items-center gap-2 hover:cursor-pointer">
                  <FaRegThumbsDown />
                  <span>6</span>
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
