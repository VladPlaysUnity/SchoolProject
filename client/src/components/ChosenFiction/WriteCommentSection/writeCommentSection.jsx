import s from './writeCommentSection.module.css'
import React from 'react'

const WriteCommentSection = (props) => {
  let newCommentElement = React.createRef();

  let sendMessage = ()=>{
    props.addComment(newCommentElement.current.value)
  };

  return(
    <div className={s.write_comment_section}>
      <textarea ref={newCommentElement} placeholder="Write your comment here"></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default WriteCommentSection;
