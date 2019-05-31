import { Component } from "react";
import { loginUser } from "../lib/auth";
import Router from 'next/router';

class LoginForm extends Component {
  state = {
    email: 'Rey.Padberg@karina.biz',
    password: 'ambrose.net',
    error: '',
    isLoading: false
  };
  
  handleChange = e => {
    const text = e.target.value;
    this.setState({ [e.target.name]: text });
  };
  
  handleSubmit = e => {
    const { email, password } = this.state;
    
    e.preventDefault();
    this.setState({ error: '', isLoading: true });
    
    loginUser(email, password).then(() => {
      Router.push('/profile');
    }).catch(this.showError);
  };
  
  showError = err => {
    console.error(err);
    const error = err.response && err.response.data || err.message;
    this.setState({ error, isLoading: false });
  };
  
  render() {
    const { email, password, error, isLoading } = this.state;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <div><input
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          onChange={this.handleChange}
        /></div>
        <div><input
          type="password"
          name="password"
          value={ password }
          placeholder="password"
          onChange={this.handleChange}
        /></div>
        <button type="submit" disabled={isLoading}>{
          isLoading ? 'Sending' : 'Submit'
        }</button>
        { error && <h2>{ error }</h2> }
      </form>
    );
  }
}

export default LoginForm;