// place any jQuery/helper plugins in here, instead of separate, slower script files.

//= require "plugins/_jquery.imagesloaded"
//= require "plugins/_jquery.jtweetsanywhere"
//= require "plugins/_jquery.wookmark"
//= require "plugins/_jquery.touchwipe"
//= require "plugins/_jquery.caroufredsel"
//= require "plugins/_jquery.dropkick"
//= require "plugins/_jquery.gallery"
//= require "plugins/_jquery.jplayer"
//= require "plugins/_jquery.gmap3"


// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());