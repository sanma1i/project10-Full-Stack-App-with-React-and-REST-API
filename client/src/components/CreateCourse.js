import React from 'react';
import { Link } from 'react-router-dom';

class CreateCourse extends React.Component {
    // Initial state
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }

    // Function to handle input
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // Create handler
    handleSubmit = async (e) => {
        e.preventDefault();
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const authUserId = authUser.id;
        const emailAddress = authUser.emailAddress;
        const password = authUser.password;
        const data = this.state;
        data.userId = authUserId;

        // POST request to Api
        const res = await context.data.api("/courses", "POST", data, true, { emailAddress, password });
        console.log(emailAddress);
        console.log(password);
        // If api returns status 201 redirect to main page  
        if (res.status === 201 || res.status === 200) {
            window.location.href = "/";
            // If api returns status 400 - render error messages on what info is missing
        } else if (res.status === 400) {
            this.setState({
                errors: ["Missing information - Please check all fields are entered correctly"]
            })
            return;
            // If api returns 401 or 403 - render forbidden page
        } else if (res.status === 401 || res.status === 403) {
            window.location.href = '/forbidden';
            // Otherwise render unhandled errror page
        } else {
            window.location.href = '/error';
        }
    }

    render() {
        // Storing form values to state
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {/* Ternary operator that will show validation errors only if there are errors*/}
                    {
                        this.state.errors.length ?
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
                                    </ul>
                                </div>
                            </div> : null
                    }
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" onChange={this.change} value={title} className="input-title course--title--input" placeholder="Course title..." />
                                </div>
                                <p>By {authUser.firstName} {authUser.lastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" onChange={this.change} value={description} className="" placeholder="Course description..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={this.change} value={estimatedTime} className="course--time--input"
                                                placeholder="Hours" />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div><textarea id="materialsNeeded" name="materialsNeeded" onChange={this.change} value={materialsNeeded} className="" placeholder="List materials..."></textarea></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <Link className="button button-secondary" to="/">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default CreateCourse