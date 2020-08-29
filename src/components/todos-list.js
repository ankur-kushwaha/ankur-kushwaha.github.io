/* eslint-disable react/prop-types */
import React from "react";
import TodosListHeader from "./todos-list-header";
import TodosListItem from "./todos-list-item";

export default function TodosList({todos,completedTodos,toggleTask,editTask,deleteTask}){
 
  function renderTodos(todos){
    return todos.map((c, index) => {
      return (
        <TodosListItem
          key={index}
          {...c}
          id={index}
          toggleTask={toggleTask}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      )
    });
  }

  function renderItems (todos) {
    return renderTodos(todos)        
  }

  function renderCompletedItems(completedTodos){

    let output = completedTodos
      .sort((a,b)=>b.completedDate-a.completedDate)
      .reduce(function(a,b){
        if(a[new Date(b.completedDate).toDateString()]){
          a[new Date(b.completedDate).toDateString()].push(b);
        }else{
          a[new Date(b.completedDate).toDateString()]=[b];
        }
        return a;
      },{}) 

    return Object.keys(output).map((dateString,i)=>{
      return ( <div key={i}>
        <div className="caption">{dateString}</div>
        <div>
          {renderItems(output[dateString])}
        </div>
      </div>)
    })    
  }
  
  if (!todos.length && !completedTodos.length) {
    return <p className="tutorial">Create your first todo! :)</p>;
  }
  return (
    <div className="todo-list">
     
      {/* {renderItems(todos)} */}
      {todos.map((c, index) => {
        return (
          <TodosListItem
            key={index}
            {...c}
            id={index}
            toggleTask={toggleTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        )
      })}
      
      {renderCompletedItems(completedTodos)}
    </div>
  )
  
}
