import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default Layout;