import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

//Import Components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Header from './components/Header';
import UserSignOut from './components/UserSignOut'
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhendledError';


class App extends React.Component {
  //   state = {
  //     courses: [],
  //     isLoading: true
  //   }

  //   componentDidMount() {
  //     fetch(`http://localhost:5000/api/courses`)
  //       .then(response => response.json())
  //       .then(courses => this.setState({
  //         courses: courses,
  //         isLoading: false,
  //       }))
  //       .then(() => console.log(this.state.courses))
  //       .catch(error => console.log('Sorry'));
  //   }
  //   render() {
  //     return this.state.isLoading ? (<h2>It's Loading...</h2>) : (
  //       <div className="container">
  //         {
  //           this.state.courses.map(course => {
  //             return (
  //               <ul key={course.id}>
  //                 <li>{course.id}</li>
  //                 <li>{course.title}</li>
  //                 <li>{course.description}</li>
  //                 <li>{course.estimatedTime}</li>
  //                 <li>{course.materialsNeeded}</li>
  //               </ul>
  //             );
  //           })
  //         }
  //       </div>
  //     )
  //   }
}
export default App;

