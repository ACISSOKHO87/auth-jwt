import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import styles from "./App.module.scss";
import { lazy } from "react";

const Home = lazy(() => import("./pages/home/Home"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Signin = lazy(() => import("./pages/signin/Signin"));
const AuthProvider = lazy(
    () => import("./components/authProvider/AuthProvider")
);
const Profile = lazy(() => import("./pages/profile/Profile"));

function App() {
    return (
        <div className={` d-flex flex-column   ${styles.appContainer}`}>
            <AuthProvider>
                <Header />
                <div className="flex-fill d-flex flex-column">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
                <Footer />
            </AuthProvider>
        </div>
    );
}

export default App;
