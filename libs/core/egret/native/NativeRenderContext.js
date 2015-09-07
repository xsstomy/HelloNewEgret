//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var egret;
(function (egret) {
    var native;
    (function (native) {
        var blendModesForGL = {
            "source-over": [1, 771],
            "lighter": [770, 1],
            "destination-out": [0, 771],
            "destination-in": [0, 770]
        };
        /**
         * @version Egret 2.0
         * @platform Web,Native
         * @private
         */
        var NativeRenderContext = (function (_super) {
            __extends(NativeRenderContext, _super);
            function NativeRenderContext() {
                _super.apply(this, arguments);
                this.$matrix = new egret.Matrix();
                this.$globalCompositeOperation = "source-over";
                this.$globalAlpha = 1;
                this.$lineWidth = 0;
                this.$strokeStyle = "#000000";
                this.$fillStyle = "#000000";
                this.$font = "10px sans-serif";
                this.$fontSize = 10;
                this.$saveList = [];
                this.$clipRect = new egret.Rectangle();
                this.$saveCount = 0;
                this.$clipList = [];
                this.$hasStrokeText = false;
            }
            var __egretProto__ = NativeRenderContext.prototype;
            Object.defineProperty(__egretProto__, "globalCompositeOperation", {
                /**
                 * @private
                 * 设置新图像如何绘制到已有的图像上的规制
                 * @version Egret 2.0
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$globalCompositeOperation;
                },
                set: function (value) {
                    this.$globalCompositeOperation = value;
                    var arr = blendModesForGL[value];
                    if (arr) {
                        egret_native.Graphics.setBlendArg(arr[0], arr[1]);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "globalAlpha", {
                /**
                 * @private
                 * 设置接下来绘图填充的整体透明度
                 * @version Egret 2.0
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$globalAlpha;
                },
                set: function (value) {
                    this.$globalAlpha = value;
                    egret_native.Graphics.setGlobalAlpha(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "lineWidth", {
                /**
                 * @private
                 * 设置线条粗细，以像素为单位。设置为0，负数，Infinity 或 NaN 将会被忽略。
                 * @default 1
                 * @version Egret 2.0
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$lineWidth;
                },
                set: function (value) {
                    //console.log("set lineWidth" + value);
                    this.$lineWidth = value;
                    egret_native.rastergl.lineWidth = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "strokeStyle", {
                /**
                 * @private
                 * 设置要在图形边线填充的颜色或样式
                 * @default "#000000"
                 * @version Egret 2.0
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$strokeStyle;
                },
                set: function (value) {
                    if (value.indexOf("rgba") != -1) {
                        value = this.$parseRGBA(value);
                    }
                    else if (value.indexOf("rgb") != -1) {
                        value = this.$parseRGB(value);
                    }
                    //console.log("strokeStyle::" + value);
                    this.$strokeStyle = value;
                    egret_native.Label.setStrokeColor(parseInt(value.replace("#", "0x")));
                    egret_native.rastergl.strokeStyle = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "fillStyle", {
                /**
                 * @private
                 * 设置要在图形内部填充的颜色或样式
                 * @default "#000000"
                 * @version Egret 2.0
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$fillStyle;
                },
                set: function (value) {
                    if (value.indexOf("rgba") != -1) {
                        value = this.$parseRGBA(value);
                    }
                    else if (value.indexOf("rgb") != -1) {
                        value = this.$parseRGB(value);
                    }
                    //console.log("fillStyle::" + value);
                    this.$fillStyle = value;
                    egret_native.Label.setTextColor(parseInt(value.replace("#", "0x")));
                    egret_native.rastergl.fillStyle = value;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.$fillColorStr = function (s) {
                if (s.length < 2) {
                    s = "0" + s;
                }
                return s;
            };
            __egretProto__.$parseRGBA = function (str) {
                var index = str.indexOf("(");
                str = str.slice(index + 1, str.length - 1);
                var arr = str.split(",");
                var a = parseInt((parseFloat(arr[3]) * 255)).toString(16);
                var r = parseInt(arr[0]).toString(16);
                var g = parseInt(arr[1]).toString(16);
                var b = parseInt(arr[2]).toString(16);
                str = "#" + this.$fillColorStr(a) + this.$fillColorStr(r) + this.$fillColorStr(g) + this.$fillColorStr(b);
                return str;
            };
            __egretProto__.$parseRGB = function (str) {
                var index = str.indexOf("(");
                str = str.slice(index + 1, str.length - 1);
                var arr = str.split(",");
                var r = parseInt(arr[0]).toString(16);
                var g = parseInt(arr[1]).toString(16);
                var b = parseInt(arr[2]).toString(16);
                str = "#" + this.$fillColorStr(r) + this.$fillColorStr(g) + this.$fillColorStr(b);
                return str;
            };
            Object.defineProperty(__egretProto__, "font", {
                /**
                 * @private
                 * 当前的字体样式
                 * @version Egret 2.0
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$font;
                },
                set: function (value) {
                    this.$font = value;
                    var arr = value.split(" ");
                    var length = arr.length;
                    for (var i = 0; i < length; i++) {
                        var txt = arr[i];
                        if (txt.indexOf("px") != -1) {
                            this.$fontSize = parseInt(txt.replace("px", ""));
                            //console.log("set font" + this.$lineWidth);
                            return;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @private
             * 绘制一段圆弧路径。圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
             * @param x 圆弧中心（圆心）的 x 轴坐标。
             * @param y 圆弧中心（圆心）的 y 轴坐标。
             * @param radius 圆弧的半径。
             * @param startAngle 圆弧的起始点， x轴方向开始计算，单位以弧度表示。
             * @param endAngle 圆弧的重点， 单位以弧度表示。
             * @param anticlockwise 如果为 true，逆时针绘制圆弧，反之，顺时针绘制。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
                egret_native.rastergl.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            };
            /**
             * @private
             * 绘制一段二次贝塞尔曲线路径。它需要2个点。 第一个点是控制点，第二个点是终点。 起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 moveTo() 方法进行改变。
             * @param cpx 控制点的 x 轴坐标。
             * @param cpy 控制点的 y 轴坐标。
             * @param x 终点的 x 轴坐标。
             * @param y 终点的 y 轴坐标。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.quadraticCurveTo = function (cpx, cpy, x, y) {
                egret_native.rastergl.quadraticCurveTo(cpx, cpy, x, y);
            };
            /**
             * @private
             * 使用直线连接子路径的终点到x，y坐标。
             * @param x 直线终点的 x 轴坐标。
             * @param y 直线终点的 y 轴坐标。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.lineTo = function (x, y) {
                egret_native.rastergl.lineTo(x, y);
            };
            /**
             * @private
             * 根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。
             * @param fillRule 一种算法，决定点是在路径内还是在路径外。允许的值：
             * "nonzero": 非零环绕规则， 默认的规则。
             * "evenodd": 奇偶环绕规则。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.fill = function (fillRule) {
                egret_native.rastergl.fill(fillRule);
            };
            /**
             * @private
             * 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.closePath = function () {
                egret_native.rastergl.closePath();
            };
            /**
             * @private
             * 创建一段矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height。矩形的4个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。
             * @param x 矩形起点的 x 轴坐标。
             * @param y 矩形起点的 y 轴坐标。
             * @param width 矩形的宽度。
             * @param height 矩形的高度。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.rect = function (x, y, w, h) {
                egret_native.rastergl.rect(x, y, w, h);
                this.$clipRect.setTo(x, y, w, h);
            };
            /**
             * @private
             * 将一个新的子路径的起始点移动到(x，y)坐标
             * @param x 点的 x 轴
             * @param y 点的 y 轴
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.moveTo = function (x, y) {
                egret_native.rastergl.moveTo(x, y);
            };
            /**
             * @private
             * 绘制一个填充矩形。矩形的起点在 (x, y) 位置，矩形的尺寸是 width 和 height ，fillStyle 属性决定矩形的样式。
             * @param x 矩形起始点的 x 轴坐标。
             * @param y 矩形起始点的 y 轴坐标。
             * @param width 矩形的宽度。
             * @param height 矩形的高度。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.fillRect = function (x, y, w, h) {
                egret_native.rastergl.fillRect(x, y, w, h);
            };
            /**
             * @private
             * 绘制一段三次贝赛尔曲线路径。该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，
             * 绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。
             * @param cp1x 第一个控制点的 x 轴坐标。
             * @param cp1y 第一个控制点的 y 轴坐标。
             * @param cp2x 第二个控制点的 x 轴坐标。
             * @param cp2y 第二个控制点的 y 轴坐标。
             * @param x 结束点的 x 轴坐标。
             * @param y 结束点的 y 轴坐标。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
                egret_native.rastergl.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            };
            /**
             * @private
             * 根据当前的画线样式，绘制当前或已经存在的路径的方法。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.stroke = function () {
                egret_native.rastergl.stroke();
            };
            /**
             * @private
             * 使用当前的绘画样式，描绘一个起点在 (x, y) 、宽度为 w 、高度为 h 的矩形的方法。
             * @param x 矩形起点的 x 轴坐标。
             * @param y 矩形起点的 y 轴坐标。
             * @param width 矩形的宽度。
             * @param height 矩形的高度。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.strokeRect = function (x, y, w, h) {
                //console.log("strokeRect");
                egret_native.rastergl.strokeRect(x, y, w, h);
            };
            /**
             * @private
             * 清空子路径列表开始一个新路径。 当你想创建一个新的路径时，调用此方法。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.beginPath = function () {
                egret_native.rastergl.beginPath();
            };
            /**
             * @private
             * 根据控制点和半径绘制一段圆弧路径，使用直线连接前一个点。
             * @param x1 第一个控制点的 x 轴坐标。
             * @param y1 第一个控制点的 y 轴坐标。
             * @param x2 第二个控制点的 x 轴坐标。
             * @param y2 第二个控制点的 y 轴坐标。
             * @param radius 圆弧的半径。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.arcTo = function (x1, y1, x2, y2, radius) {
                egret_native.rastergl.arcTo(x1, y1, x2, y2, radius);
            };
            /**
             * @private
             * 使用方法参数描述的矩阵多次叠加当前的变换矩阵。
             * @param a 水平缩放。
             * @param b 水平倾斜。
             * @param c 垂直倾斜。
             * @param d 垂直缩放。
             * @param tx 水平移动。
             * @param ty 垂直移动。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.transform = function (a, b, c, d, tx, ty) {
                this.$matrix.append(a, b, c, d, tx, ty);
                this.$setTransformToNative();
            };
            /**
             * @private
             * 通过在网格中移动 surface 和 surface 原点 x 水平方向、原点 y 垂直方向，添加平移变换
             * @param x 水平移动。
             * @param y 垂直移动。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.translate = function (x, y) {
                this.$matrix.translate(x, y);
                this.$setTransformToNative();
            };
            /**
             * @private
             * 根据 x 水平方向和 y 垂直方向，为 surface 单位添加缩放变换。
             * @param x 水平方向的缩放因子。
             * @param y 垂直方向的缩放因子。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.scale = function (x, y) {
                this.$matrix.scale(x, y);
                this.$setTransformToNative();
            };
            /**
             * @private
             * 在变换矩阵中增加旋转，角度变量表示一个顺时针旋转角度并且用弧度表示。
             * @param angle 顺时针旋转的弧度。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.rotate = function (angle) {
                this.$matrix.rotate(angle);
                this.$setTransformToNative();
            };
            /**
             * @private
             * 恢复到最近的绘制样式状态，此状态是通过 save() 保存到”状态栈“中最新的元素。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.restore = function () {
                //console.log("restore");
                if (this.$saveCount > 0) {
                    if (this.$saveList.length) {
                        var data = this.$saveList.pop();
                        for (var key in data) {
                            this[key] = data[key];
                        }
                        this.$setTransformToNative();
                    }
                    //console.log("pop clip");
                    var index = this.$clipList.indexOf(this.$saveCount);
                    if (index != -1) {
                        var length = this.$clipList.length;
                        this.$clipList.splice(index, length - index);
                        for (; index < length; index++) {
                            egret_native.Graphics.popClip();
                        }
                    }
                    this.$saveCount--;
                }
            };
            /**
             * @private
             * 使用栈保存当前的绘画样式状态，你可以使用 restore() 恢复任何改变。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.save = function () {
                //console.log("save");
                var transformMatrix = new egret.Matrix();
                transformMatrix.copyFrom(this.$matrix);
                this.$saveList.push({
                    lineWidth: this.$lineWidth,
                    globalCompositeOperation: this.$globalCompositeOperation,
                    globalAlpha: this.$globalAlpha,
                    strokeStyle: this.$strokeStyle,
                    fillStyle: this.$fillStyle,
                    font: this.$font,
                    $matrix: transformMatrix
                });
                this.$saveCount++;
            };
            /**
             * @private
             * 从当前路径创建一个剪切路径。在 clip() 调用之后，绘制的所有信息只会出现在剪切路径内部。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.clip = function (fillRule) {
                if (this.$clipRect.width > 0 && this.$clipRect.height > 0) {
                    //console.log("push clip" + this.$clipRect.x);
                    egret_native.Graphics.pushClip(this.$clipRect.x, this.$clipRect.y, this.$clipRect.width, this.$clipRect.height);
                    this.$clipRect.setEmpty();
                    this.$clipList.push(this.$saveCount);
                }
            };
            /**
             * @private
             * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容。
             * @param x 矩形起点的 x 轴坐标。
             * @param y 矩形起点的 y 轴坐标。
             * @param width 矩形的宽度。
             * @param height 矩形的高度。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.clearRect = function (x, y, width, height) {
                //console.log("clearScreen");
                egret_native.Graphics.clearScreen(1, 0, 0);
            };
            /**
             * @private
             * 重新设置当前的变换为单位矩阵，并使用同样的变量调用 transform() 方法。
             * @param a 水平缩放。
             * @param b 水平倾斜。
             * @param c 垂直倾斜。
             * @param d 垂直缩放。
             * @param tx 水平移动。
             * @param ty 垂直移动。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.setTransform = function (a, b, c, d, tx, ty) {
                this.$matrix.setTo(a, b, c, d, tx, ty);
                this.$setTransformToNative();
            };
            __egretProto__.$setTransformToNative = function () {
                var m = this.$matrix;
                //console.log("$setTransformToNative::a=" + m.a + " b=" + m.b + " c=" + m.c + " d=" + m.d + " tx=" + m.tx + " ty=" + m.ty);
                egret_native.Graphics.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            };
            /**
             * @private
             * 创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性的 GraphicsGradient 对象。
             * @param x0 起点的 x 轴坐标。
             * @param y0 起点的 y 轴坐标。
             * @param x1 终点的 x 轴坐标。
             * @param y1 终点的 y 轴坐标。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.createLinearGradient = function (x0, y0, x1, y1) {
                return egret_native.rastergl.createLinearGradient(x0, y0, x1, y1);
            };
            /**
             * @private
             * 根据参数确定的两个圆的坐标，创建一个放射性渐变。该方法返回一个放射性的 GraphicsGradient。
             * @param x0 开始圆形的 x 轴坐标。
             * @param y0 开始圆形的 y 轴坐标。
             * @param r0 开始圆形的半径。
             * @param x1 结束圆形的 x 轴坐标。
             * @param y1 结束圆形的 y 轴坐标。
             * @param r1 结束圆形的半径。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
                return egret_native.rastergl.createRadialGradient(x0, y0, r0, x1, y1, r1);
            };
            /**
             * @private
             * 在(x,y)位置绘制（填充）文本。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.fillText = function (text, x, y, maxWidth) {
                //console.log("drawText" + text);
                var font = egret.TextField.default_fontFamily;
                egret_native.Label.createLabel(font, this.$fontSize, "", this.$hasStrokeText ? this.$lineWidth : 0);
                this.$hasStrokeText = false;
                egret_native.Label.drawText(text, x, y);
            };
            __egretProto__.strokeText = function (text, x, y, maxWidth) {
                this.$hasStrokeText = true;
            };
            /**
             * @private
             * 测量指定文本宽度，返回 TextMetrics 对象。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.measureText = function (text) {
                var font = egret.TextField.default_fontFamily;
                egret_native.Label.createLabel(font, this.$fontSize, "", this.$hasStrokeText ? this.$lineWidth : 0);
                return { width: egret_native.Label.getTextSize(text)[0] };
            };
            /**
             * @private
             * 注意：如果要对绘制的图片进行缩放，出于性能优化考虑，系统不会主动去每次重置imageSmoothingEnabled属性，因此您在调用drawImage()方法前请务必
             * 确保 imageSmoothingEnabled 已被重置为正常的值，否则有可能沿用上个显示对象绘制过程留下的值。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.drawImage = function (image, offsetX, offsetY, width, height, surfaceOffsetX, surfaceOffsetY, surfaceImageWidth, surfaceImageHeight) {
                var bitmapData;
                if (image.$nativeRenderTexture) {
                    bitmapData = image.$nativeRenderTexture;
                }
                else {
                    bitmapData = image;
                }
                if (!bitmapData || !bitmapData["avaliable"]) {
                    return;
                }
                if (arguments.length == 3) {
                    surfaceOffsetX = offsetX;
                    surfaceOffsetY = offsetY;
                    offsetX = 0;
                    offsetY = 0;
                    width = surfaceImageWidth = image.width;
                    height = surfaceImageHeight = image.height;
                }
                else {
                    if (!width) {
                        width = image.width;
                    }
                    if (!height) {
                        height = image.height;
                    }
                    if (!surfaceOffsetX) {
                        surfaceOffsetX = 0;
                    }
                    if (!surfaceOffsetY) {
                        surfaceOffsetY = 0;
                    }
                    if (!surfaceImageWidth) {
                        surfaceImageWidth = width;
                    }
                    if (!surfaceImageHeight) {
                        surfaceImageHeight = height;
                    }
                }
                //console.log("drawImage::" + offsetX + " " + offsetY + " " + width + " " + height + " " + surfaceOffsetX + " " + surfaceOffsetY + " " + surfaceImageWidth + " " + surfaceImageHeight);
                egret_native.Graphics.drawImage(bitmapData, offsetX, offsetY, width, height, surfaceOffsetX, surfaceOffsetY, surfaceImageWidth, surfaceImageHeight);
            };
            /**
             * @private
             * 基于指定的源图象(BitmapData)创建一个模板，通过repetition参数指定源图像在什么方向上进行重复，返回一个GraphicsPattern对象。
             * @param bitmapData 做为重复图像源的 BitmapData 对象。
             * @param repetition 指定如何重复图像。
             * 可能的值有："repeat" (两个方向重复),"repeat-x" (仅水平方向重复),"repeat-y" (仅垂直方向重复),"no-repeat" (不重复).
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.createPattern = function (image, repetition) {
                return null;
            };
            /**
             * @private
             * 返回一个 ImageData 对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
             * @version Egret 2.0
             * @platform Web,Native
             */
            __egretProto__.getImageData = function (sx, sy, sw, sh) {
                return { width: sw, height: sh, data: null };
            };
            __egretProto__.begin = function () {
                this.surface.begin();
            };
            __egretProto__.end = function () {
                this.surface.end();
            };
            return NativeRenderContext;
        })(egret.HashObject);
        native.NativeRenderContext = NativeRenderContext;
        NativeRenderContext.prototype.__class__ = "egret.native.NativeRenderContext";
        egret.registerClass(NativeRenderContext,"egret.native.NativeRenderContext",["egret.sys.RenderContext"]);
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
