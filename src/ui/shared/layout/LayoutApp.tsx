import React, { useEffect, useState } from 'react';

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MobileOutlined,
  UserOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Space,
  MenuProps,
  Avatar,
  Drawer,
} from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import './LayoutApp.less';

import { useAuth } from '~/adapters/appService/auth.service';
import { authSelector } from '~/adapters/redux/selectors/auth';
import { BREAKPOINTS } from '~/constant';
import { MAIN_ROUTES, menus } from '~/constant/menu';
import ROUTE from '~/constant/routes';
import useCurrentWidth from '~/hooks/useCurrentWidth';
import useDialog from '~/hooks/useDialog';
import useQuery from '~/hooks/useQuery';
import { capitalizeFirstLetter, filterRole, getDefaultRoute } from '~/utils';
import { arrayToTree, queryAncestors } from '~/utils/menu';
import { renderRoutes } from '~/utils/route';

const { Header, Sider, Content } = Layout;

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
  const { role, name } = useSelector(authSelector);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileMenuVisible, mobileMenuActions] = useDialog();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const query = useQuery();
  const { checkProfile, logout } = useAuth();

  const filteredMenus = menus.filter((item) => filterRole(item.roles, [role]));

  // Generating tree-structured data for menu content.
  const menuTree = arrayToTree(filteredMenus, 'id', 'menuParentId');

  // Find a menu that matches the pathname.
  let currentMenu = menus.find(
    (_) => _.route && pathToRegexp(_.route).exec(location.pathname)
  );

  if (!currentMenu) {
    const pathnameArr = location.pathname.split('/');
    currentMenu = menus.find(
      (_) => _.route && _.route.includes(pathnameArr[1])
    );
  }

  // Find the key that should be selected according to the current menu.
  const selectedKeys = currentMenu
    ? queryAncestors(menus, currentMenu, 'menuParentId').map((_) => _.id)
    : [];

  useEffect(() => {
    checkProfile()
      .then((res) => {
        if ([ROUTE.LOGIN, ROUTE.INDEX].includes(location.pathname)) {
          const defaultRoute = getDefaultRoute([res?.data?.role]);
          navigate(defaultRoute, { replace: true });
        }
      })
      .catch((err) => {
        navigate(ROUTE.LOGIN, { replace: true });
      });
  }, []);

  const itemsAvatar: MenuProps['items'] = [
    {
      key: 'change-password',
      label: (
        <a onClick={() => navigate(ROUTE.PROFILE.CHANGE_PASSWORD)}>
          Change Password
        </a>
      ),
      icon: <LogoutOutlined />,
    },
    {
      key: 'logout',
      label: <a onClick={() => logout()}>Logout</a>,
      icon: <LogoutOutlined />,
    },
  ];

  const width = useCurrentWidth();

  useEffect(() => {
    if (width <= BREAKPOINTS.MD) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      mobileMenuActions.handleClose();
    }
  }, [width]);

  const handleOnClickMenuMobileItem = ({ key }) => {
    if (key === 'log-out') {
      logout();
    }
    mobileMenuActions.handleClose();
  };

  const renderMobileMenu = () => {
    return (
      <div className="mobile-menu">
        <div
          style={{ marginRight: '16px' }}
          className="mobile-menu-icon"
          onClick={mobileMenuActions.handleToggle}
        >
          <MenuOutlined />
        </div>
      </div>
    );
  };

  const mobileMenuTree = [...menuTree];
  mobileMenuTree.push(
    {
      id: 'change-password',
      name: 'Change Password',
      route: ROUTE.PROFILE.CHANGE_PASSWORD,
    },
    {
      id: 'log-out',
      name: 'Logout',
    }
  );

  return (
    <Layout className="cms-layout-app">
      <Layout className="site-layout">
        <Drawer
          open={mobileMenuVisible}
          onClose={mobileMenuActions.handleClose}
        >
          <Menu
            className="menu-header"
            mode="vertical"
            onClick={handleOnClickMenuMobileItem}
          >
            {generateMenus(mobileMenuTree)}
          </Menu>
        </Drawer>
        <Header className="site-layout-background-header">
          <div
            className="logo"
            onClick={() => navigate(getDefaultRoute([role]))}
          />
          {isMobile ? (
            renderMobileMenu()
          ) : (
            <>
              <Menu className="menu-header" mode="horizontal">
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
            </>
          )}
        </Header>
        <Content className="site-layout-background">
          {renderRoutes(MAIN_ROUTES, [role])}
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;
