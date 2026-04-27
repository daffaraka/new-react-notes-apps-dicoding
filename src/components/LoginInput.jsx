import React from "react";
import { login } from "../utils/notes_api";
import PropTypes from "prop-types";


class LoginInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
        this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onEmailChangeHandler(event) {
        this.setState(() => {
            return {
                email: event.target.value,
            }
        });
    }

    onPasswordChangeHandler(event) {
        this.setState(() => {
            return {
                password: event.target.value,
            }
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.props.login({
            email: this.state.email,
            password: this.state.password,
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className="login-input space-y-4">
                <div>
                    <input type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChangeHandler} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition" required />
                </div>
                <div>
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChangeHandler} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition" required />
                </div>
                <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition duration-300 shadow-md hover:shadow-lg">
                    Masuk
                </button>
            </form>
        )
    }
}


LoginInput.propTypes = {
    login: PropTypes.func.isRequired,
}

export default LoginInput;