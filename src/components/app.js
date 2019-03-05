import React from "react";
import TodosList from "./todos-list"
import CreateTodo from "./create-todo";
import css from "./style.css";
import GithubCorner from "react-github-corner";
import { timingSafeEqual } from "crypto";

var db = firebase.firestore();

const todos = {
    items: [],
    lsKey: "todos",
    lsCompletedKey : "todosCompleted",

    get () {

        return db.collection("todosApp").doc(this.lsKey).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data().items;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    },
    getCompletedItems(){
        return db.collection("todosApp").doc(this.lsCompletedKey).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data().items;
            } else {
                console.log("No such document!");
            }
        })
    },
    save () {
        db.collection("todosApp").doc(this.lsKey).set({items:this.items});
    },
    saveCompletedItems (){
        db.collection("todosApp").doc(this.lsCompletedKey).set({items:this.completedItems});
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
            this.saveCompletedItems();
        }else{
            this.items.splice(id, 1);
            this.save();
        }
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

export default class App extends React.Component {
    constructor (props) {
        super(props);
       
        this.state={}
      
        db.collection("todosApp").doc(todos.lsKey)
            .onSnapshot((doc) =>{
                console.log("Current data: ", doc.data());
                let items = doc.data().items
                todos.items  = items;
                this.setState({
                    todos:items
                })
            });

            db.collection("todosApp").doc(todos.lsCompletedKey)
            .onSnapshot((doc) =>{
                console.log("Current data: ", doc.data());
                let items = doc.data().items
                todos.completedItems  = items;
                this.setState({
                    completedTodos:items
                })
            });
    }
    render () {
        if(!this.state.todos || !this.state.completedTodos){
            return null;
        }
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
