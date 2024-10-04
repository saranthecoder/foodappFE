import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, image, price, description}) => {

    // const [itemCount,setItemCount] = useState(0)
    const {cartItem,addToCart,removeFronCart} = useContext(StoreContext);

  return (
    <div className="food-item">
        <div className="food-item-img-container">
            <img src= {image} alt="" className="food-item-image" />
            {  !cartItem[id] 
                ?<img className ="add" onClick={()=>{addToCart(id)}} src={assets.add_icon_white} alt="" />
                : <div className='food-item-counter'>
                    <img onClick={()=>{removeFronCart(id)}} src={assets.remove_icon_red} alt="" />
                    <p>{cartItem[id]}</p>
                    <img onClick={()=>{addToCart(id)}} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>
    </div>
  )
}

export default FoodItem

/*
_id: "1",
        name: "Greek salad",
        image: food_1,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
        */