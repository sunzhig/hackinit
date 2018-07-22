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
          function Dm() {
            this.x = 30;
            this.y = 165;
            this.width = 36;
            this.height = 36;
            this.direct = 1;
          
            this.originX = 30;
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
          function Guard(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
          
            this.originX = x;
            this.originY = y;
          
            //画挡板
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
            function Front(x, y, width, height) {
              this.x = x;
              this.y = y;
              this.width = width;
              this.height = height;
            
              this.originX = x;
              this.originY = y;
            
              //画挡板
              this.drawMe = function(context) {
                var img=new Image();
                img.src='https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=585138605,4265023168&fm=58';
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
           var FrontX = 773;
           var FrontY = 129;
           var BallX = FrontX-8;
           var BallY = FrontY+30;
           var G1x = 200;
           var G1y = 40;
           var G2x = 200;
           var G2y = 270;
          // var G3x = 350;
          // var G3y = 80;
          // var G4x = 350;
         //  var G4y = 250;
           var G5x = 500;
           var G5y = 129;

           var Front = new Front(FrontX, FrontY, FrontWidth, FrontHeight);
           var Ball = new Ball(BallX, BallY);
           var G1 = new Guard(G1x,G1y,FrontWidth, FrontHeight);
           var G2 = new Guard(G2x,G2y,FrontWidth, FrontHeight);
          // var G3 = new Guard(G3x,G3y,FrontWidth, FrontHeight);
          // var G4 = new Guard(G4x,G4y,FrontWidth, FrontHeight);
           var G5 = new Guard(G5x,G5y,FrontWidth, FrontHeight);
           var Door = new Door();
           var Dm = new Dm();
           



           //返回state
           this.handleKey=this.handleKey.bind(this);
           this.handleStartGameBtnClick=this.handleStartGameBtnClick.bind(this);
           this.startGame=this.startGame.bind(this);
           this.clear=this.clear.bind(this);
           this.refreshGameView=this.refreshGameView.bind(this);
           this.state= {
             G1: G1,
             G2: G2,
            // G3: G3,
            // G4: G4,
             G5: G5,
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
      }
      
  handleKey(e) {
    var x=this.state.Front.x 
    var y=this.state.Front.y
      if (e.keyCode==37){
        if (x>10){x-=7;}   
    }else if(e.keyCode==39){
      if (x<1000){x+=7;}
    }else if(e.keyCode==38){
      if (y>0 ){y-=7;}
    }else if (e.keyCode==40){
      if (y<312){y+=7;}
    } if (e.keyCode==32){
      var timer=setInterval(()=>{
         x-=3;
         this.state.Ball.x = x;
         if (x<30&&y<280&&y>50){
          clearInterval(timer);
          this.setState({stateCode: -1});
         } if (x<40&&((y-this.state.Dm.y>-30&&y-this.state.Dm.y<30)||!(y<280&&y>50))){
          clearInterval(timer);
          this.setState({stateCode: -2});
         }
        }, 10)
    }
    if (this.state.G1.x<this.state.Ball.x){this.state.G1.x+=4;}else{this.state.G1.x-=4}
    if (this.state.G1.y<this.state.Ball.y){this.state.G1.y+=4;}else{this.state.G1.y-=4}
    if (this.state.G2.x<this.state.Ball.x){this.state.G2.x+=4;}else{this.state.G2.x-=4}
    if (this.state.G2.y<this.state.Ball.y){this.state.G2.y+=4;}else{this.state.G2.y-=4}
   // if (this.state.G3.x<this.state.Ball.x){this.state.G3.x+=3;}else{this.state.G3.x-=3}
   // if (this.state.G3.y<this.state.Ball.y){this.state.G3.y+=3;}else{this.state.G3.y-=3}
    //if (this.state.G4.x<this.state.Ball.x){this.state.G4.x+=3;}else{this.state.G4.x-=3}
    //if (this.state.G4.y<this.state.Ball.y){this.state.G4.y+=3;}else{this.state.G4.y-=3}
    if (this.state.G5.x<this.state.Ball.x){this.state.G5.x+=3;}else{this.state.G5.x-=3}
    if (this.state.G5.y<this.state.Ball.y){this.state.G5.y+=3;}else{this.state.G5.y-=3}
    this.state.Front.x = x;
    this.state.Front.y = y;
    x-=8;
    y+=30;
    this.state.Ball.x = x;
    this.state.Ball.y = y;
  }

  startGame() {
    this.state.Front.reset();
    this.state.Dm.reset();
    this.state.Ball.reset();
    this.state.G1.reset();
    this.state.G2.reset();
   // this.state.G3.reset();
   // this.state.G4.reset();
    this.state.G5.reset();
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
    var y=this.state.Dm.y;
    if (y>280) {this.state.Dm.direct=-1;}
    if (y<50)  {this.state.Dm.direct= 1;}
    y+=this.state.Dm.direct/10;
    this.state.Dm.y=y
    var Y=this.state.Ball.y;
    var X=this.state.Ball.x;
    if ((Y-this.state.G1.y>-24&&Y-this.state.G1.y<24&&X-this.state.G1.x>-24&&X-this.state.G1.x<24)||(Y-this.state.G2.y>-24&&Y-this.state.G2.y<24&&X-this.state.G2.x>-24&&X-this.state.G2.x<24)||(Y-this.state.G5.y>-24&&Y-this.state.G5.y<24&&X-this.state.G5.x>-24&&X-this.state.G5.x<24)){
      clearInterval(this.state.timer);
      this.setState({stateCode: -2});
    }
    this.state.Front.drawMe(this.state.context);
    this.state.Ball.drawMe(this.state.context);
    this.state.G1.drawMe(this.state.context);
    this.state.G2.drawMe(this.state.context);
   // this.state.G3.drawMe(this.state.context);
   // this.state.G4.drawMe(this.state.context);
    this.state.G5.drawMe(this.state.context);
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
    this.state.G1.drawMe(this.state.context);
    this.state.G2.drawMe(this.state.context);
   // this.state.G3.drawMe(this.state.context);
   // this.state.G4.drawMe(this.state.context);
    this.state.G5.drawMe(this.state.context);
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
      const a='Neymar da Silva Santos Júnior'
      const txt = "和你最像的前锋球员为"+a+",快来操纵他赢得进球吧!";
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
      const a='Neymar da Silva Santos Júnior';
      const txt = "和你最像的前锋球员为"+a+",快来操纵他赢得进球吧!";    
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
      const a='Neymar da Silva Santos Júnior'; 
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
  
