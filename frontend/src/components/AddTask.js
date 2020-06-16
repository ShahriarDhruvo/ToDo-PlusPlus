import React from "react";

class AddTask extends React.Component {
    state = {
        error: undefined
    }

    handleSubmit = e => {
        e.preventDefault();

        const error = this.props.handleSubmit(e);
        this.setState(() => ({ error }));
    }

    render(){
        return (
            <div id = "form-wrapper">
                { this.state.error && <p className="">{ this.state.error }</p> }
                <form onSubmit = { this.handleSubmit } id = "form">
                    <div className="flex-wrapper">
                        <div style={{ flex: 6 }}>
                            <input 
                                onChange = { this.props.handleChange } 
                                className = "form-control" 
                                id = "title" 
                                type = "text" 
                                name = "title" 
                                value = { this.props.title }
                                placeholder = "Add task..."
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddTask;