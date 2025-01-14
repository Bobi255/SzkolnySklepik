import React, { Component } from 'react';
import './App.css'

class Cart extends Component {
  render() {
    const { cart, deleteFromCart, makeOrder } = this.props;

    return (
      <div className="cart p-3">
        <h2>Koszyk</h2>
        {cart.length === 0 ? (
          <p>Koszyk jest pusty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((product, index) => (
                <li key={index} className="mb-2">
                  {product.name} - {product.price} PLN

                  <button onClick={() => deleteFromCart(index)} className="ml-3 btn btn-danger btn-sm">Usuń</button>
                </li>
              ))}
            </ul>

            <p><b>Suma:</b> {cart.reduce((sum, product) => sum + product.price, 0)} PLN</p>

            <button onClick={makeOrder} className="btn btn-success">Złóż zamówienie</button>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
