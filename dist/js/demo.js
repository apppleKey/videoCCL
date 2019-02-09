"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
  var _options;

  var options = (_options = {
    muted: false,
    controls: true,
    height: "100%",
    width: "100%",
    loop: true,
    language: "zh-CN",
    autoplay: true,
    techOrder: ["html5"],
    html5: {
      hls: {
        widthCredentials: false
      }
    },
    controlBar: {
      ProgressControl: false,
      durationDisplay: false,
      volumePanel: {
        inline: false
      }
    },
    sources: [{
      widthCredentials: false,
      src: 'http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8',
      type: 'application/x-mpegURL'
    }, // {
    //     widthCredentials: false,
    //     src: 'http://content.bitsontherun.com/videos/bkaovAYt-52qL9xLP.mp4',
    //     type: 'video/mp4'
    // },
    {
      widthCredentials: false,
      src: 'https://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }, {
      src: 'https://vjs.zencdn.net/v/oceans.webm',
      type: 'video/webm'
    }]
  }, _defineProperty(_options, "controlBar", {
    //设置是否显示该组件
    'currentTimeDisplay': true,
    'timeDivider': true,
    'durationDisplay': false,
    'remainingTimeDisplay': false
  }), _defineProperty(_options, "volumeMenuButton", {
    inline: false,
    //设置音量bar为竖直
    vertical: true //设置音量bar为竖直

  }), _options);
  window.player = videojs("#myvideo", options, function () {
    player = this; // player.getChild('controlBar').addChild('DanButton', {}, 9);
    // 添加弹幕容器

    player.addChild('DanView', {
      isShowDanmn: true,
      stopDanmu: function stopDanmu() {
        // console.log("stopDanmu")
        DM.stop();
        clearInterval(CMtimer);
      },
      startDanmu: function startDanmu() {
        window.CMtimer = setInterval(function () {
          DM.time(Math.round(player.currentTime() * 1000));
        }, 10);
        DM.start(); // console.log("startDanmu")
      }
    }); // 添加弹幕开关

    player.controlBar.addChild("DanmuButton", {
      showDanmu: function showDanmu() {
        window.CMtimer = setInterval(function () {
          DM.time(Math.round(player.currentTime() * 1000));
        }, 10);
        DM.start();
        ;
      },
      hideDanmu: function hideDanmu() {
        DM.clear();
        clearInterval(CMtimer);
        ;
      }
    });
    var DM = initCM();
    insertDM(DM);
    player.on("timeupdate", function () {// console.log(Math.round(player.currentTime()))
      // DM&& DM.time(Math.round(player.currentTime() * 1000));
    }); // 播放暂停弹幕

    player.on("pause", function () {
      DM.stop();
      clearInterval(CMtimer);
    });
    player.on("play", function () {
      window.CMtimer = setInterval(function () {
        console.log(player.currentTime());
        DM.time(Math.round(player.currentTime() * 1000));
      }, 10);
      DM.start();
    }); //全屏触发弹幕框大小

    player.on("fullscreenchange", function () {
      DM.setBounds();
    });
    player.on("dispose", function () {
      DM.finish();
    }); // player.play();
  }); // 初始化弹幕

  function initCM() {
    var DM = new CommentManager($('#danmu')[0]);
    window.DM = DM;
    DM.init(); // 初始化

    DM.start();
    $(window).on("resize", function () {
      DM && DM.setBounds();
    });
    return DM;
    ;
    ;
  } // 插入弹幕方式一xml 
  // function insertDM(DM) {
  //     var cp = (new CommentProvider()).addStaticSource(
  //         CommentProvider.XMLProvider("GET", "/comment.xml"),
  //         CommentProvider.SOURCE_XML).addParser(
  //         new BilibiliFormat.XMLParser(),
  //         CommentProvider.SOURCE_XML).addTarget(DM);
  //     cp.start().catch(function (e) {
  //         alert(e);
  //     });
  // }
  //插入弹幕方式二


  function insertDM(DM) {
    var time = 0; // setInterval(function () {

    time++; // DM.insert({
    //     mode: 7, // 1 - 上端滚动弹幕 ,2 - 下端滚动弹幕 4 底部弹幕- 5 - 顶部弹幕 6 - 逆向弹幕  7 - 定位弹幕 
    //     stime: (player.currentTime() * 1000) + 1000,
    //     text: "弹幕嘻嘻" + time,
    //     dur: 6000,
    //     align: time % 3,
    //     size: 26,
    //     color: 0x0099ff,
    //     x: player.currentTime() * 10,
    //     y: player.currentTime() * 10,
    //     toX: 300,
    //     toY: 900,
    // })

    DM.insert({
      border: false,
      code: 't1="(村娘)「ほんとの Crazy nighT　返して頂戴！";t11="(少女)「快把真正的Crazy nighT　還給我！」";t2="(村娘)きっと　きっと　【コレ】じゃない...」";t22="(少女)「一定　一定　不會是【它】...」";function kuankuan(t,x1,y1,wz,lt,cln,n1,n2){var x1=(541-wz*0.9*t.length)/2;var cl=["0x990af3","0x0c62af","0xf70b10","0xFF1C60","0xf5c60a","0xf1f40b","0x39f55c","0x13d3be","0x000000","0xffffff"];for(var i=1;i<=t.length;i++){var getw=t.substring(i-1,i);var getx1=x1+(i-1)*wz*0.9;var w2x1=Utils.rand(-50,590);var w2y1=Utils.rand(-150,320);if(i>=n1&&i<=n2){var w=$.createComment(getw,{x:w2x1,y:w2y1,lifeTime:lt,alpha:1,motionGroup:[{fontsize:{fromValue:7*wz,toValue:wz,lifeTime:0.6},y:{fromValue:w2y1,toValue:y1,lifeTime:0.6},x:{fromValue:w2x1,toValue:getx1,lifeTime:0.6}}]});	w.color=cl[2]; 	w.fontsize=wz;	w.font="宋体";	w.filters=null;}else{	var w=$.createComment(getw,{x:w2x1,y:w2y1,lifeTime:lt,alpha:1,motionGroup:[{alpha:{fromValue:0,toValue:1,lifeTime:0.2},y:{fromValue:w2y1,toValue:y1,lifeTime:0.2},x:{fromValue:w2x1,toValue:getx1,lifeTime:0.2}}]});	w.color=cl[7];	w.fontsize=wz;	w.font="宋体";	w.filters=null;}}}timer(function(){timer(function(){kuankuan(t1,50,160,20,2.9,0,11,21);kuankuan(t11,50,190,20,2.9,0,11,21);},240);timer(function(){kuankuan(t2,50,160,20,2.2,0,13,16);kuankuan(t22,50,190,20,2.2,0,15,17);},2900);/*横*/timer(function(){var lt=3.6;var rw=5;var key1=(20+rw/2);var gety1=32+rw/2;var getx1=541;for(var i=0;i<13;i++){		if(i<8)	{gety2=192-5*(7-i);}	else{gety2=192+(i-7)*5;}		gety1=gety1+key1;	getx1=getx1*(-1);		var c= $.createCanvas({x:getx1,y:gety1,lifeTime:lt,motionGroup:[{x:{ fromValue:getx1, toValue:0,lifeTime:0.2,startDelay:50*i}},{y:{ fromValue:gety1, toValue:gety2,lifeTime:0.5,startDelay:900}}]});	var g=$.createShape({x:0,y:-rw/2,lifeTime:lt,parent:c});	g.graphics.beginFill(0x000000,1);	g.graphics.drawRect(0,0,541,rw);	}},1500);},770);',
      color: 16777215,
      date: 1354346240,
      dbid: 154733434,
      hash: "92de3cf6",
      mode: 8,
      pool: 2,
      position: "absolute",
      size: 25,
      stime: 2000
    }); // }, 1000)
  } //插入弹幕方式三  socket.IO(尚未测试)
  // function insertDM(DM) {
  //     var socket = io(); //开启流
  //     socket.on('danmaku', function (data) {
  //         // 当遇到 danmaku 事件，就把推送来的弹幕推送给 CCL
  //         var danmaku = yourFormatParser(data);
  //         DM.insert(danmaku);
  //     });
  //     $('#send-danmaku-btn').click(function () {
  //             //当按了发送弹幕的按钮
  //             var data = {
  //                 "text": "获取信息。。"
  //             }; // 通过UI获取新弹幕的信息
  //             //包装并发射弹幕
  //             socket.emit('send-danmaku', JSON.stringify(yourFormatPackager(data));
  //                 //清除 UI 文字部分
  //                 $('#send-danmaku-field').value("");
  //             });
  //     }
  // 插入弹幕方式四
  // function insertDM(DM) {
  //     var time=0
  //     setInterval(function(){
  //         time++
  //         DM.insert({
  //             mode :1,
  //             stime:time*200,
  //             text:"弹幕嘻嘻"+time,
  //             dur :4000,
  //             align :time%3,
  //             size:12,
  //             color:0x0099ff
  //         })
  //     },100)}

});