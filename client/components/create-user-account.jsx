/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
import React from 'react';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      validFirstName: null,
      validLastName: null,
      validEmail: null,
      validPassword: false // hard code for now
    };
    this.infoInput = this.infoInput.bind(this);
    this.createUserAccount = this.createUserAccount.bind(this);
  }

  infoInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.firstName !== prevState.firstName) {
      this.validateUserInformation();
    } else if (this.state.lastName !== prevState.lastName) {
      this.validateUserInformation();
    } else if (this.state.email !== prevState.email) {
      this.validateUserInformation();
    } else if (this.state.password !== prevState.password) {
      this.validateUserInformation();
    }
  }

  validateUserInformation() {
    const { firstName, lastName, email, password } = this.state;
    const firstNameIsValid = firstName.length >= 2 && firstName.length <= 32;
    const lastNameIsValid = lastName.length >= 2 && lastName.length <= 32;
    const validateEmailRegex = RegExp(/^([a-z\d\.-_]{1,64})@([a-z\d\-]{1,227})\.([a-z]{2,28})$/);
    // const validatePasswordRegex = RegExp(//);

    if (event.target.name === 'firstName') {
      if (!firstNameIsValid) {
        this.setState({ validFirstName: false });
      } else {
        this.setState({ validFirstName: true });
      }
    } else if (event.target.name === 'lastName') {
      if (!lastNameIsValid) {
        this.setState({ validLastName: false });
      } else {
        this.setState({ validLastName: true });
      }
    } else if (event.target.name === 'email') {
      if (!validateEmailRegex.test(email)) {
        this.setState({ validEmail: false });
      } else {
        this.setState({ validEmail: true });
      }
    }
  }

  createUserAccount() {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    })
      .then(response => response.json())
      .then(data => console.log('data: ', data))
      .catch(err => console.error(err));
  }

  render() {
    const { firstName, lastName, email, password, validFirstName, validLastName, validEmail, validPassword } = this.state;
    const red = 'border-danger';
    const green = 'border-success';
    const checkFirstNameInput = !validFirstName || validFirstName === null ? red : green;
    const checkLastNameInput = !validLastName || validLastName === null ? red : green;
    const checkEmailInput = !validEmail || validEmail === null ? red : green;
    const checkPasswordInput = !validPassword || validPassword === null ? red : green;

    return (
      <div style={{ height: '100%', backgroundColor: 'white', width: '100%' }}>
        <div className='createAccountUpperText'> Let&apos;s Get Started </div>
        <form className='d-flex flex-column form-group' onSubmit={this.createUserAccount}>
          <div className='userCreateFirstLastNameContainer d-flex flex-row'>
            <div className='userCreateFirstContainer d-flex flex-column'>
              <div> First Name</div>
              <input name='firstName' type='text' className={`userCreateFirstInput border ${checkFirstNameInput}`} value={firstName} onChange={this.infoInput} />
            </div>
            <div className='userCreateLastContainer d-flex flex-column'>
              <div> Last Name </div>
              <input name='lastName' type='text' className={`userCreateLastInput border ${checkLastNameInput}`} value={lastName} onChange={this.infoInput} />
            </div>
          </div>
          <div className='userCreateEmailContainer d-flex flex-column'>
            <div> Email </div>
            <input name='email' type='text' className={`userCreateEmailInput border ${checkEmailInput}`} value={email} onChange={this.infoInput} />
            {!validEmail ? <div className='mx-4' style={{ fontSize: '1.2vh', color: '#AC1E1E' }}> Email must be a valid address, e.g. me@mydomain.com </div> : null }
          </div>
          <div className='userCreatePasswordContainer d-flex flex-column'>
            <div> Password </div>
            <input name='password' type='text' className={`userCreatePasswordInput border ${checkPasswordInput}`} value={password} onChange={this.infoInput} />
          </div>
          <div className='userCreateText1'> We will never share your data with a third party. </div>
          <button className='userCreateSignUp'> SIGN UP </button>
        </form>
        <div className='userCreateBottomContainer'>
          <div className='userCreateBotText'> Already have an account? </div>
          <div
            className='userCreateLogIn'
            onClick={() => this.props.setView('login', {})}>
              LOG IN
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
