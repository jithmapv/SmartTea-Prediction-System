import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Icon, Drawer, Button } from "antd";
import "./Sections/Navbar.css";
import logo from "./img/logo.png";

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="navbar">
      <nav
        className="menu"
        style={{ position: "fixed", zIndex: 5, width: "100%" }}
      >
        <div className="menu__logo">
          <img src={logo} alt="Adaradeniya logo" width="70" height="70" />
          <a href="/">
            <span className="adaradeniya">Adaradeniya</span>{" "}
            <span className="institute">TEA ESTATE (PVT) LTD </span>{" "}
          </a>
        </div>
        <div className="menu__container">
          <div className="menu_rigth">
            <RightMenu mode="horizontal" />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <Icon type="align-right" />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </nav>

      <nav
        className="menu2"
        style={{ position: "fixed", zIndex: 5, width: "100%" }}
      >
        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <Icon type="align-right" />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
