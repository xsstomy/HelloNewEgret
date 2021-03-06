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
    var blendModes = ["source-over", "lighter", "destination-out"];
    var defaultCompositeOp = "source-over";
    /**
     * @language en_US
     * RenderTexture is a dynamic texture
     * @extends egret.Texture
     * @version Egret 2.0
     * @platform Web,Native
     * @includeExample egret/display/RenderTexture.ts
     */
    /**
     * @language zh_CN
     * RenderTexture 是动态纹理类，他实现了将显示对象及其子对象绘制成为一个纹理的功能
     * @extends egret.Texture
     * @version Egret 2.0
     * @platform Web,Native
     * @includeExample egret/display/RenderTexture.ts
     */
    var RenderTexture = (function (_super) {
        __extends(RenderTexture, _super);
        function RenderTexture() {
            _super.call(this);
        }
        var __egretProto__ = RenderTexture.prototype;
        /**
         * @language en_US
         * The specified display object is drawn as a texture
         * @param displayObject {egret.DisplayObject} the display to draw
         * @param clipBounds {egret.Rectangle} clip rect
         * @param scale {number} scale factor
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将指定显示对象绘制为一个纹理
         * @param displayObject {egret.DisplayObject} 需要绘制的显示对象
         * @param clipBounds {egret.Rectangle} 绘制矩形区域
         * @param scale {number} 缩放比例
         * @version Egret 2.0
         * @platform Web,Native
         */
        __egretProto__.drawToTexture = function (displayObject, clipBounds, scale) {
            if (scale === void 0) { scale = 1; }
            scale /= egret.$TextureScaleFactor;
            var originParent = displayObject.$parent;
            var c1 = new egret.DisplayObjectContainer();
            c1.addChild(displayObject);
            c1.scaleX = c1.scaleY = scale;
            if (clipBounds) {
                var scrollRect = new egret.Rectangle();
                scrollRect.setTo(clipBounds.x, clipBounds.y, clipBounds.width, clipBounds.height);
                c1.scrollRect = scrollRect;
            }
            var root = new egret.DisplayObjectContainer();
            var displayList = egret.sys.DisplayList.create(root);
            root.$displayList = displayList;
            root.addChild(c1);
            this.$update(displayObject);
            egret.sys.DisplayList.release(displayList);
            root.$displayList = null;
            var bounds = displayObject.getBounds();
            var context = this.createRenderContext(bounds.width * scale, bounds.height * scale);
            context.clearRect(0, 0, bounds.width * scale, bounds.height * scale);
            this._offsetX = bounds.x * scale;
            this._offsetY = bounds.y * scale;
            if (!context) {
                return false;
            }
            var drawCalls = this.drawDisplayObject(root, context);
            if (drawCalls == 0) {
                return false;
            }
            context.surface["avaliable"] = true;
            this._setBitmapData(context.surface);
            this._offsetX = bounds.x * scale;
            this._offsetY = bounds.y * scale;
            if (originParent) {
                originParent.addChild(displayObject);
            }
            return true;
        };
        __egretProto__.$update = function (displayObject) {
            if (displayObject.$renderRegion) {
                displayObject.$renderRegion.moved = true;
                displayObject.$update();
            }
            else if (displayObject instanceof egret.DisplayObjectContainer) {
                var children = displayObject.$children;
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    this.$update(child);
                }
            }
        };
        __egretProto__.drawDisplayObject = function (displayObject, context) {
            var drawCalls = 0;
            var node;
            var globalAlpha;
            if (displayObject.$renderRegion) {
                node = displayObject;
                globalAlpha = displayObject.$renderAlpha;
            }
            if (node) {
                drawCalls++;
                context.globalAlpha = globalAlpha;
                var m = node.$renderMatrix;
                context.setTransform(m.a, m.b, m.c, m.d, m.tx - this._offsetX, m.ty - this._offsetY);
                node.$render(context);
            }
            var children = displayObject.$children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    if (!child.$visible || child.$alpha <= 0 || child.$maskedObject) {
                        continue;
                    }
                    if (child.$blendMode !== 0 || child.$mask) {
                        drawCalls += this.drawWithClip(child, context);
                    }
                    else if (child.$scrollRect) {
                        drawCalls += this.drawWithScrollRect(child, context);
                    }
                    else {
                        drawCalls += this.drawDisplayObject(child, context);
                    }
                }
            }
            return drawCalls;
        };
        __egretProto__.drawWithClip = function (displayObject, context) {
            var drawCalls = 0;
            var hasBlendMode = (displayObject.$blendMode !== 0);
            if (hasBlendMode) {
                var compositeOp = blendModes[displayObject.$blendMode];
                if (!compositeOp) {
                    compositeOp = defaultCompositeOp;
                }
            }
            var scrollRect = displayObject.$scrollRect;
            var mask = displayObject.$mask;
            //计算scrollRect和mask的clip区域是否需要绘制，不需要就直接返回，跳过所有子项的遍历。
            var maskRegion;
            var displayMatrix = displayObject.$getConcatenatedMatrix();
            if (mask) {
                var bounds = mask.$getOriginalBounds();
                maskRegion = egret.sys.Region.create();
                maskRegion.updateRegion(bounds, mask.$getConcatenatedMatrix());
            }
            var region;
            if (scrollRect) {
                region = egret.sys.Region.create();
                region.updateRegion(scrollRect, displayMatrix);
            }
            if (region && maskRegion) {
                region.intersect(maskRegion);
                egret.sys.Region.release(maskRegion);
            }
            else if (!region && maskRegion) {
                region = maskRegion;
            }
            if (region) {
                if (region.isEmpty()) {
                    egret.sys.Region.release(region);
                    return drawCalls;
                }
            }
            else {
                region = egret.sys.Region.create();
                bounds = displayObject.$getOriginalBounds();
                region.updateRegion(bounds, displayObject.$getConcatenatedMatrix());
            }
            //绘制显示对象自身，若有scrollRect，应用clip
            var displayContext = this.createRenderContext(region.width, region.height);
            if (!displayContext) {
                drawCalls += this.drawDisplayObject(displayObject, context);
                egret.sys.Region.release(region);
                return drawCalls;
            }
            if (scrollRect) {
                var m = displayMatrix;
                displayContext.setTransform(m.a, m.b, m.c, m.d, m.tx - region.minX, m.ty - region.minY);
                displayContext.beginPath();
                displayContext.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                displayContext.clip();
            }
            displayContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
            var rootM = egret.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
            drawCalls += this.drawDisplayObject(displayObject, displayContext);
            egret.Matrix.release(rootM);
            //绘制遮罩
            if (mask) {
                var maskContext = this.createRenderContext(region.width, region.height);
                if (!maskContext) {
                    drawCalls += this.drawDisplayObject(displayObject, context);
                    egret.sys.surfaceFactory.release(displayContext.surface);
                    egret.sys.Region.release(region);
                    return drawCalls;
                }
                maskContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
                rootM = egret.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
                var calls = this.drawDisplayObject(mask, maskContext);
                egret.Matrix.release(rootM);
                if (calls > 0) {
                    drawCalls += calls;
                    displayContext.globalCompositeOperation = "destination-in";
                    displayContext.setTransform(1, 0, 0, 1, 0, 0);
                    displayContext.globalAlpha = 1;
                    displayContext.drawImage(maskContext.surface, 0, 0);
                }
                egret.sys.surfaceFactory.release(maskContext.surface);
            }
            //绘制结果到屏幕
            if (drawCalls > 0) {
                drawCalls++;
                if (hasBlendMode) {
                    context.globalCompositeOperation = compositeOp;
                }
                context.setTransform(1, 0, 0, 1, region.minX, region.minY);
                context.drawImage(displayContext.surface, 0, 0);
                if (hasBlendMode) {
                    context.globalCompositeOperation = defaultCompositeOp;
                }
            }
            egret.sys.surfaceFactory.release(displayContext.surface);
            egret.sys.Region.release(region);
            return drawCalls;
        };
        __egretProto__.drawWithScrollRect = function (displayObject, context) {
            var drawCalls = 0;
            var scrollRect = displayObject.$scrollRect;
            var m = displayObject.$getConcatenatedMatrix();
            var region = egret.sys.Region.create();
            if (!scrollRect.isEmpty()) {
                region.updateRegion(scrollRect, m);
            }
            if (region.isEmpty()) {
                egret.sys.Region.release(region);
                return drawCalls;
            }
            //绘制显示对象自身
            context.save();
            context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            context.beginPath();
            context.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
            context.clip();
            drawCalls += this.drawDisplayObject(displayObject, context);
            context.restore();
            egret.sys.Region.release(region);
            return drawCalls;
        };
        __egretProto__.createRenderContext = function (width, height) {
            var surface = egret.sys.surfaceFactory.create(true);
            if (!surface) {
                return null;
            }
            surface.width = Math.max(257, width);
            surface.height = Math.max(257, height);
            return surface.renderContext;
        };
        /**
         * 销毁 RenderTexture 对象
         * @method egret.RenderTexture#dispose
         */
        __egretProto__.dispose = function () {
            if (this._bitmapData) {
                egret.Texture.$dispose(this);
                this._bitmapData = null;
            }
        };
        return RenderTexture;
    })(egret.Texture);
    egret.RenderTexture = RenderTexture;
    RenderTexture.prototype.__class__ = "egret.RenderTexture";
    egret.registerClass(RenderTexture,"egret.RenderTexture");
})(egret || (egret = {}));
