import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

//First create context
const Context = React.createContext();

export class Provider extends Component {
    /*create state that saves both the cookies with authenticated approval and a plain text
    *password that can be sent to the api
    */
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        userPassword: Cookies.getJSON('userPassword') || null
    };
    //constructor creating new instances of the Data module
    constructor() {
        super();
        this.data = new Data();
    }

    //actions and data saved in Context to be used throughout the modules
    render() {
        const { authenticatedUser, userPassword } = this.state;
        const value = {
            authenticatedUser,
            userPassword,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
                updateCourse: this.updateCourse,
                createCourse: this.createCourse,
                deleteCourse: this.deleteCourse
            }
        }
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    //Context actions that handle the access and manipulation of data
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                    userPassword: password
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
            Cookies.set('userPassword', JSON.stringify(password), { expires: 1 });
        }
        return user
    }

    updateCourse = async (course, id, { emailAddress, password }) => {
        const updatedCourse = await this.data.updateCourseDetail(course, id, { emailAddress, password });
        if (updatedCourse) {
            return updatedCourse
        };
    }

    createCourse = async (course, { emailAddress, password }) => {
        const createdCourse = await this.data.createCourse(course, { emailAddress, password });
        if (createdCourse) {
            return createdCourse;
        };
    }
    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null,
                userPassword: null
            };
        });
        Cookies.remove('authenticatedUser');
        Cookies.remove('userPassword');
    }

    deleteCourse = async (courseId, { emailAddress, password }) => {
        const deletedCourse = await this.data.deleteCourse(courseId, { emailAddress, password });
        if (deletedCourse) {
            return deletedCourse
        };
    }
}

export const Consumer = Context.Consumer;

/*
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 * method from the Treehouse React Authentication course by Guil Hernandez
 */

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}