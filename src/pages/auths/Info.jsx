import React, { useEffect, useContext} from 'react'
import api from '@api'
import { RootContext } from '@/App'
import Link from 'antd/es/typography/Link'
export default function Info() {
  const {userStore} = useContext(RootContext)


  useEffect(() => {
    if(!localStorage.getItem('token')) {
      window.location.href = "/"
    }
  }, [])
  return (
    <div>
   
    <div style={{textAlign:"center",lineHeight:"40px"}}>
      <h1>Information</h1>
      <button onClick={async (e) =>{
        if (!userStore.data?.email_confirm) {
          alert("đã vào")
          let result = await api.users.resend();

        }
      }}>Resend Email</button>
      <br></br>
      <form onSubmit={async (e) => {
        e.preventDefault();
        alert("đã gọi")
        let result = await api.users.changePassword({
          new_pass: e.target.new_pass.value,
          old_pass: e.target.old_pass.value
        })

      }}>
        <label style={{width:"300",marginRight:"55px"}}>
        OldPass:</label> <input name='old_pass' type="text" /><br />
        <label style={{width:"300",marginRight:"49px"}}>
        NewPass:</label>
        <input name='new_pass' type="text" /><br/>
        <label style={{width:"300",marginRight:"26px"}}>
        ReNewPass:</label>
       <input name='renew_pass' type="text" /><br/>
        <button style={{backgroundColor:"hsl(198, 66%, 49%)",padding:"7px",borderRadius:"7px"}}>Change Your Password</button>
      </form>

    <div className="container_bill">
      <div >
        <div className="col-xl-12">
          <ul className="list-unstyled float-end">
            <li style={{ fontSize: 50, color: "red",letterSpacing:"5px",paddingTop:"30px" }}>GODIVA</li>
            <li>123, Elm Street</li>
            <li>123-456-789</li>
            <li>mail@mail.com</li>
          </ul>
        </div>
      </div>
      <div >
        <h3
          className="text-uppercase text-center mt-3"
          style={{ fontSize: 40 }}
        >
          Invoice
        </h3>
        <p>123456789</p>
      </div>
      <div >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Samsung TV</td>
              <td>
                <i className="fas fa-dollar-sign" /> 500,00
              </td>
            </tr>
            <tr>
              <td>JBL Speaker</td>
              <td>
                <i className="fas fa-dollar-sign" /> 300,00
              </td>
            </tr>
            <tr>
              <td>Macbook Air</td>
              <td>
                <i className="fas fa-dollar-sign" /> 1000,00
              </td>
            </tr>
            <tr>
              <td>Iphone 11 PRO</td>
              <td>
                <i className="fas fa-dollar-sign" /> 5000,00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div >
        <div className="col-xl-8">
          <ul className="list-unstyled float-end me-0">
            <li>
              <span className="me-3 float-start">Total Amount:</span>
              <i className="fas fa-dollar-sign" /> 6850,00
            </li>
            <li>
              {" "}
              <span className="me-5">Discount:</span>
              <i className="fas fa-dollar-sign" /> 500,00
            </li>
            <li>
              <span className="float-start" style={{ marginRight: 35 }}>
                Shippment:{" "}
              </span>
              <i className="fas fa-dollar-sign" /> 500,00
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div >
        <div className="col-xl-8" style={{ marginLeft: 60 }}>
          <p
            className="float-end"
            style={{
              fontSize: 30,
              color: "red",
              fontWeight: 400,
              fontFamily: "Arial, Helvetica, sans-serif",
              textAlign:"center"
            }}
          >
            Total:
            <span>
              <i className="fas fa-dollar-sign" /> 6350,00
            </span>
          </p>
        </div>
      </div>
      <div >
        <p className="fw-bold">
          Date: <span className="text-muted">23 June 2023</span>
        </p>
        <p className="fw-bold mt-3">Signature:</p>
      </div>
    </div>


</div>
</div>


  )
}
