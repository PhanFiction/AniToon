import React from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import useFetchUser from '../../hooks/useFetchUser';

export default function Comment() {
  const { user } = useFetchUser();
  return (
    <section>
      {
        user ? <CommentForm /> : null
      }
      <CommentItem />
    </section>
  )
}
