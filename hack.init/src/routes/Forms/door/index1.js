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
  constructor() { /** 生命周期方法，这里做一些初始化 */
          super();
          function Door() {
            this.drawMe = function(ctx) {
              ctx.moveTo(30,30);
              ctx.lineTo(30,300);
              ctx.stroke();
              ctx.moveTo(30,50);
              ctx.lineTo(0,50);
              ctx.lineTo(0,280);
              ctx.lineTo(30,280);
              ctx.stroke();
            }
          }
          function Front() {
            this.x = 300;
            this.y = 165;
            this.width = 36;
            this.height = 36;
            this.direct = 1;
          
            this.originX = 300;
            this.originY = 165;

            this.drawMe = function(context) {
              context.fillStyle = "#000000";
              context.fillRect(this.x, this.y, this.width, this.height);
            }
          
            //重置挡板的位置
            this.reset = function() {
              this.x = this.originX;
              this.y = this.originY;
            }
          }         
          //挡板类
            function Dm( x,y, width, height) {
              this.x = x;
              this.y = y;
              this.width = width;
              this.height = height;
            
              this.originX = x;
              this.originY = y;
            
              //画挡板
              this.drawMe = function(context) {
                var img=new Image();
                img.src='https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=63ec50c7bc003af34dbadb660d11a161/d50735fae6cd7b89cb6e8a4d052442a7d8330ef9.jpg';
                context.drawImage(img,this.x,this.y,this.width,this.height);}.bind(this)
            
              //重置挡板的位置
              this.reset = function() {
                this.x = this.originX;
                this.y = this.originY;
              }
            }
            function Ball(x, y) {
              this.x = x;
              this.y = y;
            
              this.originX = x;
              this.originY = y;
            
              //画挡板
              this.drawMe = function(context) {
                context.beginPath();
                context.fillStyle = "#000000";
                context.arc(this.x , this.y , 8, 0, 2 * Math.PI);
                context.closePath();
                context.fill();
              }
            
              //重置挡板的位置
              this.reset = function() {
                this.x = this.originX;
                this.y = this.originY;
              }
            }
               //创建一个挡板
           var FrontWidth = 36;
           var FrontHeight = 36;
           var FrontX = 300;
           var FrontY = 165;
           var BallX = FrontX-8;
           var BallY = FrontY+30;

           var Front = new Front();
           var Ball = new Ball(BallX, BallY);
           var Door = new Door();
           var Dm = new Dm(FrontY, FrontWidth, FrontHeight);
           



           //返回state
           this.handleKey=this.handleKey.bind(this);
           this.handleStartGameBtnClick=this.handleStartGameBtnClick.bind(this);
           this.startGame=this.startGame.bind(this);
           this.clear=this.clear.bind(this);
           this.shoot=this.shoot.bind(this);
           this.refreshGameView=this.refreshGameView.bind(this);
           this.state= {
             Ball: Ball,
             Front: Front,
             started: false,
             stateCode: 0,
             Door: Door,
             Dm: Dm,
           };
         }

  handleStartGameBtnClick() {
    this.setState({stateCode: 1});    
    this.state.random = Math.ceil(Math.random()*10);
      }
      
  handleKey(e) {
    var y=this.state.Dm.y
    if(e.keyCode==38){
      if (y>0 ){y-=7;}
    }else if (e.keyCode==40){
      if (y<312){y+=7;}
    } 
    this.state.Dm.y = y;
  }
  shoot() {
    var x=300;
    var y=this.state.Ball.y;
    var timer=setInterval(()=>{
      x-=3;
      this.state.Ball.x = x;
      if (x<30&&y<280&&y>50){
       clearInterval(timer);
       this.setState({stateCode: -2});
       return;
      } if (x<40&&((y-this.state.Dm.y>-30&&y-this.state.Dm.y<30)||!(y<280&&y>50))){
       clearInterval(timer);
       this.setState({stateCode: -1});
       return;
      }
     }, 10)
  }
  startGame() {
    this.state.Front.reset();
    this.state.Dm.reset();
    this.state.Ball.reset();
    this.refreshGameView();
    var timer = setInterval(this.refreshGameView, this.props.refreshInterval);
    this.state.timer = timer;
    this.state.started = true;
  } 
  clear() { /** 清除游戏区域的背景 */
    this.state.context.clearRect(0, 0, 1000, 1000);
  }
  refreshGameView() { /** 刷新游戏区域 */
    //每次刷新前都需要清除背景，不然小球和挡板上次的位置会被保留
    this.clear();
    //画小球和挡板
    var y=this.state.Front.y;
    if (y>280) {this.state.Front.direct=-1;}
    if (y<50)  {this.state.Front.direct= 1;}
    y+=this.state.Front.direct/5;
    this.state.Front.y=y;
    y+=30;
    this.state.Ball.y=y;    
    console.log(this.state.random);
    if (this.state.random>5){this.state.random-=this.state.Front.direct/100
      console.log('aaa');
    if (this.state.random<6){this.shoot();}}
    else {this.state.random+=this.state.Front.direct/100
    if (this.state.random>7){this.shoot();}}
    this.state.Front.drawMe(this.state.context);
    this.state.Ball.drawMe(this.state.context);
    this.state.Door.drawMe(this.state.context);
    this.state.Dm.drawMe(this.state.context);
  }

	componentDidUpdate() { /** 生命周期方法，组件更新完成后调用，可调用多次 */
      if(this.state.stateCode == 1) {
        console.log('did update, start game...');
        this.state.context = document.getElementById('canvas').getContext('2d');
        this.startGame();
      }
    }
  componentDidMount(){
    this.state.context = document.getElementById('init').getContext('2d');
    this.state.Front.drawMe(this.state.context);	
    this.state.Ball.drawMe(this.state.context);
    this.state.Door.drawMe(this.state.context);
    this.state.Dm.drawMe(this.state.context);
  }

    render() {
      console.log(this.state.stateCode);
      switch(this.state.stateCode) {
        case -1:
        return this.renderGameOverView();
        break;
        case 0:
          return this.renderStartView();
        break;
        case 1:
          return this.renderGameView();
        break;
        case -2:
        return this.renderGamefail();
      break;
      }
    }
    renderStartView() { /** 渲染游戏开始的视图 */
      const {data1} = this.props;
      const a='Gianluigi Buffon'
      const txt = "和你最像的门将为"+a+",快来操纵他扑出点球吧!";
      return (
        <PageHeaderLayout>
        <Alert message={txt} type="success" closable='false' showIcon />
        <Card bordered='false'>
        <canvas id='init'
    width='1000' 
    height='330' 
    ></canvas>
        <Button className="start-game-btn" type="primary" onClick={this.handleStartGameBtnClick}>开始游戏</Button>
        </Card>
        </PageHeaderLayout>
    );
    }
    renderGameView() { /** 渲染游戏面板 */
      console.error('render game view...');
      const {data1} = this.props;
      const a='Gianluigi Buffon';
      const txt = "和你最像的门将为"+a+",快来操纵他扑出点球吧!";   
      window.addEventListener('keydown', this.handleKey);
      return (
        <PageHeaderLayout>
        <Alert message={txt} type="success" closable='false' showIcon />
        <Card bordered='false'>
        <canvas id='canvas'
    width='1000' 
    height='330' 
    ></canvas>
        </Card>
        </PageHeaderLayout>
      );
    }
    renderGamefail() { /** 渲染游戏结束的视图 */
      return (
        <PageHeaderLayout>
        <Card bordered='false'>
          <p>挑战失败，请再来一次</p>
          <Button type="primary" className="start-game-btn" onClick={this.handleStartGameBtnClick}>重新开始</Button>
        </Card>
        </PageHeaderLayout>
      );
    }
    renderGameOverView() { /** 渲染游戏结束的视图 */
      const a='Gianluigi Buffon'; 
      return (
        <PageHeaderLayout>
        <Card bordered='false'>
          <p>不愧是{a}，恭喜你挑战成功，获得5点积分</p>
          <Button type="primary" className="start-game-btn" onClick={this.handleStartGameBtnClick}>重新开始</Button>
        </Card>
        </PageHeaderLayout>
      );
    }
  }
  
