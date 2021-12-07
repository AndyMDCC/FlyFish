import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  BasicLayout,
  Icon,
  ThemeProvider, Menu,
  ConfigProvider, Dropdown
} from '@chaoswise/ui';
import logo from './assets/logo.svg';
import { Button } from 'antd';
import actions from '@/shared/mainActions';
import { loginout, getUserInfoService } from './services';
import { connect,toJS } from '@chaoswise/cw-mobx';

// import styles from './index.less';

const Layout = ({
  children,
  route, // 路由数据
  currentRoute, // 当前路由数据 （当前地址的）
  location
}) => {

  const history = useHistory();

  const currentPath = history.location.pathname;

  const { currentTheme } = ThemeProvider.useThemeSwitcher();
  const { locale } = ConfigProvider.useLocale();

  const [authMenuData, setAuthMenuData] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    // 更新全局状态通知子应用
    actions.setGlobalState({
      theme: currentTheme
    });
  }, [currentTheme]);

  useEffect(() => {
    // 更新全局状态通知子应用
    actions.setGlobalState({
      locale
    });
  }, [locale]);
 
  const getUserInfo = async () => {
    const id = localStorage.getItem('id');
    const res = await getUserInfoService(id);
    if (res && res.data) {
      const menu = res.data.menus.map(item => item.name);
      localStorage.setItem('username', res.data.username);
      let routeData = route.routes.filter(item => {
        if (item.routes) {
          item.routes = item.routes.filter(item2 => {
            return menu.includes(item2.name);
          });
        }
        return menu.includes(item.name);
      });

      const authMenu = getMenuData(routeData || []);
      setAuthMenuData(authMenu);
    }
  };
  /**
   * 通过路由配置文件生成menuData
   * @param {Arrary} routeData 路由配置
   */
  const getMenuData = (routeData) => {
    return routeData.map((item, index) => {
      if (item.routes) {
        return {
          ...item,
          icon: item.icon ? <Icon type={item.icon} /> : null,
          hasAuth: true, // 根据实际权限判断
          children: getMenuData(item.routes),
        };
      }
      return {
        ...item,
        hasAuth: true, // 根据实际权限判断
        icon: item.icon ? <Icon type={item.icon} /> : null
      };
    });
  };

  const onPathChange = (e) => {

    const menuProps = e.item.props;
    if (menuProps.target === 'open') {
      window.open(menuProps.url, 'target');
      return;
    }

    if (e.key === currentPath) {
      return;
    }
    history.push(e.key);
  };
  const check = (a) => {
    console.log('惦记了', a);
  };
  /**
   * 获取高亮菜单
   */
  const getActiveMenuKey = () => {

    // 映射高亮菜单
    if (currentRoute && currentRoute.activeMenuKey) {
      return currentRoute.activeMenuKey;
    }
    // 默认
    return currentPath;
  };

  // 获取当前路由下的配置，根据配置可进行一些定制化操作
  const { showBack, backTitle, name } = currentRoute;
  const goBack = () => {
    history.goBack();
  };
  // 动态的返回文字
  const routeBackName = () => {
    if (name === '项目详情') {
      return `项目管理/${JSON.parse(sessionStorage.getItem('activeProject')).name}`;
    }
    if (name === '开发组件') {
      if (location.state && location.state.name) {
        return `开发组件/${location.state.name}`;
      }
      return '开发组件';
    }
    if (name === '组件记录') {
      if (location.state && location.state.name) {
        return `开发组件/${location.state.name}`;
      }
      return '开发组件';
    }
  };
  const clearCookies = () => {
    loginout();
    history.replace('/login');
  };
  const rightMenu = (<Menu>
    <Menu.Item key="0" onClick={clearCookies}>
    <Icon type="logout" />
    <span style={{textAlign:'center' }} >退出</span>
    </Menu.Item>
  </Menu>);
  return (
    <BasicLayout
      logo={<img src={logo} />}
      headerTitle='LCAP'
      showTopNavigation={false}
      showBack={showBack}
      backNavigationTitle={backTitle || routeBackName()}
      showBreadcrumb={true}
      breadcrumbOptions={{
        // 格式化面包屑数据
        formatData: data => {
          data.shift();
          return data;
        },
      }}
      headerExtra={ // 可以放置其它功能按钮
        <Dropdown overlay={rightMenu} placement="bottomLeft" >
          <span style={{cursor: 'pointer'}}>{localStorage.getItem('username')}</span>
        </Dropdown>
      }
      // onClickTopNavigation={check}
      onClickBack={goBack}
      menuOptions={{
        menuData: authMenuData,
        selectedKeys: [getActiveMenuKey()],
        onClick: onPathChange
      }}
    >
      {children}
    </BasicLayout>
  );
};

export default connect(({ globalStore }) => {
  return {
    currentRoute: globalStore.currentRoute
  };
})(Layout);
