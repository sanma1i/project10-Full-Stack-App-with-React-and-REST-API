import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";


class CourseDetail extends Component {

    // inital state of the CourseDetail Component
    state = {
        course: [],
        userInfo: [],
        isUserAuth: null,
    };

    // FETCH single course from REST API
    // and setState when component mounted
    async componentDidMount() {
        const res = await this.props.context.data.api(`/courses/${this.props.match.params.id}`, "GET");
        if (res.status === 200) {
            return res.json().then(course => {
                // context from props
                const { context } = this.props;
                // authenticated user from context
                const authUser = context.authenticatedUser;
                let user = null;
                // is user authenticated && and the course owner ?
                if (authUser && authUser.id === course[0].userId) {
                    user = true;
                }
                // setState
                this.setState({
                    course: course.course,
                    userInfo: course.course.user,
                    isUserAuth: user,
                });
            });
        } else if (res.status === 404) { // not found
            window.location.href = '/notfound';
        } else if (res.status === 500) { // server error
            window.location.href = '/error';
        } else {
            throw new Error();
        }
    }


    // handle DELETE of single course
    handleDelete = async (e) => {
        // context from props
        const { context } = this.props;
        // authenticated user credentials
        const authUser = context.authenticatedUser;
        const username = authUser.emailAddress;
        const password = authUser.password;

        // ask confirmation before deleting course
        if (window.confirm('Are you sure you want to delete this course ?')) {
            // DELETE request to the REST API
            const res = await context.data.api(`/courses/${this.props.match.params.id}`, "DELETE", null, true, { username, password });
            if (res.status === 204) {
                window.location.href = '/';
                return [];
            } else if (res.status === 401 || res.status === 403) { // Render forbidden page if status 401 or 403
                window.location.href = '/forbidden';
            } else {
                window.location.href = '/error'; // Render unhandled error page if any other status
            }
        }

    }
    render() {
        const { course } = this.state;
        const { userInfo } = this.state;
        const { isUserAuth } = this.state;

        return (
            <div>
                {/* Ternary operator to render either the content or loading message */
                    this.state.course ? (
                        <div>
                            <div className="actions--bar">
                                <div className="bounds">
                                    <div className="grid-100">
                                        {/* Ternary operator to render either Update and Delete button if user the course owner*/
                                            isUserAuth ? (
                                                <span>
                                                    <Link
                                                        className="button"
                                                        to={`/courses/${this.props.match.params.id}/update`}
                                                    >
                                                        Update Course
                      </Link>
                                                    <Link
                                                        onClick={this.handleDelete}
                                                        to="#"
                                                        className="button"
                                                    >
                                                        Delete Course
                      </Link>
                                                </span>
                                            ) : null}
                                        <Link className="button button-secondary" to="/">
                                            Return to List
                  </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="bounds course--detail">
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <h3 className="course--title">{course.title}</h3>
                                        <p>
                                            By {userInfo.firstName} {userInfo.lastName}
                                        </p>
                                    </div>
                                    <div className="course--description">
                                        <ReactMarkdown source={course.description} />
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <h3>{course.estimatedTime}</h3>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <ul>
                                                    <ReactMarkdown source={course.materialsNeeded} />
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <h3>Fetching Course Information...</h3>
                        )}
            </div>
        );
    }
}
export default CourseDetail;