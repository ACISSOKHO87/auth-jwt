import styles from "./Footer.module.scss";

function Footer() {
    return (
        <footer
            className={`${styles.footer} d-flex flex-row align-items-center justify-content-center p-10`}
        >
            <p>Copyright © 2024 A. CISSOKHO, Inc.</p>
        </footer>
    );
}

export default Footer;
