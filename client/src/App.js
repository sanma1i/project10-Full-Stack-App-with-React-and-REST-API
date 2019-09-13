import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import UnhandledError from './components/UnhandledError';
import Forbiden from './components/Forbiden';
import withContext from './Context';
//import PrivateRoute from './PrivateRoute';

// components with Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
//const UpdateCourseWithContext = withContext(UpdateCourse);

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/*Header always showing, location extracted and passed down as props*/}
          <Route render={({ location }) => <HeaderWithContext location={location.pathname} />} />
          <Switch>
            <Route exact path='/' component={CoursesWithContext} />

            {/*<Route  path='/courses/create' component={ CreateCourse } />*/}
            {/*<PrivateRoute path='/courses/create' component={CreateCourseWithContext} />*/}

            {/*<Route path='/courses/:id/update' component={ UpdateCourse } />*/}
            {/*<PrivateRoute path='/courses/:id/update' component={UpdateCourseWithContext} />*/}

            <Route path='/courses/:id' component={CourseDetailWithContext} />
            <Route path='/signin' component={UserSignInWithContext} />
            <Route path='/signup' component={UserSignUpWithContext} />
            <Route path='/signout' component={UserSignOutWithContext} />

            {/*<Route path='/forbidden' component={Forbidden} />*/}
            <Route path='/error' component={UnhandledError} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}