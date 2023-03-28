import React, { useEffect, useState } from 'react';

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MobileOutlined,
  UserOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Dropdown, Space, MenuProps, Avatar } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import './LayoutApp.less';

import { useAuth } from '~/src/adapters/appService/auth.service';
import { authSelector } from '~/src/adapters/redux/selectors/auth';
import { MAIN_ROUTES, menus } from '~/src/constant/menu';
import useQuery from '~/src/hooks/useQuery';
import { arrayToTree, queryAncestors } from '~/src/utils/menu';
import { renderRoutes } from '~/src/utils/route';
import { capitalizeFirstLetter } from '~/src/utils';
import ROUTE from '~/src/constant/routes';

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
        <Link to={`${item.route}` || '#'}>
          {!!item.icon && <item.icon />}
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    );
  });
};

function LayoutApp() {
  const navigate = useNavigate();
  const { roles, name } = useSelector(authSelector);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const query = useQuery();
  const { checkSession, logout } = useAuth();

  const filteredMenus = menus.filter(filterRole(roles));

  // Generating tree-structured data for menu content.
  const menuTree = arrayToTree(filteredMenus, 'id', 'menuParentId');

  // Find a menu that matches the pathname.
  const currentMenu = menus.find(
    (_) => _.route && pathToRegexp(_.route).exec(location.pathname)
  );

  // Find the key that should be selected according to the current menu.
  const selectedKeys = currentMenu
    ? queryAncestors(menus, currentMenu, 'menuParentId').map((_) => _.id)
    : [];

  useEffect(() => {
    checkSession()
      .then((data) => {
        navigate(ROUTE.DASHBOARD, { replace: true });
      })
      .catch((err) => {
        navigate(ROUTE.LOGIN, { replace: true });
      });
  }, []);

  const itemsAvatar: MenuProps['items'] = [
    {
      key: 'logout',
      label: <a onClick={() => logout()}>Log out</a>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout className="cms-layout-app">
      <Layout className="site-layout">
        <Header className="site-layout-background-header">
          <div className="logo" onClick={() => navigate(ROUTE.DASHBOARD)} />
          {/* <div className="logo" /> */}
          <Menu
            className="menu-header"
            mode="horizontal"
            selectedKeys={selectedKeys}
          >
            {generateMenus(menuTree)}
          </Menu>
          <div className="top-right-container">
            <div className="action-container">
              <Dropdown
                menu={{
                  items: itemsAvatar,
                }}
              >
                <Space>
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ verticalAlign: 'middle' }}
                    size="small"
                  />
                  {name}
                </Space>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content className="site-layout-background">
          {renderRoutes(MAIN_ROUTES)}
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;
