import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './styles/global.css';
import Header from './components/Header';
//import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
//import CreateCourse from './components/CreateCourse';
//import UpdateCourse from './components/UpdateCourse';
//import NotFound from './components/NotFound'
//mport UserSignUp from './components/UserSignUp';
//import UserSignIn from './components/UserSignIn';
//import UserSignOut from './components/UserSignOut';
//import Authenticated from './components/Authenticated';
//import UnhandledError from './components/UnhandledError';
//import Forbidden from './components/Forbiden';
import withContext from './Context';
//import PrivateRoute from './PrivateRoute';

// //components with Context
const HeaderWithContext = withContext(Header);
const CoursesContext = withContext(Courses);
//const CourseDetailContext = withContext(CourseDetail);
//const UserSignUpContext = withContext(UserSignUp);
//const UserSignInContext = withContext(UserSignIn);
//const UserSignOutContext = withContext(UserSignOut);
//const CreateCourseContext = withContext(CreateCourse);
//const UpdateCourseContext = withContext(UpdateCourse);*/}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route render={({ location }) => <HeaderWithContext location={location.pathname} />} />

          <Switch>
            <Route exact path="/" component={CoursesContext} />
            {/*<PrivateRoute path="/courses/create" component={CreateCourseContext} />*/}
            {/*<PrivateRoute path="/courses/:id/update" component={UpdateCourseContext} />*/}
            {/*<Route path="/courses/:id" component={CourseDetailContext} />*/}
            {/*}Route path="/signin" component={UserSignInContext} />*/}
            {/*<Route path="/signup" component={UserSignUpContext} />
          <Route path="/signout" component={UserSignOutContext} />*/}
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
