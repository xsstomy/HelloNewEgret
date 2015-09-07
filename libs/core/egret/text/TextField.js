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
     * TextField is the text rendering class of egret. It conducts rendering by using the browser / device API. Due to different ways of font rendering in different browsers / devices, there may be differences in the rendering
     * If developers expect  no differences among all platforms, please use BitmapText
     * @see http://docs.egret-labs.org/post/manual/text/createtext.html Create Text
     *
     * @event egret.Event.CHANGE Dispatched when entering text user input。
     * @event egret.FocusEvent.FOCUS_IN Dispatched after the focus to enter text.
     * @event egret.FocusEvent.FOCUS_OUT Enter the text loses focus after dispatch.
     * @version Egret 2.0
     * @platform Web,Native
     * @includeExample egret/text/TextField.ts
     */
    /**
     * @language zh_CN
     * TextField是egret的文本渲染类，采用浏览器/设备的API进行渲染，在不同的浏览器/设备中由于字体渲染方式不一，可能会有渲染差异
     * 如果开发者希望所有平台完全无差异，请使用BitmapText
     * @see http://docs.egret-labs.org/post/manual/text/createtext.html 创建文本
     *
     * @event egret.Event.CHANGE 输入文本有用户输入时调度。
     * @event egret.FocusEvent.FOCUS_IN 聚焦输入文本后调度。
     * @event egret.FocusEvent.FOCUS_OUT 输入文本失去焦点后调度。
     * @version Egret 2.0
     * @platform Web,Native
     * @includeExample egret/text/TextField.ts
     */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        function TextField() {
            _super.call(this);
            /**
             * @private
             */
            this._inputUtils = null;
            /**
             * @private
             */
            this._bgGraphics = null;
            /**
             * @private
             */
            this._isFlow = false;
            /**
             * @private
             */
            this._textArr = [];
            /**
             * @private
             */
            this._linesArr = [];
            /**
             * @private
             */
            this._isTyping = false;
            this.$renderRegion = new egret.sys.Region();
            this.$TextField = {
                0: 30,
                1: 0,
                2: 0xffffff,
                3: NaN,
                4: NaN,
                5: 0,
                6: 0,
                7: 0,
                8: "sans-serif",
                9: "left",
                10: "top",
                11: "#ffffff",
                12: "",
                13: "",
                14: [],
                15: false,
                16: false,
                17: true,
                18: false,
                19: false,
                20: false,
                21: 0,
                22: 0,
                23: 0,
                24: egret.TextFieldType.DYNAMIC,
                25: 0x000000,
                26: "#000000",
                27: 0,
                28: -1,
                29: 0,
                30: false,
                31: false,
                32: 0x000000,
                33: false,
                34: 0xffffff,
                35: null,
                36: null //restrictNot
            };
        }
        var __egretProto__ = TextField.prototype;
        /**
         * @private
         *
         * @returns
         */
        __egretProto__.isInput = function () {
            return this.$TextField[24 /* type */] == egret.TextFieldType.INPUT;
        };
        Object.defineProperty(__egretProto__, "fontFamily", {
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
                return this.$TextField[8 /* fontFamily */];
            },
            set: function (value) {
                var values = this.$TextField;
                if (values[8 /* fontFamily */] == value) {
                    return;
                }
                values[8 /* fontFamily */] = value;
                this.invalidateFontString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "size", {
            /**
             * @language en_US
             * The size in pixels of text
             * @default 30
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 文本的字号大小。
             * @default 30
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[0 /* fontSize */];
            },
            set: function (value) {
                value = egret.getNumber(value);
                var values = this.$TextField;
                if (values[0 /* fontSize */] == value) {
                    return;
                }
                values[0 /* fontSize */] = value;
                this.invalidateFontString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bold", {
            ///**
            // * @private
            // * @version Egret 2.0
            // * @platform Web,Native
            // */
            //public get fontSize():number {
            //    return this.$TextField[sys.TextKeys.fontSize];
            //}
            //
            ///**
            // * @private
            // */
            //public set fontSize(value:number) {
            //    value = egret.getNumber(value);
            //
            //    var values = this.$TextField;
            //    if (values[sys.TextKeys.fontSize] == value) {
            //        return;
            //    }
            //    values[sys.TextKeys.fontSize] = value;
            //    this.invalidateFontString();
            //}
            /**
             * @language en_US
             * Specifies whether the text is boldface.
             * @default false
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 是否显示为粗体。
             * @default false
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[15 /* bold */];
            },
            set: function (value) {
                value = !!value;
                var values = this.$TextField;
                if (value == values[15 /* bold */]) {
                    return;
                }
                values[15 /* bold */] = value;
                this.invalidateFontString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "italic", {
            /**
             * @language en_US
             * Determines whether the text is italic font.
             * @default false
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 是否显示为斜体。
             * @default false
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[16 /* italic */];
            },
            set: function (value) {
                value = !!value;
                var values = this.$TextField;
                if (value == values[16 /* italic */]) {
                    return;
                }
                values[16 /* italic */] = value;
                this.invalidateFontString();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         */
        __egretProto__.invalidateFontString = function () {
            this.$TextField[17 /* fontStringChanged */] = true;
            this.$invalidateTextField();
        };
        /**
         * @private
         * 获取字体信息的字符串形式。
         */
        __egretProto__.getFontString = function () {
            var values = this.$TextField;
            if (values[17 /* fontStringChanged */]) {
                values[17 /* fontStringChanged */] = false;
                values[12 /* fontString */] = egret.sys.toFontString(this);
            }
            return values[12 /* fontString */];
        };
        Object.defineProperty(__egretProto__, "textAlign", {
            /**
             * @language en_US
             * Horizontal alignment of text.
             * @default：egret.HorizontalAlign.LEFT
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 文本的水平对齐方式。
             * @default：egret.HorizontalAlign.LEFT
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[9 /* textAlign */];
            },
            set: function (value) {
                var values = this.$TextField;
                if (values[9 /* textAlign */] == value) {
                    return;
                }
                values[9 /* textAlign */] = value;
                this.$invalidateTextField();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "verticalAlign", {
            /**
             * @language en_US
             * Vertical alignment of text.
             * @default：egret.VerticalAlign.TOP
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 文字的垂直对齐方式。
             * @default：egret.VerticalAlign.TOP
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[10 /* verticalAlign */];
            },
            set: function (value) {
                var values = this.$TextField;
                if (values[10 /* verticalAlign */] == value) {
                    return;
                }
                values[10 /* verticalAlign */] = value;
                this.$invalidateTextField();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "lineSpacing", {
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
                return this.$TextField[1 /* lineSpacing */];
            },
            set: function (value) {
                value = egret.getNumber(value);
                var values = this.$TextField;
                if (values[1 /* lineSpacing */] == value)
                    return;
                values[1 /* lineSpacing */] = value;
                this.$invalidateTextField();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "textColor", {
            /**
             * @language en_US
             * Color of the text.
             * @default 0x000000
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 文本颜色
             * @default 0x000000
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[2 /* textColor */];
            },
            set: function (value) {
                value = +value | 0;
                var values = this.$TextField;
                if (values[2 /* textColor */] == value) {
                    return;
                }
                values[2 /* textColor */] = value;
                values[11 /* textColorString */] = egret.toColorString(value);
                this.$invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "wordWrap", {
            /**
             * @language en_US
             * A Boolean value that indicates whether the text field has word wrap. If the value of wordWrap is true, the text
             * field has word wrap; if the value is false, the text field does not have word wrap.
             * @default true
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 一个布尔值，表示文本字段是否自动换行。如果 wordWrap 的值为 true，则该文本字段自动换行；
             * 如果值为 false，则该文本字段不自动换行,如果同时显式设置过宽度，超出宽度的部分将被截断。
             * @default true
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[19 /* wordWrap */];
            },
            set: function (value) {
                value = !!value;
                var values = this.$TextField;
                if (value == values[19 /* wordWrap */]) {
                    return;
                }
                if (values[20 /* displayAsPassword */]) {
                    return;
                }
                values[19 /* wordWrap */] = value;
                this.$invalidateTextField();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "type", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[24 /* type */];
            },
            /**
             * @language en_US
             * Type of the text field.
             * Any one of the following TextFieldType constants: TextFieldType.DYNAMIC (specifies the dynamic text field that users can not edit), or TextFieldType.INPUT (specifies the dynamic text field that users can edit).
             * @default egret.TextFieldType.DYNAMIC
             */
            /**
             * @language zh_CN
             * 文本字段的类型。
             * 以下 TextFieldType 常量中的任一个：TextFieldType.DYNAMIC（指定用户无法编辑的动态文本字段），或 TextFieldType.INPUT（指定用户可以编辑的输入文本字段）。
             * @default egret.TextFieldType.DYNAMIC
             */
            set: function (value) {
                this._setType(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        __egretProto__._setType = function (value) {
            if (this.$TextField[24 /* type */] != value) {
                this.$TextField[24 /* type */] = value;
                if (value == egret.TextFieldType.INPUT) {
                    if (isNaN(this.$TextField[3 /* textFieldWidth */])) {
                        this.$setWidth(100);
                    }
                    if (isNaN(this.$TextField[4 /* textFieldHeight */])) {
                        this.$setHeight(30);
                    }
                    this.$setTouchEnabled(true);
                    //创建stageText
                    if (this._inputUtils == null) {
                        this._inputUtils = new egret.InputController();
                    }
                    this._inputUtils.init(this);
                    this.$invalidateTextField();
                    if (this.$stage) {
                        this._inputUtils._addStageText();
                    }
                }
                else {
                    if (this._inputUtils) {
                        this._inputUtils._removeStageText();
                        this._inputUtils = null;
                    }
                    this.$setTouchEnabled(false);
                }
            }
        };
        Object.defineProperty(__egretProto__, "text", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$getText();
            },
            /**
             * @language en_US
             * Serve as a string of the current text field in the text
             */
            /**
             * @language zh_CN
             * 作为文本字段中当前文本的字符串
             */
            set: function (value) {
                this.$setText(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @returns
         */
        __egretProto__.$getText = function () {
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                return this._inputUtils._getText();
            }
            return this.$TextField[13 /* text */];
        };
        /**
         * @private
         *
         * @param value
         */
        __egretProto__._setBaseText = function (value) {
            if (value == null) {
                value = "";
            }
            value = value.toString();
            this._isFlow = false;
            if (this.$TextField[13 /* text */] != value) {
                this.$invalidateTextField();
                this.$TextField[13 /* text */] = value;
                var text = "";
                if (this.$TextField[20 /* displayAsPassword */]) {
                    text = this.changeToPassText(value);
                }
                else {
                    text = value;
                }
                this.setMiddleStyle([{ text: text }]);
            }
        };
        /**
         * @private
         *
         * @param value
         */
        __egretProto__.$setText = function (value) {
            if (value == null) {
                value = "";
            }
            this._setBaseText(value);
            if (this._inputUtils) {
                this._inputUtils._setText(this.$TextField[13 /* text */]);
            }
        };
        Object.defineProperty(__egretProto__, "displayAsPassword", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[20 /* displayAsPassword */];
            },
            /**
             * @language en_US
             * Specify whether the text field is a password text field.
             * Specify whether the text field is a password text field. If the value of this property is true, the text field is treated as a password text field and hides the input characters using asterisks instead of the actual characters. If false, the text field is not treated as a password text field.
             * @default false
             */
            /**
             * @language zh_CN
             * 指定文本字段是否是密码文本字段。
             * 如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
             * @default false
             */
            set: function (value) {
                this._setDisplayAsPassword(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        __egretProto__._setDisplayAsPassword = function (value) {
            var self = this;
            if (this.$TextField[20 /* displayAsPassword */] != value) {
                this.$TextField[20 /* displayAsPassword */] = value;
                this.$invalidateTextField();
                var text = "";
                if (value) {
                    text = this.changeToPassText(this.$TextField[13 /* text */]);
                }
                else {
                    text = this.$TextField[13 /* text */];
                }
                this.setMiddleStyle([{ text: text }]);
            }
        };
        Object.defineProperty(__egretProto__, "strokeColor", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[25 /* strokeColor */];
            },
            /**
             * @language en_US
             * Represent the stroke color of the text.
             * Contain three 8-bit numbers with RGB color components; for example, 0xFF0000 is red, 0x00FF00 is green.
             * @default 0x000000
             */
            /**
             * @language zh_CN
             * 表示文本的描边颜色。
             * 包含三个 8 位 RGB 颜色成分的数字；例如，0xFF0000 为红色，0x00FF00 为绿色。
             * @default 0x000000
             */
            set: function (value) {
                this._setStrokeColor(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        __egretProto__._setStrokeColor = function (value) {
            if (this.$TextField[25 /* strokeColor */] != value) {
                this.$invalidateTextField();
                this.$TextField[25 /* strokeColor */] = value;
                this.$TextField[26 /* strokeColorString */] = egret.toColorString(value);
            }
        };
        Object.defineProperty(__egretProto__, "stroke", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[27 /* stroke */];
            },
            /**
             * @language en_US
             * Indicate the stroke width.
             * 0 means no stroke.
             * @default 0
             */
            /**
             * @language zh_CN
             * 表示描边宽度。
             * 0为没有描边。
             * @default 0
             */
            set: function (value) {
                this._setStroke(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        __egretProto__._setStroke = function (value) {
            if (this.$TextField[27 /* stroke */] != value) {
                this.$invalidateTextField();
                this.$TextField[27 /* stroke */] = value;
            }
        };
        Object.defineProperty(__egretProto__, "maxChars", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[21 /* maxChars */];
            },
            /**
             * @language en_US
             * The maximum number of characters that the text field can contain, as entered by a user. \n A script can insert more text than maxChars allows; the maxChars property indicates only how much text a user can enter. If the value of this property is 0, a user can enter an unlimited amount of text.
             * The default value is 0.
             * @default 0
             */
            /**
             * @language zh_CN
             * 文本字段中最多可包含的字符数（即用户输入的字符数）。
             * 脚本可以插入比 maxChars 允许的字符数更多的文本；maxChars 属性仅表示用户可以输入多少文本。如果此属性的值为 0，则用户可以输入无限数量的文本。
             * @default 0
             */
            set: function (value) {
                this._setMaxChars(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        __egretProto__._setMaxChars = function (value) {
            if (this.$TextField[21 /* maxChars */] != value) {
                this.$TextField[21 /* maxChars */] = value;
            }
        };
        Object.defineProperty(__egretProto__, "scrollV", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return Math.min(Math.max(this.$TextField[28 /* scrollV */], 1), this.maxScrollV);
            },
            /**
             * @language en_US
             * Vertical position of text in a text field. scrollV property helps users locate specific passages in a long article, and create scrolling text fields.
             * Vertically scrolling units are lines, and horizontal scrolling unit is pixels.
             * If the first displayed line is the first line in the text field, scrollV is set to 1 (instead of 0).
             */
            /**
             * @language zh_CN
             * 文本在文本字段中的垂直位置。scrollV 属性可帮助用户定位到长篇文章的特定段落，还可用于创建滚动文本字段。
             * 垂直滚动的单位是行，而水平滚动的单位是像素。
             * 如果显示的第一行是文本字段中的第一行，则 scrollV 设置为 1（而非 0）。
             */
            set: function (value) {
                this.$TextField[28 /* scrollV */] = Math.max(value, 1);
                this.$invalidateTextField();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "maxScrollV", {
            /**
             * @language en_US
             * The maximum value of scrollV
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * scrollV 的最大值
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                this._getLinesArr();
                return Math.max(this.$TextField[29 /* numLines */] - egret.TextFieldUtils._getScrollNum(this) + 1, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "selectionBeginIndex", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "selectionEndIndex", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "caretIndex", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param beginIndex
         * @param endIndex
         */
        __egretProto__.$setSelection = function (beginIndex, endIndex) {
        };
        /**
         * @private
         *
         * @returns
         */
        __egretProto__.$getLineHeight = function () {
            return this.$TextField[1 /* lineSpacing */] + this.$TextField[0 /* fontSize */];
        };
        Object.defineProperty(__egretProto__, "numLines", {
            /**
             * @language en_US
             * Number of lines of text.
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 文本行数。
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[29 /* numLines */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "multiline", {
            get: function () {
                return this.$TextField[30 /* multiline */];
            },
            /**
             * @language en_US
             * Indicate whether field is a multiline text field. Note that this property is valid only when the type is TextFieldType.INPUT.
             * If the value is true, the text field is multiline; if the value is false, the text field is a single-line text field. In a field of type TextFieldType.INPUT, the multiline value determines whether the Enter key creates a new line (a value of false, and the Enter key is ignored).
             * @default false
             */
            /**
             * @language zh_CN
             * 表示字段是否为多行文本字段。注意，此属性仅在type为TextFieldType.INPUT时才有效。
             * 如果值为 true，则文本字段为多行文本字段；如果值为 false，则文本字段为单行文本字段。在类型为 TextFieldType.INPUT 的字段中，multiline 值将确定 Enter 键是否创建新行（如果值为 false，则将忽略 Enter 键）。
             * @default false
             */
            set: function (value) {
                this._setMultiline(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        __egretProto__._setMultiline = function (value) {
            this.$TextField[30 /* multiline */] = value;
            this.$invalidateTextField();
        };
        Object.defineProperty(__egretProto__, "restrict", {
            get: function () {
                var values = this.$TextField;
                var str = null;
                if (values[35 /* restrictAnd */] != null) {
                    str = values[35 /* restrictAnd */];
                }
                if (values[36 /* restrictNot */] != null) {
                    if (str == null) {
                        str = "";
                    }
                    str += "^" + values[36 /* restrictNot */];
                }
                return str;
            },
            /**
             * @language en_US
             * Indicates a user can enter into the text field character set. If you restrict property is null, you can enter any character. If you restrict property is an empty string, you can not enter any character. If you restrict property is a string of characters, you can enter only characters in the string in the text field. The string is scanned from left to right. You can use a hyphen (-) to specify a range. Only restricts user interaction; a script may put any text into the text field. <br/>
             * If the string of characters caret (^) at the beginning, all characters are initially accepted, then the string are excluded from receiving ^ character. If the string does not begin with a caret (^) to, any characters are initially accepted and then a string of characters included in the set of accepted characters. <br/>
             * The following example allows only uppercase characters, spaces, and numbers in the text field: <br/>
             * My_txt.restrict = "A-Z 0-9"; <br/>
             * The following example includes all characters except lowercase letters: <br/>
             * My_txt.restrict = "^ a-z"; <br/>
             * If you need to enter characters \ ^, use two backslash "\\ -" "\\ ^": <br/>
             * Can be used anywhere in the string ^ to rule out including characters and switch between characters, but can only be used to exclude a ^. The following code includes only uppercase letters except uppercase Q: <br/>
             * My_txt.restrict = "A-Z ^ Q"; <br/>
             * @version Egret 2.4
             * @platform Web,Native
             * @default null
             */
            /**
             * @language zh_CN
             * 表示用户可输入到文本字段中的字符集。如果 restrict 属性的值为 null，则可以输入任何字符。如果 restrict 属性的值为空字符串，则不能输入任何字符。如果 restrict 属性的值为一串字符，则只能在文本字段中输入该字符串中的字符。从左向右扫描该字符串。可以使用连字符 (-) 指定一个范围。只限制用户交互；脚本可将任何文本放入文本字段中。<br/>
             * 如果字符串以尖号 (^) 开头，则先接受所有字符，然后从接受字符集中排除字符串中 ^ 之后的字符。如果字符串不以尖号 (^) 开头，则最初不接受任何字符，然后将字符串中的字符包括在接受字符集中。<br/>
             * 下例仅允许在文本字段中输入大写字符、空格和数字：<br/>
             * my_txt.restrict = "A-Z 0-9";<br/>
             * 下例包含除小写字母之外的所有字符：<br/>
             * my_txt.restrict = "^a-z";<br/>
             * 如果需要输入字符 \ ^，请使用2个反斜杠 "\\-" "\\^" ：<br/>
             * 可在字符串中的任何位置使用 ^，以在包含字符与排除字符之间进行切换，但是最多只能有一个 ^ 用来排除。下面的代码只包含除大写字母 Q 之外的大写字母：<br/>
             * my_txt.restrict = "A-Z^Q";<br/>
             * @version Egret 2.4
             * @platform Web,Native
             * @default null
             */
            set: function (value) {
                var values = this.$TextField;
                if (value == null) {
                    values[35 /* restrictAnd */] = null;
                    values[36 /* restrictNot */] = null;
                }
                else {
                    var index = -1;
                    while (index < value.length) {
                        index = value.indexOf("^", index);
                        if (index == 0) {
                            break;
                        }
                        else if (index > 0) {
                            if (value.charAt(index - 1) != "\\") {
                                break;
                            }
                            index++;
                        }
                        else {
                            break;
                        }
                    }
                    if (index == 0) {
                        values[35 /* restrictAnd */] = null;
                        values[36 /* restrictNot */] = value.substring(index + 1);
                    }
                    else if (index > 0) {
                        values[35 /* restrictAnd */] = value.substring(0, index);
                        values[36 /* restrictNot */] = value.substring(index + 1);
                    }
                    else {
                        values[35 /* restrictAnd */] = value;
                        values[36 /* restrictNot */] = null;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        __egretProto__.$setWidth = function (value) {
            var values = this.$TextField;
            values[3 /* textFieldWidth */] = isNaN(value) ? NaN : value;
            value = +value;
            if (value < 0) {
                return;
            }
            this.$invalidateTextField();
        };
        /**
         * @private
         *
         * @param value
         */
        __egretProto__.$setHeight = function (value) {
            var values = this.$TextField;
            values[4 /* textFieldHeight */] = isNaN(value) ? NaN : value;
            value = +value;
            if (value < 0) {
                return;
            }
            this.$invalidateTextField();
        };
        /**
         * @private
         * 获取显示宽度
         */
        __egretProto__.$getWidth = function () {
            var values = this.$TextField;
            return isNaN(values[3 /* textFieldWidth */]) ? this.$getContentBounds().width : values[3 /* textFieldWidth */];
        };
        /**
         * @private
         * 获取显示宽度
         */
        __egretProto__.$getHeight = function () {
            var values = this.$TextField;
            return isNaN(values[4 /* textFieldHeight */]) ? this.$getContentBounds().height : values[4 /* textFieldHeight */];
        };
        Object.defineProperty(__egretProto__, "border", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[31 /* border */];
            },
            /**
             * @language en_US
             * Specifies whether the text field has a border.
             * If true, the text field has a border. If false, the text field has no border.
             * Use borderColor property to set the border color.
             * @default false
             */
            /**
             * @language zh_CN
             * 指定文本字段是否具有边框。
             * 如果为 true，则文本字段具有边框。如果为 false，则文本字段没有边框。
             * 使用 borderColor 属性来设置边框颜色。
             * @default false
             */
            set: function (value) {
                this.$TextField[31 /* border */] = value;
                this.fillBackground();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "borderColor", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[32 /* borderColor */];
            },
            /**
             * @language en_US
             * The color of the text field border.
             * Even currently is no border can be retrieved or set this property, but only if the text field has the border property is set to true, the color is visible.
             * @default 0x000000
             */
            /**
             * @language zh_CN
             * 文本字段边框的颜色。
             * 即使当前没有边框，也可检索或设置此属性，但只有当文本字段已将 border 属性设置为 true 时，才可以看到颜色。
             * @default 0x000000
             */
            set: function (value) {
                this.$TextField[32 /* borderColor */] = value;
                this.fillBackground();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "background", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[33 /* background */];
            },
            /**
             * @language en_US
             * Specifies whether the text field has a background fill.
             * If true, the text field has a background fill. If false, the text field has no background fill.
             * Use the backgroundColor property to set the background color of the text field.
             * @default false
             */
            /**
             * @language zh_CN
             * 指定文本字段是否具有背景填充。
             * 如果为 true，则文本字段具有背景填充。如果为 false，则文本字段没有背景填充。
             * 使用 backgroundColor 属性来设置文本字段的背景颜色。
             * @default false
             */
            set: function (value) {
                this.$TextField[33 /* background */] = value;
                this.fillBackground();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "backgroundColor", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[34 /* backgroundColor */];
            },
            /**
             * @language en_US
             * Color of the text field background.
             * Even currently is no background, can be retrieved or set this property, but only if the text field has the background property set to true, the color is visible.
             * @default 0xFFFFFF
             */
            /**
             * @language zh_CN
             * 文本字段背景的颜色。
             * 即使当前没有背景，也可检索或设置此属性，但只有当文本字段已将 background 属性设置为 true 时，才可以看到颜色。
             * @default 0xFFFFFF
             */
            set: function (value) {
                this.$TextField[34 /* backgroundColor */] = value;
                this.fillBackground();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         */
        __egretProto__.fillBackground = function () {
            var self = this;
            var graphics = self._bgGraphics;
            if (graphics) {
                graphics.clear();
            }
            if (this.$TextField[33 /* background */] || this.$TextField[31 /* border */]) {
                if (graphics == null) {
                    graphics = self._bgGraphics = new egret.Graphics();
                    this._bgGraphics.$renderContext.$targetDisplay = this;
                }
                if (this.$TextField[33 /* background */]) {
                    graphics.beginFill(this.$TextField[34 /* backgroundColor */], 1);
                }
                if (this.$TextField[31 /* border */]) {
                    graphics.lineStyle(1, this.$TextField[32 /* borderColor */]);
                }
                graphics.drawRect(0, 0, self.$getWidth(), self.$getHeight());
                graphics.endFill();
            }
        };
        /**
         * @private
         * @version Egret 2.0
         * @platform Web,Native
         */
        __egretProto__.setFocus = function () {
            //todo:
            egret.$warn(1013);
        };
        /**
         * @private
         *
         */
        __egretProto__.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            this._removeEvent();
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                this._inputUtils._removeStageText();
            }
        };
        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        __egretProto__.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            this._addEvent();
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                this._inputUtils._addStageText();
            }
        };
        /**
         * 不能重写$invalidateContentBounds，因为内部graphics调用clear时会触发$invalidateContentBounds这狗方法，从而导致死循环。
         */
        __egretProto__.$invalidateTextField = function () {
            this.$invalidateContentBounds();
            this.$TextField[18 /* textLinesChanged */] = true;
        };
        /**
         * @private
         */
        __egretProto__.$measureContentBounds = function (bounds) {
            var self = this;
            this._getLinesArr();
            var w = !isNaN(this.$TextField[3 /* textFieldWidth */]) ? this.$TextField[3 /* textFieldWidth */] : this.$TextField[5 /* textWidth */];
            var h = !isNaN(this.$TextField[4 /* textFieldHeight */]) ? this.$TextField[4 /* textFieldHeight */] : egret.TextFieldUtils._getTextHeight(self);
            if (self.border) {
                w += 2;
                h += 2;
            }
            bounds.setTo(0, 0, w, h);
        };
        /**
         * @private
         * @see egret.DisplayObject._render
         * @param renderContext
         */
        __egretProto__.$render = function (renderContext) {
            if (this._bgGraphics)
                this._bgGraphics.$render(renderContext);
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                this._inputUtils._updateProperties();
                if (this._isTyping) {
                    return;
                }
            }
            else if (this.$TextField[3 /* textFieldWidth */] == 0) {
                return;
            }
            this.drawText(renderContext);
        };
        Object.defineProperty(__egretProto__, "textFlow", {
            /**
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                return this._textArr;
            },
            /**
             * @language en_US
             * Set rich text
             */
            /**
             * @language zh_CN
             * 设置富文本
             * @see http://edn.egret.com/cn/index.php/article/index/id/146
             */
            set: function (textArr) {
                this._isFlow = true;
                var text = "";
                if (textArr == null)
                    textArr = [];
                for (var i = 0; i < textArr.length; i++) {
                    var element = textArr[i];
                    text += element.text;
                }
                if (this.$TextField[20 /* displayAsPassword */]) {
                    this._setBaseText(text);
                }
                else {
                    this.$TextField[13 /* text */] = text;
                    this.setMiddleStyle(textArr);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param text
         * @returns
         */
        __egretProto__.changeToPassText = function (text) {
            if (this.$TextField[20 /* displayAsPassword */]) {
                var passText = "";
                for (var i = 0, num = text.length; i < num; i++) {
                    switch (text.charAt(i)) {
                        case '\n':
                            passText += "\n";
                            break;
                        case '\r':
                            break;
                        default:
                            passText += '*';
                    }
                }
                return passText;
            }
            return text;
        };
        /**
         * @private
         *
         * @param textArr
         */
        __egretProto__.setMiddleStyle = function (textArr) {
            this.$TextField[18 /* textLinesChanged */] = true;
            this._textArr = textArr;
            this.$invalidateTextField();
        };
        Object.defineProperty(__egretProto__, "textWidth", {
            /**
             * @language en_US
             * Get the text measured width
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 获取文本测量宽度
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                this._getLinesArr();
                return this.$TextField[5 /* textWidth */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "textHeight", {
            /**
             * @language en_US
             * Get Text measuring height
             * @version Egret 2.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 获取文本测量高度
             * @version Egret 2.0
             * @platform Web,Native
             */
            get: function () {
                this._getLinesArr();
                return egret.TextFieldUtils._getTextHeight(this);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param text
         * @version Egret 2.0
         * @platform Web,Native
         */
        __egretProto__.appendText = function (text) {
            this.appendElement({ text: text });
        };
        /**
         * @private
         * @param element
         * @version Egret 2.0
         * @platform Web,Native
         */
        __egretProto__.appendElement = function (element) {
            var text = this.$TextField[13 /* text */] + element.text;
            if (this.$TextField[20 /* displayAsPassword */]) {
                this._setBaseText(text);
            }
            else {
                this.$TextField[13 /* text */] = text;
                this._textArr.push(element);
                this.setMiddleStyle(this._textArr);
            }
        };
        /**
         * @private
         *
         * @returns
         */
        __egretProto__._getLinesArr = function () {
            var self = this;
            if (!self.$TextField[18 /* textLinesChanged */]) {
                return self._linesArr;
            }
            self.$TextField[18 /* textLinesChanged */] = false;
            var text2Arr = self._textArr;
            var renderContext = egret.sys.sharedRenderContext;
            self._linesArr.length = 0;
            this.$TextField[6 /* textHeight */] = 0;
            this.$TextField[5 /* textWidth */] = 0;
            var textFieldWidth = this.$TextField[3 /* textFieldWidth */];
            //宽度被设置为0
            if (!isNaN(textFieldWidth) && textFieldWidth == 0) {
                this.$TextField[29 /* numLines */] = 0;
                return [{ width: 0, height: 0, charNum: 0, elements: [], hasNextLine: false }];
            }
            if (!self._isFlow) {
                setupFont(renderContext, self);
            }
            var linesArr = self._linesArr;
            var lineW = 0;
            var lineCharNum = 0;
            var lineH = 0;
            var lineCount = 0;
            var lineElement;
            for (var i = 0, text2ArrLength = text2Arr.length; i < text2ArrLength; i++) {
                var element = text2Arr[i];
                element.style = element.style || {};
                var text = element.text.toString();
                var textArr = text.split(/(?:\r\n|\r|\n)/);
                for (var j = 0, textArrLength = textArr.length; j < textArrLength; j++) {
                    if (linesArr[lineCount] == null) {
                        lineElement = { width: 0, height: 0, elements: [], charNum: 0, hasNextLine: false };
                        linesArr[lineCount] = lineElement;
                        lineW = 0;
                        lineH = 0;
                        lineCharNum = 0;
                    }
                    if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                        lineH = this.$TextField[0 /* fontSize */];
                    }
                    else {
                        lineH = Math.max(lineH, element.style.size || this.$TextField[0 /* fontSize */]);
                    }
                    var isNextLine = true;
                    if (textArr[j] == "") {
                        if (j == textArrLength - 1) {
                            isNextLine = false;
                        }
                    }
                    else {
                        if (self._isFlow) {
                            setupFont(renderContext, self, element.style);
                        }
                        var w = renderContext.measureText(textArr[j]).width;
                        if (isNaN(textFieldWidth)) {
                            lineW += w;
                            lineCharNum += textArr[j].length;
                            lineElement.elements.push({
                                width: w,
                                text: textArr[j],
                                style: element.style
                            });
                            if (j == textArrLength - 1) {
                                isNextLine = false;
                            }
                        }
                        else {
                            if (lineW + w <= textFieldWidth) {
                                lineElement.elements.push({
                                    width: w,
                                    text: textArr[j],
                                    style: element.style
                                });
                                lineW += w;
                                lineCharNum += textArr[j].length;
                                if (j == textArrLength - 1) {
                                    isNextLine = false;
                                }
                            }
                            else {
                                var k = 0;
                                var ww = 0;
                                var word = textArr[j];
                                if (this.$TextField[19 /* wordWrap */]) {
                                    var words = word.split(/\b/);
                                }
                                else {
                                    words = word.match(/./g);
                                }
                                var wl = words.length;
                                var charNum = 0;
                                for (; k < wl; k++) {
                                    w = renderContext.measureText(words[k]).width;
                                    if (lineW != 0 && lineW + w > textFieldWidth && lineW + k != 0) {
                                        break;
                                    }
                                    charNum += words[k].length;
                                    ww += w;
                                    lineW += w;
                                    lineCharNum += charNum;
                                }
                                if (k > 0) {
                                    lineElement.elements.push({
                                        width: ww,
                                        text: word.substring(0, charNum),
                                        style: element.style
                                    });
                                    var leftWord = word.substring(charNum);
                                    for (var m = 0, lwleng = leftWord.length; m < lwleng; m++) {
                                        if (leftWord.charAt(m) != " ") {
                                            break;
                                        }
                                    }
                                    textArr[j] = leftWord.substring(m);
                                }
                                if (textArr[j] != "") {
                                    j--;
                                    isNextLine = false;
                                }
                            }
                        }
                    }
                    if (isNextLine) {
                        lineCharNum++;
                        lineElement.hasNextLine = true;
                    }
                    if (j < textArr.length - 1) {
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        lineElement.charNum = lineCharNum;
                        this.$TextField[5 /* textWidth */] = Math.max(this.$TextField[5 /* textWidth */], lineW);
                        this.$TextField[6 /* textHeight */] += lineH;
                        //if (self._type == TextFieldType.INPUT && !self._multiline) {
                        //    self._numLines = linesArr.length;
                        //    return linesArr;
                        //}
                        lineCount++;
                    }
                }
                if (i == text2Arr.length - 1 && lineElement) {
                    lineElement.width = lineW;
                    lineElement.height = lineH;
                    lineElement.charNum = lineCharNum;
                    this.$TextField[5 /* textWidth */] = Math.max(this.$TextField[5 /* textWidth */], lineW);
                    this.$TextField[6 /* textHeight */] += lineH;
                }
            }
            this.$TextField[29 /* numLines */] = linesArr.length;
            this.fillBackground();
            return linesArr;
        };
        /**
         * @private
         * @param renderContext
         * @returns {Rectangle}
         */
        __egretProto__.drawText = function (renderContext) {
            var self = this;
            var values = this.$TextField;
            //先算出需要的数值
            var lines = self._getLinesArr();
            if (values[5 /* textWidth */] == 0) {
                return;
            }
            var maxWidth = !isNaN(values[3 /* textFieldWidth */]) ? values[3 /* textFieldWidth */] : values[5 /* textWidth */];
            var textHeight = egret.TextFieldUtils._getTextHeight(self);
            var drawY = 0;
            var startLine = egret.TextFieldUtils._getStartLine(self);
            var textFieldHeight = values[4 /* textFieldHeight */];
            if (!isNaN(textFieldHeight) && textFieldHeight > textHeight) {
                var valign = egret.TextFieldUtils._getValign(self);
                drawY += valign * (textFieldHeight - textHeight);
            }
            drawY = Math.round(drawY);
            var halign = egret.TextFieldUtils._getHalign(self);
            var underLines = [];
            var drawX = 0;
            for (var i = startLine, numLinesLength = values[29 /* numLines */]; i < numLinesLength; i++) {
                var line = lines[i];
                var h = line.height;
                drawY += h / 2;
                if (i != startLine) {
                    if (values[24 /* type */] == egret.TextFieldType.INPUT && !values[30 /* multiline */]) {
                        break;
                    }
                    if (!isNaN(textFieldHeight) && drawY > textFieldHeight) {
                        break;
                    }
                }
                drawX = Math.round((maxWidth - line.width) * halign);
                for (var j = 0, elementsLength = line.elements.length; j < elementsLength; j++) {
                    var element = line.elements[j];
                    var size = element.style.size || values[0 /* fontSize */];
                    drawText(renderContext, self, element.text, drawX, drawY + (h - size) / 2, element.width, element.style);
                    if (element.style.href) {
                        underLines.push({ "x": drawX, "y": drawY + (h) / 2, "w": element.width, "c": element.style.textColor });
                    }
                    drawX += element.width;
                }
                drawY += h / 2 + values[1 /* lineSpacing */];
            }
            if (underLines.length > 0) {
                renderContext.save();
                renderContext.lineWidth = 1;
                renderContext.beginPath(); //清理之前的缓存的路径
                for (var i1 = 0; i1 < underLines.length; i1++) {
                    var underInfo = underLines[i1];
                    renderContext.strokeStyle = egret.toColorString(underInfo["c"]) || values[11 /* textColorString */];
                    renderContext.rect(underInfo["x"], underInfo["y"], underInfo["w"], 1);
                }
                renderContext.closePath();
                renderContext.stroke();
                renderContext.restore();
            }
        };
        //增加点击事件
        __egretProto__._addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        //释放点击事件
        __egretProto__._removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        //处理富文本中有href的
        __egretProto__.onTapHandler = function (e) {
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                return;
            }
            var ele = egret.TextFieldUtils._getTextElement(this, e.localX, e.localY);
            if (ele == null) {
                return;
            }
            var style = ele.style;
            if (style && style.href) {
                if (style.href.match(/^event:/)) {
                    var type = style.href.match(/^event:/)[0];
                    egret.TextEvent.dispatchTextEvent(this, egret.TextEvent.LINK, style.href.substring(type.length));
                }
                else {
                    open(style.href, style.target || "_blank");
                }
            }
        };
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        TextField.default_fontFamily = "Arial";
        return TextField;
    })(egret.DisplayObject);
    egret.TextField = TextField;
    TextField.prototype.__class__ = "egret.TextField";
    egret.registerClass(TextField,"egret.TextField");
    /**
     * @private
     *
     * @param renderContext
     * @param textfield
     * @param text
     * @param x
     * @param y
     * @param maxWidth
     * @param style
     */
    function drawText(renderContext, textfield, text, x, y, maxWidth, style) {
        if (style === void 0) { style = null; }
        setupFont(renderContext, textfield, style);
        style = style || {};
        var textColor;
        if (style.textColor != null) {
            textColor = egret.toColorString(style.textColor);
        }
        else {
            textColor = textfield.$TextField[11 /* textColorString */];
        }
        var strokeColor;
        if (style.strokeColor != null) {
            strokeColor = egret.toColorString(style.strokeColor);
        }
        else {
            strokeColor = textfield.$TextField[26 /* strokeColorString */];
        }
        var outline;
        if (style.stroke != null) {
            outline = style.stroke;
        }
        else {
            outline = textfield.$TextField[27 /* stroke */];
        }
        renderContext.fillStyle = textColor;
        renderContext.strokeStyle = strokeColor;
        if (outline) {
            renderContext.lineWidth = outline * 2;
            renderContext.strokeText(text, x, y, maxWidth || 0xFFFF);
        }
        renderContext.fillText(text, x, y, maxWidth || 0xFFFF);
    }
    /**
     * @private
     *
     * @param renderContext
     * @param textField
     * @param style
     */
    function setupFont(renderContext, textField, style) {
        if (style === void 0) { style = null; }
        style = style || {};
        var italic = style.italic == null ? textField.$TextField[16 /* italic */] : style.italic;
        var bold = style.bold == null ? textField.$TextField[15 /* bold */] : style.bold;
        var size = style.size == null ? textField.$TextField[0 /* fontSize */] : style.size;
        var fontFamily = style.fontFamily == null ? textField.$TextField[8 /* fontFamily */] : style.fontFamily;
        var font = italic ? "italic " : "normal ";
        font += bold ? "bold " : "normal ";
        font += size + "px " + fontFamily;
        renderContext.font = font;
        renderContext.textAlign = "left";
        renderContext.textBaseline = "middle";
    }
})(egret || (egret = {}));
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         * 返回格式化的字体样式文本
         */
        function toFontString(style) {
            var font = "";
            if (style.italic)
                font += "italic ";
            if (style.bold)
                font += "bold ";
            font += (style.fontSize || 12) + "px ";
            font += (style.fontFamily || "sans-serif");
            return font;
        }
        sys.toFontString = toFontString;
        if (DEBUG) {
            egret.$markReadOnly(egret.TextField, "numLines");
            egret.$markReadOnly(egret.TextField, "textWidth");
            egret.$markReadOnly(egret.TextField, "textHeight");
        }
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
