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
     * @version Egret 2.0
     * @platform Web,Native
     * @private
     */
    var FrameLabel = (function (_super) {
        __extends(FrameLabel, _super);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        function FrameLabel(name, frame /*int*/, end /*int*/) {
            _super.call(this);
            this._name = name;
            this._frame = frame | 0;
            if (end)
                this._end = end | 0;
        }
        var __egretProto__ = FrameLabel.prototype;
        Object.defineProperty(__egretProto__, "name", {
            /**
             * @language en_US
             * Frame number
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 标签名
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "frame", {
            /**
             * @language en_US
             * Frame serial number of the label
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 标签所在帧序号
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this._frame;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "end", {
            /**
             * @language en_US
             * Frame serial number, the end of the label
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 标签对应的结束帧序号
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this._end;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @language en_US
         * Duplicate the current frame label object
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 复制当前帧标签对象
         * @version Egret 2.0
         * @platform Web,Native
         */
        __egretProto__.clone = function () {
            return new FrameLabel(this._name, this._frame, this._end);
        };
        return FrameLabel;
    })(egret.EventDispatcher);
    egret.FrameLabel = FrameLabel;
    FrameLabel.prototype.__class__ = "egret.FrameLabel";
    egret.registerClass(FrameLabel,"egret.FrameLabel");
})(egret || (egret = {}));
