import React from 'react'
import './Carousel.scss'

export default function Carousel() {
    return (
        <div className='carousel'>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                
                            <strong>Only $15 at checkout!</strong> Milk Chocolate and/or Dark
                            Chocolate Truffle Flights, 6pc.
                            <strong>Code: TRUFFLEFLIGHTS</strong>
                       
                    </div>
                    <div className="carousel-item">
                      
                            Free Standard Shipping to <strong>Select States</strong> on Orders
                            $60+ with code FREESHIP60. Learn More.
                   
                        </div>
                    </div>
                    <div className="carousel-item">
                      
                                        Only $15 at checkout!
                              
                                    Milk Chocolate and/or Dark Chocolate Truffle Flights, 6pc.
                            
                                        Code: TRUFFLEFLIGHTS
                      
                    
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
           
        </div>
    )
}
