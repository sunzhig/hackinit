import React, { ReactDOM, Component } from 'react';
import { Checkbox, Alert, Icon, Col, Row,Card} from 'antd';
import logo from './home.png';
import styles from './Person.less';

export default class Analysis extends React.Component {
  render() {
    return (
      <div>
        <img src={logo} alt='home' className={styles.img} />
      </div>
    );
  }
}

