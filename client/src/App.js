import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// // import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
// } from 'react-router-dom';
//import withContext from './Context';

// const HeaderWithContext = withContext(Header);

// export default () => (
//   <Router>
//     <div>
//       <HeaderWithContext />
//     </div>
//   </Router>
// );

class App extends React.Component {
  state = {
    courses: [],
    isLoading: true
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/courses`)
      .then(response => response.json())
      .then(courses => this.setState({
        courses: courses,
        isLoading: false,
      }))
      .then(() => console.log(this.state.courses))
      .catch(error => console.log('Sorry'));
  }
  render() {
    return this.state.isLoading ? (<h2>It's Loading...</h2>) : (
      <div className="container">
        {
          this.state.courses.map(course => {
            return (
              <ul key={course.id}>
                <li>{course.id}</li>
                <li>{course.title}</li>
                <li>{course.description}</li>
                <li>{course.estimatedTime}</li>
                <li>{course.materialsNeeded}</li>
              </ul>
            );
          })
        }
      </div>
    )
  }
}
export default App;

