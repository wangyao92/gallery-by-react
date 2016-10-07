require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片数据
let imageDatas = require('../data/imageDatas.json');

//通过获取的图片数据中的图片名称，转换为图片路径url
imageDatas = (function(imageDatasArr){
  for(let i = 0; i < imageDatasArr.length; i++){
    let tmpImageData = imageDatasArr[i];

    tmpImageData.imageURL = require('../images/' + tmpImageData.fileName)

    imageDatasArr[i] = tmpImageData;
  }
  return imageDatasArr;
})(imageDatas)


class AppComponent extends React.Component {
  render() {
    return (
      <section className = "stage">
        <section className = "img-sec">
          
        </section>
        <nav className = "controller-nav">
          
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
