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
    /**
     * @language en_US
     * Easing function set. Different easing functions are used to make an animation proceed according to the corresponding equation
     * @see http://bbs.egret-labs.org/thread-392-1-1.html Tween and Ease
     * @version Egret 2.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 缓动函数集合，使用不同的缓动函数使得动画按照对应的方程进行
     * @see http://bbs.egret-labs.org/thread-392-1-1.html Tween和Ease
     * @version Egret 2.0
     * @platform Web,Native
     */
    var Ease = (function () {
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        function Ease() {
            egret.$error(1014);
        }
        var __egretProto__ = Ease.prototype;
        /**
         *
         * @param amount
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.get = function (amount) {
            if (amount < -1) {
                amount = -1;
            }
            if (amount > 1) {
                amount = 1;
            }
            return function (t) {
                if (amount == 0) {
                    return t;
                }
                if (amount < 0) {
                    return t * (t * -amount + 1 + amount);
                }
                return t * ((2 - t) * amount + (1 - amount));
            };
        };
        /**
         *
         * @param pow
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.getPowIn = function (pow) {
            return function (t) {
                return Math.pow(t, pow);
            };
        };
        /**
         *
         * @param pow
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.getPowOut = function (pow) {
            return function (t) {
                return 1 - Math.pow(1 - t, pow);
            };
        };
        /**
         *
         * @param pow
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.getPowInOut = function (pow) {
            return function (t) {
                if ((t *= 2) < 1)
                    return 0.5 * Math.pow(t, pow);
                return 1 - 0.5 * Math.abs(Math.pow(2 - t, pow));
            };
        };
        /**
         *
         * @param t
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.sineIn = function (t) {
            return 1 - Math.cos(t * Math.PI / 2);
        };
        /**
         *
         * @param t
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.sineOut = function (t) {
            return Math.sin(t * Math.PI / 2);
        };
        /**
         *
         * @param t
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.sineInOut = function (t) {
            return -0.5 * (Math.cos(Math.PI * t) - 1);
        };
        /**
         *
         * @param amount
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.getBackIn = function (amount) {
            return function (t) {
                return t * t * ((amount + 1) * t - amount);
            };
        };
        /**
         *
         * @param amount
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.getBackOut = function (amount) {
            return function (t) {
                return (--t * t * ((amount + 1) * t + amount) + 1);
            };
        };
        /**
         *
         * @param amount
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.getBackInOut = function (amount) {
            amount *= 1.525;
            return function (t) {
                if ((t *= 2) < 1)
                    return 0.5 * (t * t * ((amount + 1) * t - amount));
                return 0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2);
            };
        };
        /**
         *
         * @param t
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.circIn = function (t) {
            return -(Math.sqrt(1 - t * t) - 1);
        };
        /**
         *
         * @param t
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.circOut = function (t) {
            return Math.sqrt(1 - (--t) * t);
        };
        /**
         *
         * @param t
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.circInOut = function (t) {
            if ((t *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - t * t) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        };
        /**
         *
         * @param t
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.bounceIn = function (t) {
            return 1 - Ease.bounceOut(1 - t);
        };
        /**
         *
         * @param t
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.bounceOut = function (t) {
            if (t < 1 / 2.75) {
                return (7.5625 * t * t);
            }
            else if (t < 2 / 2.75) {
                return (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
            }
            else if (t < 2.5 / 2.75) {
                return (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
            }
            else {
                return (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
            }
        };
        /**
         *
         * @param t
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.bounceInOut = function (t) {
            if (t < 0.5)
                return Ease.bounceIn(t * 2) * .5;
            return Ease.bounceOut(t * 2 - 1) * 0.5 + 0.5;
        };
        /**
         *
         * @param amplitude
         * @param period
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.getElasticIn = function (amplitude, period) {
            var pi2 = Math.PI * 2;
            return function (t) {
                if (t == 0 || t == 1)
                    return t;
                var s = period / pi2 * Math.asin(1 / amplitude);
                return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
            };
        };
        /**
         *
         * @param amplitude
         * @param period
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.getElasticOut = function (amplitude, period) {
            var pi2 = Math.PI * 2;
            return function (t) {
                if (t == 0 || t == 1)
                    return t;
                var s = period / pi2 * Math.asin(1 / amplitude);
                return (amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1);
            };
        };
        /**
         *
         * @param amplitude
         * @param period
         * @returns
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.getElasticInOut = function (amplitude, period) {
            var pi2 = Math.PI * 2;
            return function (t) {
                var s = period / pi2 * Math.asin(1 / amplitude);
                if ((t *= 2) < 1)
                    return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
                return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1;
            };
        };
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.quadIn = Ease.getPowIn(2);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.quadOut = Ease.getPowOut(2);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.quadInOut = Ease.getPowInOut(2);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.cubicIn = Ease.getPowIn(3);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.cubicOut = Ease.getPowOut(3);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.cubicInOut = Ease.getPowInOut(3);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.quartIn = Ease.getPowIn(4);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.quartOut = Ease.getPowOut(4);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.quartInOut = Ease.getPowInOut(4);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.quintIn = Ease.getPowIn(5);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.quintOut = Ease.getPowOut(5);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.quintInOut = Ease.getPowInOut(5);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.backIn = Ease.getBackIn(1.7);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.backOut = Ease.getBackOut(1.7);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.backInOut = Ease.getBackInOut(1.7);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.elasticIn = Ease.getElasticIn(1, 0.3);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.elasticOut = Ease.getElasticOut(1, 0.3);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        Ease.elasticInOut = Ease.getElasticInOut(1, 0.3 * 1.5);
        return Ease;
    })();
    egret.Ease = Ease;
    Ease.prototype.__class__ = "egret.Ease";
    egret.registerClass(Ease,"egret.Ease");
})(egret || (egret = {}));
