import React from "react";

import AddTask from './AddTask';
import Header from './Header';
import Tasks from './Tasks';


class TodoApp extends React.Component {

    state = {
        todoList: [],
        activeItem:{
            id: null,
            title: '',
            completed: false
        },
        editing: false
    }

    getCookie = name => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i=0; i<cookies.length; i++) {
                let cookie = cookies[i].trim();
                
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    fetchTasks = () => {
        console.log("Fetching.....")
        let url = 'http://localhost:8000/api/task-list/';

        fetch(url)
        .then(response => response.json())
        .then(data =>
            this.setState({
                todoList: data
            })
        )
    }

    handleChange = e => {
        let value = e.target.value;

        this.setState({
            activeItem: {
                ...this.state.activeItem,
                title: value
            }
        })
    }

    handleSubmit = e => {
        let arr = this.state.todoList;
        let value = this.state.activeItem.title

        if(value === '') return "You can't add an empty list !!!";

        for(let i=0; i<this.state.todoList.length; i++){
            if(arr[i].title === value){
                return "You have already added a similar option...";
            }
        }

        let url = 'http://localhost:8000/api/task-create/';
        let csrftoken = this.getCookie('csrftoken')

        if(this.state.editing){
            url = `http://localhost:8000/api/task-update/${ this.state.activeItem.id }`;
            this.setState({
                editing: false
            })
        }

        fetch(url, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(this.state.activeItem)
        }).then(response => {
            this.fetchTasks()
            this.setState({
                activeItem:{
                    id: null,
                    title: '',
                    completed: false
                }
            })
        }).catch(error => {
            return 'ERROR: ' + error;
        })
    }

    startEdit = task => {
        this.setState({
            activeItem: task,
            editing: true
        })
    }

    deleteItem = task => {
        let csrftoken = this.getCookie('csrftoken')
        let url = `http://localhost:8000/api/task-delete/${ task.id }`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        }).then(response => {
            this.fetchTasks()
        })
    }

    strikeUnstrike = task => {
        task.completed = !task.completed
        let csrftoken = this.getCookie('csrftoken')
        let url = `http://localhost:8000/api/task-update/${ task.id }`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ 'completed': task.completed, 'title': task.title })
        }).then(response => {
            this.fetchTasks()
        })
    }

    componentDidMount(){
        this.fetchTasks()
    }

    render(){
        const subTitle = <p>One of the most secure, fastest and feature rich app &#x1F603;</p>

        return(
            <div className = "container">
                <Header
                    subTitle = { subTitle }
                />
                <div id = "task-container">
                    <AddTask
                        title = { this.state.activeItem.title }
                        handleSubmit = { this.handleSubmit }
                        handleChange = { this.handleChange }
                    />

                    <Tasks
                        tasks = { this.state.todoList }
                        strikeUnstrike = { this.strikeUnstrike }
                        startEdit = { this.startEdit }
                        deleteItem = { this.deleteItem }
                    />
                </div>
            </div>
        )
    }
}

export default TodoApp