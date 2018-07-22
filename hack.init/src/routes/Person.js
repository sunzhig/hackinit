import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  DatePicker,
} from 'antd';
import numeral from 'numeral';
import { getTimeDistance } from '../utils/utils';
import PageHeaderLayout from '../layouts/PageHeaderLayout';
import styles from './Person.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

@connect(({ login, loading }) => ({
  data1: login.data,
  userName: login.userName,
  password: login.password,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };


  render() {
    const {data1,userName,password, loading } = this.props;
    const { Meta } = Card;
    const name = `  姓名 : ${userName}`;
    const columns = [{ title:'项目',dataIndex: 'nam', key: 'nam' },{ title:'信息',dataIndex: 'num', key: 'num' }];
    const Data=JSON.parse(data1);
    const data = [{key:'1',nam:'年龄',num:Data.result.face_list[0].age},
    {key:'2',nam:'性别',num:Data.result.face_list[0].gender.type},
    {key:'3',nam:'人种',num:Data.result.face_list[0].race.type},
    {key:'4',nam:'表情',num:Data.result.face_list[0].expression.type},
    {key:'5',nam:'是否带眼镜',num:Data.result.face_list[0].glasses.type},
    {key:'6',nam:'美貌评分',num:Data.result.face_list[0].beauty},]; 

    return(
        <PageHeaderLayout title="个人基本信息" content="根据百度人脸识别API得到的个人基本信息" >
          <Card className={styles.back}>
          <Row type="flex" justify="center">
            <Col span={10}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={password} />}
              >
                <Meta title= {name} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Table columns={columns} dataSource={data} />
              </Card>
            </Col>
          </Row>
          </Card>
        </PageHeaderLayout>
    );
  }
}
