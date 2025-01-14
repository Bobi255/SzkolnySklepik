import React, { Component } from 'react';
import AdminDashboard from './AdminDashboard';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: { username: '', password: '' },
      isLoggedIn: false,
      warning: '',
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state.form;
    if (username === "admin" && password === "admin") {
      this.setState({ 
        isLoggedIn: true, 
        warning: '',
      });
    } else {
      this.setState({
        warning: "Błędny login lub hasło.",
      });
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
    const { products, addProduct, deleteProduct } = this.props;

    return (
      <div>
        {!isLoggedIn ? (
          <div className="container w-25 position-absolute top-50 start-50 translate-middle bg-light p-5 form_div">
            <form className="rounded p-4">
                
              <div className="mb-3"> 
                <label htmlFor="username" className="form-label">Login</label>
                <input type="text" name="username" placeholder="Login" value={form.username} onChange={this.handleInputChange} className="form-control" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Hasło</label>
                <input type="password" name="password" placeholder="Hasło..." value={form.password} onChange={this.handleInputChange} className="form-control" />
              </div>

              <div className="d-flex text-center btn-group">
                <button className="btn btn-success" onClick={this.handleLogin}>Zaloguj</button>
              </div>

              {warning && <p className='mt-4 text-center text-warning'>{warning}</p>}
            </form>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <AdminDashboard 
              products={products} 
              addProduct={addProduct} 
              deleteProduct={deleteProduct} 
            />
          </div>
        )}
      </div>
    );
  }
}

export default AdminLogin;
