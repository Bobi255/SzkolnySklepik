import React, { Component } from 'react';
import './App.css';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProduct: {
        name: '',
        description: '',
        price: '',
        availability: '',
        image: '',
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newProduct: { ...prevState.newProduct, [name]: value },
    }));
  };

  handleAddProduct = () => {
    const { name, description, price, availability, image } = this.state.newProduct;

    if (name && description && price && availability && image) {
      const newProduct = {
        id: Date.now(),
        name,
        description,
        price: parseFloat(price),
        availability,
        image,
      };

      this.props.addProduct(newProduct);

      this.setState({
        newProduct: {
          name: '',
          description: '',
          price: '',
          availability: '',
          image: '',
        },
      });
    }
  };

  handleDeleteProduct = (id) => {
    this.props.deleteProduct(id);
  };

  render() {
    const { name, description, price, availability, image } = this.state.newProduct;
    return (
        <div className='container1'>
            <p className='text-center fs-3'>Panel Administratora</p>
            <div className='container2 w-25 position-absolute top-50 end-0 translate-middle bg-light p-5 form_div'>
            <p className='fs-5'>Dodaj lub usuń produkt:</p>
                <div>
                    <input className='form-control w-50 mb-3' type="text" name="name" placeholder="Nazwa" value={name} onChange={this.handleInputChange} required />

                    <input className='form-control w-50 mb-3' type="text" name="description" placeholder="Opis" value={description} onChange={this.handleInputChange} required />

                    <input className='form-control w-50 mb-3' type="number" name="price" placeholder="Cena" value={price} onChange={this.handleInputChange} required />

                    <input className='form-control w-50 mb-3' type="text" name="availability" placeholder="Dostępność" value={availability} onChange={this.handleInputChange} required />

                    <input className='form-control w-50 mb-3' type="text" name="image" placeholder="Ścieżka do obrazka" value={image} onChange={this.handleInputChange} required />

                    <button className='btn btn-primary btn-group w-50' onClick={this.handleAddProduct}>Dodaj produkt</button>
                </div>
            </div>
        
            <div className='mt-4'>
                <p>Aktualne produkty:</p>
                <ul className='list-group'>
                {this.props.products.map((product) => (
                    <li className='list-group-item d-flex justify-content-between align-items-center' key={product.id}>
                    {product.name} - <button className='btn btn-primary btn-sm' onClick={() => this.handleDeleteProduct(product.id)}>Usuń</button>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
  }
}

export default AdminDashboard;
