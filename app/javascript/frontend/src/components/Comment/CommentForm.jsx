import React, { useState } from 'react';
import { FaCaretRight } from "react-icons/fa";

export default function CommentForm() {
  const [message, setMessage] = useState('');
  return (
    <form className="w-full md:w-96">
{/*       <img
        src="https://cdn.noitatnemucod.net/avatar/100x100/jujutsu_kaisen/File14.png"
        alt="profile"
        className="rounded-full w-16 h-16"
      /> */}
      <label className="p-1 flex items-center text-left w-full border rounded-md bg-white">
        <input
          type="text"
          value={message}
          placeholder="Add a comment"
          className="outline-0 text-lg w-full md:w-96 text-black"
          onChange={(e)=>{setMessage(e.target.value)}}
        />
        <FaCaretRight className="text-3xl text-black hover:cursor-pointer" />
      </label>
    </form>
  )
}
