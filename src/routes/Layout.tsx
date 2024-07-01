import React from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from "react-router-dom";
// import NavBar from "../components/NavBar";

function Layout() {
    return (
        <>
            {/*<NavBar />*/}
            <div className="container mt-3">
                <Outlet />
            </div>
        </>
    );
}
export default Layout;
