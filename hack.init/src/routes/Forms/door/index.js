import React, { PureComponent } from 'react';
import { Card, Alert, Button } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import styles from '../style.less';
import { connect } from 'dva';


@connect(({ login, loading }) => ({
  data1: login.data,
}))
export default class GameView extends PureComponent{
  render(){
    return(
      <PageHeaderLayout>
      <Alert message='未完待续' type='error'showIcon/>
      </PageHeaderLayout>
    );
  }
    
  }
  
