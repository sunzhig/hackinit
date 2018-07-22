import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
    },
    rules: [{
      required: true, message: '请输入账户名！',
    }],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="upload" className={styles.Icon} />,
      type: 'file',
    },
    rules: [{
      required: true, message: '请输入密码！',
    }],
  },
};

export default map;
