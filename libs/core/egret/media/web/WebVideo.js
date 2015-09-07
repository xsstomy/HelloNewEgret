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
    var web;
    (function (web) {
        /**
         * @private
         * @inheritDoc
         */
        var WebVideo = (function (_super) {
            __extends(WebVideo, _super);
            /**
             * @inheritDoc
             */
            function WebVideo() {
                var _this = this;
                _super.call(this);
                /**
                 * @private
                 */
                this.loaded = false;
                /**
                 * @private
                 */
                this.closed = false;
                /**
                 * @private
                 */
                this.heightSet = NaN;
                /**
                 * @private
                 */
                this.widthSet = NaN;
                this._fullscreen = true;
                /**
                 * @private
                 *
                 */
                this.onVideoLoaded = function () {
                    _this.video.removeEventListener("canplay", _this.onVideoLoaded);
                    var video = _this.video;
                    var width = _this.width;
                    var height = _this.height;
                    _this.loaded = true;
                    video.pause();
                    if (_this.posterData) {
                        _this.posterData.width = video.videoWidth;
                        _this.posterData.height = video.videoHeight;
                    }
                    video.width = video.videoWidth;
                    video.height = video.videoHeight;
                    _this.$invalidateContentBounds();
                    _this.width = isNaN(_this.widthSet) ? video.videoWidth : _this.widthSet;
                    _this.height = isNaN(_this.heightSet) ? video.videoHeight : _this.heightSet;
                    _this.dispatchEventWith(egret.Event.COMPLETE);
                };
                this.$renderRegion = new egret.sys.Region();
                this.once(egret.Event.ADDED_TO_STAGE, this.loadPoster, this);
            }
            var __egretProto__ = WebVideo.prototype;
            /**
             * @inheritDoc
             */
            __egretProto__.load = function (url) {
                var _this = this;
                this.src = url;
                if (DEBUG && !url) {
                    egret.$error(3002);
                }
                if (this.video && this.video.src == url)
                    return;
                var video = document.createElement("video");
                video.src = url;
                video.setAttribute("webkit-playsinline", "webkit-playsinline");
                video.addEventListener("canplay", this.onVideoLoaded);
                video.addEventListener("error", function () { return _this.onVideoError(); });
                video.addEventListener("ended", function () { return _this.onVideoEnded(); });
                video.load();
                video.play();
                egret.setTimeout(function () { return video.pause(); }, this, 16);
                this.video = video;
            };
            /**
             * @inheritDoc
             */
            __egretProto__.play = function (startTime, loop) {
                var _this = this;
                if (loop === void 0) { loop = false; }
                if (this.loaded == false) {
                    this.load(this.src);
                    this.once(egret.Event.COMPLETE, function (e) { return _this.play(startTime, loop); }, this);
                    return;
                }
                var video = this.video;
                if (startTime != undefined)
                    video.currentTime = +startTime || 0;
                video.loop = !!loop;
                video.play();
                video.style.position = "absolute";
                video.style.top = "0px";
                video.style.left = "0px";
                video.style.height = "0";
                video.style.width = "0";
                document.body.appendChild(video);
                var fullscreen = false;
                if (this._fullscreen) {
                    fullscreen = this.goFullscreen();
                }
                if (fullscreen == false) {
                    video.setAttribute("webkit-playsinline", "webkit-playsinline");
                    egret.startTick(this.markDirty, this);
                }
            };
            __egretProto__.goFullscreen = function () {
                var _this = this;
                var video = this.video;
                if (video['webkitRequestFullscreen'])
                    video['webkitRequestFullscreen']();
                else if (video['webkitRequestFullScreen'])
                    video['webkitRequestFullScreen']();
                else if (video['msRequestFullscreen'])
                    video['msRequestFullscreen']();
                else if (video['requestFullscreen'])
                    video['requestFullscreen']();
                else
                    return false;
                video.removeAttribute("webkit-playsinline");
                video['onwebkitfullscreenchange'] = function (e) {
                    var isfullscreen = !!video['webkitDisplayingFullscreen'];
                    if (!isfullscreen) {
                        _this.pause();
                    }
                };
                video['onwebkitfullscreenerror'] = function (e) {
                    egret.$error(3003);
                };
                return true;
            };
            /**
             * @inheritDoc
             */
            __egretProto__.close = function () {
                this.pause();
                if (this.loaded == false && this.video)
                    this.video.src = "";
                if (this.video) {
                    if (this.video['remove'])
                        this.video['remove']();
                    this.video = null;
                }
                this.closed = true;
                this.loaded = false;
            };
            /**
             * @inheritDoc
             */
            __egretProto__.pause = function () {
                if (this.video) {
                    this.video.pause();
                    this.onVideoEnded();
                }
                egret.stopTick(this.markDirty, this);
            };
            Object.defineProperty(__egretProto__, "volume", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.video)
                        return 1;
                    return this.video.volume;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (!this.video)
                        return;
                    this.video.volume = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "position", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.video)
                        return 0;
                    return this.video.currentTime;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (!this.video)
                        return;
                    this.video.currentTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "fullscreen", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._fullscreen;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    this._fullscreen = !!value;
                    if (this.video && this.video.paused == false) {
                        this.goFullscreen();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "bitmapData", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.video || !this.loaded)
                        return null;
                    if (!this._bitmapData) {
                        this.video.width = this.video.videoWidth;
                        this.video.height = this.video.videoHeight;
                        this._bitmapData = egret.web['toBitmapData'](this.video);
                    }
                    return this._bitmapData;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.loadPoster = function () {
                var _this = this;
                var poster = this.poster;
                if (!poster)
                    return;
                var imageLoader = new egret.ImageLoader();
                imageLoader.once(egret.Event.COMPLETE, function (e) {
                    var posterData = imageLoader.data;
                    _this.posterData = imageLoader.data;
                    if (_this.video && _this.loaded) {
                        posterData.width = _this.video.videoWidth;
                        posterData.height = _this.video.videoHeight;
                    }
                    else {
                        posterData.width = isNaN(_this.widthSet) ? posterData.width : _this.widthSet;
                        posterData.height = isNaN(_this.heightSet) ? posterData.height : _this.heightSet;
                    }
                    _this.$invalidateContentBounds();
                }, this);
                imageLoader.load(poster);
            };
            /**
             * @private
             *
             */
            __egretProto__.onVideoEnded = function () {
                this.dispatchEventWith(egret.Event.ENDED);
                this.$invalidateContentBounds();
            };
            /**
             * @private
             *
             */
            __egretProto__.onVideoError = function () {
                this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
            };
            /**
             * @private
             */
            __egretProto__.$measureContentBounds = function (bounds) {
                var bitmapData = this.bitmapData;
                var posterData = this.posterData;
                if (bitmapData) {
                    bounds.setTo(0, 0, bitmapData.width, bitmapData.height);
                }
                else if (posterData) {
                    bounds.setTo(0, 0, posterData.width, posterData.height);
                }
                else {
                    bounds.setEmpty();
                }
            };
            /**
             * @private
             */
            __egretProto__.$render = function (context) {
                var bitmapData = this.bitmapData;
                var posterData = this.posterData;
                if ((!bitmapData || this.video && this.video.paused) && posterData) {
                    context.drawImage(posterData, 0, 0, posterData.width, posterData.height);
                }
                if (bitmapData) {
                    context.imageSmoothingEnabled = true;
                    context.drawImage(bitmapData, 0, 0, bitmapData.width, bitmapData.height);
                }
            };
            __egretProto__.markDirty = function (time) {
                this.$invalidate();
                return true;
            };
            /**
             * @private
             * 设置显示高度
             */
            __egretProto__.$setHeight = function (value) {
                _super.prototype.$setHeight.call(this, value);
                this.heightSet = +value || 0;
            };
            /**
             * @private
             * 设置显示宽度
             */
            __egretProto__.$setWidth = function (value) {
                _super.prototype.$setWidth.call(this, value);
                this.widthSet = +value || 0;
            };
            return WebVideo;
        })(egret.DisplayObject);
        web.WebVideo = WebVideo;
        WebVideo.prototype.__class__ = "egret.web.WebVideo";
        egret.registerClass(WebVideo,"egret.web.WebVideo",["egret.Video"]);
        egret.Video = WebVideo;
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
