import {React, useState, useEffect} from 'react';
import NavbarMobile from '../navbar/NavbarMobile';
import Navigate from '../navigate/Navigate';
import axios from 'axios';
import heading from '../../assets/heading.png'
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './ProductCard';

const ProductViewMobile = () => {
      const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
      const navigate = useNavigate();
      const nbsp = String.fromCharCode(160);
    
      const [data, setData] = useState({})
      const [about,setAbout] = useState([]); 
      const [rate, setRate] = useState(0);
      const [count,setCount] = useState(0);
      
      useEffect(() => {
          axios.get(`https://musicart-80cn.onrender.com/musicProducts/?_id=${localStorage.getItem("id")}`)
              .then((response) => { setData(response.data);setAbout(response.data.about) ; setRate( response.data.rating.rate) ; setCount(response.data.rating.count)})
              .catch((err) => { console.log(err) })
      }, [])
  
      const addCart = ()=>{
          localStorage.setItem("current",JSON.stringify(data))
          const user = localStorage.getItem("user");
          try {
              axios.put(`https://musicart-80cn.onrender.com/musicProducts/${data._id}/cart/${user}`)
                  .then((response) => { 
                      console.log(response)
                  })                
          } catch (error) {
              console.log(error);
          }
  console.log(data)
      }

    //   let rate = parseInt(data.rating['rate'])
    //   let count = parseInt(data.rating['count'])
  
      
  
    return (
        <div>
            <NavbarMobile/>
            <div className='view-product'>
                <div className='back' onClick={() => { navigate('/') }} >
                <i className="ri-arrow-left-line"></i>
                    {/* <button onClick={() => { navigate('/') }} className='back-to-home-btn' > <i className="ri-arrow-left-line"></i> </button> */}
                </div>
                <button className='buy-nw' onClick={()=>{addCart();navigate('/viewCart')}} >Buy Now</button>

               

                <div id="prodetails" className="section-p1">
                   
                     <div className='scorlling-images-section' > 

                        <div className='scrolling-image'>  <img src={data.main_image} alt=""width="100%" id="mainImg" /> </div>
                        <div className='scrolling-image'> <img src={data.left_view} alt="" width="100%" className="small-img" />  </div>
                        <div className='scrolling-image'>  <img src={data.top_view} alt="" width="100%" className="small-img" />  </div>
                        <div className='scrolling-image'>   <img src={data.right_view} alt="" width="100%" className="small-img" />  </div>
                        
                     </div>
                     
                    <div className="single-pro-details">
                        <h1>{data.name}</h1>
                        <div className='product-sub-details'>
                        <p>{ [...new Array(Math.ceil(parseInt(rate)))].map( (e,i)=>(
                                <span key={i}>⭐</span>
                                
                            ) ) }
                            
                            ({ parseInt( count)} customers) </p>
                           
                        </div>
                         <div className='product-description'>
                            <p>{data.description}</p>
                        </div>

                        <h3  >Price - ₹ {data.price}</h3>
                        <p  className='color-type'>{data.color} | {data.type} headphone</p>
                        <div className='details'>About this Product <br></br>
                        <ul>
                            {about.map((item,index)=>{
                                return (<li key={index}>{item}</li>)
                            })}
                        </ul>
                            
                        </div>
                        
                        <p><b>Available</b> - {data.available}</p>
                        <p><b>Brand</b> - {data.brand}</p>
                        <div className="buttons">
                        <button className='add-to-cart' onClick={()=>{addCart();navigate('/viewCart')}}>Add to Cart</button>
                        <button className='buy-now' onClick={()=>{addCart();navigate('/viewCart')}} >Buy Now</button>

                        
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
            <Navigate/>
        </div>
    );
};

export default ProductViewMobile;