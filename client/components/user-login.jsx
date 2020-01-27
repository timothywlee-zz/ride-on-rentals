import React from 'react';

class UserLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.emailInput = this.emailInput.bind(this);
    this.emailSubmit = this.emailSubmit.bind(this);
    this.passwordInput = this.passwordInput.bind(this);
    this.passwordSubmit = this.passwordSubmit.bind(this);
  }

  emailInput(event) {
    this.setState({ email: event.target.value });
  }

  emailSubmit(event) {
    event.preventDefault();
    this.setState({ email: '' });
  }

  passwordInput(event) {
    this.setState({ password: event.target.value });
  }

  passwordSubmit(event) {
    event.preventDefault();
    this.setState({ password: '' });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='container' style={{ height: '1000px', backgroundColor: 'white', width: '100%' }}>
        <div> Welcome Back </div>
        <div className='d-flex flex-column'>
          <form className='d-flex flex-column' onSubmit={this.emailSubmit}>
            <div>Email</div>
            <label>
              <input type='text' className='border' value={email} onChange={this.emailInput} />
            </label>
          </form>
          <form className='d-flex flex-column' onSubmit={this.passwordSubmit}>
            <div> Password </div>
            <label>
              <input type='text' className='border' value={password} onChange={this.passwordInput}/>
            </label>
          </form>
        </div>
        <div className='border '> Log In </div>
      </div>
    );
  }
}

export default UserLogIn;
