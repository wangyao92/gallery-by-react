//获取图片数据
let imageDatas = require('../data/imageDatas.json');

//通过获取的图片数据中的图片名称，转换为图片路径url
imageDatas = ((imageDatasArr) => {
  for(let i = 0; i < imageDatasArr.length; i++){
    let tmpImageData = imageDatasArr[i];

    tmpImageData.imageURL = require('../images/' + tmpImageData.fileName)

    imageDatasArr[i] = tmpImageData;
  }
  return imageDatasArr;
})(imageDatas)

export default imageDatas;