import React, { Component, createRef } from 'react';
import './App.css';
import Products from './Products.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      form: { username: '', password: '' },
      isLoggedIn: false,
      currentUser: null,
      warning: '',
    };

    this.loginButtonRef = createRef();
    this.registerButtonRef = createRef();
  }

  componentDidMount() {
    this.loginButtonRef.current.addEventListener('click', this.handleLogin);
    this.registerButtonRef.current.addEventListener('click', this.handleRegister);
  }

  componentWillUnmount() {
    this.loginButtonRef.current.removeEventListener('click', this.handleLogin);
    this.registerButtonRef.current.removeEventListener('click', this.handleRegister);
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { users, form } = this.state;
    const user = users.find(
      (user) => user.username === form.username && user.password === form.password
    );
    if (user) {
      this.setState({ 
        isLoggedIn: true, 
        currentUser: user,
        warning: '',
      });
    } else {
      this.setState({
        warning: "Błędny login lub hasło.",
      })
    }
  };

  handleRegister = (e) => {
    e.preventDefault();
    const { users, form } = this.state;
    if (form.username && form.password) {
      const existingUser = users.find(user => user.username === form.username);
      if (existingUser) {
        this.setState({
          warning: "Użytkownik o takim loginie już istnieje!",
        })
        return;
      }
      this.setState({
        users: [...users, { ...form }],
        form: { username: '', password: '' },
      });
      this.setState({
        warning: "Pomyślnie zarejestrowano.",
      })
    } else {
      this.setState({
        warning: "Wypełnij wszystkie pola.",
      })
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: { ...prevState.form, [name]: value },
    }));
  };

  render() {
    const { isLoggedIn, form, warning } = this.state;

    return (
      <div>
        <header className="header w-100">
          <h1 className="text-center p-2">Internetowy sklepik szkolny</h1>
        </header>

        {!isLoggedIn ? (
          <div className="container w-25 position-absolute top-50 start-50 translate-middle bg-light p-5 form_div">
            <form className="rounded p-4">
              <div className="mb-3"> 
                <label htmlFor="username" className="form-label">Login</label>
                <input type="text" name="username" placeholder="Login" value={form.username} onChange={this.handleInputChange} className="form-control" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Hasło</label>
                <input type="password" name="password" placeholder="Hasło..." value={form.password} onChange={this.handleInputChange}className="form-control" />
              </div>

              <div className="d-flex text-center btn-group">
                <button className="btn btn-success" ref={this.loginButtonRef}>Zaloguj</button>
                <button className="btn btn-light" ref={this.registerButtonRef}>Zarejestruj się</button>
              </div>

              {warning && (
                <p className='mt-4 text-center text-warning'>{warning}</p>
              )}
            </form>
          </div>
        ) : (
          <div>
            <Products />
          </div>
        )}
      </div>
    );
  }
}

export default Login;