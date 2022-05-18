import s from './writeCommentSection.module.css'
import { useState } from 'react'

const WriteCommentSection = (props) => {
  const [commentText, setCommentText] = useState('')

  let sendMessage = ()=>{
    props.addComment(commentText)
    setCommentText('')
  };

  return(
    <div className={s.write_comment_section}>
      <textarea value={commentText} onChange={(e)=>{ setCommentText(e.target.value) }} placeholder="Write your comment here"></textarea>
      <button className={s.butt2} onClick={sendMessage}>Send</button>
    </div>
  )
}

export default WriteCommentSection;
