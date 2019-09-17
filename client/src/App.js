import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './styles/global.css';
import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
//import NotFound from './components/NotFound'
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
//import UnhandledError from './components/UnhandledError';
//import Forbidden from './components/Forbiden';
import withContext from './Context';



// //components with Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route render={({ location }) => <HeaderWithContext location={location.pathname} />} />

          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            {/*<Route path="/forbidden" component={Forbidden} />*/}
            {/*<Route path="/error" component={UnhandledError} />*/}
            {/*<Route component={NotFound} />*/}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
