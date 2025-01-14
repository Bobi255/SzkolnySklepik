import React, {Component } from 'react';
import './App.css';
import Burger from './images/burger.jpg';
import Sandwich from './images/kanapka-ser-szynka.jpeg';
import Hotdog from './images/hotdog.png';
import Pizza from './images/pizza.jpg';
import Navbar from './Navbar.js';
import Cart from './Cart.js';
import AdminLogin from './AdminLogin.js';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        {
          id: 1,
          name: "Burger z frytkami",
          description: "Mięso wołowe, pomidor, ser cheedar, sałata oraz porcja frytek",
          price: 35,
          availability: "Dostępne",
          image: Burger,
        },
        {
          id: 2,
          name: "Kanapka",
          description: "Kanapka z serem, szynką, sałatą i pomidorem",
          price: 5,
          availability: "Dostepne",
          image: Sandwich,
        },
        {
          id: 3,
          name: "Hotdog z kiełbasą",
          description: "Kiełbasa, pikle, prażona cebulka oraz wybrane sosy",
          price: 7,
          availability: "Dostępne",
          image: Hotdog,
        },
        {
          id: 4,
          name: "Pizza z salami",
          description: "Ciasto: cienkie lub grube, sos pomidorowy, ser, salami",
          price: 40,
          availability: "Dostępne",
          image: Pizza,
        },   
      ],
      cart: [],
      showCart: false,
      showLogin: false,
    };
  }

  addToCart = (product) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, product],
    }));
  }

  deleteFromCart = (index) => {
    this.setState((prevState) => {
      const newCart = [...prevState.cart]
      newCart.splice(index, 1)
      return {
        cart: newCart
      }
    })
  }

  makeOrder = () => {
    alert("Zamowienie zlozone!")
    this.setState({
      cart: []
    })
  }

  toggleCart = () => {
    this.setState((prevState) => ({
      showCart: !prevState.showCart,
    }))
  }

  toggleLogin = () => {
    this.setState((prevState) => ({
      showLogin: !prevState.showLogin,
    }))
  }

  addProduct = (product) => {
    this.setState((prevState) => ({
      products: [...prevState.products, product],
    }));
  };

  deleteProduct = (id) => {
    this.setState((prevState) => ({
      products: prevState.products.filter(product => product.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <nav>
          <Navbar 
            toggleCart={this.toggleCart}
            toggleLogin={this.toggleLogin}
          />
        </nav>
        {this.state.showLogin ? (
          <AdminLogin 
            products={this.state.products} 
            addProduct={this.addProduct} 
            deleteProduct={this.deleteProduct} 
          />
        ) : (
          <section>
            <div className="product_list d-flex justify-content-center flex-wrap p-5">
              {this.state.products.map((product) => (
                <div key={product.id} className="product m-4 w-25">
                  <div className="imgC">
                    <img className="rounded" src={product.image} alt={product.name} />
                  </div>
                  <div className="textC">
                    <p className="text-center"><b>{product.name}</b></p>
                    <p className='text-center'>{product.description}</p>
                    <p className='text-center'>{product.availability}</p>
                    <p className="text-center">Cena - {product.price} PLN</p>
                  </div>
                  <div className='cartBtn d-flex justify-content-center'>
                    <button onClick={() => this.addToCart(product)}>Dodaj do koszyka</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {this.state.showCart && (
          <section>
            <Cart 
              cart={this.state.cart}
              deleteFromCart={this.deleteFromCart}
              makeOrder={this.makeOrder}
            />
          </section>
        )}
      </div>
    );
  }
}

export default Products;