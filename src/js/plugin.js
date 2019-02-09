(function (videojs) {
    var Plugin = videojs.getPlugin('plugin');
    var DanmuPlugin = videojs.extend(Plugin, {

        constructor: function (player, options) {
            Plugin.call(this, player, options);

            if (options && options.customClass) {
                player.addClass(options.customClass);
            }

            player.on('playing', function () {
                videojs.log('playback began!');
            });
            this.on("dispose", function () {

            })
            this.on("statechanged", function (e) {
                console.log('state is changed: ', e)
                if (e.changes && e.changes.customClass) {
                    this.player
                        .removeClass(e.changes.customClass.from)
                        .addClass(e.changes.customClass.to);
                }
            });;
            var _this = this;
            setTimeout(function () {
                _this.trigger("hehe");
            }, 3000);
        }
    });
    DanmuPlugin.prototype.updateState = function (state) {
        this.setState({
            isShowDanmu: state
        });
        this.logState()
    }

    DanmuPlugin.prototype.logState = function () {
        // videojs.log(`the player is now ${this.state.playing ? 'playing' : 'paused'}`);
    }



    videojs.registerPlugin('danmuPlugin', DanmuPlugin);
    // console.log('注册')
})(videojs);

// danmuPlugin.defaultState = {
//     customClass: 'default-custom-class'
//   };

// player.danmuPlugin().on('statechanged', function(e) {
//     if (e.changes && e.changes.customClass) {
//       this.player
//         .removeClass(e.changes.customClass.from)
//         .addClass(e.changes.customClass.to);
//     }
//   });




/**
 * 弹幕按钮 
 * @params
 * 
 * option:{
 * isShowDanmum：默认不开启字幕 boolean
 * showDanmu:开启字幕的回掉函数 function
 * hideDanmu:关闭弹幕的毁掉函数  function
 * 
 * }
 * 
 * 
 */
var danmakuShow = false;
var Commponet = videojs.getComponent('Component');
var Button = videojs.getComponent('Button');
var DanButton = videojs.extend(Button, {
    constructor: function (player, options) {
        Button.apply(this, arguments);
        this._options_ = options
        // this.controlText("弹幕开关");
        // this.controlText(options && options.controlText || this.localize('Barrage Switch'));
        this.isShowDanmu = true;
        // this.on("click", this.handleClick);
        this.el_.setAttribute("aria-disabled",false)
    },
    createEl: function () {
        return videojs.dom.createEl('button', {
            id: "danmu-swh-btn-ct",
            titile: "开/关字幕",
            tabIndex: 8,
            className:  new Button().buildCSSClass(),
            innerHTML: '<div class="danmu-swh-btn show "><i title="弹幕开关"></i></div>'
        })
    },

    buildCSSClass: function () {
        return " icon-danmaku vjs-control vjs-button ";
    },

    // Button点击自动派发
    handleClick: function (e) {
        // console.log(this._options_)
        e.stopPropagation();
        var danmuBtn= this.el_.firstChild;
        var className =danmuBtn.className
        if (this.isShowDanmu) {
            this.isShowDanmu = false;
            danmuBtn.className = className.replace(/show/g, 'hide');
            //  danmuBtn.removeClass("show").addClass("hide")
            this._options_ && this._options_.hideDanmu && this._options_.hideDanmu()
            // console.log("关闭弹幕");
        } else {
            this.isShowDanmu = true;
            danmuBtn.className = className.replace(/hide/g, 'show');
            // danmuBtn.removeClass("hide").addClass("show")
            this._options_ && this._options_.showDanmu && this._options_.showDanmu()
            // console.log("显示弹幕");
        }
    }
});
videojs.registerComponent('DanmuButton', DanButton);

// 弹幕容器
// var Commponet = videojs.getComponent('Component');
var DanView = videojs.extend(Commponet, {
    constructor: function (player, options) {
        this.player_ = player
        Commponet.apply(this, arguments);
        // this.el()
        this.on("click", this.handleClick);

    },
    createEl: function () {
        return videojs.dom.createEl('div', {
            id: "danmu",
            className: "container",
            innerHTML: '<div id="damucontainer" class="container"> </div>'
        })
    },
    buildCSSClass: function () {
        return "danmu_view";
    },
    handleClick: function (e) {
        e.stopPropagation();
        if (this.player_.paused()) {
            this.player_.play();
        } else {
            this.player_.pause();
        }
    }
});

videojs.registerComponent('DanView', DanView);