import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card,Table,Input  } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';
const Search = Input.Search;
@connect(({ login,user, loading }) => ({
  data:user.data,
  userName:login.userName,
  loading: loading.models.rule,
}))
export default class TableList extends PureComponent {
  constructor(){
    super();
  this.state={
    Add: 0,
    Data:null,
  };
  this.onChange=this.onChange.bind(this);}
  onChange(v){
    this.state.Add=1;
    this.render();
  }
  
  render() {
    const {data,userName} = this.props;
    const columns = [{ title:'名次',dataIndex: 'ord', key: 'ord' },{ title:'名称',dataIndex: 'nam', key: 'nam' },{ title:'分数',dataIndex: 'num', key: 'num' }];
   
    if(this.state.Add==0){    
      this.state.Data = [{key:'1',ord:'1',nam:`${data[0][0]}`,num:`${data[0][1]}`},
    {key:'2',ord:'2',nam:`${data[1][0]}`,num:`${data[1][1]}`},
    {key:'3',ord:'3',nam:`${data[2][0]}`,num:`${data[2][1]}`},
    {key:'4',ord:'4',nam:`${userName}`,num:'5'}];
 }
  else { this.state.Data = [{key:'1',ord:'1',nam:`${data[0][0]}`,num:`${data[0][1]}`},
  {key:'2',ord:'2',nam:`${data[1][0]}`,num:`${data[1][1]}`},
  {key:'3',ord:'3',nam:`${data[2][0]}`,num:`${data[2][1]}`},
  {key:'4',ord:'4',nam:`${userName}`,num:'5'},{key:'5',ord:'5',nam:`ad`,num:'0'}];}
   const tab=<Card bordered={false}>
   <Table columns={columns} dataSource={this.state.Data} />
   <Row>
   <Col span={14}>
   <Search
 placeholder="请输入要查找的好友名称"
 onSearch={this.onChange}
 enterButton="Search"
 size="large"
/>
</Col>
</Row>
   </Card>;
    return (
      <PageHeaderLayout title="排行榜">
        {tab}
      </PageHeaderLayout>
    );
  }
 
}
