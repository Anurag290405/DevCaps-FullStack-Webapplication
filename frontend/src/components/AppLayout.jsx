import React from "react";
import Navbar from "./HomeComponent/Navbar";
import Footer from "./HomeComponent/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return(
        <div className="flex flex-col min-h-screen bg-app-gradient">
            <Navbar />
            <main className="flex-grow">
            <Outlet />
        </main>
            <Footer />
        </div>
    );
};

export default AppLayout;