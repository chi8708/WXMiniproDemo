Page({
  data: {
    canvasId: 'myCanvas',
    canvasWidth: 0, // 将在 onLoad 中设置为屏幕宽度
    canvasHeight: 0, // 将根据图片比例自适应
    points:[],
    imgPath:'/image/face2.jpg',
    fillColor: '#CC6284', // 填充颜色
    ctx:Object
  },

  onLoad: function () {
    this.data.ctx= wx.createCanvasContext(this.data.canvasId);
    this.setCanvasSize();
  },

  setCanvasSize: function () {
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        const screenWidth = res.windowWidth;
        that.setData({
          canvasWidth: screenWidth
        });
        that.drawCanvas();
      }
    });
  },

  drawCanvas: function (ctx=this.data.ctx, drawBeforCall=null) {
    
    const imgPath = this.data.imgPath; // 这里要放置你的图片路径

    wx.getImageInfo({
      src: imgPath,
      success: res => {
        const imgWidth = res.width;
        const imgHeight = res.height;

        // 根据 canvas 的宽度等比例缩放图片的高度
        const scale = this.data.canvasWidth / imgWidth;
        const scaledHeight = imgHeight * scale;

        // 更新 canvas 的高度
        this.setData({
          canvasHeight: scaledHeight
        });

        // 清空 canvas
        ctx.clearRect(0, 0, this.data.canvasWidth, scaledHeight);
        // 绘制图片到 canvas
        ctx.drawImage(imgPath, 0, 0, this.data.canvasWidth, scaledHeight);
        if(drawBeforCall){
          drawBeforCall();
        }
        ctx.draw();
      },
      fail: err => {
        console.error('获取图片信息失败', err);
      }
    });
  },

  uploadImage: function () {
    //这里上传的canvas会重色。解决：上传隐藏的image或原始未处理过图片的canvas
    wx.canvasToTempFilePath({
      canvasId: this.data.canvasId,
      success: res => {
        const tempFilePath = res.tempFilePath;
        wx.uploadFile({
          url: 'http://localhost:5042/api/Lipstick/applyLipstick', // 你的服务器接口地址
          filePath: tempFilePath,
          name: 'file',
          success: res => {
            res=JSON.parse(res.data);
            if(res.code==1){
              this.data.points=res.data;
              this.drawCanvas(this.data.ctx,this.drawPoints)
              console.log(this.data.points);
            }
            console.log('上传成功', res);
          },
          fail: err => {
            console.error('上传失败', err);
          }
        });
      },
      fail: err => {
        console.error('获取临时路径失败', err);
      }
    });
  },
    // 绘制并填充点
    drawPoints(ctx=this.data.ctx) {
      const points = this.data.points;
      const fillColor = this.data.fillColor;
  
      // 设置填充颜色
      ctx.setFillStyle(fillColor);
  
       // 设置线条连接方式和端点样式，确保边缘平滑
       ctx.setLineJoin('round');
       ctx.setLineCap('round');
      // 开始路径
      ctx.beginPath();
  
      // 移动到第一个点
      ctx.moveTo(points[0].x, points[0].y);
  
      // 遍历其余的点
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
  
      // 闭合路径
      ctx.closePath();
  
      // 填充路径
      ctx.fill();
    }
});
