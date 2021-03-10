import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

class App2 extends Component {
  render() {
    return (
      <AddPicks />
    );
  }
}

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (count = count+1)
  );
  return count;
}

class AddPicks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      errors: {
        fullName: '',
        symbol: ''
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName': 
        errors.fullName = 
          value.length < 1
            ? 'Full Name must be 1 characters long!'
            : '';
        break;
      case 'symbol': 
        errors.symbol = 
          value.length < 3 || value.length > 3
            ? 'The Symbol MUST be 3 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({formValid: validateForm(this.state.errors)});
    this.setState({errorCount: countErrors(this.state.errors)});
  }
  render() {
    const {errors, formValid} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='fullName'>
              <label htmlFor="fullName">Full Name</label>
              <input type='text' name='fullName' onChange={this.handleChange} noValidate />
              {errors.fullName.length > 0 && 
                <span className='error'>{errors.fullName}</span>}
            </div>
            <div className='symbol'>
              <label htmlFor="symbol">Symbol</label>
              <input type='symbol' name='symbol' onChange={this.handleChange} noValidate />
              {errors.symbol.length > 0 && 
                <span className='error'>{errors.symbol}</span>}
            </div>
            <div className='info'>
              <small>Enter your damn picks.</small>
            </div>
            <div className='submit'>
              <button>Create</button>
            </div>
            {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : 'Form not submitted'}
          </form>
        </div>
      </div>
    );
  }
}

render(<App2 />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
