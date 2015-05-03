/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


window[(typeof (djConfig)!="undefined"&&djConfig.scopeMap&&djConfig.scopeMap[0][1])||"dojo"]._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.fx"],["require","dojo.fx.Toggler"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.fx"]){_4._hasResource["dojo.fx"]=true;_4.provide("dojo.fx");_4.require("dojo.fx.Toggler");(function(){var d=_4,_7={_fire:function(_8,_9){if(this[_8]){this[_8].apply(this,_9||[]);}return this;}};var _a=function(_b){this._index=-1;this._animations=_b||[];this._current=this._onAnimateCtx=this._onEndCtx=null;this.duration=0;d.forEach(this._animations,function(a){this.duration+=a.duration;if(a.delay){this.duration+=a.delay;}},this);};d.extend(_a,{_onAnimate:function(){this._fire("onAnimate",arguments);},_onEnd:function(){d.disconnect(this._onAnimateCtx);d.disconnect(this._onEndCtx);this._onAnimateCtx=this._onEndCtx=null;if(this._index+1==this._animations.length){this._fire("onEnd");}else{this._current=this._animations[++this._index];this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");this._current.play(0,true);}},play:function(_c,_d){if(!this._current){this._current=this._animations[this._index=0];}if(!_d&&this._current.status()=="playing"){return this;}var _e=d.connect(this._current,"beforeBegin",this,function(){this._fire("beforeBegin");}),_f=d.connect(this._current,"onBegin",this,function(arg){this._fire("onBegin",arguments);}),_10=d.connect(this._current,"onPlay",this,function(arg){this._fire("onPlay",arguments);d.disconnect(_e);d.disconnect(_f);d.disconnect(_10);});if(this._onAnimateCtx){d.disconnect(this._onAnimateCtx);}this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");if(this._onEndCtx){d.disconnect(this._onEndCtx);}this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");this._current.play.apply(this._current,arguments);return this;},pause:function(){if(this._current){var e=d.connect(this._current,"onPause",this,function(arg){this._fire("onPause",arguments);d.disconnect(e);});this._current.pause();}return this;},gotoPercent:function(_11,_12){this.pause();var _13=this.duration*_11;this._current=null;d.some(this._animations,function(a){if(a.duration<=_13){this._current=a;return true;}_13-=a.duration;return false;});if(this._current){this._current.gotoPercent(_13/this._current.duration,_12);}return this;},stop:function(_14){if(this._current){if(_14){for(;this._index+1<this._animations.length;++this._index){this._animations[this._index].stop(true);}this._current=this._animations[this._index];}var e=d.connect(this._current,"onStop",this,function(arg){this._fire("onStop",arguments);d.disconnect(e);});this._current.stop();}return this;},status:function(){return this._current?this._current.status():"stopped";},destroy:function(){if(this._onAnimateCtx){d.disconnect(this._onAnimateCtx);}if(this._onEndCtx){d.disconnect(this._onEndCtx);}}});d.extend(_a,_7);_4.fx.chain=function(_15){return new _a(_15);};var _16=function(_17){this._animations=_17||[];this._connects=[];this._finished=0;this.duration=0;d.forEach(_17,function(a){var _18=a.duration;if(a.delay){_18+=a.delay;}if(this.duration<_18){this.duration=_18;}this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));},this);this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});var _19=this;d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){_19._connects.push(d.connect(_19._pseudoAnimation,evt,function(){_19._fire(evt,arguments);}));});};d.extend(_16,{_doAction:function(_1a,_1b){d.forEach(this._animations,function(a){a[_1a].apply(a,_1b);});return this;},_onEnd:function(){if(++this._finished>this._animations.length){this._fire("onEnd");}},_call:function(_1c,_1d){var t=this._pseudoAnimation;t[_1c].apply(t,_1d);},play:function(_1e,_1f){this._finished=0;this._doAction("play",arguments);this._call("play",arguments);return this;},pause:function(){this._doAction("pause",arguments);this._call("pause",arguments);return this;},gotoPercent:function(_20,_21){var ms=this.duration*_20;d.forEach(this._animations,function(a){a.gotoPercent(a.duration<ms?1:(ms/a.duration),_21);});this._call("gotoPercent",arguments);return this;},stop:function(_22){this._doAction("stop",arguments);this._call("stop",arguments);return this;},status:function(){return this._pseudoAnimation.status();},destroy:function(){d.forEach(this._connects,_4.disconnect);}});d.extend(_16,_7);_4.fx.combine=function(_23){return new _16(_23);};_4.fx.wipeIn=function(_24){var _25=_24.node=d.byId(_24.node),s=_25.style,o;var _26=d.animateProperty(d.mixin({properties:{height:{start:function(){o=s.overflow;s.overflow="hidden";if(s.visibility=="hidden"||s.display=="none"){s.height="1px";s.display="";s.visibility="";return 1;}else{var _27=d.style(_25,"height");return Math.max(_27,1);}},end:function(){return _25.scrollHeight;}}}},_24));d.connect(_26,"onEnd",function(){s.height="auto";s.overflow=o;});return _26;};_4.fx.wipeOut=function(_28){var _29=_28.node=d.byId(_28.node),s=_29.style,o;var _2a=d.animateProperty(d.mixin({properties:{height:{end:1}}},_28));d.connect(_2a,"beforeBegin",function(){o=s.overflow;s.overflow="hidden";s.display="";});d.connect(_2a,"onEnd",function(){s.overflow=o;s.height="auto";s.display="none";});return _2a;};_4.fx.slideTo=function(_2b){var _2c=_2b.node=d.byId(_2b.node),top=null,_2d=null;var _2e=(function(n){return function(){var cs=d.getComputedStyle(n);var pos=cs.position;top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);_2d=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);if(pos!="absolute"&&pos!="relative"){var ret=d.position(n,true);top=ret.y;_2d=ret.x;n.style.position="absolute";n.style.top=top+"px";n.style.left=_2d+"px";}};})(_2c);_2e();var _2f=d.animateProperty(d.mixin({properties:{top:_2b.top||0,left:_2b.left||0}},_2b));d.connect(_2f,"beforeBegin",_2f,_2e);return _2f;};})();}}};});