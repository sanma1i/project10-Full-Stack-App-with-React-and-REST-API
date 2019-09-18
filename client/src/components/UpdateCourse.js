import React from 'react';
import {
    Link
} from 'react-router-dom';

class UpdateCourse extends React.Component {

        // Initial state
        state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: '',
            errors: [],
        }

        // Function to handle inputs
        change = (event) => {
            const name = event.target.name;
            const value = event.target.value;

            this.setState(() => {
                return {
                    [name]: value
                };
            });
        }

        // GET request to API for the single course details
        async componentDidMount() {
            const res = await this.props.context.data.api(`/courses/${this.props.match.params.id}`, 'GET');

            // Return course details and set state if api returns status 200
            if (res.status === 200) {
                return res.json().then(course => this.setState({
                    title: course.course.title,
                    description: course.course.description,
                    estimatedTime: course.course.estimatedTime,
                    materialsNeeded: course.course.materialsNeeded,
                    userId: course.course.userId,
                }));

                // Render not found page if api returns status 404
            } else if (res.status === 404) {
                window.location.href = '/notfound';
                // Render error page if api returns status 500
            } else if (res.status === 500) { // server error
                window.location.href = '/error';
            } else {
                throw new Error();
            }
        }

        // Checking if user is authenticated/course owner - 
        // If not, user redirected to forbidden page
        componentDidUpdate() {
            const {
                context
            } = this.props;
            const authUser = context.authenticatedUser;
            const courseUserId = this.state.userId;
            if (authUser.id !== courseUserId) {
                window.location.href = '/forbidden';
            }
        }


        // Update course handler
        handleUpdate = async (e) => {
            e.preventDefault();
            const {
                context
            } = this.props;
            const authUser = context.authenticatedUser;
            const authUserId = authUser.id;
            const emailAddress = authUser.emailAddress;
            const password = authUser.password;
            const data = this.state;
            data.userId = authUserId;

            // PUT request to api
            const res = await context.data.api(`/courses/${this.props.match.params.id}`, 'PUT', data, true, {
                emailAddress,
                password
            });
            // Render course page with updated info if api responds with status 204
            if (res.status === 204) {
                this.setState({
                    errors: []
                });
                window.location.href = `/courses/${this.props.match.params.id}`;

            } else if (res.status === 400) { // Show missing error messages if api returns status 400
                this.setState({
                    errors: ["Missing information - Please check all fields are entered correctly"]
                })
                return;
                //Render forbidden page if api returns status 401 or 403
            } else if (res.status === 401 || res.status === 403) {
                window.location.href = '/forbidden';
                //Otherwise render unhandled error page
            } else {
                window.location.href = '/error';
            }
        }

        render() {

                return ( <
                    div className = "bounds course--detail" >
                    <
                    h1 > Update Course < /h1> <
                    div > {
                        /* Ternary operator which shows errors only if they exist*/
                    } {
                        this.state.errors.length ?
                            <
                            div >
                            <
                            h2 className = "validation--errors--label" > Validation errors < /h2> <
                        div className = "validation-errors" >
                            <
                            ul > {
                                this.state.errors.map((error, i) => < li key = {
                                        i
                                    } > {
                                        error
                                    } < /li>)} < /
                                    ul > <
                                    /div> < /
                                    div >: null
                                } <
                                form onSubmit = {
                                    this.handleUpdate
                                } >
                                <
                                div className = "grid-66" >
                                <
                                div className = "course--header" >
                                <
                                h4 className = "course--label" > Course < /h4> <
                                div > < input id = "title"
                                name = "title"
                                type = "text"
                                onChange = {
                                    this.change
                                }
                                value = {
                                    this.state.title
                                }
                                className = "input-title course--title--input"
                                placeholder = "Course title..." / > < /div> <
                                p > By < /p> < /
                                div > <
                                div className = "course--description" >
                                <
                                div >
                                <
                                textarea id = "description"
                                name = "description"
                                onChange = {
                                    this.change
                                }
                                value = {
                                    this.state.description
                                }
                                className = ""
                                placeholder = "Course description..." > < /textarea> < /
                                div > <
                                /div> < /
                                div > <
                                div className = "grid-25 grid-right" >
                                <
                                div className = "course--stats" >
                                <
                                ul className = "course--stats--list" >
                                <
                                li className = "course--stats--list--item" >
                                <
                                h4 > Estimated Time < /h4> <
                                div > < input id = "estimatedTime"
                                name = "estimatedTime"
                                type = "text"
                                onChange = {
                                    this.change
                                }
                                value = {
                                    this.state.estimatedTime
                                }
                                className = "course--time--input"
                                placeholder = "Hours" / > < /div> < /
                                li > <
                                li className = "course--stats--list--item" >
                                <
                                h4 > Materials Needed < /h4> <
                                div >
                                <
                                textarea id = "materialsNeeded"
                                name = "materialsNeeded"
                                onChange = {
                                    this.change
                                }
                                value = {
                                    this.state.materialsNeeded
                                }
                                className = ""
                                placeholder = "List materials..." > < /textarea> < /
                                div > <
                                /li> < /
                                ul > <
                                /div> < /
                                div > <
                                div className = "grid-100 pad-bottom" >
                                <
                                button className = "button"
                                type = "submit" > Update Course < /button> <
                                Link className = "button button-secondary"
                                to = {
                                    `/courses/${this.props.match.params.id}`
                                } > Cancel < /Link> < /
                                div > <
                                /form> < /
                                div > <
                                /div>
                            );
                    }
                }

                export default UpdateCourse;