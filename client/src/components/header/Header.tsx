import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/images/jwt.svg";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header
            className={` ${styles.header} d-flex flex-row align-items-center`}
        >
            <div className="flex-fill">
                <NavLink to={"/"}>
                    <img src={logo} alt="logo jsonwebtoken" />
                </NavLink>
            </div>
            <div className="d-flex">
                <NavLink to={"#"} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <FaXmark className={styles.menu} />
                    ) : (
                        <FaBars className={styles.menu} />
                    )}
                </NavLink>
                <ul className={styles.headerDesktop}>
                    <NavLink to={"/signup"} className="mr-15">
                        Inscription
                    </NavLink>
                    <NavLink to={"/signin"}>Connexion</NavLink>
                </ul>
            </div>
        </header>
    );
}
