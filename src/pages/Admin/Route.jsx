import { Route } from "react-router-dom";
import LazyLoad from "../../lazy_loadings/lazyLoading";
import api from '@api';
import Test from "./Test";
let isAdmin = false;
async function authenAdmin () {

    await api.users.authenToken({
        token: localStorage.getItem("token")
    }).then(res => {
        if(res.status == 200) {
            if(res.data.data.role == 'ADMIN') {
                isAdmin = true;
            }
        }
    }).catch(err => {
        console.log("err",err);
    })

    if(isAdmin) {
        return LazyLoad(() => import("./Admin"))();
    }else {
        return <Test></Test>
    }
}
export default (
    <Route path="admin" element={await authenAdmin()}></Route>
);

