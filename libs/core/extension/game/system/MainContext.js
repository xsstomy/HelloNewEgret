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
     * @class egret.MainContext
     * @classdesc
     * MainContext是游戏的核心跨平台接口，组合了多个功能Context，并是游戏启动的主入口
     * @extends egret.EventDispatcher
     * @private
     * @version Egret 2.0
     * @platform Web,Native
     */
    var MainContext = (function (_super) {
        __extends(MainContext, _super);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        function MainContext() {
            _super.call(this);
        }
        var __egretProto__ = MainContext.prototype;
        Object.defineProperty(__egretProto__, "stage", {
            /**
             * 渲染Context
             * @member egret.MainContext#rendererContext
             * @version Egret 2.0
             * @platform Web,Native
             */
            //public rendererContext:RendererContext = null;
            /**
             * 触摸Context
             * @member egret.MainContext#touchContext
             * @version Egret 2.0
             * @platform Web,Native
             */
            //public touchContext:TouchContext = null;
            /**
             * 网络Context
             * @member egret.MainContext#netContext
             * @version Egret 2.0
             * @platform Web,Native
             */
            //public netContext:NetContext = null;
            /**
             * 设备divice
             * @member egret.MainContext#deviceContext
             * @version Egret 2.0
             * @platform Web,Native
             */
            //public deviceContext:DeviceContext = null;
            /**
             * 舞台
             * @member egret.MainContext#stage
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return egret.sys.$TempStage;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 游戏启动，开启主循环，参考Flash的滑动跑道模型
         * @method egret.MainContext#run
         * @version Egret 2.0
         * @platform Web,Native
         */
        __egretProto__.run = function () {
        };
        Object.defineProperty(MainContext, "instance", {
            /**
             * @method egret.Ticker.getInstance
             * @returns {Ticker}
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                if (MainContext._instance == null) {
                    MainContext._instance = new MainContext();
                }
                return MainContext._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        MainContext.deviceType = null;
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        MainContext.DEVICE_PC = "web";
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        MainContext.DEVICE_MOBILE = "native";
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        MainContext.RUNTIME_HTML5 = "runtimeHtml5";
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        MainContext.RUNTIME_NATIVE = "runtimeNative";
        return MainContext;
    })(egret.EventDispatcher);
    egret.MainContext = MainContext;
    MainContext.prototype.__class__ = "egret.MainContext";
    egret.registerClass(MainContext,"egret.MainContext");
})(egret || (egret = {}));
var testDeviceType1 = function () {
    if (!this["navigator"]) {
        return true;
    }
    var ua = navigator.userAgent.toLowerCase();
    return (ua.indexOf('mobile') != -1 || ua.indexOf('android') != -1);
};
var testRuntimeType1 = function () {
    if (this["navigator"]) {
        return true;
    }
    return false;
};
egret.MainContext.deviceType = testDeviceType1() ? egret.MainContext.DEVICE_MOBILE : egret.MainContext.DEVICE_PC;
egret.MainContext.runtimeType = testRuntimeType1() ? egret.MainContext.RUNTIME_HTML5 : egret.MainContext.RUNTIME_NATIVE;
delete testDeviceType1;
delete testRuntimeType1;
