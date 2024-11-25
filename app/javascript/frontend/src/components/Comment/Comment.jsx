import React from 'react';

export default function Comment() {
  return (
    <div className="flex items-center">
      <img src="https://cdn.noitatnemucod.net/avatar/100x100/jujutsu_kaisen/File14.png" alt="profile" className="rounded-full w-16 h-16" />
      <div className="flex flex-col">
        <span>Comment as user</span>
        <label htmlFor="comment"></label>
        <textarea name="comment" id="comment" className="resize-none text-black w-96 p-2" />
      </div>
    </div>
  )
}
