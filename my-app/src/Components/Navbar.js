import { Outlet, Link } from "react-router-dom";


const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/register">Register</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
};

export default Navbar;
