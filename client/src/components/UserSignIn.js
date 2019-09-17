import React from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends React.Component {
    // Initial state
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    // Function to handle form input
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // Function to get authenticated user
    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const {
            emailAddress,
            password
        } = this.state;

        // If sign in is unsuccesful - return error message, otherwise direct user to page they were on
        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    this.setState(() => {
                        return { errors: ['Sign-in was unsuccessful - Please check all fields'] };
                    });
                } else {
                    this.props.history.push(from);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            })

    }

    render() {
        // Storing credentials state
        const {
            emailAddress,
            password
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    {/* Ternary operator shows validation errors only if they exist */}
                    {
                        this.state.errors.length ?
                            <div>
                                <div className="validation-errors">
                                    <ul>
                                        {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
                                    </ul>
                                </div>
                            </div> : null
                    }
                    <div>
                        <form onSubmit={this.submit}>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change} value={emailAddress} /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change} value={password} /></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <Link className="button button-secondary" to="/">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
                </div>
            </div>
        );
    }
}
export default UserSignIn