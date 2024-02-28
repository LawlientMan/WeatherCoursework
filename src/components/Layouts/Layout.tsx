import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from '@/components/Layouts/Layout.module.css'

const Layout = () => {
  return (
    <div className={styles.layout__wrapper}> 
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default Layout;