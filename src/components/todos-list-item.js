/* eslint-disable react/prop-types */
import React from "react";
import { FiX,FiCircle,FiCheckCircle } from "react-icons/fi";


export default class TodosListItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isEditing: false
    };
  } 

  //   renderActionSection () {
  //     if (this.state.isEditing) {
  //       return (
  //         <div>
  //           <button onClick={this.editTask.bind(this)}>Save</button>
  //           <button className="cancel-btn" onClick={this.setEditState.bind(this, false)}>Cancel</button>
  //         </div>
  //       );
  //     }
  //     return (
     
  //     );
  //   }

  handleKeyDown(e){
    if(e.which == 13){
      this.props.editTask(this.props.id, this.refs.task.value,this.props.isCompleted);
      this.setState({
        isEditing: false
      });
    }
  }

  setEditState (isEditing) {
    console.log(isEditing);
    this.setState({
      isEditing
    });
  }

  toggleTask () {
    this.props.toggleTask(this.props.id,this.props.isCompleted);
  }

  deleteTask () {
    this.props.deleteTask(this.props.id,this.props.isCompleted);
  }

  render () {
    
    const { task, isCompleted } = this.props;
    const {isEditing} = this.state;
    return (
      <div className={"todo-" + (isCompleted ? "completed" : "not-completed") }>
        <div className="todo-list-item">
          <span className="toggle-task" onClick={this.toggleTask.bind(this)}>
            {isCompleted ? <FiCheckCircle/>:<FiCircle/>}
        
          </span>
          {!isEditing?
            <div className="text"  onDoubleClick={()=>this.setEditState(true)} >{task}</div>
            :<input onKeyDown={this.handleKeyDown.bind(this)} ref="task" defaultValue={task} autoFocus />
          }
         
        </div>
        <span className="delete-btn" onClick={this.deleteTask.bind(this)}><FiX/></span> 
      </div>
    )
  }

 
}
