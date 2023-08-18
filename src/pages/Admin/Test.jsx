import React, { useEffect, useState } from 'react'

export default function Test() {
    const [timeRedriect, setTimeRedriect] = useState(3);

    useEffect(() => {
        if(timeRedriect <= 0) {
            window.location.href='/'
        }
        setTimeout(() => {
            setTimeRedriect(timeRedriect - 1)
        }, 1000);
    }, [timeRedriect])
  return (
    <div>Sau {timeRedriect} se chuyen ve trang chu!</div>
  )
}
