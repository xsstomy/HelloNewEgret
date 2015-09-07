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
        /**
         * @private
         * 呈现最终绘图结果的画布
         */
        var NativeSurface = (function (_super) {
            __extends(NativeSurface, _super);
            /**
             * @private
             */
            function NativeSurface() {
                _super.call(this);
                /**
                 * @private
                 * @inheritDoc
                 */
                this.renderContext = new native.NativeRenderContext();
                this.$widthReadySet = false;
                this.$heightReadySet = false;
                this.$isRoot = false;
                this.$isDispose = false;
            }
            var __egretProto__ = NativeSurface.prototype;
            __egretProto__.toDataURL = function (type) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (this.$nativeRenderTexture) {
                    return this.$nativeRenderTexture.toDataURL.apply(this, arguments);
                }
                return null;
            };
            __egretProto__.saveToFile = function (type, filePath) {
                if (this.$nativeRenderTexture) {
                    this.$nativeRenderTexture.saveToFile(type, filePath);
                }
            };
            Object.defineProperty(__egretProto__, "width", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    return this.$width;
                },
                set: function (value) {
                    this.$width = value;
                    if (!this.$isDispose) {
                        this.$widthReadySet = true;
                        this.createRenderTexture();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "height", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    return this.$height;
                },
                set: function (value) {
                    this.$height = value;
                    if (!this.$isDispose) {
                        this.$heightReadySet = true;
                        this.createRenderTexture();
                    }
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.createRenderTexture = function () {
                if (this.$isRoot) {
                    return;
                }
                if (this.$widthReadySet && this.$heightReadySet) {
                    if (this.$nativeRenderTexture) {
                        this.$nativeRenderTexture.dispose();
                    }
                    this.$nativeRenderTexture = new egret_native.RenderTexture(this.$width, this.$height);
                    this.$nativeRenderTexture["avaliable"] = true;
                    this.$widthReadySet = false;
                    this.$heightReadySet = false;
                }
            };
            __egretProto__.begin = function () {
                if (this.$nativeRenderTexture) {
                    //console.log("begin");
                    this.$nativeRenderTexture.begin();
                }
            };
            __egretProto__.end = function () {
                if (this.$nativeRenderTexture) {
                    //console.log("end");
                    this.$nativeRenderTexture.end();
                }
            };
            __egretProto__.$dispose = function () {
                if (this.$nativeRenderTexture) {
                    this.$nativeRenderTexture.dispose();
                    this.$nativeRenderTexture = null;
                }
                this.$isDispose = true;
            };
            __egretProto__.$reload = function () {
                this.$isDispose = false;
            };
            return NativeSurface;
        })(egret.HashObject);
        native.NativeSurface = NativeSurface;
        NativeSurface.prototype.__class__ = "egret.native.NativeSurface";
        egret.registerClass(NativeSurface,"egret.native.NativeSurface",["egret.sys.Surface","egret.BitmapData"]);
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
