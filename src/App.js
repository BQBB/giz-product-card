import React from 'react';
import Card from './Card';
import Alert from './Alert';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      'alert': false,
      'msg': {},
      'searchValue': "",
      'productName': "",
      'productPrice': "",
      'products': [],
      'filterdProducts': []
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.Add = this.Add.bind(this);
    this.validate = this.validate.bind(this)
  }

  onSearchChange(e) {
    let Products = Array.from(this.state.products);
    let value = e.target.value

    if(!value) {
      this.setState({'searchValue': value,'filterdProducts': Products})
      return
    }

    let filteredProducts = Products.filter((product)=>{return product.name.includes(value)})
    this.setState({'searchValue': value,'filterdProducts': filteredProducts})
  }

  onNameChange(e) {
    this.setState({'productName': e.target.value})
  }

  onPriceChange(e) {
    this.setState({'productPrice': e.target.value})
  }

  validate() {
    let Msg = Object.create(this.state.msg)
    if(!this.state.productName) {
      Msg.name = "Name can not be Empty"
    }
    else if(!this.state.productName.match(/^[a-zA-Z0-9@\. ]+$/)) { 
      Msg.name = 'Name Must be string'
    } 
    else {
      delete Msg.name
    }
    if(!this.state.productPrice) {
      Msg.price = "Price can not be Empty"
    }
    else if(!this.state.productPrice.match(/^[0-9]+$/)) {
      Msg.price = 'Price Must be integer'
    }
    else {
      delete Msg.price
    }

   this.setState({'msg':Msg})
   return Object.keys(Msg).length === 0
  }


  Add(e) {
    if(!this.validate()) {
      this.setState({'alert':true})
      return
    }
    
    let Products = Array.from(this.state.products)
    let Product = new Object()
    Product.name = this.state.productName
    Product.price = this.state.productPrice
    Products.push(Product)
    this.setState({'products': Products, 'filterdProducts':Products, 'alert':false, 'productName':"", 'productPrice':""})
  }


  render() { 
    return (
          <div className="App">
            <div className="header">
              <input type="text" placeholder="Search Products" className="search-input" value={this.state.searchValue} onChange={this.onSearchChange} />
              <div>
                <input type="text" placeholder="Name" className="input" value={this.state.productName} onChange={this.onNameChange} />
                <input type="text" placeholder="Price" className="input" value={this.state.productPrice} onChange={this.onPriceChange} pattern="[0-9]+" />
                <button className="btn" onClick={this.Add} >Add New</button>
              </div>
            </div>

            {this.state.alert && <Alert msg={Object.values(this.state.msg)} />}
            <div className="body">
              {
                
                this.state.filterdProducts.map((product,index)=>{
                  return <Card key={index} name={product.name} price={product.price} />
                })  
               
              }
            </div>
          </div>
      );
  }
}
 

export default App;