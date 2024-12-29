import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import styles from "./App.module.scss";
import { lazy } from "react";

const Home = lazy(() => import("./pages/home/Home"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Signin = lazy(() => import("./pages/signin/Signin"));
const AuthRequire = lazy(() => import("./helpers/AuthRequire"));
const Profile = lazy(() => import("./pages/profile/Profile"));

function App() {
    return (
        <div className={` d-flex flex-column   ${styles.appContainer}`}>
            <Header />
            <div className="flex-fill d-flex flex-column">
                <Routes>
                    <Route path="/" element={<AuthRequire child={Home} />} />
                    <Route
                        path="/signin"
                        element={<AuthRequire child={Signin} />}
                    />
                    <Route
                        path="/signup"
                        element={<AuthRequire child={Signup} />}
                    />
                    <Route
                        path="/profile"
                        element={<AuthRequire child={Profile} />}
                    />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
