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


declare module egret_native {
    var nativeType:string;

    /**
     * 游戏启动
     * @private
     */
    function startGame():void;

    function loglevel(logType):void;

    function callRender():void;

    function onTouchesBegin(num:number, ids:Array<any>, xs_array:Array<any>, ys_array:Array<any>);
    function onTouchesMove(num:number, ids:Array<any>, xs_array:Array<any>, ys_array:Array<any>);
    function onTouchesEnd(num:number, ids:Array<any>, xs_array:Array<any>, ys_array:Array<any>);
    function onTouchesCancel(num:number, ids:Array<any>, xs_array:Array<any>, ys_array:Array<any>);

    /**
     * 启动主循环
     * @param callback 主循环回调函数
     * @param thisObject
     */
    function executeMainLoop(callback:Function, thisObject:any):void;

    function pauseApp():void;

    function resumeApp():void;

    function readXML(filepath:string):any;

    function isFileExists(filepath:string):boolean;

    function isRecordExists(filepath:string):boolean;

    function readFileSync(filepath:string):any;

    function readResourceFileSync(filepath:string):any;

    function readUpdateFileSync(filepath:string):any;

    function deleteUpdateFile(filepath:string):void;

    function readFileAsync(filepath:string, promise:egret.PromiseObject):any;

    function writeFileSync(filepath:string, fileContent:string):any;

    function requireHttpSync(url:string, callback:Function):void;

    function requireHttp(url:string, param:any, callback:Function):void;

    function sendInfoToPlugin(info:string):void;

    function receivedPluginInfo(info:string):void;

    function loadRecord(filepath:string):string;

    function saveRecord(filepath:string, fileContent:string):void;

    function getOption(type:string):string;

    module Audio {
        function preloadBackgroundMusic(path:string):void;

        function playBackgroundMusic(path:string, loop:boolean):void;

        function stopBackgroundMusic(isRelease:boolean):void;

        function preloadEffect(path:string):void;

        function preloadEffectAsync(path:string, promise:egret.PromiseObject):void;

        function playEffect(path:string, loop:boolean):void;

        function unloadEffect(path:string):void;

        function stopEffect(effectId:number):void;

        function pauseBackgroundMusic():void;

        function pauseAllEffects():void;

        function resumeBackgroundMusic():void;

        function resumeAllEffects():void;
    }

    function download(url:string, savePath:string, promise:any):void;

    module Graphics {


        function clearScreen(r:number, g:number, b:number):void;

        function drawImage(texture:any, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight):void;

        function drawImageScale9(texture:any, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, x, y, width, height):boolean;

        function setTransform(a:number, b:number, c:number, d:number, tx:number, ty:number):void;

        function setGlobalAlpha(alpha:number):void;

        function pushClip(x:number, y:number, w:number, h:number):void;

        function popClip():void;

        function setGlobalColorTransform(colorTransformMatrix:Array<number>):void;

        function setGlobalColorTransformEnabled(bool:boolean):void;

        function setGlobalShader(filterData:any):void;


        function lineStyle(thickness:number, color:number):void;

        function lineTo(x:number, y:number):void;

        function moveTo(x:number, y:number):void;

        function beginFill(color:number, alpha:number):void;

        function endFill():void;

        function setBlendArg(src:number, des:number):void;

        function setTextureScaleFactor(value:number):void;
    }

    module Label {

        function createLabel(font:string, size:number, defaultString:string, defaultStroke:number):void;

        function setTextColor(color:number):void;

        function setStrokeColor(color:number):void;

        function drawText(text:string, x:number, y:number):void;

        function setTextAlignment(type:string):void;

        function getTextSize(text:string):Array<number>;


    }


    module EGTXML {


        function readXML(filepath:string):void;
    }

    module Texture {

        function create(filePath:string):any;

        function addTexture(filePath:string):any;

        function addTextureAsyn(filePath:string, promise:any):any;

        function addTextureUnsyn(filePath:string, promise:any):any;

        function removeTexture(filePath:string):void;
    }


    module TextInputOp {

        function setKeybordOpen(isOpen:boolean, jsonConfig?:Object):void

        function isFullScreenKeyBoard():boolean

        function setInputTextMaxLenght(value:number):void;


    }

    function EGT_TextInput(text:string):void

    function EGT_keyboardFinish():void


    function EGT_deleteBackward():void;

    function EGT_keyboardDidHide():void;

    function EGT_keyboardDidShow():void;

    function EGT_getTextEditerContentText():string;

    module EGTView {

        function getFrameWidth():number;

        function getFrameHeight():number;

        function setVisibleRect(x:number, y:number, w:number, h:number):number;

        function setDesignSize(w:number, h:number):number;
    }

    class RenderTexture {
        constructor(width:number, height:number);

        begin();

        end();
        dispose();
        toDataURL(type);
        saveToFile(type:string, filePath:string);
    }

    module rastergl {
        function arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise?:boolean):void;

        function quadraticCurveTo(cpx:number, cpy:number, x:number, y:number):void;

        function lineTo(x:number, y:number):void;

        function fill(fillRule?:string):void;

        function closePath():void;

        function rect(x:number, y:number, w:number, h:number):void;

        function moveTo(x:number, y:number):void;

        function fillRect(x:number, y:number, w:number, h:number):void;

        function bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number):void;

        function stroke():void;

        function strokeRect(x:number, y:number, w:number, h:number):void;

        function beginPath():void;

        function arcTo(x1:number, y1:number, x2:number, y2:number, radius:number):void;

        function transform(m11:number, m12:number, m21:number, m22:number, dx:number, dy:number):void;

        function translate(x:number, y:number):void;

        function scale(x:number, y:number):void;

        function rotate(angle:number):void;

        function save():void;

        function restore():void;

        function createLinearGradient(x0:number, y0:number, x1:number, y1:number):CanvasGradient;

        function createRadialGradient(x0:number, y0:number, r0:number, x1:number, y1:number, r1:number):CanvasGradient;

        export var lineWidth:number;
        export var strokeStyle:any;
        export var fillStyle:any;
    }

    module Game {
        function listResource(root, promise);

        function listUpdate(root, promise);
    }
}
declare module egret {
    /**
     * @private
     * @version Egret 2.0
     * @platform Web,Native
     */
    class PromiseObject {
        /**
         * @private
         */
        private static promiseObjectList;
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        onSuccessFunc: Function;
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        onSuccessThisObject: any;
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        onErrorFunc: Function;
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        onErrorThisObject: any;
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        downloadingSizeFunc: Function;
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        downloadingSizeThisObject: any;
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        constructor();
        /**
         *
         * @version Egret 2.0
         * @platform Web,Native
         */
        static create(): any;
        /**
         * @private
         *
         * @param args
         */
        private onSuccess(...args);
        /**
         * @private
         *
         * @param args
         */
        private onError(...args);
        /**
         * @private
         *
         * @param args
         */
        private downloadingSize(...args);
        /**
         * @private
         *
         */
        private destroy();
    }
}

declare module egret {
    /**
     * @classdesc
     * @implements egret.StageText
     * @private
     * @version Egret 2.0
     * @platform Web,Native
     */
    class NativeStageText extends EventDispatcher implements StageText {
        /**
         * @private
         */
        private textValue;
        /**
         * @version Egret 2.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @private
         *
         * @returns
         */
        $getText(): string;
        /**
         * @private
         *
         * @param value
         */
        $setText(value: string): void;
        /**
         * @private
         *
         */
        $onBlur(): void;
        /**
         * @private
         */
        private isFinishDown;
        private showScreenKeyboard();
        /**
         * @private
         *
         */
        $show(): void;
        /**
         * @private
         *
         */
        $hide(): void;
        $resetStageText(): void;
        $addToStage(): void;
        $removeFromStage(): void;
        /**
         * @private
         */
        $textfield: egret.TextField;
        $setTextField(value: egret.TextField): void;
    }
}

declare module egret.sys {
    /**
     * @private
     * 显示列表
     */
    class NativeDisplayList extends HashObject implements Renderable {
        /**
         * @private
         * 释放一个DisplayList实例到对象池
         */
        static release(displayList: DisplayList): void;
        /**
         * @private
         * 从对象池中取出或创建一个新的DisplayList对象。
         */
        static create(target: DisplayObject): DisplayList;
        /**
         * @private
         * 创建一个DisplayList对象
         */
        constructor(root: DisplayObject);
        /**
         * @private
         * 是否需要重绘
         */
        $isDirty: boolean;
        /**
         * @private
         * 在舞台上的透明度
         */
        $renderAlpha: number;
        /**
         * @private
         * 相对于显示列表根节点或位图缓存根节点的矩阵对象
         */
        $renderMatrix: Matrix;
        $ratioMatrix: Matrix;
        $ratioChanged: boolean;
        $pixelRatio: number;
        /**
         * @private
         * 在显示列表根节点或位图缓存根节点上的显示区域
         */
        $renderRegion: Region;
        /**
         * @private
         * 更新对象在舞台上的显示区域和透明度,返回显示区域是否发生改变。
         */
        $update(): boolean;
        /**
         * @private
         * 呈现绘制结果的目标画布
         */
        surface: Surface;
        /**
         * @private
         */
        offsetX: number;
        /**
         * @private
         */
        offsetY: number;
        /**
         * @private
         *
         * @param context
         */
        $render(context: RenderContext): void;
        /**
         * @private
         * 显示列表根节点
         */
        root: DisplayObject;
        /**
         * @private
         */
        needRedraw: boolean;
        /**
         * @private
         */
        private rootMatrix;
        /**
         * @private
         * 绘图上下文
         */
        renderContext: RenderContext;
        /**
         * @private
         * 设置剪裁边界，不再绘制完整目标对象，画布尺寸由外部决定，超过边界的节点将跳过绘制。
         */
        setClipRect(width: number, height: number): void;
        /**
         * @private
         * 显示对象的渲染节点发生改变时，把自身的IRenderable对象注册到此列表上。
         */
        private dirtyNodes;
        /**
         * @private
         */
        private dirtyNodeList;
        /**
         * @private
         * 标记一个节点需要重新渲染
         */
        markDirty(node: Renderable): void;
        /**
         * @private
         */
        private dirtyList;
        /**
         * @private
         */
        private dirtyRegion;
        /**
         * @private
         * 更新节点属性并返回脏矩形列表。
         */
        updateDirtyRegions(): Region[];
        /**
         * @private
         * 绘制根节点显示对象到目标画布，返回draw的次数。
         */
        drawToSurface(): number;
        /**
         * @private
         * 绘制一个显示对象
         */
        private drawDisplayObject(displayObject, context, dirtyList, rootMatrix, displayList, clipRegion);
        /**
         * @private
         */
        private drawWithClip(displayObject, context, dirtyList, rootMatrix, clipRegion);
        /**
         * @private
         */
        private drawWithScrollRect(displayObject, context, dirtyList, rootMatrix, clipRegion);
        /**
         * @private
         */
        private createRenderContext(width, height);
        /**
         * @private
         */
        private sizeChanged;
        /**
         * @private
         * 改变画布的尺寸，由于画布尺寸修改会清空原始画布。所以这里将原始画布绘制到一个新画布上，再与原始画布交换。
         */
        changeSurfaceSize(): void;
        setDevicePixelRatio(ratio?: number): void;
    }
}

declare module egret.localStorage.native {
}

declare module egret.native {
    /**
     * @private
     */
    class NativeExternalInterface implements ExternalInterface {
        static call(functionName: string, value: string): void;
        static addCallback(functionName: string, listener: (value) => void): void;
    }
}

declare module egret {
    /**
     * @private
     */
    class NativeVersionController extends egret.EventDispatcher implements VersionController {
        private _versionInfo;
        private _versionPath;
        private _localFileArr;
        private _stage;
        constructor(stage: egret.Stage);
        fetchVersion(): void;
        private getList(callback, type, root?);
        checkIsNewVersion(virtualUrl: string): boolean;
        saveVersion(virtualUrl: string): void;
        /**
         * 获取所有有变化的文件
         * @returns {Array<string>}
         */
        getChangeList(): Array<string>;
        getVirtualUrl(url: string): string;
        private _iLoadingView;
        private loadAllChange();
        private getLocalData(filePath);
        private getLocalDataByOld(filePath);
    }
}

declare module egret.native {
    /**
     * @private
     */
    class NativeHideHandler extends HashObject {
        constructor(stage: Stage);
    }
}

declare module egret.native {
    /**
     * @private
     */
    class NativeTouchHandler extends HashObject {
        private $touch;
        constructor(stage: Stage);
        private $executeTouchCallback(num, ids, xs_array, ys_array, callback);
        /**
         * @private
         * 更新同时触摸点的数量
         */
        $updateMaxTouches(): void;
    }
}

declare module egret.native {
    /**
     * @private
     */
    class OpenGLFactory implements sys.SurfaceFactory {
        /**
         * @private
         */
        constructor();
        /**
         * @private
         * 从对象池取出或创建一个新的Surface实例
         * @param useOnce 表示对取出实例的使用是一次性的，用完后立即会释放。
         */
        create(useOnce?: boolean): NativeSurface;
        /**
         * @private
         * 释放一个Surface实例
         * @param surface 要释放的Surface实例
         */
        release(surface: NativeSurface): void;
        /**
         * @private
         */
        private createSurface(canvas);
    }
}

declare module egret {
    /**
     * @private
     * @version Egret 2.0
     * @platform Web,Native
     */
    class NativeResourceLoader extends egret.EventDispatcher {
        /**
         * @private
         */
        private _downCount;
        /**
         * @private
         */
        private _path;
        /**
         * @private
         */
        private _bytesTotal;
        /**
         *
         * @param path
         * @param bytesTotal
         * @version Egret 2.0
         * @platform Web,Native
         */
        load(path: string, bytesTotal: number): void;
        /**
         * @private
         *
         */
        private reload();
        /**
         * @private
         *
         * @param bytesLoaded
         */
        private downloadingProgress(bytesLoaded);
        /**
         * @private
         *
         */
        private downloadFileError();
        /**
         * @private
         *
         */
        private loadOver();
    }
}

declare module egret.native {
}

declare module egret.native {
}

declare module egret.native {
    /**
     * @private
     * 呈现最终绘图结果的画布
     */
    class NativeSurface extends egret.HashObject implements egret.sys.Surface {
        /**
         * @private
         */
        constructor();
        /**
         * @private
         * @inheritDoc
         */
        renderContext: egret.sys.RenderContext;
        toDataURL(type?: string, ...args: any[]): string;
        saveToFile(type: string, filePath: string): void;
        /**
         * @private
         * @inheritDoc
         */
        width: number;
        private $width;
        private $widthReadySet;
        /**
         * @private
         * @inheritDoc
         */
        height: number;
        private $height;
        private $heightReadySet;
        $nativeRenderTexture: any;
        $isRoot: boolean;
        private createRenderTexture();
        begin(): void;
        end(): void;
        private $isDispose;
        $dispose(): void;
        $reload(): void;
    }
}

declare module egret.native {
    /**
     * @private
     */
    class NativePlayer extends egret.HashObject implements egret.sys.Screen {
        static option: PlayerOption;
        /**
         * @private
         * 舞台引用
         */
        private stage;
        private playerOption;
        private player;
        private nativeTouch;
        constructor();
        private init(option);
        updateScreenSize(): void;
        /**
         * @private
         * 更新触摸数量
         */
        updateMaxTouches(): void;
    }
}

declare module egret.native {
    /**
     * @version Egret 2.0
     * @platform Web,Native
     * @private
     */
    class NativeRenderContext extends HashObject implements egret.sys.RenderContext {
        private $matrix;
        /**
         * @private
         * 与绘图上线文关联的画布实例
         * @version Egret 2.0
         * @platform Web,Native
         */
        surface: NativeSurface;
        private $globalCompositeOperation;
        /**
         * @private
         * 设置新图像如何绘制到已有的图像上的规制
         * @version Egret 2.0
         * @platform Web,Native
         */
        globalCompositeOperation: string;
        private $globalAlpha;
        /**
         * @private
         * 设置接下来绘图填充的整体透明度
         * @version Egret 2.0
         * @platform Web,Native
         */
        globalAlpha: number;
        /**
         * @private
         * 用于表示剪切斜接的极限值的数字。
         * @default 10
         * @version Egret 2.0
         * @platform Web,Native
         */
        miterLimit: number;
        /**
         * @private
         * 指定如何绘制每一条线段末端的属性。有3个可能的值，分别是：<br/>
         * <ul>
         * <li>"butt": 线段末端以方形结束。</li>
         * <li>"round": 线段末端以圆形结束。</li>
         * <li>"square": 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。</li>
         * </ul>
         * @default "butt"
         * @version Egret 2.0
         * @platform Web,Native
         */
        lineCap: string;
        /**
         * @private
         * 指定用于拐角的连接外观的类型,有3个可能的值，分别是：<br/>
         * <ul>
         * <li>"round": 圆角连接</li>
         * <li>"bevel": 斜角连接。</li>
         * <li>"miter": 尖角连接。当使用尖角模式时，还可以同时使用 miterLimit 参数限制尖角的长度。</li>
         * </ul>
         * @default "miter"
         * @version Egret 2.0
         * @platform Web,Native
         */
        lineJoin: string;
        private $lineWidth;
        /**
         * @private
         * 设置线条粗细，以像素为单位。设置为0，负数，Infinity 或 NaN 将会被忽略。
         * @default 1
         * @version Egret 2.0
         * @platform Web,Native
         */
        lineWidth: number;
        private $strokeStyle;
        /**
         * @private
         * 设置要在图形边线填充的颜色或样式
         * @default "#000000"
         * @version Egret 2.0
         * @platform Web,Native
         */
        strokeStyle: any;
        private $fillStyle;
        /**
         * @private
         * 设置要在图形内部填充的颜色或样式
         * @default "#000000"
         * @version Egret 2.0
         * @platform Web,Native
         */
        fillStyle: any;
        private $fillColorStr(s);
        private $parseRGBA(str);
        private $parseRGB(str);
        /**
         * @private
         * 控制在缩放时是否对位图进行平滑处理。
         * @default true
         * @version Egret 2.0
         * @platform Web,Native
         */
        imageSmoothingEnabled: boolean;
        /**
         * @private
         * 文本的对齐方式的属性,有5个可能的值，分别是：<br/>
         * <ul>
         * <li>"left" 文本左对齐。</li>
         * <li>"right" 文本右对齐。</li>
         * <li>"center" 文本居中对齐。</li>
         * <li>"start" 文本对齐界线开始的地方 （对于从左向右阅读的语言使用左对齐，对从右向左的阅读的语言使用右对齐）。</li>
         * <li>"end" 文本对齐界线结束的地方 （对于从左向右阅读的语言使用右对齐，对从右向左的阅读的语言使用左对齐）。</li>
         * </ul>
         * @default "start"
         * @version Egret 2.0
         * @platform Web,Native
         */
        textAlign: string;
        /**
         * @private
         * 决定文字垂直方向的对齐方式。有6个可能的值，分别是：<br/>
         * <ul>
         * <li>"top" 文本基线在文本块的顶部。</li>
         * <li>"hanging" 文本基线是悬挂基线。</li>
         * <li>"middle" 文本基线在文本块的中间。</li>
         * <li>"alphabetic" 文本基线是标准的字母基线。</li>
         * <li>"ideographic" 文字基线是表意字基线；如果字符本身超出了alphabetic 基线，那么ideograhpic基线位置在字符本身的底部。</li>
         * <li>"bottom" 文本基线在文本块的底部。 与 ideographic 基线的区别在于 ideographic 基线不需要考虑下行字母。</li>
         * </ul>
         * @default "alphabetic"
         * @version Egret 2.0
         * @platform Web,Native
         */
        textBaseline: string;
        private $font;
        private $fontSize;
        /**
         * @private
         * 当前的字体样式
         * @version Egret 2.0
         * @platform Web,Native
         */
        font: string;
        /**
         * @private
         * 绘制一段圆弧路径。圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
         * @param x 圆弧中心（圆心）的 x 轴坐标。
         * @param y 圆弧中心（圆心）的 y 轴坐标。
         * @param radius 圆弧的半径。
         * @param startAngle 圆弧的起始点， x轴方向开始计算，单位以弧度表示。
         * @param endAngle 圆弧的重点， 单位以弧度表示。
         * @param anticlockwise 如果为 true，逆时针绘制圆弧，反之，顺时针绘制。
         * @version Egret 2.0
         * @platform Web,Native
         */
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
        /**
         * @private
         * 绘制一段二次贝塞尔曲线路径。它需要2个点。 第一个点是控制点，第二个点是终点。 起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 moveTo() 方法进行改变。
         * @param cpx 控制点的 x 轴坐标。
         * @param cpy 控制点的 y 轴坐标。
         * @param x 终点的 x 轴坐标。
         * @param y 终点的 y 轴坐标。
         * @version Egret 2.0
         * @platform Web,Native
         */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
        /**
         * @private
         * 使用直线连接子路径的终点到x，y坐标。
         * @param x 直线终点的 x 轴坐标。
         * @param y 直线终点的 y 轴坐标。
         * @version Egret 2.0
         * @platform Web,Native
         */
        lineTo(x: number, y: number): void;
        /**
         * @private
         * 根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。
         * @param fillRule 一种算法，决定点是在路径内还是在路径外。允许的值：
         * "nonzero": 非零环绕规则， 默认的规则。
         * "evenodd": 奇偶环绕规则。
         * @version Egret 2.0
         * @platform Web,Native
         */
        fill(fillRule?: string): void;
        /**
         * @private
         * 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
         * @version Egret 2.0
         * @platform Web,Native
         */
        closePath(): void;
        /**
         * @private
         * 创建一段矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height。矩形的4个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Egret 2.0
         * @platform Web,Native
         */
        rect(x: number, y: number, w: number, h: number): void;
        /**
         * @private
         * 将一个新的子路径的起始点移动到(x，y)坐标
         * @param x 点的 x 轴
         * @param y 点的 y 轴
         * @version Egret 2.0
         * @platform Web,Native
         */
        moveTo(x: number, y: number): void;
        /**
         * @private
         * 绘制一个填充矩形。矩形的起点在 (x, y) 位置，矩形的尺寸是 width 和 height ，fillStyle 属性决定矩形的样式。
         * @param x 矩形起始点的 x 轴坐标。
         * @param y 矩形起始点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Egret 2.0
         * @platform Web,Native
         */
        fillRect(x: number, y: number, w: number, h: number): void;
        /**
         * @private
         * 绘制一段三次贝赛尔曲线路径。该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，
         * 绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。
         * @param cp1x 第一个控制点的 x 轴坐标。
         * @param cp1y 第一个控制点的 y 轴坐标。
         * @param cp2x 第二个控制点的 x 轴坐标。
         * @param cp2y 第二个控制点的 y 轴坐标。
         * @param x 结束点的 x 轴坐标。
         * @param y 结束点的 y 轴坐标。
         * @version Egret 2.0
         * @platform Web,Native
         */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        /**
         * @private
         * 根据当前的画线样式，绘制当前或已经存在的路径的方法。
         * @version Egret 2.0
         * @platform Web,Native
         */
        stroke(): void;
        /**
         * @private
         * 使用当前的绘画样式，描绘一个起点在 (x, y) 、宽度为 w 、高度为 h 的矩形的方法。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Egret 2.0
         * @platform Web,Native
         */
        strokeRect(x: number, y: number, w: number, h: number): void;
        /**
         * @private
         * 清空子路径列表开始一个新路径。 当你想创建一个新的路径时，调用此方法。
         * @version Egret 2.0
         * @platform Web,Native
         */
        beginPath(): void;
        /**
         * @private
         * 根据控制点和半径绘制一段圆弧路径，使用直线连接前一个点。
         * @param x1 第一个控制点的 x 轴坐标。
         * @param y1 第一个控制点的 y 轴坐标。
         * @param x2 第二个控制点的 x 轴坐标。
         * @param y2 第二个控制点的 y 轴坐标。
         * @param radius 圆弧的半径。
         * @version Egret 2.0
         * @platform Web,Native
         */
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
        /**
         * @private
         * 使用方法参数描述的矩阵多次叠加当前的变换矩阵。
         * @param a 水平缩放。
         * @param b 水平倾斜。
         * @param c 垂直倾斜。
         * @param d 垂直缩放。
         * @param tx 水平移动。
         * @param ty 垂直移动。
         * @version Egret 2.0
         * @platform Web,Native
         */
        transform(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
        /**
         * @private
         * 通过在网格中移动 surface 和 surface 原点 x 水平方向、原点 y 垂直方向，添加平移变换
         * @param x 水平移动。
         * @param y 垂直移动。
         * @version Egret 2.0
         * @platform Web,Native
         */
        translate(x: number, y: number): void;
        /**
         * @private
         * 根据 x 水平方向和 y 垂直方向，为 surface 单位添加缩放变换。
         * @param x 水平方向的缩放因子。
         * @param y 垂直方向的缩放因子。
         * @version Egret 2.0
         * @platform Web,Native
         */
        scale(x: number, y: number): void;
        /**
         * @private
         * 在变换矩阵中增加旋转，角度变量表示一个顺时针旋转角度并且用弧度表示。
         * @param angle 顺时针旋转的弧度。
         * @version Egret 2.0
         * @platform Web,Native
         */
        rotate(angle: number): void;
        /**
         * @private
         * 恢复到最近的绘制样式状态，此状态是通过 save() 保存到”状态栈“中最新的元素。
         * @version Egret 2.0
         * @platform Web,Native
         */
        restore(): void;
        private $saveList;
        /**
         * @private
         * 使用栈保存当前的绘画样式状态，你可以使用 restore() 恢复任何改变。
         * @version Egret 2.0
         * @platform Web,Native
         */
        save(): void;
        private $clipRect;
        private $saveCount;
        private $clipList;
        /**
         * @private
         * 从当前路径创建一个剪切路径。在 clip() 调用之后，绘制的所有信息只会出现在剪切路径内部。
         * @version Egret 2.0
         * @platform Web,Native
         */
        clip(fillRule?: string): void;
        /**
         * @private
         * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Egret 2.0
         * @platform Web,Native
         */
        clearRect(x: number, y: number, width: number, height: number): void;
        /**
         * @private
         * 重新设置当前的变换为单位矩阵，并使用同样的变量调用 transform() 方法。
         * @param a 水平缩放。
         * @param b 水平倾斜。
         * @param c 垂直倾斜。
         * @param d 垂直缩放。
         * @param tx 水平移动。
         * @param ty 垂直移动。
         * @version Egret 2.0
         * @platform Web,Native
         */
        setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
        private $setTransformToNative();
        /**
         * @private
         * 创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性的 GraphicsGradient 对象。
         * @param x0 起点的 x 轴坐标。
         * @param y0 起点的 y 轴坐标。
         * @param x1 终点的 x 轴坐标。
         * @param y1 终点的 y 轴坐标。
         * @version Egret 2.0
         * @platform Web,Native
         */
        createLinearGradient(x0: number, y0: number, x1: number, y1: number): GraphicsGradient;
        /**
         * @private
         * 根据参数确定的两个圆的坐标，创建一个放射性渐变。该方法返回一个放射性的 GraphicsGradient。
         * @param x0 开始圆形的 x 轴坐标。
         * @param y0 开始圆形的 y 轴坐标。
         * @param r0 开始圆形的半径。
         * @param x1 结束圆形的 x 轴坐标。
         * @param y1 结束圆形的 y 轴坐标。
         * @param r1 结束圆形的半径。
         * @version Egret 2.0
         * @platform Web,Native
         */
        createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): GraphicsGradient;
        /**
         * @private
         * 在(x,y)位置绘制（填充）文本。
         * @version Egret 2.0
         * @platform Web,Native
         */
        fillText(text: string, x: number, y: number, maxWidth?: number): void;
        private $hasStrokeText;
        strokeText(text: string, x: number, y: number, maxWidth: number): void;
        /**
         * @private
         * 测量指定文本宽度，返回 TextMetrics 对象。
         * @version Egret 2.0
         * @platform Web,Native
         */
        measureText(text: string): TextMetrics;
        /**
         * @private
         * 注意：如果要对绘制的图片进行缩放，出于性能优化考虑，系统不会主动去每次重置imageSmoothingEnabled属性，因此您在调用drawImage()方法前请务必
         * 确保 imageSmoothingEnabled 已被重置为正常的值，否则有可能沿用上个显示对象绘制过程留下的值。
         * @version Egret 2.0
         * @platform Web,Native
         */
        drawImage(image: BitmapData, offsetX: number, offsetY: number, width?: number, height?: number, surfaceOffsetX?: number, surfaceOffsetY?: number, surfaceImageWidth?: number, surfaceImageHeight?: number): void;
        /**
         * @private
         * 基于指定的源图象(BitmapData)创建一个模板，通过repetition参数指定源图像在什么方向上进行重复，返回一个GraphicsPattern对象。
         * @param bitmapData 做为重复图像源的 BitmapData 对象。
         * @param repetition 指定如何重复图像。
         * 可能的值有："repeat" (两个方向重复),"repeat-x" (仅水平方向重复),"repeat-y" (仅垂直方向重复),"no-repeat" (不重复).
         * @version Egret 2.0
         * @platform Web,Native
         */
        createPattern(image: BitmapData, repetition: string): GraphicsPattern;
        /**
         * @private
         * 返回一个 ImageData 对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
         * @version Egret 2.0
         * @platform Web,Native
         */
        getImageData(sx: number, sy: number, sw: number, sh: number): sys.ImageData;
        begin(): void;
        end(): void;
    }
}

declare module egret.web {
    /**
     * @private
     * @inheritDoc
     */
    class NativeSound extends egret.EventDispatcher implements egret.Sound {
        /**
         * @language en_US
         * Background music
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 背景音乐
         * @version Egret 2.0
         * @platform Web,Native
         */
        static MUSIC: string;
        /**
         * @language en_US
         * EFFECT
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 音效
         * @version Egret 2.0
         * @platform Web,Native
         */
        static EFFECT: string;
        /**
         * @private
         */
        type: string;
        /**
         * @private
         */
        private url;
        /**
         * @private
         */
        private originAudio;
        /**
         * @private
         */
        private loaded;
        /**
         * @private
         * @inheritDoc
         */
        constructor();
        /**
         * @inheritDoc
         */
        load(url: string): void;
        /**
         * @inheritDoc
         */
        play(startTime?: number, loops?: number): SoundChannel;
        /**
         * @inheritDoc
         */
        close(): void;
        /**
         * @private
         */
        private static audios;
        static $clear(url: string): void;
        static $pop(url: string): HTMLAudioElement;
        static $recycle(url: string, audio: HTMLAudioElement): void;
    }
}

declare module egret.web {
    /**
     * @private
     * @inheritDoc
     */
    class NativeSoundChannel extends egret.EventDispatcher implements egret.SoundChannel {
        /**
         * @private
         */
        $url: string;
        /**
         * @private
         */
        $loops: number;
        /**
         * @private
         */
        $startTime: number;
        /**
         * @private
         */
        private audio;
        private isStopped;
        /**
         * @private
         */
        constructor(audio: any);
        $play(): void;
        /**
         * @private
         */
        private onPlayEnd;
        /**
         * @private
         * @inheritDoc
         */
        stop(): void;
        /**
         * @private
         * @inheritDoc
         */
        /**
         * @inheritDoc
         */
        volume: number;
        /**
         * @private
         * @inheritDoc
         */
        position: number;
    }
}

declare module egret.native {
    /**
     * @private
     */
    function getOption(key: string): string;
}

declare module egret.native {
    /**
     * @private
     * ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。
     */
    class NativeImageLoader extends EventDispatcher implements ImageLoader {
        /**
         * @private
         * 使用 load() 方法加载成功的 BitmapData 图像数据。
         */
        data: BitmapData;
        /**
         * @private
         * 当从其他站点加载一个图片时，指定是否启用跨域资源共享(CORS)，默认值为null。
         * 可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。
         */
        crossOrigin: string;
        /**
         * @private
         *
         * @param url
         * @param callback
         */
        load(url: string): void;
        private check(url);
        private download(url);
        private loadTexture(url);
        /**
         * 是否是网络地址
         * @param url
         * @returns {boolean}
         */
        private isNetUrl(url);
    }
}

declare module egret.native {
    /**
     * @private
     */
    class NativeNetContext extends HashObject implements NetContext {
        static __use_asyn: boolean;
        constructor();
        private urlData;
        private _versionCtr;
        initVersion(ctr: VersionController): void;
        /**
         * @method egret.HTML5NetContext#proceed
         * @param loader {URLLoader}
         */
        proceed(loader: URLLoader): void;
        private getHeaderString(request);
        private loadSound(loader);
        private loadTexture(loader);
        /**
         * 是否是网络地址
         * @param url
         * @returns {boolean}
         */
        private isNetUrl(url);
        /**
         * 获取虚拟url
         * @param url
         * @returns {string}
         */
        getVirtualUrl(url: string): string;
        /**
         * 获取变化列表
         * @deprecated
         * @returns {any}
         */
        getChangeList(): Array<any>;
        static _instance: NativeNetContext;
        static getNetContext(): NativeNetContext;
    }
}

