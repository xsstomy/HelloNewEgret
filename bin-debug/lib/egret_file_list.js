var egret_file_list = [
	"core/egret/i18n/tr.js",
	"core/egret/i18n/en_US.js",
	"core/egret/i18n/zh_CN.js",
	"core/egret/utils/registerClass.js",
	"core/Defines.debug.js",
	"core/egret/utils/extends.js",
	"core/egret/utils/NumberUtils.js",
	"core/egret/utils/HashObject.js",
	"core/egret/utils/ByteArray.js",
	"core/egret/utils/getDefinitionByName.js",
	"core/egret/utils/getQualifiedClassName.js",
	"core/egret/utils/getQualifiedSuperclassName.js",
	"core/egret/utils/getTimer.js",
	"core/egret/utils/toColorString.js",
	"core/egret/utils/is.js",
	"core/egret/utils/NONE.js",
	"core/egret/utils/startTick.js",
	"core/egret/utils/stopTick.js",
	"core/egret/utils/XML.js",
	"core/egret/utils/callLater.js",
	"core/egret/utils/Logger.js",
	"core/egret/utils/hasDefinition.js",
	"core/egret/utils/getOption.js",
	"core/egret/geom/Matrix.js",
	"core/egret/geom/Point.js",
	"core/egret/geom/Rectangle.js",
	"core/egret/events/EventDispatcher.js",
	"core/egret/utils/Timer.js",
	"core/egret/events/Event.js",
	"core/egret/events/ProgressEvent.js",
	"core/egret/events/TimerEvent.js",
	"core/egret/events/TouchEvent.js",
	"core/egret/events/HTTPStatusEvent.js",
	"core/egret/events/IOErrorEvent.js",
	"core/egret/events/TextEvent.js",
	"core/egret/events/FocusEvent.js",
	"core/egret/events/GeolocationEvent.js",
	"core/egret/events/OrientationEvent.js",
	"core/egret/display/BlendMode.js",
	"core/egret/display/DisplayObject.js",
	"core/egret/display/Bitmap.js",
	"core/egret/display/BitmapFillMode.js",
	"core/egret/display/Texture.js",
	"core/egret/display/RenderTexture.js",
	"core/egret/display/DisplayObjectContainer.js",
	"core/egret/display/GraphicsRenderContext.js",
	"core/egret/display/Graphics.js",
	"core/egret/display/Shape.js",
	"core/egret/display/Sprite.js",
	"core/egret/display/Stage.js",
	"core/egret/display/SpriteSheet.js",
	"core/egret/net/HttpMethod.js",
	"core/egret/net/HttpResponseType.js",
	"core/egret/net/HttpRequest.js",
	"core/egret/net/ImageLoader.js",
	"core/egret/player/EgretEntry.js",
	"core/egret/player/OrientationMode.js",
	"core/egret/player/DirtyRegion.js",
	"core/egret/player/DisplayList.js",
	"core/egret/player/Player.js",
	"core/egret/player/Region.js",
	"core/egret/player/StageScaleMode.js",
	"core/egret/player/ScreenAdapter.js",
	"core/egret/player/SurfaceFactory.js",
	"core/egret/player/SystemTicker.js",
	"core/egret/player/TouchHandler.js",
	"core/egret/system/Capabilities.js",
	"core/egret/system/Console.js",
	"core/egret/text/HorizontalAlign.js",
	"core/egret/text/TextFieldType.js",
	"core/egret/text/TextField.js",
	"core/egret/text/VerticalAlign.js",
	"core/egret/text/TextFieldUtils.js",
	"core/egret/text/StageText.js",
	"core/egret/text/InputController.js",
	"core/egret/text/HtmlTextParser.js",
	"core/egret/text/BitmapFont.js",
	"core/egret/text/BitmapText.js",
	"core/egret/localStorage/localStorage.js",
	"core/egret/external/ExternalInterface.js",
	"core/egret/filters/Filter.js",
	"core/egret/filters/GlowFilter.js",
	"core/egret/filters/BlurFilter.js",
	"core/egret/filters/ColorMatrixFilter.js",
	"core/egret/filters/DropShadowFilter.js",
	"core/egret/media/Sound.js",
	"core/egret/media/Video.js",
	"core/extension/game/utils/setTimeout.js",
	"core/extension/game/utils/setInterval.js",
	"core/extension/game/utils/Injector.js",
	"core/extension/game/utils/Recycler.js",
	"core/extension/game/system/MainContext.js",
	"core/extension/game/display/FrameLabel.js",
	"core/extension/game/display/MovieClipEvent.js",
	"core/extension/game/display/MovieClipData.js",
	"core/extension/game/display/MovieClipDataFactory.js",
	"core/extension/game/display/MovieClip.js",
	"core/extension/game/display/ScrollView.js",
	"core/extension/game/display/ScrollViewProperties.js",
	"core/extension/tween/Tween.js",
	"core/extension/tween/Ease.js",
	"core/extension/game/net/IVersionController.js",
	"core/extension/game/net/URLRequestMethod.js",
	"core/extension/game/net/URLLoaderDataFormat.js",
	"core/extension/game/net/URLVariables.js",
	"core/extension/game/net/URLRequestHeader.js",
	"core/extension/game/net/URLRequest.js",
	"core/extension/game/net/URLLoader.js",
	"core/extension/game/net/NetContext.js",
	"core/extension/game/player/Ticker.js",
	"core/egret/text/web/HTML5StageText.js",
	"core/egret/localStorage/web/WebLocalStorage.js",
	"core/egret/external/web/WebExternalInterface.js",
	"core/egret/web/CanvasFactory.js",
	"core/egret/web/EgretWeb.js",
	"core/egret/web/WebBitmapData.js",
	"core/egret/web/WebCapability.js",
	"core/egret/web/WebPlayer.js",
	"core/egret/web/WebTouchHandler.js",
	"core/egret/web/WebXML.js",
	"core/egret/web/WebHideHandler.js",
	"core/egret/media/web/QQSound.js",
	"core/egret/media/web/QQSoundChannel.js",
	"core/egret/media/web/WebAudioSound.js",
	"core/egret/media/web/WebAudioSoundChannel.js",
	"core/egret/media/web/HtmlSound.js",
	"core/egret/media/web/HtmlSoundChannel.js",
	"core/egret/media/web/WebVideo.js",
	"core/egret/web/WebGetOption.js",
	"core/egret/web/WebTexture.js",
	"core/egret/web/Html5Capatibility.js",
	"core/egret/net/web/WebHttpRequest.js",
	"core/egret/net/web/WebImageLoader.js",
	"core/extension/game/web/HTML5NetContext.js",
	"core/extension/version/DefaultLoadingView.js",
	"core/extension/version/Html5VersionController.js",
	"core/extension/resource/events/ResourceEvent.js",
	"core/extension/resource/core/ResourceItem.js",
	"core/extension/resource/core/ResourceConfig.js",
	"core/extension/resource/core/ResourceLoader.js",
	"core/extension/resource/analyzer/AnalyzerBase.js",
	"core/extension/resource/analyzer/BinAnalyzer.js",
	"core/extension/resource/analyzer/ImageAnalyzer.js",
	"core/extension/resource/analyzer/JsonAnalyzer.js",
	"core/extension/resource/analyzer/TextAnalyzer.js",
	"core/extension/resource/analyzer/SheetAnalyzer.js",
	"core/extension/resource/analyzer/FontAnalyzer.js",
	"core/extension/resource/analyzer/SoundAnalyzer.js",
	"core/extension/resource/analyzer/XMLAnalyzer.js",
	"core/extension/resource/Resource.js"
];