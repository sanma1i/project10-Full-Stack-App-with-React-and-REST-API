import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Courses extends Component {

    state = {
        courses: null,
        isRedirect: false,
        redirectMessages: null,
    }

    async componentDidMount() {

        const { data } = this.props.context;

        try {
            //fetches all courses
            const res = await data.getCourses('/courses')
            if (res.length > 0) {
                this.setState({ courses: res });
            }
        } catch (err) {
            if (err.status === 500) {
                this.setState({
                    isRedirect: true,
                    redirectPath: '/error',
                    redirectMessages: err
                });
            } else {
                this.setState({
                    isRedirect: true,
                    redirectMessages: err,
                });
            }
        }
    }

    render() {

        const { courses, isRedirect } = this.state;

        //if courses is not null lessons will have an array of fetched courses
        const lessons =
            (courses !== null) ?
                courses.map(val => (
                    <div className="grid-33" key={val.id} >
                        <a className="course--module course--link" href={`/courses/${val.id}`}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{val.title}</h3>
                        </a>
                    </div>
                ))
                : false;

        //any error occurred user will be directed to an error page
        if (isRedirect) {
            return <Redirect to={{
                pathname: '/error',
                state: this.state.redirectMessages
            }} />
        }

        return (
            <div className="bounds">
                {lessons}
                <div className="grid-33">
                    <a className="course--module course--add--module" href="/courses/create">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>
                            New Course
                    </h3>
                    </a>
                </div>
            </div>
        );
    }
}

export default Courses