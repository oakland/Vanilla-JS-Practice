// circles
// copyright Artan Sinani
// https://github.com/lugolabs/circles

/*
  Lightwheight JavaScript library that generates circular graphs in SVG.

  Call Circles.create(options) with the following options:

    id         - the DOM element that will hold the graph
    percentage - the percentage dictating the smaller circle
    radius     - the radius of the circles
    width      - the width of the ring (optional, has value 10, if not specified)
    number     - the number to display at the centre of the graph (optional, the percentage will show if not specified)
    text       - the text to display after the number (optional, nothing will show if not specified)
    colors     - an array of colors, with the first item coloring the full circle 
                 (optional, it will be `['#EEE', '#F00']` if not specified)
    duration   - value in ms of animation duration; (optional, defaults to 500); 
                 if `null` is passed, the animation will not run

*/

// 首先定义一个匿名自执行函数
(function() {
  // 定义一个构造函数——Circles
  var Circles = window.Circles = function(options) {
    // 获取承载 circle 的对象元素
    var elId = options.id;
    this._el = document.getElementById(elId);
    
    // 如果没有找到，则返回 null，什么都不执行
    if (this._el === null) return;
    
    // 给Circles 的实例添加各种属性，角度，比例，文字，颜色，宽度...
    var endAngleRad = Math.PI / 180 * 270;

    this._radius         = options.radius;
    this._percentage     = options.percentage;
    this._text           = options.text; // #3
    this._number         = options.number || this._percentage;
    this._strokeWidth    = options.width  || 10;
    this._colors         = options.colors || ['#EEE', '#F00'];
    this._interval       = 16;
    this._textWrpClass   = 'circles-text-wrp';
    this._textClass      = 'circles-text';
    this._numberClass    = 'circles-number';
    
    // 这里执行了一个函数，进而可以判断 this._canAnimate 是否为真
    this._confirmAnimation(options.duration);

    this._svgSize        = this._radius * 2;
    this._radiusAdjusted = this._radius - (this._strokeWidth / 2);
    this._start          = -Math.PI / 180 * 90;
    this._startPrecise   = this._precise(this._start);
    this._circ           = endAngleRad - this._start;
    this._el.innerHTML   = this._wrap(this._generateSvg() + this._generateText()); // 通过 innerHTML 的方式将 HTML 代码插入到 DOM 元素中，实现动画效果

    // 这个_canAnimate 在哪里定义的？看上面代码，有一段是 this._confirmAnimation(options.duartion)，这个函数里决定了 _canAnimate 是否为真
    if (this._canAnimate) this._animate();
  };

  Circles.prototype = {
    VERSION: '0.0.3',

    _confirmAnimation: function(duration) {
      if (duration === null) {
        this._canAnimate = false;
        return;
      }

      duration = duration || 500;

      var step     = duration / this._interval,
        pathFactor = this._percentage / step,
        numberFactor = this._number / step;

      if (this._percentage <= (1 + pathFactor)) {
        this._canAnimate = false;
      } else {
        this._canAnimate   = true;
        this._pathFactor   = pathFactor;
        this._numberFactor = numberFactor;
      }
    },

    _animate: function() {
      var i      = 1,
        self     = this,
        path     = this._el.getElementsByTagName('path')[1],
        numberEl = this._getNumberElement(),

        // 这个判断整数的方式不错
        isInt    = this._number % 1 === 0,

        // 关于 window.requestAnimationFrame 需要查资料专门了解一下，写个专题
        requestAnimFrame = window.requestAnimationFrame       ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame    ||
                           window.oRequestAnimationFrame      ||
                           window.msRequestAnimationFrame     ||
                           function (callback) {
                               setTimeout(callback, self._interval);
                           },

        animate = function() {
          var percentage   = self._pathFactor * i,
            nextPercentage = self._pathFactor * (i + 1),
            number         = self._numberFactor * i,
            canContinue    = true;
          if (isInt) {
            number = Math.round(number);
          }
          if (nextPercentage > self._percentage) {
            percentage  = self._percentage;
            number      = self._number;
            canContinue = false;
          }
          if (percentage > self._percentage) return;
          path.setAttribute('d', self._calculatePath(percentage, true));
          numberEl.innerHTML = self._calculateNumber(number);
          i++;
          if (canContinue) requestAnimFrame(animate);
        };

      requestAnimFrame(animate);
    },

    _getNumberElement: function() {
      var divs = this._el.getElementsByTagName('span');
      for (var i = 0, l = divs.length; i < l; i++) {
        if (divs[i].className === this._numberClass) return divs[i];
      }
    },

    _wrap: function(content) {
      return '<div class="circles-wrp" style="position:relative; display:inline-block;">' + content + '</div>';
    },

    _generateText: function() {
      var html =  '<div class="' + this._textWrpClass + '" style="position:absolute; top:0; left:0; text-align:center; width:100%;' +
        ' font-size:' + this._radius * .5 + 'px; height:' + this._svgSize + 'px; line-height:' + this._svgSize + 'px;">' + 
        this._calculateNumber(this._canAnimate ? 0 : this._number);
      if (this._text) {
        html += '<span class="' + this._textClass + '">' + this._text + '</span>';
      }
      html += '</div>';
      return html;
    },

    _calculateNumber: function(number) {
      var parts = (number + '').split('.'),
        html = '<span class="' + this._numberClass + '">' + parts[0];
      if (parts.length > 1) {
        html += '.<span style="font-size:.4em">' + parts[1].substring(0, 2) + '</span>';
      }
      return html + '</span>';
    },

    _generateSvg: function() {
      return '<svg width="' + this._svgSize + '" height="' + this._svgSize + '">' + 
        this._generatePath(100, false, this._colors[0]) + 
        this._generatePath(this._canAnimate ? 1 : this._percentage, true, this._colors[1]) + 
      '</svg>';
    },

    _generatePath: function(percentage, open, color) {
      return '<path fill="transparent" stroke="' + color + '" stroke-width="' + this._strokeWidth + '" d="' + this._calculatePath(percentage, open) + '"/>';
    },

    _calculatePath: function(percentage, open) {
      var end      = this._start + ((percentage / 100) * this._circ),
        endPrecise = this._precise(end);
      return this._arc(endPrecise, open);
    },

    _arc: function(end, open) {
      var endAdjusted = end - 0.001,
        longArc       = end - this._startPrecise < Math.PI ? 0 : 1;

      return [
        'M',
        this._radius + this._radiusAdjusted * Math.cos(this._startPrecise),
        this._radius + this._radiusAdjusted * Math.sin(this._startPrecise),
        'A', // arcTo
        this._radiusAdjusted, // x radius
        this._radiusAdjusted, // y radius
        0, // slanting
        longArc, // long or short arc
        1, // clockwise
        this._radius + this._radiusAdjusted * Math.cos(endAdjusted),
        this._radius + this._radiusAdjusted * Math.sin(endAdjusted),
        open ? '' : 'Z' // close
      ].join(' ');
    },

    // 这个精确数字的方式不错
    _precise: function(value) {
      return Math.round(value * 1000) / 1000;
    }
  };

  Circles.create = function(options) {
    return new Circles(options);
  };
})();