import React, { useEffect, useState } from "react";

import {
  DownloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { pathToRegexp } from "path-to-regexp";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import "./LayoutApp.less";
import { useAuth } from "src/adapters/appService/auth.service";
import { authSelector } from "src/adapters/redux/selectors/auth";

import { MAIN_ROUTES, appMenu } from "src/constant/menu";
import ROUTE from "src/constant/routes";
import { arrayToTree, queryAncestors } from "src/utils/menu";
import { renderRoutes } from "src/utils/route";

const { Header, Sider, Content } = Layout;

const filterRole = (roles) => (menu) => {
  return menu.role
    ? roles.some((role) => {
        return menu.role.includes(role);
      })
    : true;
};

const generateMenus = (data, appType?) => {
  return data.map((item) => {
    if (item.children) {
      return (
        <Menu.SubMenu
          key={item.id}
          title={
            <>
              {!!item.icon && <item.icon />}
              <span>{item.name}</span>
            </>
          }
        >
          {generateMenus(item.children, appType)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.id}>
        <Link to={item.route}>
          {!!item.icon && <item.icon />}
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    );
  });
};

const LayoutApp = () => {
  const navigate = useNavigate();
  const { roles, name } = useSelector(authSelector);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { checkLogin, logout } = useAuth();
  const menus = appMenu;

  // const filteredMenus = menus.filter(filterRole(roles));
  const filteredMenus = menus;

  // Generating tree-structured data for menu content.
  const menuTree = arrayToTree(filteredMenus, "id", "menuParentId");

  // Find a menu that matches the pathname.
  const currentMenu = menus.find(
    (_) => _.route && pathToRegexp(_.route).exec(location.pathname)
  );

  // Find the key that should be selected according to the current menu.
  const selectedKeys = currentMenu
    ? queryAncestors(menus, currentMenu, "menuParentId").map((_) => _.id)
    : [];

  useEffect(() => {
    checkLogin()
      .then((data) => data)
      .catch((err) => {
        navigate(ROUTE.LOGIN, { replace: true });
      });
  }, []);

  return (
    <Layout className="cms-layout-app">
      <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
        <div className="logo" />
        <Menu mode="inline" theme="dark" selectedKeys={selectedKeys}>
          {generateMenus(menuTree)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background-header"
          style={{ padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              // onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="action-container">
            <Button className="btn-logout" size="middle" onClick={logout}>
              Đăng xuất
            </Button>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {renderRoutes(MAIN_ROUTES)}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
