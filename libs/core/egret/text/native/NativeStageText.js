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
     * @classdesc
     * @implements egret.StageText
     * @private
     * @version Egret 2.0
     * @platform Web,Native
     */
    var NativeStageText = (function (_super) {
        __extends(NativeStageText, _super);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        function NativeStageText() {
            _super.call(this);
            /**
             * @private
             */
            this.textValue = "";
            /**
             * @private
             */
            this.isFinishDown = false;
            this.textValue = "";
        }
        var __egretProto__ = NativeStageText.prototype;
        /**
         * @private
         *
         * @returns
         */
        __egretProto__.$getText = function () {
            if (!this.textValue) {
                this.textValue = "";
            }
            return this.textValue;
        };
        /**
         * @private
         *
         * @param value
         */
        __egretProto__.$setText = function (value) {
            this.textValue = value;
        };
        /**
         * @private
         *
         */
        __egretProto__.$onBlur = function () {
        };
        //全屏键盘
        __egretProto__.showScreenKeyboard = function () {
            var self = this;
            self.dispatchEvent(new egret.Event("focus"));
            egret.Event.dispatchEvent(self, "focus", false, { "showing": true });
            egret_native.EGT_TextInput = function (appendText) {
                if (self.$textfield.multiline) {
                    if (self.isFinishDown) {
                        self.isFinishDown = false;
                        self.textValue = appendText;
                        self.dispatchEvent(new egret.Event("updateText"));
                    }
                }
                else {
                    self.textValue = appendText.replace(/[\n|\r]/, "");
                    //关闭软键盘
                    egret_native.TextInputOp.setKeybordOpen(false);
                    self.dispatchEvent(new egret.Event("updateText"));
                    self.dispatchEvent(new egret.Event("blur"));
                }
            };
            //点击完成
            egret_native.EGT_keyboardFinish = function () {
                if (self.$textfield.multiline) {
                    self.isFinishDown = true;
                }
                self.dispatchEvent(new egret.Event("blur"));
            };
        };
        /**
         * @private
         *
         */
        __egretProto__.$show = function () {
            var self = this;
            egret_native.EGT_getTextEditerContentText = function () {
                return self.$getText();
            };
            egret_native.EGT_keyboardDidShow = function () {
                //if (egret_native.TextInputOp.isFullScreenKeyBoard()) {//横屏
                //}
                self.showScreenKeyboard();
                egret_native.EGT_keyboardDidShow = function () {
                };
            };
            var textfield = this.$textfield;
            var inputMode = textfield.multiline ? 0 : 6;
            var inputFlag = -1; //textfield.displayAsPassword ? 0 : -1;
            var returnType = 1;
            var maxLength = textfield.maxChars <= 0 ? -1 : textfield.maxChars;
            egret_native.TextInputOp.setKeybordOpen(true, JSON.stringify({ "inputMode": inputMode, "inputFlag": inputFlag, "returnType": returnType, "maxLength": maxLength }));
        };
        /**
         * @private
         *
         */
        __egretProto__.$hide = function () {
            this.dispatchEvent(new egret.Event("blur"));
            egret_native.TextInputOp.setKeybordOpen(false);
        };
        __egretProto__.$resetStageText = function () {
        };
        __egretProto__.$addToStage = function () {
        };
        __egretProto__.$removeFromStage = function () {
        };
        __egretProto__.$setTextField = function (value) {
            this.$textfield = value;
        };
        return NativeStageText;
    })(egret.EventDispatcher);
    egret.NativeStageText = NativeStageText;
    NativeStageText.prototype.__class__ = "egret.NativeStageText";
    egret.registerClass(NativeStageText,"egret.NativeStageText",["egret.StageText"]);
    egret.StageText = NativeStageText;
})(egret || (egret = {}));
