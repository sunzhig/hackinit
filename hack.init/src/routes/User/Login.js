import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, Col, Row, notification} from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';


const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  userNames:login.userNames,
  passwords: login.userpasswords,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  }

    
  
  handleSubmit = (err, values) => {
    const { type } = this.state;
    const {userNames,passwords} = this.props;
    if (!err) {
      var file = password.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload =  ( event )=> { 
          res=res.bind(this);
          function res(data){
            //console.log(data);
            const mes = {data:data};
            this.props.dispatch({
              type: 'login/data',
              payload: {
                ...mes,
                type,
              },
            });
          }
          var txt = event.target.result;  
          const valuess={userName:values.userName,password:txt};
          var ts = txt.replace(/^data:image\/(jpeg|png|gif);base64,/i, '');
          ts = ts.replace(/\//g,'sunzhg');
        if (userNames.indexOf(valuess.userName)==-1) {
          userNames.push(valuess.userName);
          passwords.push(valuess.password.slice(-4))
          const add = {userNames:userNames,userpasswords:passwords};
          this.props.dispatch({
            type: 'login/adduser',
            payload: {
              ...add,
              type,
            },
          });
        }else if (passwords.indexOf(valuess.password.slice(-4))==-1 || passwords.indexOf(valuess.password.slice(-4))!=userNames.indexOf(valuess.userName)){
          alert("上传照片错误！请使用之前上传的照片");
          return;
        }
        $.ajax({
            type: 'GET',
            url: "http://localhost:5000/"+ts,
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {   
              res(data);
            },
            error: function(xhr, type) {
              console.log(type);
            }
        });
          //console.log(ts);
      /*   let url = 'http://localhost:8080/cors';
          fetch(url, {
            method: 'POST',
            //mode:'no-cors',
            credentials: 'include',
            headers: {  
              "Content-Type": "application/json",
            },
            body:ts,
          }).then(function(res) {
            console.log(res);
          });*/

          this.props.dispatch({
            type: 'login/login',
            payload: {
              ...valuess,
              type,
            },
          });
        };
      }
      reader.readAsDataURL( file );
    }
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }
  change = () => {
    notification.open({
      message: '提示',
      duration: 3,
      description: '您已成功上传图片！（该提示3s后自动关闭）',
    });

  }
  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    const name= <UserName name="userName"  />;
    const password = <Password name="password" onChange={this.change}/>;
    const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;    
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
 
          <Row type="flex" justify="center" align="middle">
            <Col span={5}><DemoBox value={100}>用户名 </DemoBox></Col>
            <Col span={19}>{name}</Col>
          </Row>
          <Row type="flex"  align="middle">
            <Col span={10}><DemoBox value={100}>请上传一张您的照片</DemoBox></Col>
            <Col span={8}>{password}</Col>
          </Row>

          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
