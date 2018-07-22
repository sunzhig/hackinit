import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.jpg';
import { getRoutes } from '../utils/utils';



const copyright = <div>Copyright <Icon type="copyright" /> 2018 hack.init() 选择全队</div>;

class UserLayout extends React.PureComponent {
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title='踢出名堂'>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>踢出名堂</span>
                </Link>
              </div>
            <br/> 
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter  copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
