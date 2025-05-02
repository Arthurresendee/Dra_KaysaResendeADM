import { Link } from "react-router-dom";
import styles from "./Header.module.css";

import logoHeader from "../assets/DraKAysa.png";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src={logoHeader} alt="Logo" className={styles.logo} />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li className={styles.item}>
              <Link to="/landingPage" className={styles.link}>
                LandingPage
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/galeria" className={styles.link}>
                Galeria
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/" className={styles.link}>
                Inicial
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/configuracoes" className={styles.link}>
                Configurações
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
