import React from "react";
import TodosListHeader from "./todos-list-header";
import TodosListItem from "./todos-list-item";

export default class TodosList extends React.Component {

    renderTodos(todos){
        return todos.map((c, index) => {
            return (
                <TodosListItem
                    key={index}
                    {...c}
                    id={index}
                    toggleTask={this.props.toggleTask}
                    editTask={this.props.editTask}
                    deleteTask={this.props.deleteTask}
                />
            )
        });
    }

    renderItems (todos) {
        return this.renderTodos(todos)        
    }

    renderCompletedItems(completedTodos){

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
            return ( <table key={i}>
                 <caption>{dateString}</caption>
                <tbody>
                    {this.renderItems(output[dateString])}
                </tbody>
            </table>)
        })

       
    }
    render () {
        if (!this.props.todos.length && !this.props.completedTodos.length) {
            return <p className="tutorial">Create your first todo! :)</p>;
        }
        return (
            <div>
            <table>
                {/* <TodosListHeader /> */}
                <tbody>
                    {this.renderItems(this.props.todos)}
                </tbody>
            </table>
           

            {this.renderCompletedItems(this.props.completedTodos)}
           
            </div>
        )
    }
}
