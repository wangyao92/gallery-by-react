require('normalize.css/normalize.css');
require('styles/App.scss');

import React,{Component} from 'react';
import ReactDOM from 'react-dom';

//获取图片数据
import imageDatas from './ImageDatas.js'

//获取单个图片组件
import ImgFigure from './ImgFigure.js';

//获取随机数
function getRangeRandom(low ,high){
  return Math.ceil(Math.random() * (high - low) + low);
}

class AppComponent extends Component {
    constructor(){
      super();

      this.Constant = {
        centerPos : {
          left: 0,
          right: 0
        },
        hPosRange : {  //图片在水平方向的取值范围
          leftSecX : [0 ,0],
          rightSecX : [0 ,0],
          y : [0 ,0]
        },
        vPosRange : { //图片在垂直方向的取值范围
          x : [0 ,0],
          topY : [0 ,0]
        }
      }

      this.state = {
        imgsArrangeArr : [

        ]
      }
    }

    /**重新布局所有图片
     * @param centerIndex  指定居中的图片索引
     */
    
    rearrange(centerIndex){
      let imgsArrangeArr = this.state.imgsArrangeArr,
          Constant = this.Constant,
          centerPos = Constant.centerPos,
          hPosRange = Constant.hPosRange,
          vPosRange = Constant.vPosRange,
          hPosRangeLeftSecX = hPosRange.leftSecX,
          hPosRangeRightSecX = hPosRange.rightSecX,
          hPosRangeY = hPosRange.y,
          vPosRangeTopY = vPosRange.topY,
          vPosRangeX = vPosRange.x,
          imgsArrangeTopArr = [],

          topImgNum = Math.ceil(Math.random()*2), //取一个或者不取

          topImgSpliceIndex = 0,
          imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

          //首先居中 centerIndex的图片
          imgsArrangeCenterArr[0].pos = centerPos;

          //取出要布局上侧的图片状态信息
          topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
          imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

          //布局位于上侧的图片
          imgsArrangeTopArr.forEach((item,index) => {
            imgsArrangeTopArr[index] = {
              pos : {
                top : getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
                left : getRangeRandom(vPosRangeX[0],vPosRangeX[1])
              }
            }
          })

          //布局左右两侧的图片
        for(let i = 0,j = imgsArrangeArr.length,k = j / 2; i < j; i++){
          let hPosRangeLORX = null;
          //前半部分布局左边,右半部分布局右边
          if(i < k){ 
            hPosRangeLORX = hPosRangeLeftSecX;
          }else {
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i].pos = {
            top : getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
            left : getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
          }
        }


        //还原图片数组状态信息
        //上方图片状态还原回去
        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        //改变状态
        this.setState({
          imgsArrangeArr : imgsArrangeArr
        })
    }

    //组件加载以后为每张图片计算其取值范围
    componentDidMount(){
      let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
          stageW = stageDOM.scrollWidth,
          stageH = stageDOM.scrollHeight,
          halfStageW = Math.ceil(stageW / 2),
          halfStageH = Math.ceil(stageH / 2);

          //拿到一个imgFigure的大小
      let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
          imgW = imgFigureDOM.scrollWidth,
          imgH = imgFigureDOM.scrollHeight,
          halfImgW = Math.ceil(imgW / 2),
          halfImgH = Math.ceil(imgH / 2);

          //计算中心图片的位置
      this.Constant.centerPos = {
        left : halfStageW - halfImgW,
        top : halfStageH - halfImgH
      }

        //计算左侧,右侧区域图片排布的取值范围
      this.Constant.hPosRange.leftSecX[0] = -halfImgW;
      this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

      this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
      this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

      this.Constant.hPosRange.y[0] = -halfImgH;
      this.Constant.hPosRange.y[1] = stageH - halfImgH;
      //计算上测区域图片排布的取值范围
      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

      this.Constant.vPosRange.x[0] = halfStageW - imgW;
      this.Constant.vPosRange.x[1] = halfStageW;
      let num = Math.floor(Math.random() * 10);


      this.rearrange(num);

    }


    render() {
      let controllerUnits = [],
        imgFigures = [];

      imageDatas.forEach((item,index) => {
        if(!this.state.imgsArrangeArr[index]){
          this.state.imgsArrangeArr[index] = {
            pos : {
              left : 0,
              top : 0
            }
          }
        }

        imgFigures.push(<ImgFigure key={index} 
                        data={item} 
                        ref={"imgFigure" + index}
                        arrange={this.state.imgsArrangeArr[index]}
          />);

    })

    return (
      <section className = "stage" ref="stage">
        <section className = "img-sec">
            {imgFigures}
        </section>
        <nav className = "controller-nav">
            {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
