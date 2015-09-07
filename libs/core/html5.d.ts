declare module egret.web {
    /**
     * @classdesc
     * @extends egret.StageText
     * @private
     */
    class HTML5StageText extends EventDispatcher implements StageText {
        /**
         * @private
         */
        private htmlInput;
        /**
         * @private
         */
        constructor();
        /**
         * @private
         */
        $textfield: egret.TextField;
        /**
         * @private
         *
         * @param textfield
         */
        $setTextField(textfield: egret.TextField): void;
        /**
         * @private
         */
        private _isNeedShow;
        /**
         * @private
         */
        private inputElement;
        /**
         * @private
         */
        private inputDiv;
        /**
         * @private
         */
        private _gscaleX;
        /**
         * @private
         */
        private _gscaleY;
        /**
         * @private
         *
         */
        $addToStage(): void;
        /**
         * @private
         *
         */
        private _initElement();
        /**
         * @private
         *
         */
        $show(): void;
        /**
         * @private
         *
         */
        private onBlurHandler();
        /**
         * @private
         *
         */
        private executeShow();
        /**
         * @private
         */
        private _isNeesHide;
        /**
         * @private
         *
         */
        $hide(): void;
        /**
         * @private
         */
        private textValue;
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
        private resetText();
        $onBlur(): void;
        /**
         * @private
         *
         */
        _onInput(): void;
        private setAreaHeight();
        /**
         * @private
         *
         * @param e
         */
        _onClickHandler(e: any): void;
        /**
         * @private
         *
         */
        _onDisconnect(): void;
        /**
         * @private
         */
        private _styleInfoes;
        /**
         * @private
         *
         * @param style
         * @param value
         */
        private setElementStyle(style, value);
        /**
         * @private
         *
         */
        $removeFromStage(): void;
        /**
         * 修改位置
         * @private
         */
        $resetStageText(): void;
    }
}
declare module egret.web {
    /**
     * @private
     */
    class HTMLInput {
        /**
         * @private
         */
        private _stageText;
        /**
         * @private
         */
        private _simpleElement;
        /**
         * @private
         */
        private _multiElement;
        /**
         * @private
         */
        private _inputElement;
        /**
         * @private
         */
        _inputDIV: any;
        /**
         * @private
         *
         * @returns
         */
        isInputOn(): boolean;
        /**
         * @private
         *
         * @param stageText
         * @returns
         */
        isCurrentStageText(stageText: any): boolean;
        /**
         * @private
         *
         * @param dom
         */
        private initValue(dom);
        /**
         * @private
         */
        _needShow: boolean;
        /**
         * @private
         */
        $scaleX: number;
        /**
         * @private
         */
        $scaleY: number;
        /**
         * @private
         *
         */
        $updateSize(): void;
        /**
         * @private
         */
        private StageDelegateDiv;
        /**
         * @private
         */
        private canvas;
        /**
         * @private
         *
         * @param container
         * @param canvas
         * @returns
         */
        _initStageDelegateDiv(container: any, canvas: any): any;
        private initInputElement(multiline);
        /**
         * @private
         *
         */
        show(): void;
        /**
         * @private
         *
         * @param stageText
         */
        disconnectStageText(stageText: any): void;
        /**
         * @private
         *
         */
        clearInputElement(): void;
        /**
         * @private
         *
         * @param stageText
         * @returns
         */
        getInputElement(stageText: any): any;
    }
}
declare module egret.web {
    /**
     * @private
     * 获取
     */
    function $getTextAdapter(textfield: TextField): HTMLInput;
    /**
     * @private
     */
    function $cacheTextAdapter(adapter: HTMLInput, stage: any, container: HTMLDivElement, canvas: any): void;
}

declare module egret.localStorage.web {
}

declare module egret.web {
    /**
     * @private
     */
    class WebExternalInterface implements ExternalInterface {
        /**
         * @private
         * @param functionName
         * @param value
         */
        static call(functionName: string, value: string): void;
        /**
         * @private
         * @param functionName
         * @param listener
         */
        static addCallback(functionName: string, listener: (value) => void): void;
    }
}

declare module egret.web {
    /**
     * @private
     */
    class CanvasFactory implements sys.SurfaceFactory {
        /**
         * @private
         */
        constructor();
        /**
         * @private
         * 从对象池取出或创建一个新的Surface实例
         * @param useOnce 表示对取出实例的使用是一次性的，用完后立即会释放。
         */
        create(useOnce?: boolean): sys.Surface;
        /**
         * @private
         * 释放一个Surface实例
         * @param surface 要释放的Surface实例
         */
        release(surface: sys.Surface): void;
        /**
         * @private
         * 检测创建的canvas是否有效，QQ浏览器对硬件内存小等于1G的手机，限制Canvas创建的数量为19个。
         * 针对这个限制,同时满足以下两个条件就不会对显示造成任何影响：
         * 1.不要嵌套使用BlendMode，即使用了混合模式的容器内部不要再设置另一个子项的混合模式。
         * 2.不要嵌套使用遮罩，即遮罩对象或被遮罩对象的内部子项不要再设置另一个遮罩。
         * cacheAsBitmap功能已经自动对这个限制做了兼容，即使设置cacheAsBitmap为true，若Canvas数量不足，将会放弃缓存，以保证渲染显示正确。
         * 另外，如果要销毁一个开启过cacheAsBitmap的显示对象，在断开引用前建议显式将cacheAsBitmap置为false，这样可以回收一个Canvas对象。
         */
        private testCanvasValid(canvas);
        /**
         * @private
         */
        private createSurface(canvas);
    }
}

declare module egret.web {
}

declare module egret.web {
    /**
     * @private
     * 转换 Image，Canvas，Video 为 Egret 框架内使用的 BitmapData 对象。
     */
    function toBitmapData(data: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): BitmapData;
}

declare module egret.web {
    /**
     * @private
     */
    class WebCapability {
        /**
         * @private
         * 检测系统属性
         */
        static detect(): void;
        /**
         * @private
         *
         */
        private static checkHtml5Support();
    }
}

declare module egret.web {
    /**
     * @private
     */
    class WebPlayer extends egret.HashObject implements egret.sys.Screen {
        constructor(container: HTMLDivElement);
        private init(container);
        /**
         * 读取初始化参数
         */
        private readOption(container);
        /**
         * @private
         * 添加canvas到container。
         */
        private attachCanvas(container, canvas);
        private playerOption;
        /**
         * @private
         * 画布实例
         */
        private canvas;
        /**
         * @private
         * 播放器容器实例
         */
        private container;
        /**
         * @private
         * 舞台引用
         */
        private stage;
        private webTouchHandler;
        private player;
        private webInput;
        private webHide;
        /**
         * @private
         * 更新播放器视口尺寸
         */
        updateScreenSize(): void;
        /**
         * @private
         * 更新触摸数量
         */
        updateMaxTouches(): void;
    }
}

declare module egret.web {
    /**
     * @private
     */
    class WebTouchHandler extends HashObject {
        /**
         * @private
         */
        constructor(stage: egret.Stage, canvas: HTMLCanvasElement);
        /**
         * @private
         */
        private canvas;
        /**
         * @private
         */
        private touch;
        /**
         * @private
         * 添加事件监听
         */
        private addListeners();
        /**
         * @private
         *
         */
        private addMouseListener();
        /**
         * @private
         *
         */
        private addTouchListener();
        /**
         * @private
         */
        private prevent(event);
        /**
         * @private
         */
        private onTouchBegin;
        /**
         * @private
         */
        private onTouchMove;
        /**
         * @private
         */
        private onTouchEnd;
        /**
         * @private
         */
        private getLocation(event);
        /**
         * @private
         */
        private scaleX;
        /**
         * @private
         */
        private scaleY;
        /**
         * @private
         */
        private rotation;
        /**
         * @private
         * 更新屏幕当前的缩放比例，用于计算准确的点击位置。
         * @param scaleX 水平方向的缩放比例。
         * @param scaleY 垂直方向的缩放比例。
         */
        updateScaleMode(scaleX: number, scaleY: number, rotation: number): void;
        /**
         * @private
         * 更新同时触摸点的数量
         */
        $updateMaxTouches(): void;
    }
}

declare module egret.web {
    /**
     * @private
     * XML节点基类
     */
    class XMLNode {
        /**
         * @private
         */
        constructor(nodeType: number, parent: XML);
        /**
         * @private
         * 节点类型，1：XML，2：XMLAttribute，3：XMLText
         */
        nodeType: number;
        /**
         * @private
         * 节点所属的父级节点
         */
        parent: XML;
    }
    /**
     * @private
     * XML节点对象
     */
    class XML extends XMLNode {
        /**
         * @private
         */
        constructor(localName: string, parent: XML, prefix: string, namespace: string, name: string);
        /**
         * @private
         * 当前节点上的属性列表
         */
        attributes: {
            [key: string]: string;
        };
        /**
         * @private
         * 当前节点的子节点列表
         */
        children: XMLNode[];
        /**
         * @private
         * 节点完整名称。例如节点 <s:Button/> 的 name 为：s:Button
         */
        name: string;
        /**
         * @private
         * 节点的命名空间前缀。例如节点 <s:Button/> 的 prefix 为：s
         */
        prefix: string;
        /**
         * @private
         * 节点的本地名称。例如节点 <s:Button/> 的 localName 为：Button
         */
        localName: string;
        /**
         * @private
         * 节点的命名空间地址。例如节点 <s:Skin xmlns:s="http://ns.egret.com/swan"/> 的 namespace 为： http://ns.egret.com/swan
         */
        namespace: string;
    }
    /**
     * @private
     * XML文本节点
     */
    class XMLText extends XMLNode {
        /**
         * @private
         */
        constructor(text: string, parent: XML);
        /**
         * @private
         * 文本内容
         */
        text: string;
    }
}

declare module egret.web {
    /**
     * @private
     */
    class WebHideHandler extends HashObject {
        /**
         * @private
         */
        private stage;
        /**
         * @private
         */
        constructor(stage: egret.Stage);
        /**
         * @private
         */
        private isActivate;
        /**
         * @private
         *
         */
        private registerListener();
    }
}

declare module QZAppExternal {
    function playLocalSound(call: any, data: any): any;
    function playLocalBackSound(call: any, data: any): any;
    function preloadSound(call: any, data: any): any;
    function stopSound(): any;
    function stopBackSound(): any;
}
declare module egret.web {
    /**
     * @private
     * @inheritDoc
     */
    class QQSound extends egret.EventDispatcher implements egret.Sound {
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
    }
}

declare module egret.web {
    /**
     * @private
     * @inheritDoc
     */
    class QQSoundChannel extends egret.EventDispatcher implements egret.SoundChannel {
        /**
         * @private
         */
        $url: string;
        /**
         * @private
         */
        $loops: number;
        $type: string;
        /**
         * @private
         */
        $startTime: number;
        private isStopped;
        /**
         * @private
         */
        constructor();
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
         */
        private _startTime;
        /**
         * @private
         * @inheritDoc
         */
        position: number;
    }
}

/**
 * @private
 */
interface AudioBuffer {
}
/**
 * @private
 */
interface AudioBufferSourceNodeEgret {
    buffer: any;
    context: any;
    onended: Function;
    stop(when?: number): void;
    noteOff(when?: number): void;
    addEventListener(type: string, listener: Function, useCapture?: boolean): any;
    removeEventListener(type: string, listener: Function, useCapture?: boolean): any;
    disconnect(): any;
}
declare module egret.web {
    class WebAudioDecode {
        /**
         * @private
         */
        static canUseWebAudio: any;
        /**
         * @private
         */
        static ctx: any;
        /**
         * @private
         */
        static decodeArr: Array<any>;
        /**
         * @private
         */
        private static isDecoding;
        /**
         * @private
         *
         */
        static decodeAudios(): void;
    }
    /**
     * @private
     * @inheritDoc
     */
    class WebAudioSound extends egret.EventDispatcher implements egret.Sound {
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
        private loaded;
        /**
         * @private
         * @inheritDoc
         */
        constructor();
        /**
         * @private
         */
        private _arrayBuffer;
        private audioBuffer;
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
    }
}

declare module egret.web {
    /**
     * @private
     * @inheritDoc
     */
    class WebAudioSoundChannel extends egret.EventDispatcher implements egret.SoundChannel {
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
         * audio音频对象
         * @member {any} egret.Sound#audio
         */
        $audioBuffer: AudioBuffer;
        /**
         * @private
         */
        private gain;
        /**
         * @private
         */
        private bufferSource;
        /**
         * @private
         */
        private context;
        private isStopped;
        /**
         * @private
         */
        constructor();
        /**
         * @private
         */
        private _currentTime;
        /**
         * @private
         */
        private _volume;
        $play(): void;
        stop(): void;
        /**
         * @private
         */
        private onPlayEnd;
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
         */
        private _startTime;
        /**
         * @private
         * @inheritDoc
         */
        position: number;
    }
}

declare module egret.web {
    /**
     * @private
     * @inheritDoc
     */
    class HtmlSound extends egret.EventDispatcher implements egret.Sound {
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
    class HtmlSoundChannel extends egret.EventDispatcher implements egret.SoundChannel {
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
        constructor(audio: HTMLAudioElement);
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

declare module egret.web {
    /**
     * @private
     * @inheritDoc
     */
    class WebVideo extends egret.DisplayObject implements egret.Video {
        /**
         * @inheritDoc
         */
        src: string;
        /**
         * @inheritDoc
         */
        poster: string;
        /**
         * @private
         */
        private posterData;
        /**
         * @private
         */
        private video;
        /**
         * @private
         */
        private loaded;
        /**
         * @private
         */
        private closed;
        /**
         * @private
         */
        private heightSet;
        /**
         * @private
         */
        private widthSet;
        /**
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
        play(startTime?: number, loop?: boolean): void;
        private goFullscreen();
        /**
         * @inheritDoc
         */
        close(): void;
        /**
         * @inheritDoc
         */
        pause(): void;
        /**
         * @inheritDoc
         */
        /**
         * @inheritDoc
         */
        volume: number;
        /**
         * @inheritDoc
         */
        /**
         * @inheritDoc
         */
        position: number;
        private _fullscreen;
        /**
         * @inheritDoc
         */
        /**
         * @inheritDoc
         */
        fullscreen: boolean;
        private _bitmapData;
        /**
         * @inheritDoc
         */
        bitmapData: BitmapData;
        private loadPoster();
        /**
         * @private
         *
         */
        private onVideoLoaded;
        /**
         * @private
         *
         */
        private onVideoEnded();
        /**
         * @private
         *
         */
        private onVideoError();
        /**
         * @private
         */
        $measureContentBounds(bounds: Rectangle): void;
        /**
         * @private
         */
        $render(context: sys.RenderContext): void;
        private markDirty(time);
        /**
         * @private
         * 设置显示高度
         */
        $setHeight(value: number): void;
        /**
         * @private
         * 设置显示宽度
         */
        $setWidth(value: number): void;
    }
}

declare module egret.web {
    /**
     * @private
     */
    function getOption(key: string): string;
}

declare module egret.web {
}

declare module egret.web {
    /**
     * @private
     */
    class AudioType {
        /**
         * @private
         */
        static QQ_AUDIO: number;
        /**
         * @private
         */
        static WEB_AUDIO: number;
        /**
         * @private
         */
        static HTML5_AUDIO: number;
    }
    /**
     * @private
     */
    class SystemOSType {
        /**
         * @private
         */
        static WPHONE: number;
        /**
         * @private
         */
        static IOS: number;
        /**
         * @private
         */
        static ADNROID: number;
    }
    /**
     * html5兼容性配置
     * @private
     */
    class Html5Capatibility extends HashObject {
        static _canUseBlob: boolean;
        static _audioType: number;
        /**
         * @private
         */
        static _AudioClass: any;
        static _audioMustLoad: boolean;
        /**
         * @private
         */
        static _QQRootPath: string;
        /**
         * @private
         */
        static _System_OS: number;
        /**
         * @private
         */
        static _WebPSupport: boolean;
        /**
         * @private
         */
        constructor();
        /**
         * @private
         */
        private static ua;
        /**
         * @private
         *
         */
        static _init(): void;
        /**
         * @private
         * 获取ios版本
         * @returns {string}
         */
        private static getIOSVersion();
        /**
         * @private
         *
         */
        private static checkHtml5Support();
    }
    /**
     * @private
     */
    function getPrefixStyleName(name: string, element?: any): string;
}

declare module egret.web {
    /**
     * @private
     */
    class WebHttpRequest extends EventDispatcher implements HttpRequest {
        /**
         * @private
         */
        constructor();
        /**
         * @private
         */
        private _xhr;
        /**
         * @private
         * 本次请求返回的数据，数据类型根据responseType设置的值确定。
         */
        response: any;
        /**
         * @private
         */
        private _responseType;
        /**
         * @private
         * 设置返回的数据格式，请使用 HttpResponseType 里定义的枚举值。设置非法的值或不设置，都将使用HttpResponseType.TEXT。
         */
        responseType: string;
        /**
         * @private
         */
        private _withCredentials;
        /**
         * @private
         * 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。(这个标志不会影响同站的请求)
         */
        withCredentials: boolean;
        /**
         * @private
         */
        private _url;
        /**
         * @private
         *
         * @returns
         */
        private getXHR();
        /**
         * @private
         * 初始化一个请求.注意，若在已经发出请求的对象上调用此方法，相当于立即调用abort().
         * @param url 该请求所要访问的URL该请求所要访问的URL
         * @param method 请求所使用的HTTP方法， 请使用 HttpMethod 定义的枚举值.
         */
        open(url: string, method?: string): void;
        /**
         * @private
         * 发送请求.
         * @param data 需要发送的数据
         */
        send(data?: any): void;
        /**
         * @private
         * 如果请求已经被发送,则立刻中止请求.
         */
        abort(): void;
        /**
         * @private
         * 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回"".
         */
        getAllResponseHeaders(): string;
        private header;
        private headerValue;
        /**
         * @private
         * 给指定的HTTP请求头赋值.在这之前,您必须确认已经调用 open() 方法打开了一个url.
         * @param header 将要被赋值的请求头名称.
         * @param value 给指定的请求头赋的值.
         */
        setRequestHeader(header: string, value: string): void;
        /**
         * @private
         * 返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回"".
         * @param header 要返回的响应头名称
         */
        getResponseHeader(header: string): string;
        /**
         * @private
         */
        private onReadyStateChange();
        /**
         * @private
         */
        private updateProgress(event);
    }
}

declare module egret.web {
    /**
     * @private
     * ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。
     */
    class WebImageLoader extends EventDispatcher implements ImageLoader {
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
         */
        private currentImage;
        /**
         * @private
         */
        private currentURL;
        /**
         * @private
         */
        private request;
        /**
         * @private
         * 启动一次图像加载。注意：若之前已经调用过加载请求，重新调用 load() 将终止先前的请求，并开始新的加载。
         * @param url 要加载的图像文件的地址。
         */
        load(url: string): void;
        /**
         * @private
         */
        private onBlobLoaded(event);
        /**
         * @private
         */
        private onBlobError(event);
        /**
         * @private
         */
        private loadImage(src);
        /**
         * @private
         */
        private onImageComplete(event);
        /**
         * @private
         */
        private onLoadError(event);
        private emitIOError(url);
        /**
         * @private
         */
        private getImage(event);
    }
}

declare module egret.web {
    /**
     * @class egret.HTML5NetContext
     * @classdesc
     * @extends egret.NetContext
     * @private
     */
    class HTML5NetContext extends HashObject implements NetContext {
        /**
         * @private
         */
        constructor();
        initVersion(ctr: VersionController): void;
        /**
         * @private
         *
         * @param loader
         */
        proceed(loader: URLLoader): void;
        /**
         * @private
         *
         * @param dataFormat
         */
        private getResponseType(dataFormat);
        /**
         * @private
         *
         * @param loader
         */
        private loadSound(loader);
        /**
         * @private
         *
         * @param loader
         */
        private loadTexture(loader);
        /**
         * @private
         *
         * @returns
         */
        getChangeList(): Array<any>;
        /**
         * @private
         * 获取虚拟url
         * @param url
         * @returns {string}
         */
        getVirtualUrl(url: string): string;
        static _instance: HTML5NetContext;
        static getNetContext(): HTML5NetContext;
    }
}

