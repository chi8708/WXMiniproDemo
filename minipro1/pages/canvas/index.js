Page({
  data: {
    canvasWidth: 500,
    canvasHeight: 500,
    fillColor: '#ff0000', // 填充颜色
    points: [ // 给定的一组坐标
      {
        "X": 210.0,
        "Y": 377.0,
        "IsEmpty": false
      }, {
        "X": 227.0,
        "Y": 366.0,
        "IsEmpty": false
      }, {
        "X": 244.0,
        "Y": 358.0,
        "IsEmpty": false
      }, {
        "X": 256.0,
        "Y": 361.0,
        "IsEmpty": false
      }, {
        "X": 268.0,
        "Y": 358.0,
        "IsEmpty": false
      }, {
        "X": 285.0,
        "Y": 366.0,
        "IsEmpty": false
      }, {
        "X": 302.0,
        "Y": 378.0,
        "IsEmpty": false
      }, {
        "X": 293.0,
        "Y": 378.0,
        "IsEmpty": false
      }, {
        "X": 268.0,
        "Y": 374.0,
        "IsEmpty": false
      }, {
        "X": 256.0,
        "Y": 375.0,
        "IsEmpty": false
      }, {
        "X": 244.0,
        "Y": 374.0,
        "IsEmpty": false
      }, {
        "X": 220.0,
        "Y": 377.0,
        "IsEmpty": false
      }, {
        "X": 302.0,
        "Y": 378.0,
        "IsEmpty": false
      }, {
        "X": 286.0,
        "Y": 393.0,
        "IsEmpty": false
      }, {
        "X": 269.0,
        "Y": 400.0,
        "IsEmpty": false
      }, {
        "X": 256.0,
        "Y": 401.0,
        "IsEmpty": false
      }, {
        "X": 243.0,
        "Y": 400.0,
        "IsEmpty": false
      }, {
        "X": 227.0,
        "Y": 393.0,
        "IsEmpty": false
      }, {
        "X": 210.0,
        "Y": 377.0,
        "IsEmpty": false
      }, {
        "X": 220.0,
        "Y": 377.0,
        "IsEmpty": false
      }, {
        "X": 244.0,
        "Y": 376.0,
        "IsEmpty": false
      }, {
        "X": 256.0,
        "Y": 378.0,
        "IsEmpty": false
      }, {
        "X": 269.0,
        "Y": 377.0,
        "IsEmpty": false
      }, 
      {
        "X": 293.0,
        "Y": 378.0,
        "IsEmpty": false
      }
    ]
  },

  onLoad() {
    this.drawPoints();
  },

  // 绘制并填充点
  drawPoints() {
    const ctx = wx.createCanvasContext('myCanvas');
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
    ctx.moveTo(points[0].X, points[0].Y);

    // 遍历其余的点
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].X, points[i].Y);
    }

    // 闭合路径
    ctx.closePath();

    // 填充路径
    ctx.fill();

    // 绘制到 Canvas 上
    ctx.draw();
  }
});
