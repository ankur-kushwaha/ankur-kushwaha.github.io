/* eslint-disable react/prop-types */
import React from 'react'

export default function CreateTodo ({createTask}) {
  let [text,setText] = React.useState("");

  function onSubmit (e) {
    e.preventDefault()
    createTask(text)
    setText("")
  }

  function handleKeyDown (e) {
    if (e.which == 13) {
      onSubmit(e)
    }
  }
 
  return (
    <div className="create-todo-form">
      <input value={text} onKeyDown={handleKeyDown} onChange={e=>setText(e.target.value)} type="text" placeholder="What needs to done" autoFocus/>
    </div>
  )
}
