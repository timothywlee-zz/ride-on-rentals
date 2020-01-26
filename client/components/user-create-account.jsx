import React from 'react';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.firstNameInput = this.firstNameInput.bind(this);
    this.lastNameInput = this.lastNameInput.bind(this);
    this.emailInput = this.emailInput.bind(this);
    this.passwordInput = this.passwordInput.bind(this);
    this.firstNameSubmit = this.firstNameSubmit.bind(this);
    this.lastNameSubmit = this.lastNameSubmit.bind(this);
    this.emailSubmit = this.emailSubmit.bind(this);
    this.passwordSubmit = this.passwordSubmit.bind(this);
  }

  firstNameInput(event) {
    this.setState({ firstName: event.target.value });
  }

  lastNameInput(event) {
    this.setState({ lastName: event.target.value });
  }

  emailInput(event) {
    this.setState({ email: event.target.value });
  }

  passwordInput(event) {
    this.setState({ password: event.target.value });
  }

  firstNameSubmit(event) {
    event.preventDefault();
    this.setState({ firstName: '' });
  }

  lastNameSubmit(event) {
    event.preventDefault();
    this.setState({ lastName: '' });
  }

  emailSubmit(event) {
    event.preventDefault();
    this.setState({ email: '' });
  }

  passwordSubmit(event) {
    event.preventDefault();
    this.setState({ password: '' });
  }

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <div className='container' style={{ height: '1000px', backgroundColor: 'white', width: '100%' }}>
        <div> Let's Get Started </div>

        <div className='d-flex column'>

          <div className='d-flex-row'>
            <form className='d-flex flex-column' onSubmit={this.firstNameSubmit}>
              <div> First Name</div>
              <input type='text' className='border' value={firstName} onChange={this.firstNameInput}/>
            </form>
            <form className='d-flex flex-column' onSubmit={this.lastNameSubmit}>
              <div> Last Name </div>
              <input type='text' className='border' value={lastName} onChange={this.lastNameInput} />
            </form>
          </div>

          <form className='d-flex flex-column' onSubmit={this.emailSubmit}>
            <div> Email </div>
            <input type='text' className='border' value={email} onChange={this.emailInput} />
          </form>

          <form className='d-flex flex-column' onSubmit={this.passwordSubmit}>
            <div> Password </div>
            <input type='text' className='border' value={password} onChange={this.passwordInput} />
          </form>

        </div>
      </div>
    );
  }
}

export default CreateAccount;
