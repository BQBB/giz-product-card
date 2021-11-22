import img from './img.png';

const Card = (props)=> {
    return (
        
        <div className="card">
            <img src={img} alt="product image" />
            <div className="card-content">
                <div>
                  <p className="category">Sneakers</p>
                  <p className="name">{props.name}</p>
                </div>
                <p className="price">{props.price}$</p>
            </div>
            <button className="btn">Add to Cart</button>
          </div>
    
    );
}
 
export default Card;