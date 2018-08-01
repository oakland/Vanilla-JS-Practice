// 这个模块可以考虑封装成一个类或者组件

var gapTime = 1000 * 10;                                // 轮播间隔时间
var intervalTime = 100;                                 // 进度条变化时间间隔

var imgCount = $('.J-carousel img').length || 4;        // 轮播图数量
var imgWidth = $('.J-item img').width() || 2048;        // 图片宽度
var winWidth = $(window).width();                       // 整个屏幕的宽度

var solidBarWidth = $('.J-solid-bar').width();          // 进度条长度
var curCount = 0;                                       // 当前进度
var timer = null;
var distance = intervalTime/gapTime * solidBarWidth;    // 让 distance 尽量是 1

// 根据序号给出图片的 left 位置
function getLeft(index) {
  return (winWidth - imgWidth)/2 - index*imgWidth
}

// 初始化
function initCarousel() {
  // 初始化 .slide-box 的 left, boxWidth 属性
  var initLeft = getLeft(0);
  var boxWidth = imgWidth * imgCount;
  $('.J-slide-box').css({
    left: initLeft,
    width: boxWidth
  });

  startSlide();
}

// 重置 solid-bar
function resetSolidBar(index) {
  $('.J-solid-bar').eq(index).css({
    left: '-100%'
  })
}

// 进度条
function progress() {
  // 每隔 intervalTime 毫秒，就检测一下 soild bar 的 left 是不是大于等于 0，如果是，则重置 solid bar 的 left 值，同时图片移动到下一张
  // 如果不是，则 solid bar 就向右移动 intervalTime/gapTime * 40 px 的距离
  var index = curCount % imgCount;
  var $curSolidBar = $('.J-solid-bar').eq(index);
  var curLeft = parseInt($curSolidBar.css('left'));
  if (curLeft >= 0) {
    resetSolidBar(index)
    curCount++;
    var next = curCount % imgCount;
    var left = getLeft(next);
    $('.J-slide-box').css({
      left: left
    });
  } else {
    var disStr = `+=${distance}px`
    $curSolidBar.css({
      left: disStr
    })
  }
  timer = setTimeout(progress, intervalTime)
}

// 开始轮播
function startSlide() {
  timer = setTimeout(progress, intervalTime)
}

// 点击序号切换图片
function changeIndex() {
  $('.J-indicator').on('click', function(e) {
    // 暂停正在进行的进度条，并重置
    clearTimeout(timer);
    var curIndex = curCount % imgCount;
    resetSolidBar(curIndex);

    // 图片跳转到目标 index，并修改 curCount
    var $indicators = $('.J-indicator');
    var targetIndex = $indicators.index($(this));
    curCount = targetIndex;
    var index = curCount % imgCount;
    var left = getLeft(index);
    $('.J-slide-box').css({
      left: left
    });

    // 开始新的计时器，即新的进度
    timer = setTimeout(progress, intervalTime);
  });
}

// 鼠标悬浮时，计时器停止
// 这里用 .J-carousel 为什么会出现 bug？需要思考一下
function pause() {
  $('.J-slide-box')
    .on('mouseover', function() {
      // 暂停当前进度条，定时器
      clearTimeout(timer);
    })
    .on('mouseout', function() {
      // 继续刚才的进度条，定时器
      timer = setTimeout(progress, intervalTime);
    })
}

// 事件绑定
function bindEvent() {
  changeIndex();
  pause();
}

$(function() {
  bindEvent();
  initCarousel();
})