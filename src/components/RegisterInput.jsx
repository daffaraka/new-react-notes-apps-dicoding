import React from 'react';
import PropTypes from 'prop-types';
 
class RegisterInput extends React.Component {
  constructor(props) {
    super(props)
 
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
 
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
 
  onNameChange(event) {
    this.setState(() => {
      return {
        name: event.target.value,
      };
    });
  }
 
  onEmailChange(event) {
    this.setState(() => {
      return {
        email: event.target.value
      };
    });
  }
 
  onPasswordChange(event) {
    this.setState(() => {
      return {
        password: event.target.value
      };
    })
  }

  onConfirmPasswordChange(event) {
    this.setState(() => {
      return {
        confirmPassword: event.target.value
      };
    });
  }
 
  onSubmitHandler(event) {
    event.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      alert('Password dan konfirmasi password tidak sama!');
      return;
    }
 
    this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    });
  }
 
  render() {
    const { name, email, password,confirmPassword } = this.state;
    const isDisabled = !name.trim() || !email.trim() || !password.trim();

    return (
      <form onSubmit={this.onSubmitHandler} className="w-full flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={this.onNameChange}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-500 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={this.onEmailChange}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-500 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={this.onPasswordChange}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-500 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />

          <input
          type="password"
          placeholder="Confirmed Password"
          autoComplete="confirmed-current-password"
          value={confirmPassword}
          onChange={this.onConfirmPasswordChange}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-500 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className="w-full py-2.5 rounded-xl bg-blue-400 text-white text-sm font-semibold hover:bg-blue-800 active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          Register
        </button>
      </form>
    );
  }
}
 
RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
 
export default RegisterInput;