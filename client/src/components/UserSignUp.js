import React, { Component } from 'react';

class UserSignUp extends Component {

    // inital state
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: {},
        confirmSignInMsg: null,

    }

    // change func to handle form inputs
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // submit func that creates a new user and sends the credentials to the express server
    submit = (e) => {
        e.preventDefault();
        // context from props
        const { context } = this.props;
        // from is either the previous location before landing on '/signup' or '/'
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        // form values from state
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        // payload new user data
        let user = {};

        // if passwords don't match
        if (password !== confirmPassword) {
            this.setState({
                errors: ["confirm password"]
            })
            return;
        } else {
            user = {
                firstName,
                lastName,
                emailAddress,
                password
            };
        }

        // // now we can call createUser with the new payload
        context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors: errors });
                } else {
                    this.setState({ errors: [] });
                    // after the new user is created we automatically sign-in and redirect to '/'
                    context.actions.signIn(emailAddress, password)
                        .then(user => this.props.history.push(from))
                        .catch(err => {
                            console.log(err);
                            this.props.history.push('/error');
                        })
                }
            })
            .catch(err => { // handle rejected promises
                console.log(err);
                this.props.history.push('/error'); // push to history stack
            });

    } // end submit func


    render() {
        // form values from state
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    {/* ternary operator -> validation errors ? show them : show nothing */}
                    {
                        this.state.errors.length ?
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
                                    </ul>
                                </div>
                            </div> : null
                    }
                    {/* ternary operator -> confirmSignInMsg ? show it : show nothing */}
                    {
                        this.state.confirmSignInMsg ?
                            <div>
                                <div className="validation-errors">
                                    <ul>
                                        <li>You are all set now! <a style={{ fontWeight: "bold" }} href="/signin">Sign In</a>!</li>
                                    </ul>
                                </div>
                            </div> : null
                    }
                    <div>
                        <form onSubmit={this.submit}>
                            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.change} value={firstName} /></div>
                            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.change} value={lastName} /></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change} value={emailAddress} /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change} value={password} /></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                                onChange={this.change} value={confirmPassword} /></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
                </div>
            </div>
        );
    }
}
export default UserSignUp