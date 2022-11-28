import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";



const Navbar = () => {

    const [userLoggedIn, setuserLoggedIn] = useState(false);

    useEffect(() => {
        const userLogged = localStorage.getItem('isUserLoggedIn');
        if(userLogged) {
            setuserLoggedIn(true);
        }
    }, []) 


    function logoutUser() {
        // localStorage.setItem('isUserLoggedIn', false);
        // localStorage.setItem('userLoggedIn_id', 0);
        // localStorage.setItem('userLoggedIn_username', "");
        //alert('Logout successful');
        //window.location.reload(false);
        localStorage.clear();
      }

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        {/* if user logged out */}
                        {/* (!sessionStorage.getItem('isUserLoggedIn') */}
                        {! userLoggedIn  && (<li className="nav-item">
                            <a className="nav-link active" href="/login">Login</a>
                        </li>)}
                        { ! userLoggedIn  && (<li className="nav-item">
                            <a className="nav-link active" href="/register">Register</a>
                        </li>)}
                    </ul>
                    {/* if user logged in */}
                    { userLoggedIn && (<div>
                        {/* <button className="btn btn-sm btn-secondary float-right" onClick={() => props.logoutfcn()} >Log out</button> */}
                        <a className="nav-link active text-white" href="/login" onClick={() => logoutUser()}>Log out</a>
                    </div>)}
                </div>
            </nav>
            <Outlet />
        </>
    )
};



export default Navbar;
