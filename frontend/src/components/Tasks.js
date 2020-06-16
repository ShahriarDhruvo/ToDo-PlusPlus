import React from "react";

const Tasks = (props) => (
    <div id = "list-wrapper">
        { props.tasks.map((task, index) => (
            <div key={ index } className="task-wrapper flex-wrapper">
                <div onClick = { () => props.strikeUnstrike(task) } style = {{ flex: 7 }}>
                    { 
                        !task.completed ?
                        <span>{ task.title }</span> : <strike>{ task.title }</strike> 
                    }
                </div>
                
                <div style = {{ flex: 1 }}>
                    <button onClick = { () => props.startEdit(task) } className = "btn btn-sm btn-outline-info">Edit</button>
                </div>
                
                <div style = {{ flex: 1 }}>
                    <button onClick = { () => props.deleteItem(task) } className = "btn btn-sm btn-outline-dark delete">-</button>
                </div>
            </div>
        )) }
    </div>
)

export default Tasks