import { Header } from "../components/Header";
import styles from "./AdminLayout.module.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
} 