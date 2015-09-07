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
     * Bitmap font adopts the Bitmap+SpriteSheet mode to render text.
     * @version Egret 2.0
     * @platform Web,Native
     * @includeExample egret/text/BitmapText.ts
     */
    /**
     * @language zh_CN
     * 位图字体采用了Bitmap+SpriteSheet的方式来渲染文字。
     * @version Egret 2.0
     * @platform Web,Native
     * @includeExample egret/text/BitmapText.ts
     */
    var BitmapText = (function (_super) {
        __extends(BitmapText, _super);
        /**
         * @language en_US
         * Create an egret.BitmapText object
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 egret.BitmapText 对象
         * @version Egret 2.0
         * @platform Web,Native
         */
        function BitmapText() {
            _super.call(this);
            /**
             * @private
             */
            this._textWidth = 0;
            /**
             * @private
             */
            this._textHeight = 0;
            /**
             * @private
             */
            this._textOffsetX = 0;
            /**
             * @private
             */
            this._textOffsetY = 0;
            /**
             * @private
             */
            this._lineHeights = [];
            //this.cacheAsBitmap = true;
            this.$renderRegion = new egret.sys.Region();
            this.$BitmapText = {
                0: NaN,
                1: NaN,
                2: "",
                3: 0,
                4: 0,
                5: null,
                6: false,
                7: false //textLinesChanged,
            };
        }
        var __egretProto__ = BitmapText.prototype;
        Object.defineProperty(__egretProto__, "text", {
            /**
             * @language en_US
             * A string to display in the text field.
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 要显示的文本内容
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$BitmapText[2 /* text */];
            },
            set: function (value) {
                this.$setText(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        __egretProto__.$setText = function (value) {
            var values = this.$BitmapText;
            if (value == values[2 /* text */])
                return;
            values[2 /* text */] = value;
            this.$invalidateContentBounds();
        };
        /**
         * @private
         */
        __egretProto__.$getWidth = function () {
            var w = this.$BitmapText[0 /* textFieldWidth */];
            return isNaN(w) ? this.$getContentBounds().width : w;
        };
        /**
         * @private
         */
        __egretProto__.$setWidth = function (value) {
            //value = +value || 0;
            var values = this.$BitmapText;
            if (value < 0 || value == values[0 /* textFieldWidth */]) {
                return;
            }
            values[0 /* textFieldWidth */] = value;
            this.$invalidateContentBounds();
        };
        /**
         * @private
         */
        __egretProto__.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.$BitmapText[7 /* textLinesChanged */] = true;
        };
        /**
         * @private
         */
        __egretProto__.$getHeight = function () {
            var h = this.$BitmapText[1 /* textFieldHeight */];
            return isNaN(h) ? this.$getContentBounds().height : h;
        };
        /**
         * @private
         */
        __egretProto__.$setHeight = function (value) {
            //value = +value || 0;
            var values = this.$BitmapText;
            if (value < 0 || value == values[1 /* textFieldHeight */]) {
                return;
            }
            values[1 /* textFieldHeight */] = value;
            this.$invalidateContentBounds();
        };
        Object.defineProperty(__egretProto__, "font", {
            /**
             * @language en_US
             * The name of the font to use, or a comma-separated list of font names.
             * @default "sans-serif"
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 要使用的字体的名称或用逗号分隔的字体名称列表。
             * @default "sans-serif"
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$BitmapText[5 /* font */];
            },
            set: function (value) {
                this.$setFont(value);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.$setFont = function (value) {
            var values = this.$BitmapText;
            if (values[5 /* font */] == value) {
                return;
            }
            values[5 /* font */] = value;
            this.$BitmapText[6 /* fontStringChanged */] = true;
            this.$invalidateContentBounds();
        };
        Object.defineProperty(__egretProto__, "lineSpacing", {
            /**
            /**
             * @language en_US
             * An integer representing the amount of vertical space between lines.
             * @default 0
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 一个整数，表示行与行之间的垂直间距量
             * @default 0
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$BitmapText[3 /* lineSpacing */];
            },
            set: function (value) {
                //value = +value || 0;
                var values = this.$BitmapText;
                if (values[3 /* lineSpacing */] == value)
                    return;
                values[3 /* lineSpacing */] = value;
                this.$invalidateContentBounds();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "letterSpacing", {
            /**
             * @language en_US
             * An integer representing the amount of vertical space between lines.
             * @default 0
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 一个整数，表示行与行之间的垂直间距量
             * @default 0
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$BitmapText[4 /* letterSpacing */];
            },
            set: function (value) {
                //value = +value || 0;
                var values = this.$BitmapText;
                if (values[4 /* letterSpacing */] == value)
                    return;
                values[4 /* letterSpacing */] = value;
                this.$invalidateContentBounds();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        __egretProto__.$render = function (context) {
            var self = this;
            var textLines = self._getTextLines();
            var length = textLines.length;
            if (length == 0) {
                return;
            }
            var bitmapFont = self.$BitmapText[5 /* font */];
            var emptyHeight = bitmapFont._getFirstCharHeight();
            var emptyWidth = Math.ceil(emptyHeight * BitmapText.EMPTY_FACTOR);
            var yPos = 0;
            var hasSetHeight = !isNaN(self.$BitmapText[1 /* textFieldHeight */]);
            var textFieldHeight = self.$BitmapText[1 /* textFieldHeight */];
            var lineHeights = self._lineHeights;
            for (var i = 0; i < length; i++) {
                var lineHeight = lineHeights[i];
                if (hasSetHeight && i > 0 && yPos + lineHeight > textFieldHeight) {
                    break;
                }
                var line = textLines[i];
                var len = line.length;
                var xPos = 0;
                for (var j = 0; j < len; j++) {
                    var character = line.charAt(j);
                    var texture = bitmapFont.getTexture(character);
                    if (!texture) {
                        if (character == " ") {
                            xPos += emptyWidth;
                        }
                        else {
                            egret.$warn(1011, character);
                        }
                        continue;
                    }
                    var bitmapWidth = texture._bitmapWidth;
                    var bitmapHeight = texture._bitmapHeight;
                    context.drawImage(texture._bitmapData, texture._bitmapX, texture._bitmapY, bitmapWidth, bitmapHeight, xPos + texture._offsetX, yPos + texture._offsetY, texture.$getScaleBitmapWidth(), texture.$getScaleBitmapHeight());
                    xPos += texture.$getTextureWidth() + self.$BitmapText[4 /* letterSpacing */];
                }
                yPos += lineHeight + self.$BitmapText[3 /* lineSpacing */];
            }
        };
        /**
         * @private
         */
        __egretProto__.$measureContentBounds = function (bounds) {
            var lines = this._getTextLines();
            if (lines.length == 0) {
                bounds.setEmpty();
            }
            else {
                bounds.setTo(this._textOffsetX, this._textOffsetY, this._textWidth - this._textOffsetX, this._textHeight - this._textOffsetY + (lines.length - 1) * this.$BitmapText[3 /* lineSpacing */]);
            }
        };
        /**
         * @private
         *
         * @returns
         */
        __egretProto__._getTextLines = function () {
            var self = this;
            if (!this.$BitmapText[7 /* textLinesChanged */]) {
                return self._textLines;
            }
            var textLines = [];
            self._textLines = textLines;
            this.$BitmapText[7 /* textLinesChanged */] = false;
            var lineHeights = [];
            self._lineHeights = lineHeights;
            if (!self.$BitmapText[2 /* text */] || !self.$BitmapText[5 /* font */]) {
                return textLines;
            }
            var textWidth = 0;
            var textHeight = 0;
            var textStartX = 0;
            var textStartY = 0;
            var hasWidthSet = !isNaN(self.$BitmapText[0 /* textFieldWidth */]);
            var textFieldWidth = self.$BitmapText[0 /* textFieldWidth */];
            var bitmapFont = self.$BitmapText[5 /* font */];
            var emptyHeight = bitmapFont._getFirstCharHeight();
            var emptyWidth = Math.ceil(emptyHeight * BitmapText.EMPTY_FACTOR);
            var text = self.$BitmapText[2 /* text */];
            var textArr = text.split(/(?:\r\n|\r|\n)/);
            var length = textArr.length;
            var isFirstLine = true;
            for (var i = 0; i < length; i++) {
                var line = textArr[i];
                var len = line.length;
                var lineHeight = 0;
                var xPos = 0;
                var isFirstChar = true;
                for (var j = 0; j < len; j++) {
                    if (!isFirstChar) {
                        xPos += self.$BitmapText[4 /* letterSpacing */];
                    }
                    var character = line.charAt(j);
                    var texureWidth;
                    var textureHeight;
                    var offsetX = 0;
                    var offsetY = 0;
                    var texture = bitmapFont.getTexture(character);
                    if (!texture) {
                        if (character == " ") {
                            texureWidth = emptyWidth;
                            textureHeight = emptyHeight;
                        }
                        else {
                            egret.$warn(1011, character);
                            if (isFirstChar) {
                                isFirstChar = false;
                            }
                            continue;
                        }
                    }
                    else {
                        texureWidth = texture.$getTextureWidth();
                        textureHeight = texture.$getTextureHeight();
                        offsetX = texture._offsetX;
                        offsetY = texture._offsetY;
                    }
                    if (isFirstChar) {
                        isFirstChar = false;
                        textStartX = Math.min(offsetX, textStartX);
                    }
                    if (isFirstLine) {
                        textStartY = Math.min(offsetY, textStartY);
                    }
                    if (hasWidthSet && j > 0 && xPos + texureWidth > textFieldWidth) {
                        textLines.push(line.substring(0, j));
                        lineHeights.push(lineHeight);
                        textHeight += lineHeight;
                        textWidth = Math.max(xPos, textWidth);
                        line = line.substring(j);
                        len = line.length;
                        j = 0;
                        xPos = texureWidth;
                        lineHeight = textureHeight;
                        continue;
                    }
                    xPos += texureWidth;
                    lineHeight = Math.max(textureHeight, lineHeight);
                }
                if (isFirstLine) {
                    isFirstLine = false;
                }
                textLines.push(line);
                lineHeights.push(lineHeight);
                textHeight += lineHeight;
                textWidth = Math.max(xPos, textWidth);
            }
            self._textWidth = textWidth;
            self._textHeight = textHeight;
            self._textOffsetX = textStartX;
            self._textOffsetY = textStartY;
            return textLines;
        };
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        BitmapText.EMPTY_FACTOR = 0.33;
        return BitmapText;
    })(egret.DisplayObject);
    egret.BitmapText = BitmapText;
    BitmapText.prototype.__class__ = "egret.BitmapText";
    egret.registerClass(BitmapText,"egret.BitmapText");
})(egret || (egret = {}));
