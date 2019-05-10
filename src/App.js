import React,{ Component } from 'react';
import './App.css';

class App extends Component{
  state = {
    value: '',
    emails: [],
    error: null
  }

  handleOnKeyDown = event => {
    if(['Enter', 'Tab', ','].includes(event.key)) {
      event.preventDefault();

      const email = this.state.value.trim();

      if(email && this.isValid(email)) {
        this.setState({
          emails: [...this.state.emails,email],
          value: ''
        });

      }
    }
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
      error: null
    });
  }

  handleDelete = emailToBeRemoved => {
    this.setState({
      emails: this.state.emails.filter(email => email !== emailToBeRemoved)
    });
  }

  isValid = (email) => {
    let error = null;

    if(!this.isEmail(email)){
        error = `${email} is not a valid email address.`;
    }
    if (this.isInList(email)) {
        error = `${email} has already been added.`;
    }
    if (error) {
        this.setState({error})
        return false;
    }
    
    return true;
  }

  isEmail = email => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  isInList = email => {
    return this.state.emails.includes(email);
  }

  handlePaste = event => {
    event.preventDefault();
    const paste = event.clipboardData.getData('text');
    const emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if(emails){
      const toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        emails: [...this.state.emails, ...toBeAdded]
      });
    }
  }

  render(){
    return(
      <main className="wrapper">
        {this.state.emails.map(email => (
           <div className="email-chip" key={email}>
            {email}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(email)}
            >
              &times;
            </button>
           </div>
        ))}

        <input 
        className="input"
        placeholder="Type or paste email addresses and press Enter"
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleOnKeyDown}
        onPaste={this.handlePaste}
        />

        {this.state.error 
        &&
        <p className="error">{this.state.error}</p>
        }
      </main>
    )
  }
}

export default App;
