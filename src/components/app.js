import React from "react";
import TodosList from "./todos-list"
import CreateTodo from "./create-todo";
import css from "./style.css";
import GithubCorner from "react-github-corner";

const todos = {
    items: [],
    lsKey: "todos",
    lsCompletedKey : "todosCompleted",
    populate () {
        this.items = this.get();
        this.completedItems = this.getCompletedItems();
    },
    get () {
        try {
            return JSON.parse(localStorage.getItem(this.lsKey)) || []
        } catch (e) {}
        return [];
    },
    getCompletedItems(){
        try {
            return JSON.parse(localStorage.getItem(this.lsCompletedKey)) || []
        } catch (e) {}
        return [];
    },
    save () {
        localStorage.setItem(this.lsKey, JSON.stringify(this.items));
    },
    saveCompletedItems (){
        localStorage.setItem(this.lsCompletedKey, JSON.stringify(this.completedItems));
    },
    toggle (id,isCompleted) {
        
        

        if(isCompleted){
            let todoItem = this.completedItems[id];
            todoItem.isCompleted = false;
            todoItem.completedDate = null;
            this.completedItems.splice(id,1);
            this.items.push(todoItem);
         
        }else{
            let todoItem = this.items[id];
            todoItem.isCompleted = true;
            todoItem.completedDate = new Date().getTime();
            this.completedItems.push(todoItem);
            this.items.splice(id,1);
         
        }
        this.save();
        this.saveCompletedItems();
    },
    add (obj) {
        this.items.push(obj);
        this.save();
    },
    remove (id , isCompleted) {
        if(isCompleted){
            this.completedItems.splice(id, 1);
        }else{
            this.items.splice(id, 1);
        }
        this.save();
    },
    update (id, task,isCompleted) {
        if(isCompleted){
            let todoItem = this.completedItems[id];
            todoItem.task = task;
            this.saveCompletedItems();
        }else{

            let todoItem = this.items[id];
            todoItem.task = task;
            this.save();
        }
    }
};

todos.populate();


export default class App extends React.Component {
    constructor (props) {
        super(props);
        //setInterval(() => {
        //    todos.push({
        //        task: "Make tea: " + Math.random(),
        //        isCompleted: true
        //    });
        //    this.setState({ todos });
        //}, 1000);


        this.state = {
            todos: todos.items,
            completedTodos : todos.completedItems
        };
    }
    render () {
        return (
            <div>
                <GithubCorner
                    href="https://github.com/IonicaBizau/react-todo-app"
                    bannerColor="#64CEAA"
                    octoColor="#fff"
                    width={80}
                    height={80}
                    direction="right"
                />
                <h1>TODOs</h1>
                <CreateTodo
                    createTask={this.createTask.bind(this)}
                />
                <TodosList
                    todos={this.state.todos}
                    completedTodos={this.state.completedTodos}
                    toggleTask={this.toggleTask.bind(this)}
                    editTask={this.editTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }

    createTask (task) {
        task = task.trim();
        if (!task) { return; }
        todos.add({
            task,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
    }

    toggleTask (taskId,isCompleted) {
        todos.toggle(taskId,isCompleted);
        this.setState({ todos: this.state.todos });
    }
    editTask (taskId, task,isCompleted) {
        todos.update(taskId, task, isCompleted);
        this.setState({ todos: this.state.todos });
    }
    deleteTask (taskId,isCompleted) {
        todos.remove(taskId,isCompleted);
        this.setState({ todos: this.state.todos });
    }
}
