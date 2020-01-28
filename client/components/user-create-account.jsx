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
    this.infoInput = this.infoInput.bind(this);
    // this.submitNewUserInformation = this.submitNewUserInformation.bind(this);
  }

  infoInput(event) {
    this.setState({ [event.target.name]: event.target.value})
  }

  // submitNewUserInformation({

  // })


  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <div style={{ height: '100%', backgroundColor: 'white', width: '100%' }}>
        <div className='createAccountUpperText'> Let's Get Started </div>
          <form className='d-flex flex-column' onSubmit={this.submitNewUserInformation}>
            <div className='userCreateFirstLastNameContainer d-flex flex-row'>
                <div className='userCreateFirstContainer d-flex flex-column'>
                  <div> First Name</div>
                  <input name='firstName' type='text' className='userCreateFirstInput border' value={firstName} onChange={this.infoInput} />
                </div>
                <div className='userCreateLastContainer d-flex flex-column'>
                  <div> Last Name </div>
                  <input name='lastName' type='text' className='userCreateLastInput border' value={lastName} onChange={this.infoInput} />
                </div>
                </div>
                <div className='userCreateEmailContainer d-flex flex-column'>
                  <div> Email </div>
                  <input name='email' type='text' className='userCreateEmailInput border' value={email} onChange={this.infoInput} />
                </div>
                <div className='userCreatePasswordContainer d-flex flex-column'>
                  <div> Password </div>
                  <input name='password' type='text' className='userCreatePasswordInput border' value={password} onChange={this.infoInput} />
                </div>
                <div className='userCreateText1'> We will never share your data with a third party. </div>
                <div className='userCreateSignUp'> SIGN UP </div>
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
