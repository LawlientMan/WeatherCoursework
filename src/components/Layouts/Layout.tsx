import { Outlet } from "react-router-dom";
import React from 'react'
import Container from "react-bootstrap/esm/Container";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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