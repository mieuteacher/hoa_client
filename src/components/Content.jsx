import React from 'react'
import './Content.scss'

export default function Content1() {
    return (
        <div>
            <div className='content1'>
                <div>
                    <img src={`${process.env.REACT_APP_SERVER_HOST}64a31341b6fc7c5ba7632540_480x320.jpeg`} className="logo" />
                    <p>Buy more, save more.</p>
                </div>

                <div>
                    <img src={`${process.env.REACT_APP_SERVER_HOST}649b26a96df9f10f76f51bcf_480x320.jpeg`} className="logo" />
                    <p>New order add on! </p>
                </div>
            </div>
        </div>
    )
}
