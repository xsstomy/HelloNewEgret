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
var RES;
(function (RES) {
    /**
     * @language en_US
     * Resource term. One of the resources arrays in resource.json.
     * @version Egret 2.4
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 资源项。对应 resource.json 中 resources 数组中的一项。
     * @version Egret 2.4
     * @platform Web,Native
     */
    var ResourceItem = (function () {
        /**
         * @language en_US
         * Constructor.
         * @param name Name of resource term.
         * @param url URL of resource term.
         * @param type Type of resource term.
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        /**
         * @language zh_CN
         * 构造函数。
         * @param name 加载项名称。
         * @param url 要加载的文件地址。
         * @param type 加载项文件类型。
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        function ResourceItem(name, url, type) {
            /**
             * @language en_US
             * Name of the resource term group.
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            /**
             * @language zh_CN
             * 资源所属的组名。
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            this.groupName = "";
            /**
             * @language en_US
             * The raw data object to be referenced.
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            /**
             * @language zh_CN
             * 被引用的原始数据对象。
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            this.data = null;
            this._loaded = false;
            this.name = name;
            this.url = url;
            this.type = type;
        }
        var __egretProto__ = ResourceItem.prototype;
        Object.defineProperty(__egretProto__, "loaded", {
            /**
             * @language en_US
             * Load complete flag.
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            /**
             * @language zh_CN
             * 加载完成的标志。
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            get: function () {
                return this.data ? this.data.loaded : this._loaded;
            },
            set: function (value) {
                if (this.data)
                    this.data.loaded = value;
                this._loaded = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @language en_US
         * Turn into a string.
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        /**
         * @language zh_CN
         * 转成字符串。
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        __egretProto__.toString = function () {
            return "[ResourceItem name=\"" + this.name + "\" url=\"" + this.url + "\" type=\"" + this.type + "\"]";
        };
        /**
         * @language en_US
         * XML file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * XML 文件。
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_XML = "xml";
        /**
         * @language en_US
         * Picture file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 图片文件。
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_IMAGE = "image";
        /**
         * @language en_US
         * Binary file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 二进制文件。
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_BIN = "bin";
        /**
         * @language en_US
         * Text file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文本文件。
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_TEXT = "text";
        /**
         * @language en_US
         * JSON file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * JSON 文件。
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_JSON = "json";
        /**
         * @language en_US
         * SpriteSheet file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * SpriteSheet 文件。
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_SHEET = "sheet";
        /**
         * @private
         * @language en_US
         * BitmapTextSpriteSheet file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @private
         * @language zh_CN
         * BitmapTextSpriteSheet 文件。
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_FONT = "font";
        /**
         * @language en_US
         * Sound file.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 声音文件。
         * @version Egret 2.4
         * @platform Web,Native
         */
        ResourceItem.TYPE_SOUND = "sound";
        return ResourceItem;
    })();
    RES.ResourceItem = ResourceItem;
    ResourceItem.prototype.__class__ = "RES.ResourceItem";
    egret.registerClass(ResourceItem,"RES.ResourceItem");
})(RES || (RES = {}));
