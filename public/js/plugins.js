
/* Images loaded event
 * By David Desandro
 * ------------------------ */

(function(c,n){var k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(l){function m(){var b=c(h),a=c(g);d&&(g.length?d.reject(e,b,a):d.resolve(e));c.isFunction(l)&&l.call(f,e,b,a)}function i(b,a){b.src===k||-1!==c.inArray(b,j)||(j.push(b),a?g.push(b):h.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(h),c(g)]),e.length===j.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var f=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=f.find("img").add(f.filter("img")),j=[],h=[],g=[];e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){i(b.target,"error"===b.type)}).each(function(b,a){var e=a.src,d=c.data(a,"imagesLoaded");if(d&&d.src===e)i(a,d.isBroken);else if(a.complete&&a.naturalWidth!==n)i(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=k,a.src=e}):m();return d?d.promise(f):f}})(jQuery);
/**
 * jTweetsAnywhere V1.3.1
 * http://thomasbillenstein.com/jTweetsAnywhere/
 *
 * Copyright 2011, Thomas Billenstein
 * Licensed under the MIT license.
 * http://thomasbillenstein.com/jTweetsAnywhere/license.txt
 */


/**
 * The code below is used as supplied by Twitter (https://dev.twitter.com/docs/intents)
 *
 * Twitter says:

 * "Some sites may prefer to embed the unobtrusive Web Intents pop-up Javascript inline
 * or without a dependency to platform.twitter.com. The snippet below will offer the
 * equivalent functionality without the external dependency."
 */

(function(){function e(e){for(var e=e||window.event,g=e.target||e.srcElement,i,k;g&&"a"!==g.nodeName.toLowerCase();)g=g.parentNode;if(g&&"a"===g.nodeName.toLowerCase()&&g.href&&(i=g.href.match(a)))i=Math.round(f/2-c/2),k=0,h>d&&(k=Math.round(h/2-d/2)),window.open(g.href,"intent",b+",width="+c+",height="+d+",left="+i+",top="+k),e.returnValue=!1,e.preventDefault&&e.preventDefault()}if(!window.__twitterIntentHandler){var a=/twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,b="scrollbars=yes,resizable=yes,toolbar=no,location=yes",
c=550,d=420,h=screen.height,f=screen.width;document.addEventListener?document.addEventListener("click",e,!1):document.attachEvent&&document.attachEvent("onclick",e);window.__twitterIntentHandler=!0}})();
(function(){if(!window.__JTA_I18N)JTA_I18N=function(){function e(a,c){function d(a,b,d){var e=c?c[a]||a:a;1!==b&&"object"===typeof e&&(e=h(a,e,b));if(e&&d)for(p in d)e=e.replace(p,c?c[d[p]]||d[p]:d[p]);return e}function h(a,b,c){for(pat in b){var d=/(\d+)\s*-\s*(\d+)/;if(d=d.exec(pat)){var e=d[2];if(c>=d[1]&&c<=e)return b[pat]}d=/([<>]=?)\s*(\d+)/;if(d=d.exec(pat)){e=d[1];d=d[2];if(">"===e&&c>d)return b[pat];if(">="===e&&c>=d)return b[pat];if("<"===e&&c<d)return b[pat];if("<="===e&&c<=d)return b[pat]}d=
/\s*,\s*/;if(d=pat.split(d))for(e=0;e<d.length;e++)if(c===~~d[e])return b[pat]}return a}this.getLocale=function(){return a};this._=this.get=function(a,b){return d(a,1,b)};this.__=this.nget=function(a,b,c,e){return 1===c?d(a,1,e):d(b,c,e)}}var a={};return{addResourceBundle:function(b,c,d){a[b]||(a[b]={});a[b][c]=d},getResourceBundle:function(b,c){return new e(c,a[b]?a[b][c]:null)}}}(),window.__JTA_I18N=!0})();JTA_I18N.addResourceBundle("jTweetsAnywhere","en",{$$monthNames:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",")});
(function(e){e.fn.jTweetsAnywhere=function(a){var b=e.extend({username:"tbillenstein",list:null,searchParams:null,count:0,tweetProfileImagePresent:null,tweetFilter:defaultTweetFilter,showTweetFeed:!0,showFollowButton:!1,showConnectButton:!1,showLoginInfo:!1,showTweetBox:!1,locale:"en",tweetDataProvider:defaultTweetDataProvider,rateLimitDataProvider:defaultRateLimitDataProvider,mainDecorator:defaultMainDecorator,tweetFeedDecorator:defaultTweetFeedDecorator,tweetDecorator:defaultTweetDecorator,tweetProfileImageDecorator:defaultTweetProfileImageDecorator,
tweetBodyDecorator:defaultTweetBodyDecorator,tweetUsernameDecorator:defaultTweetUsernameDecorator,tweetTextDecorator:defaultTweetTextDecorator,tweetAttributesDecorator:defaultTweetAttributesDecorator,tweetTwitterBirdDecorator:defaultTweetTwitterBirdDecorator,tweetTimestampDecorator:defaultTweetTimestampDecorator,tweetSourceDecorator:defaultTweetSourceDecorator,tweetGeoLocationDecorator:defaultTweetGeoLocationDecorator,tweetInReplyToDecorator:defaultTweetInReplyToDecorator,tweetRetweeterDecorator:defaultTweetRetweeterDecorator,
tweetActionsDecorator:defaultTweetActionsDecorator,tweetActionReplyDecorator:defaultTweetActionReplyDecorator,tweetActionRetweetDecorator:defaultTweetActionRetweetDecorator,tweetActionFavoriteDecorator:defaultTweetActionFavoriteDecorator,tweetFeedControlsDecorator:defaultTweetFeedControlsDecorator,tweetFeedControlsMoreBtnDecorator:defaultTweetFeedControlsMoreBtnDecorator,tweetFeedControlsPrevBtnDecorator:defaultTweetFeedControlsPrevBtnDecorator,tweetFeedControlsNextBtnDecorator:defaultTweetFeedControlsNextBtnDecorator,
tweetFeedAutorefreshTriggerDecorator:defaultTweetFeedAutorefreshTriggerDecorator,tweetFeedAutorefreshTriggerContentDecorator:defaultTweetFeedAutorefreshTriggerContentDecorator,connectButtonDecorator:defaultConnectButtonDecorator,loginInfoDecorator:defaultLoginInfoDecorator,loginInfoContentDecorator:defaultLoginInfoContentDecorator,followButtonDecorator:defaultFollowButtonDecorator,tweetBoxDecorator:defaultTweetBoxDecorator,linkDecorator:defaultLinkDecorator,usernameDecorator:defaultUsernameDecorator,
hashtagDecorator:defaultHashtagDecorator,loadingDecorator:defaultLoadingDecorator,errorDecorator:defaultErrorDecorator,noDataDecorator:defaultNoDataDecorator,tweetTimestampFormatter:defaultTweetTimestampFormatter,tweetTimestampTooltipFormatter:defaultTweetTimestampTooltipFormatter,tweetVisualizer:defaultTweetVisualizer,loadingIndicatorVisualizer:defaultLoadingIndicatorVisualizer,autorefreshTriggerVisualizer:defaultAutorefreshTriggerVisualizer,onDataRequestHandler:defaultOnDataRequestHandler,onRateLimitDataHandler:defaultOnRateLimitDataHandler,
onOptionsInitializingHandler:defaultOnOptionsInitializingHandler,_tweetFeedConfig:{autoConformToTwitterStyleguide:!1,showTwitterBird:!0,showTimestamp:{refreshInterval:0},showSource:!1,showGeoLocation:!0,showInReplyTo:!0,showActionReply:!1,showActionRetweet:!1,showActionFavorite:!1,showProfileImages:null,showUserScreenNames:null,showUserFullNames:!1,expandHovercards:!1,includeRetweets:!0,paging:{mode:"none",_limit:0,_offset:0},autorefresh:{mode:"none",interval:60,duration:3600,max:-1,_startTime:null,
_triggerElement:null},_pageParam:0,_maxId:null,_recLevel:0,_noData:!1,_clearBeforePopulate:!1},_tweetBoxConfig:{counter:!0,width:515,height:65,label:null,defaultContent:"",onTweet:function(){}},_connectButtonConfig:{size:"medium"},_baseSelector:null,_baseElement:null,_tweetFeedElement:null,_tweetFeedControlsElement:null,_followButtonElement:null,_loginInfoElement:null,_connectButtonElement:null,_tweetBoxElement:null,_loadingIndicatorElement:null,_noDataElement:null,_tweetsCache:[],_autorefreshTweetsCache:[],
_stats:{dataRequestCount:0,rateLimitPreventionCount:0,rateLimit:{remaining_hits:150,hourly_limit:150}},_resourceBundle:null},a);b._baseSelector=this.selector;b.onOptionsInitializingHandler(b);setupOptions(b);if(b.mainDecorator)return e.ajaxSetup({cache:!0}),this.each(function(){b._baseElement=e(this);b._tweetFeedElement=b.tweetFeedDecorator?e(b.tweetFeedDecorator(b)):null;b._tweetFeedControlsElement=b.tweetFeedControlsDecorator?e(b.tweetFeedControlsDecorator(b)):null;b._followButtonElement=b.followButtonDecorator?
e(b.followButtonDecorator(b)):null;b._tweetBoxElement=b.tweetBoxDecorator?e(b.tweetBoxDecorator(b)):null;b._connectButtonElement=b.connectButtonDecorator?e(b.connectButtonDecorator(b)):null;b._loginInfoElement=b.loginInfoDecorator?e(b.loginInfoDecorator(b)):null;b.mainDecorator(b);populateTweetFeed(b);populateAnywhereControls(b);bindEventHandlers(b);setupAutorefresh(b)})};defaultMainDecorator=function(a){a._tweetFeedElement&&a._baseElement.append(a._tweetFeedElement);a._tweetFeedControlsElement&&
a._baseElement.append(a._tweetFeedControlsElement);a._connectButtonElement&&a._baseElement.append(a._connectButtonElement);a._loginInfoElement&&a._baseElement.append(a._loginInfoElement);a._followButtonElement&&a._baseElement.append(a._followButtonElement);a._tweetBoxElement&&a._baseElement.append(a._tweetBoxElement)};defaultTweetFeedControlsDecorator=function(a){var b="";"prev-next"==a._tweetFeedConfig.paging.mode?(a.tweetFeedControlsPrevBtnDecorator&&(b+=a.tweetFeedControlsPrevBtnDecorator(a)),
a.tweetFeedControlsNextBtnDecorator&&(b+=a.tweetFeedControlsNextBtnDecorator(a))):"endless-scroll"!=a._tweetFeedConfig.paging.mode&&a.tweetFeedControlsMoreBtnDecorator&&(b+=a.tweetFeedControlsMoreBtnDecorator(a));return'<div class="jta-tweet-list-controls">'+b+"</div>"};defaultTweetFeedControlsMoreBtnDecorator=function(a){return'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-more">'+a._resourceBundle._("More")+"</span>"};defaultTweetFeedControlsPrevBtnDecorator=function(a){return'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-prev">'+
a._resourceBundle._("Prev")+"</span>"};defaultTweetFeedControlsNextBtnDecorator=function(a){return'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-next">'+a._resourceBundle._("Next")+"</span>"};defaultTweetFeedAutorefreshTriggerDecorator=function(a,b){var c="";b.tweetFeedAutorefreshTriggerContentDecorator&&(c=b.tweetFeedAutorefreshTriggerContentDecorator(a,b));return'<li class="jta-tweet-list-autorefresh-trigger">'+c+"</li>"};defaultTweetFeedAutorefreshTriggerContentDecorator=
function(a,b){return'<span class="jta-tweet-list-autorefresh-trigger-content">'+b._resourceBundle.__("%count% new tweet","%count% new tweets",a,{"%count%":a})+"</span>"};defaultTweetFeedDecorator=function(){return'<ul class="jta-tweet-list"></ul>'};defaultTweetDecorator=function(a,b){var c="";b._tweetFeedConfig.showProfileImages&&(c+=b.tweetProfileImageDecorator(a,b));b.tweetBodyDecorator&&(c+=b.tweetBodyDecorator(a,b));return'<li class="jta-tweet-list-item">'+(c+'<div class="jta-clear">&nbsp;</div>')+
"</li>"};defaultTweetProfileImageDecorator=function(a){var b=a.retweeted_status||a,a=getScreenName(a);return'<div class="jta-tweet-profile-image">'+('<a class="jta-tweet-profile-image-link" href="http://twitter.com/'+a+'" target="_blank"><img src="'+(b.user?b.user.profile_image_url:b.profile_image_url)+'" alt="'+a+'"'+(isAnywherePresent()?"":' title="'+a+'"')+"/></a>")+"</div>"};defaultTweetBodyDecorator=function(a,b){var c="";b.tweetTextDecorator&&(c+=b.tweetTextDecorator(a,b));b.tweetAttributesDecorator&&
(c+=b.tweetAttributesDecorator(a,b));b.tweetActionsDecorator&&(c+=b.tweetActionsDecorator(a,b));return'<div class="jta-tweet-body '+(b._tweetFeedConfig.showProfileImages?"jta-tweet-body-list-profile-image-present":"")+'">'+c+"</div>"};defaultTweetTextDecorator=function(a,b){var c=a.text;if(a.retweeted_status&&(b._tweetFeedConfig.showUserScreenNames||null==b._tweetFeedConfig.showUserScreenNames||b._tweetFeedConfig.showUserFullNames||null==b._tweetFeedConfig.showUserFullNames))c=a.retweeted_status.text;
b.linkDecorator&&(c=b.linkDecorator(c,b));b.usernameDecorator&&(c=b.usernameDecorator(c,b));b.hashtagDecorator&&(c=b.hashtagDecorator(c,b));if(b._tweetFeedConfig.showUserScreenNames||b._tweetFeedConfig.showUserFullNames||a.retweeted_status&&(null==b._tweetFeedConfig.showUserScreenNames||null==b._tweetFeedConfig.showUserFullNames))c=b.tweetUsernameDecorator(a,b)+" "+c;return'<span class="jta-tweet-text">'+c+"</span>"};defaultTweetUsernameDecorator=function(a,b){var c=getScreenName(a),d=getFullName(a),
e=null;if(c&&(b._tweetFeedConfig.showUserScreenNames||null==b._tweetFeedConfig.showUserScreenNames&&a.retweeted_status))e='<span class="jta-tweet-user-screen-name"><a class="jta-tweet-user-screen-name-link" href="http://twitter.com/'+c+'" target="_blank">'+c+"</a></span>";var f=null;if(d&&(b._tweetFeedConfig.showUserFullNames||null==b._tweetFeedConfig.showUserFullNames&&a.retweeted_status))f='<span class="jta-tweet-user-full-name">'+(e?" ":"")+'<a class="jta-tweet-user-full-name-link" href="http://twitter.com/'+
c+'" name="'+c+'" target="_blank">'+d+"</a></span>";c="";e&&(c+=e);f&&(e&&(c+=" "),c+=f);if(e||f)c='<span class="jta-tweet-user-name">'+(a.retweeted_status?"RT ":"")+c+"</span>";return c};defaultTweetAttributesDecorator=function(a,b){var c="";if(b.tweetTwitterBirdDecorator||b.tweetTimestampDecorator||b.tweetSourceDecorator||b.tweetGeoLocationDecorator||b.tweetInReplyToDecorator||a.retweeted_status&&b.tweetRetweeterDecorator)c+='<span class="jta-tweet-attributes">',b.tweetTwitterBirdDecorator&&(c+=
b.tweetTwitterBirdDecorator(a,b)),b.tweetTimestampDecorator&&(c+=b.tweetTimestampDecorator(a,b)),b.tweetSourceDecorator&&(c+=b.tweetSourceDecorator(a,b)),b.tweetGeoLocationDecorator&&(c+=b.tweetGeoLocationDecorator(a,b)),b.tweetInReplyToDecorator&&(c+=b.tweetInReplyToDecorator(a,b)),a.retweeted_status&&b.tweetRetweeterDecorator&&(c+=b.tweetRetweeterDecorator(a,b)),c+="</span>";return c};defaultTweetTimestampDecorator=function(a,b){var c=a.retweeted_status||a,d=formatDate(c.created_at),e=b.tweetTimestampFormatter(d,
b),f=b.tweetTimestampTooltipFormatter(d);return'<span class="jta-tweet-timestamp"><a class="jta-tweet-timestamp-link" data-timestamp="'+d+'" href="http://twitter.com/'+getScreenName(a)+"/status/"+c.id+'" target="_blank" title="'+f+'">'+e+"</a></span>"};defaultTweetTwitterBirdDecorator=function(a,b){var c=getScreenName(a),d="https://twitter.com/intent/user?screen_name="+c,c=c+" "+b._resourceBundle._("on Twitter");return'<span class="jta-tweet-twitter-bird"><a href="'+d+'" target="_blank" title="'+
c+'"><span class="jta-tweet-twitter-bird-icon">&nbsp;</span></a></span>'};defaultTweetTimestampTooltipFormatter=function(a){return(new Date(a)).toLocaleString()};defaultTweetTimestampFormatter=function(a,b){var c=new Date,d=parseInt((c.getTime()-Date.parse(a))/1E3),e="";if(60>d)e+=b._resourceBundle.__("%secs% second ago","%secs% seconds ago",d,{"%secs%":d});else if(3600>d)c=parseInt((d+30)/60),e+=b._resourceBundle.__("%mins% minute ago","%mins% minutes ago",c,{"%mins%":c});else if(86400>d)c=parseInt((d+
1800)/3600),e+=b._resourceBundle.__("%hours% hour ago","%hours% hours ago",c,{"%hours%":c});else{var f=new Date(a),j=b._resourceBundle._("$$monthNames"),e=e+(j[f.getMonth()]+" "+f.getDate());f.getFullYear()<c.getFullYear()&&(e+=", "+f.getFullYear());c=parseInt((d+43200)/86400);e+=" ("+b._resourceBundle.__("%days% day ago","%days% days ago",c,{"%days%":c})+")"}return e};defaultTweetSourceDecorator=function(a,b){var c=(a.retweeted_status||a).source.replace(/\&lt\;/gi,"<").replace(/\&gt\;/gi,">").replace(/\&quot\;/gi,
'"');return'<span class="jta-tweet-source"> '+b._resourceBundle._("via")+' <span class="jta-tweet-source-link">'+c+"</span></span>"};defaultTweetGeoLocationDecorator=function(a,b){var c="",d=a.retweeted_status||a,e=null;if(d.geo&&d.geo.coordinates)e=d.geo.coordinates.join();else if(d.place&&d.place.full_name)e=d.place.full_name;if(e){c=b._resourceBundle._("here");if(d.place&&d.place.full_name)c=d.place.full_name;c='<span class="jta-tweet-location"> '+b._resourceBundle._("from")+' <a class="jta-tweet-location-link" href="'+
("http://maps.google.com/maps?q="+e)+'" target="_blank">'+c+"</a></span>"}return c};defaultTweetInReplyToDecorator=function(a,b){var c=a.retweeted_status||a,d="";c.in_reply_to_status_id&&c.in_reply_to_screen_name&&(d="http://twitter.com/"+c.in_reply_to_screen_name+"/status/"+c.in_reply_to_status_id,c=b._resourceBundle._("in reply to")+" "+c.in_reply_to_screen_name,d='<span class="jta-tweet-inreplyto"> <a class="jta-tweet-inreplyto-link" href="'+d+'" target="_blank">'+c+"</a></span>");return d};defaultTweetRetweeterDecorator=
function(a,b){var c="";if(a.retweeted_status)var d=getUserScreenName(a),c=(a.retweeted_status.retweet_count||0)-1,d='<a class="jta-tweet-retweeter-link" href="http://twitter.com/'+d+'" target="_blank">'+d+"</a>",e=b._resourceBundle.__(" and %rtc% other"," and %rtc% others",c,{"%rtc%":c}),c='<br/><span class="jta-tweet-retweeter">'+b._resourceBundle._("Retweeted by")+" "+d+(0<c?e:"")+"</span>";return c};defaultTweetActionsDecorator=function(a,b){var c="";if(b.tweetActionReplyDecorator||b.tweetActionRetweetDecorator||
b.tweetActionFavoriteDecorator)c+='<span class="jta-tweet-actions">',b.tweetActionReplyDecorator&&(c+=b.tweetActionReplyDecorator(a,b)),b.tweetActionRetweetDecorator&&(c+=b.tweetActionRetweetDecorator(a,b)),b.tweetActionFavoriteDecorator&&(c+=b.tweetActionFavoriteDecorator(a,b)),c+="</span>";return c};defaultTweetActionReplyDecorator=function(a,b){var c="https://twitter.com/intent/tweet?in_reply_to="+a.id,d=b._resourceBundle._("Reply");return'<span class="jta-tweet-action-reply"><a href="'+c+'">'+
d+"</a></span>"};defaultTweetActionRetweetDecorator=function(a,b){var c="https://twitter.com/intent/retweet?tweet_id="+a.id,d=b._resourceBundle._("Retweet");return'<span class="jta-tweet-action-retweet"><a href="'+c+'">'+d+"</a></span>"};defaultTweetActionFavoriteDecorator=function(a,b){var c="https://twitter.com/intent/favorite?tweet_id="+a.id,d=b._resourceBundle._("Favorite");return'<span class="jta-tweet-action-favorite"><a href="'+c+'">'+d+"</a></span>"};defaultConnectButtonDecorator=function(){return'<div class="jta-connect-button"></div>'};
defaultLoginInfoDecorator=function(){return'<div class="jta-login-info"></div>'};defaultLoginInfoContentDecorator=function(a,b){var c="";if(b.isConnected())var c=b.currentUser.data("screen_name"),d=b.currentUser.data("profile_image_url"),c='<div class="jta-login-info-profile-image"><a href="http://twitter.com/'+c+'" target="_blank"><img src="'+d+'" alt="'+c+'" title="'+c+'"/></a></div><div class="jta-login-info-block"><div class="jta-login-info-screen-name"><a href="http://twitter.com/'+c+'" target="_blank">'+
c+'</a></div><div class="jta-login-info-sign-out">'+a._resourceBundle._("Sign out")+'</div></div><div class="jta-clear">&nbsp;</div>';return c};defaultFollowButtonDecorator=function(){return'<div class="jta-follow-button"></div>'};defaultTweetBoxDecorator=function(){return'<div class="jta-tweet-box"></div>'};defaultLinkDecorator=function(a){return a.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1" class="jta-tweet-a jta-tweet-link" target="_blank" rel="nofollow">$1</a>')};
defaultUsernameDecorator=function(a){return isAnywherePresent()?a:a.replace(/\B@(\w+)/gi,'@<a href="http://twitter.com/$1" class="jta-tweet-a twitter-anywhere-user" target="_blank" rel="nofollow">$1</a>')};defaultHashtagDecorator=function(a){return a.replace(/#([a-zA-Z0-9_]+)/gi,'<a href="http://search.twitter.com/search?q=%23$1" class="jta-tweet-a jta-tweet-hashtag" title="#$1" target="_blank" rel="nofollow">#$1</a>')};defaultLoadingDecorator=function(a){return'<li class="jta-loading">'+a._resourceBundle._("loading")+
" ...</li>"};defaultErrorDecorator=function(a,b){return'<li class="jta-error">'+b._resourceBundle._("ERROR")+": "+a+"</li>"};defaultNoDataDecorator=function(a){return'<li class="jta-nodata">'+a._resourceBundle._("No more data")+"</li>"};defaultTweetFilter=function(){return!0};defaultTweetVisualizer=function(a,b,c){a[c](b)};defaultLoadingIndicatorVisualizer=function(a,b,c,d){defaultVisualizer(a,b,"append","fadeIn",600,"fadeOut",200,d)};defaultAutorefreshTriggerVisualizer=function(a,b,c,d){defaultVisualizer(a,
b,"prepend","slideDown",600,"fadeOut",200,d)};defaultVisualizer=function(a,b,c,d,e,f,j,g){var i=function(){g&&g()};if(a)b.hide(),a[c](b),b[d](e,i);else b[f](j,function(){b.remove();i()})};defaultOnDataRequestHandler=function(){return!0};defaultOnRateLimitDataHandler=function(){};defaultOnOptionsInitializingHandler=function(){};updateLoginInfoElement=function(a,b){a._loginInfoElement&&a.loginInfoContentDecorator&&(a._loginInfoElement.children().remove(),a._loginInfoElement.append(a.loginInfoContentDecorator(a,
b)),e(a._baseSelector+" .jta-login-info-sign-out").bind("click",function(){twttr.anywhere.signOut()}))};getFeedUrl=function(a,b){var c="https:"==document.location.protocol?"https:":"http:";a.searchParams?c+="//search.twitter.com/search.json?"+(a.searchParams instanceof Array?a.searchParams.join("&"):a.searchParams)+"&rpp=100":a.list?c="favorites"==a.list?c+("//api.twitter.com/1/favorites/"+a.username+".json?count=20"):c+("//api.twitter.com/1/"+a.username+"/lists/"+a.list+"/statuses.json?per_page=20"):
(c+="//api.twitter.com/1/statuses/user_timeline.json?screen_name="+a.username+"&count=20",a._tweetFeedConfig.includeRetweets&&(c+="&include_rts=true"));b&&(c+=(a._tweetFeedConfig._maxId?"&max_id="+a._tweetFeedConfig._maxId:"")+"&page="+a._tweetFeedConfig._pageParam);return c+"&callback=?"};isAnywherePresent=function(){return"undefined"!=typeof twttr&&"undefined"!=typeof twttr.anywhere};clearTweetFeed=function(a){a._tweetFeedElement&&a._tweetFeedElement.empty()};setupOptions=function(a){a._resourceBundle=
JTA_I18N.getResourceBundle("jTweetsAnywhere",a.locale);a._tweetBoxConfig.label=a._resourceBundle._("What's happening?");if("string"!=typeof a.username){if(!a.searchParams)a.searchParams=["q=from:"+a.username.join(" OR from:")];a.username=a.username[0]}"object"==typeof a.showTweetFeed&&e.extend(!0,a._tweetFeedConfig,a.showTweetFeed);if("object"==typeof a.showTweetBox)e.extend(!0,a._tweetBoxConfig,a.showTweetBox),a.showTweetBox=!0;if("object"==typeof a.showConnectButton)a._connectButtonConfig=a.showConnectButton,
a.showConnectButton=!0;if(null==a._tweetFeedConfig.showProfileImages)a._tweetFeedConfig.showProfileImages=a.tweetProfileImagePresent;if(null==a._tweetFeedConfig.showProfileImages)a._tweetFeedConfig.showProfileImages=(a.list||a.searchParams)&&a.tweetProfileImageDecorator;if(a._tweetFeedConfig.autoConformToTwitterStyleguide)a._tweetFeedConfig.showUserFullNames=null,a._tweetFeedConfig.showTwitterBird=!0,a._tweetFeedConfig.showActionReply=!0,a._tweetFeedConfig.showActionRetweet=!0,a._tweetFeedConfig.showActionFavorite=
!0;if(null==a._tweetFeedConfig.showUserScreenNames){if(a.list||a.searchParams)a._tweetFeedConfig.showUserScreenNames=!0;if(!a.tweetUsernameDecorator)a._tweetFeedConfig.showUserScreenNames=!1}if(null==a._tweetFeedConfig.showUserFullNames){if(a.list||a.searchParams)a._tweetFeedConfig.showUserFullNames=!0;if(!a.tweetUsernameDecorator)a._tweetFeedConfig.showUserFullNames=!1}a.count=validateRange(a.count,0,a.searchParams?100:20);a._tweetFeedConfig.autorefresh.interval=Math.max(30,a._tweetFeedConfig.autorefresh.interval);
if(0>=a._tweetFeedConfig.autorefresh.max)a._tweetFeedConfig.autorefresh.max=-1;a._tweetFeedConfig.paging._offset=0;a._tweetFeedConfig.paging._limit=a.count;if(0==a.count||!a.showTweetFeed)a.tweetFeedDecorator=null,a.tweetFeedControlsDecorator=null;if("none"==a._tweetFeedConfig.paging.mode)a.tweetFeedControlsDecorator=null;if(!a.showFollowButton)a.followButtonDecorator=null;if(!a.showTweetBox)a.tweetBoxDecorator=null;if(!a.showConnectButton)a.connectButtonDecorator=null;if(!a.showLoginInfo)a.loginInfoDecorator=
null;if(!a._tweetFeedConfig.showTwitterBird)a.tweetTwitterBirdDecorator=null;if(!a._tweetFeedConfig.showTimestamp)a.tweetTimestampDecorator=null;if(!a._tweetFeedConfig.showSource)a.tweetSourceDecorator=null;if(!a._tweetFeedConfig.showGeoLocation)a.tweetGeoLocationDecorator=null;if(!a._tweetFeedConfig.showInReplyTo)a.tweetInReplyToDecorator=null;if(!a._tweetFeedConfig.showActionReply)a.tweetActionReplyDecorator=null;if(!a._tweetFeedConfig.showActionRetweet)a.tweetActionRetweetDecorator=null;if(!a._tweetFeedConfig.showActionFavorite)a.tweetActionFavoriteDecorator=
null};setupAutorefresh=function(a){a._tweetFeedConfig.autorefresh._startTime=(new Date).getTime();startAutorefresh(a);startTimestampRefresh(a)};populateTweetFeed=function(a){a.tweetDecorator&&a._tweetFeedElement&&getPagedTweets(a,function(a,c){c._tweetFeedConfig._clearBeforePopulate&&clearTweetFeed(c);hideLoadingIndicator(c,function(){e.each(a,function(a,b){c.tweetVisualizer(c._tweetFeedElement,e(c.tweetDecorator(b,c)),"append",c)});if(c._tweetFeedConfig._noData&&c.noDataDecorator&&!c._tweetFeedConfig._noDataElement)c._tweetFeedConfig._noDataElement=
e(c.noDataDecorator(c)),c._tweetFeedElement.append(c._tweetFeedConfig._noDataElement);c._tweetFeedConfig._clearBeforePopulate&&c._tweetFeedElement.scrollTop(0);addHovercards(c)})})};populateTweetFeed2=function(a){if(a._tweetFeedElement&&0<a._autorefreshTweetsCache.length)if("trigger-insert"==a._tweetFeedConfig.autorefresh.mode)if(a._tweetFeedConfig.autorefresh._triggerElement)a.tweetFeedAutorefreshTriggerContentDecorator&&a._tweetFeedConfig.autorefresh._triggerElement.html(a.tweetFeedAutorefreshTriggerContentDecorator(a._autorefreshTweetsCache.length,
a));else{if(a.tweetFeedAutorefreshTriggerDecorator)a._tweetFeedConfig.autorefresh._triggerElement=e(a.tweetFeedAutorefreshTriggerDecorator(a._autorefreshTweetsCache.length,a)),a._tweetFeedConfig.autorefresh._triggerElement.bind("click",function(){a.autorefreshTriggerVisualizer(null,a._tweetFeedConfig.autorefresh._triggerElement,a,function(){insertTriggerTweets(a)});a._tweetFeedConfig.autorefresh._triggerElement=null}),a.autorefreshTriggerVisualizer(a._tweetFeedElement,a._tweetFeedConfig.autorefresh._triggerElement,
a)}else insertTriggerTweets(a)};insertTriggerTweets=function(a){if(a.tweetDecorator&&0<a._autorefreshTweetsCache.length){for(;0<a._autorefreshTweetsCache.length;){var b=a._autorefreshTweetsCache.pop();a._tweetsCache.unshift(b);a._tweetFeedConfig.paging._offset++;a.tweetVisualizer(a._tweetFeedElement,e(a.tweetDecorator(b,a)),"prepend",a)}addHovercards(a)}};addHovercards=function(a){isAnywherePresent()&&twttr.anywhere(function(b){b(a._baseSelector+" .jta-tweet-list").hovercards({expanded:a._tweetFeedConfig.expandHovercards});
b(a._baseSelector+" .jta-tweet-profile-image img").hovercards({expanded:a._tweetFeedConfig.expandHovercards,username:function(a){return a.alt}});b(a._baseSelector+" .jta-tweet-retweeter-link").hovercards({expanded:a._tweetFeedConfig.expandHovercards,username:function(a){return a.text}});b(a._baseSelector+" .jta-tweet-user-screen-name-link").hovercards({expanded:a._tweetFeedConfig.expandHovercards,username:function(a){return a.text}});b(a._baseSelector+" .jta-tweet-user-full-name-link").hovercards({expanded:a._tweetFeedConfig.expandHovercards,
username:function(a){return a.name}})})};populateAnywhereControls=function(a){isAnywherePresent()&&twttr.anywhere(function(b){a.tweetBoxDecorator&&b(a._baseSelector+" .jta-tweet-box").tweetBox(a._tweetBoxConfig);a.followButtonDecorator&&b(a._baseSelector+" .jta-follow-button").followButton(a.username);if(a.connectButtonDecorator){var c=e.extend({authComplete:function(){updateLoginInfoElement(a,b)},signOut:function(){updateLoginInfoElement(a,b)}},a._connectButtonConfig);b(a._baseSelector+" .jta-connect-button").connectButton(c);
updateLoginInfoElement(a,b)}})};bindEventHandlers=function(a){a.tweetFeedControlsDecorator&&("prev-next"==a._tweetFeedConfig.paging.mode?(e(a._baseSelector+" .jta-tweet-list-controls-button-prev").bind("click",function(){!isLoading(a)&&0<a._tweetFeedConfig.paging._offset&&prevPage(a,!0)}),e(a._baseSelector+" .jta-tweet-list-controls-button-next").bind("click",function(){isLoading(a)||nextPage(a,!0)})):"endless-scroll"==a._tweetFeedConfig.paging.mode?a._tweetFeedElement.bind("scroll",function(){!isLoading(a)&&
e(this)[0].scrollHeight-e(this).scrollTop()==e(this).outerHeight()&&nextPage(a,!1)}):e(a._baseSelector+" .jta-tweet-list-controls-button-more").bind("click",function(){isLoading(a)||nextPage(a,!1)}))};nextPage=function(a,b){doPage(a,b,Math.min(a._tweetFeedConfig.paging._offset+a._tweetFeedConfig.paging._limit,a._tweetsCache.length))};prevPage=function(a,b){doPage(a,b,Math.max(0,a._tweetFeedConfig.paging._offset-a._tweetFeedConfig.paging._limit))};doPage=function(a,b,c){a._tweetFeedConfig.paging._offset=
c;a._tweetFeedConfig._clearBeforePopulate=b;populateTweetFeed(a)};startAutorefresh=function(a){"none"!=a._tweetFeedConfig.autorefresh.mode&&"prev-next"!=a._tweetFeedConfig.paging.mode&&0!=a._tweetFeedConfig.autorefresh.duration&&(0>a._tweetFeedConfig.autorefresh.duration||(new Date).getTime()-a._tweetFeedConfig.autorefresh._startTime<=1E3*a._tweetFeedConfig.autorefresh.duration)&&window.setTimeout(function(){processAutorefresh(a)},1E3*a._tweetFeedConfig.autorefresh.interval)};stopAutorefresh=function(a){a._tweetFeedConfig.autorefresh.duration=
0};processAutorefresh=function(a){0!=a._tweetFeedConfig.autorefresh.duration&&(getRateLimitedData(a,!0,getFeedUrl(a,!1),function(a,c){var d=(a.results||a).slice(0);d.reverse();e.each(d,function(a,b){if(b.id_str)b.id=b.id_str;if(b.in_reply_to_status_id_str)b.in_reply_to_status_id=b.in_reply_to_status_id_str;if(!isTweetInAutorefreshCache(b,c)&&!isTweetInCache(b,c)&&c.tweetFilter(b,c)&&(c._autorefreshTweetsCache.unshift(b),0<c._tweetFeedConfig.autorefresh.max))for(;c._autorefreshTweetsCache.length>c._tweetFeedConfig.autorefresh.max;)c._autorefreshTweetsCache.pop()});
populateTweetFeed2(c)}),startAutorefresh(a))};startTimestampRefresh=function(a){a.tweetTimestampDecorator&&"object"==typeof a._tweetFeedConfig.showTimestamp&&0<a._tweetFeedConfig.showTimestamp.refreshInterval&&window.setTimeout(function(){processTimestampRefresh(a)},1E3*a._tweetFeedConfig.showTimestamp.refreshInterval)};processTimestampRefresh=function(a){e.each(a._tweetFeedElement.find(".jta-tweet-timestamp-link"),function(b,c){var d=e(c).attr("data-timestamp");e(c).html(a.tweetTimestampFormatter(d,
a))});startTimestampRefresh(a)};isTweetInCache=function(a,b){for(var c=b._tweetsCache.length,d=0;d<c;d++)if(a.id==b._tweetsCache[d].id)return!0;return!1};isTweetInAutorefreshCache=function(a,b){for(var c=b._autorefreshTweetsCache.length,d=0;d<c;d++)if(a.id==b._autorefreshTweetsCache[d].id)return!0;return!1};showLoadingIndicator=function(a){if(a._tweetFeedElement&&a.loadingDecorator&&!a._loadingIndicatorElement)a._loadingIndicatorElement=e(a.loadingDecorator(a)),a.loadingIndicatorVisualizer(a._tweetFeedElement,
a._loadingIndicatorElement,a,null),a._tweetFeedElement.scrollTop(1E6)};hideLoadingIndicator=function(a,b){a._loadingIndicatorElement?(a.loadingIndicatorVisualizer(null,a._loadingIndicatorElement,a,b),a._loadingIndicatorElement=null):b&&b()};isLoading=function(a){return null!=a._loadingIndicatorElement};formatDate=function(a){return a.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i,"$1,$2$4$3")};getUserScreenName=function(a){return a.user?a.user.screen_name:a.from_user};getScreenName=function(a){a=
a.retweeted_status||a;return a.user?a.user.screen_name:a.from_user};getFullName=function(a){a=a.retweeted_status||a;return a.user?a.user.name:void 0};validateRange=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};showError=function(a,b){a.errorDecorator&&a._tweetFeedElement&&a._tweetFeedElement.append(a.errorDecorator(b,a))};getPagedTweets=function(a,b){a._tweetFeedConfig._recLevel=0;getRecPagedTweets(a,a._tweetFeedConfig.paging._offset,a._tweetFeedConfig.paging._limit,b)};getRecPagedTweets=function(a,
b,c,d){++a._tweetFeedConfig._recLevel;if(b+c<=a._tweetsCache.length||3<a._tweetFeedConfig._recLevel||a._tweetFeedConfig._noData){b+c>a._tweetsCache.length&&(c=Math.max(0,a._tweetsCache.length-b));for(var h=[],f=0;f<c;f++)h[f]=a._tweetsCache[b+f];d(h,a)}else++a._tweetFeedConfig._pageParam,getRateLimitedData(a,!1,getFeedUrl(a,!0),function(a,f){var h=a.results||a;0==h.length?f._tweetFeedConfig._noData=!0:e.each(h,function(a,b){if(b.id_str)b.id=b.id_str;if(b.in_reply_to_status_id_str)b.in_reply_to_status_id=
b.in_reply_to_status_id_str;if(!f._tweetFeedConfig._maxId)f._tweetFeedConfig._maxId=b.id;f.tweetFilter(b,f)&&f._tweetsCache.push(b)});getRecPagedTweets(f,b,c,d)})};getRateLimitedData=function(a,b,c,d){getRateLimit(a,function(e){e&&0>=e.remaining_hits?(a._stats.rateLimitPreventionCount++,hideLoadingIndicator(a,null)):getData(a,b,c,d)})};getData=function(a,b,c,d){a._stats.dataRequestCount++;a.onDataRequestHandler(a._stats,a)?(b||showLoadingIndicator(a),a.tweetDataProvider(c,function(b){b.error?showError(a,
b.error):d(b,a)})):hideLoadingIndicator(a,null)};getRateLimit=function(a,b){a.rateLimitDataProvider(function(c){a._stats.rateLimit=c;a.onRateLimitDataHandler(a._stats,a);b(c)})};defaultTweetDataProvider=function(a,b){e.getJSON(a,b)};defaultRateLimitDataProvider=function(a){e.getJSON("http://api.twitter.com/1/account/rate_limit_status.json?callback=?",a)}})(jQuery);


/* Complement script dependency for jtweetsanywhere above */
JTA_I18N.addResourceBundle("jTweetsAnywhere","de",{More:"Mehr",Prev:"Zur&uuml;ck",Next:"Weiter","%count% new tweet":"%count% neuer Tweet","%count% new tweets":"%count% neue Tweets","What's happening?":"Was ist los?","%secs% second ago":"vor %secs% Sekunde","%secs% seconds ago":"vor %secs% Sekunden","%mins% minute ago":"vor %mins% Minute","%mins% minutes ago":"vor %mins% Minuten","%hours% hour ago":"vor %hours% Stunde","%hours% hours ago":"vor %hours% Stunden","%days% day ago":"vor %days% Tag","%days% days ago":"vor %days% Tagen",
via:"via","on Twitter":"bei Twitter",Reply:"Antworten",Retweet:"Retweet",Favorite:"Als Favorit markieren",here:"hier","in reply to":"als Antwort auf",from:"von"," and %rtc% other":" und %rtc% Weiteren"," and %rtc% others":" und %rtc% Weiteren","Retweeted by":"Retweetet von","Sign out":"Abmelden",loading:"laden",ERROR:"FEHLER",$$monthNames:"Jan,Feb,M&auml;r,Apr,Mai,Jun,Jul,Aug,Sep,Okt,Nov,Dez".split(",")});

/*!
  jQuery Wookmark plugin 0.5
  @name jquery.wookmark.js
  @author Christoph Ono (chri@sto.ph or @gbks)
  @version 0.5
  @date 3/19/2012
  @category jQuery plugin
  @copyright (c) 2009-2012 Christoph Ono (www.wookmark.com)
  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/

$.fn.wookmark=function(options){if(!this.wookmarkOptions)this.wookmarkOptions=$.extend({container:$("body"),offset:2,autoResize:false,itemWidth:$(this[0]).outerWidth(),resizeDelay:50},options);else if(options)this.wookmarkOptions=$.extend(this.wookmarkOptions,options);if(!this.wookmarkColumns){this.wookmarkColumns=null;this.wookmarkContainerWidth=null}this.wookmarkLayout=function(){var columnWidth=this.wookmarkOptions.itemWidth+this.wookmarkOptions.offset;var containerWidth=this.wookmarkOptions.container.width(); var columns=Math.floor((containerWidth+this.wookmarkOptions.offset)/columnWidth);var offset=Math.round((containerWidth-(columns*columnWidth-this.wookmarkOptions.offset))/2);var bottom=0;if(this.wookmarkColumns!=null&&this.wookmarkColumns.length==columns)bottom=this.wookmarkLayoutColumns(columnWidth,offset);else bottom=this.wookmarkLayoutFull(columnWidth,columns,offset);this.wookmarkOptions.container.css("height",bottom+"px")};this.wookmarkLayoutFull=function(columnWidth,columns,offset){var heights= [];while(heights.length<columns)heights.push(0);this.wookmarkColumns=[];while(this.wookmarkColumns.length<columns)this.wookmarkColumns.push([]);var item,top,left,i=0,k=0,length=this.length,shortest=null,shortestIndex=null,bottom=0;for(;i<length;i++){item=$(this[i]);shortest=null;shortestIndex=0;for(k=0;k<columns;k++)if(shortest==null||heights[k]<shortest){shortest=heights[k];shortestIndex=k}item.css({position:"absolute",top:shortest+"px",left:shortestIndex*columnWidth+offset+"px"});heights[shortestIndex]= shortest+item.outerHeight()+this.wookmarkOptions.offset;bottom=Math.max(bottom,heights[shortestIndex]);this.wookmarkColumns[shortestIndex].push(item)}return bottom};this.wookmarkLayoutColumns=function(columnWidth,offset){var heights=[];while(heights.length<this.wookmarkColumns.length)heights.push(0);var i=0,length=this.wookmarkColumns.length,column;var k=0,kLength,item;var bottom=0;for(;i<length;i++){column=this.wookmarkColumns[i];kLength=column.length;for(k=0;k<kLength;k++){item=column[k];item.css({left:i* columnWidth+offset+"px",top:heights[i]+"px"});heights[i]+=item.outerHeight()+this.wookmarkOptions.offset;bottom=Math.max(bottom,heights[i])}}return bottom};this.wookmarkResizeTimer=null;if(!this.wookmarkResizeMethod)this.wookmarkResizeMethod=null;if(this.wookmarkOptions.autoResize){this.wookmarkOnResize=function(event){if(this.wookmarkResizeTimer)clearTimeout(this.wookmarkResizeTimer);this.wookmarkResizeTimer=setTimeout($.proxy(this.wookmarkLayout,this),this.wookmarkOptions.resizeDelay)};if(!this.wookmarkResizeMethod)this.wookmarkResizeMethod= $.proxy(this.wookmarkOnResize,this);$(window).resize(this.wookmarkResizeMethod)}this.wookmarkClear=function(){if(this.wookmarkResizeTimer){clearTimeout(this.wookmarkResizeTimer);this.wookmarkResizeTimer=null}if(this.wookmarkResizeMethod)$(window).unbind("resize",this.wookmarkResizeMethod)};this.wookmarkLayout();this.show()};

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */

(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

/*  
 *  jQuery carouFredSel 5.5.5
 *  Demo's and documentation:
 *  caroufredsel.frebsite.nl
 *  
 *  Copyright (c) 2012 Fred Heusschen
 *  www.frebsite.nl
 *
 *  Dual licensed under the MIT and GPL licenses.
 *  http://en.wikipedia.org/wiki/MIT_License
 *  http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(I($){8($.1P.1J)J;$.1P.1J=I(y,z){8(1h.W==0){1c(M,\'5q 4p 6t 1m "\'+1h.3U+\'".\');J 1h}8(1h.W>1){J 1h.1Q(I(){$(1h).1J(y,z)})}F A=1h,$19=1h[0];8(A.1q(\'4q\')){F B=A.1A(\'5r\');A.X(\'5s\',M)}Q{F B=O}A.3V=I(o,b,c){o=3W($19,o);8(o.1c){H.1c=o.1c;1c(H,\'6u "1c" 6v 6w 6x 6y 3u 5t 6z 4r-1j.\')}F e=[\'G\',\'1n\',\'T\',\'17\',\'1a\',\'1b\'];1m(F a=0,l=e.W;a<l;a++){o[e[a]]=3W($19,o[e[a]])}8(K o.1n==\'14\'){8(o.1n<=50)o.1n={\'G\':o.1n};Q o.1n={\'1k\':o.1n}}Q{8(K o.1n==\'1l\')o.1n={\'1G\':o.1n}}8(K o.G==\'14\')o.G={\'P\':o.G};Q 8(o.G==\'1e\')o.G={\'P\':o.G,\'S\':o.G,\'1s\':o.G};8(K o.G!=\'1j\')o.G={};8(b)2u=$.25(M,{},$.1P.1J.4s,o);7=$.25(M,{},$.1P.1J.4s,o);8(K 7.G.12!=\'1j\')7.G.12={};8(7.G.2I==0&&K c==\'14\'){7.G.2I=c}C.4t=(7.2J);C.2k=(7.2k==\'4u\'||7.2k==\'1t\')?\'1a\':\'17\';F f=[[\'S\',\'34\',\'26\',\'1s\',\'5u\',\'2K\',\'1t\',\'2L\',\'1E\',0,1,2,3],[\'1s\',\'5u\',\'2K\',\'S\',\'34\',\'26\',\'2L\',\'1t\',\'3X\',3,2,1,0]];F g=f[0].W,5v=(7.2k==\'2M\'||7.2k==\'1t\')?0:1;7.d={};1m(F d=0;d<g;d++){7.d[f[0][d]]=f[5v][d]}F h=A.Z();1x(K 7.G.P){V\'1j\':7.G.12.2N=7.G.P.2N;7.G.12.27=7.G.P.27;7.G.P=O;18;V\'1l\':8(7.G.P==\'1e\'){7.G.12.1e=M}Q{7.G.12.2l=7.G.P}7.G.P=O;18;V\'I\':7.G.12.2l=7.G.P;7.G.P=O;18}8(K 7.G.1v==\'1y\'){7.G.1v=(h.1v(\':2O\').W>0)?\':P\':\'*\'}8(7[7.d[\'S\']]==\'T\'){7[7.d[\'S\']]=3v(h,7,\'26\')}8(3Y(7[7.d[\'S\']])&&!7.2J){7[7.d[\'S\']]=3Z(35($1B.36(),7,\'34\'),7[7.d[\'S\']]);C.4t=M}8(7[7.d[\'1s\']]==\'T\'){7[7.d[\'1s\']]=3v(h,7,\'2K\')}8(!7.G[7.d[\'S\']]){8(7.2J){1c(M,\'5w a \'+7.d[\'S\']+\' 1m 5t G!\');7.G[7.d[\'S\']]=3v(h,7,\'26\')}Q{7.G[7.d[\'S\']]=(4v(h,7,\'26\'))?\'1e\':h[7.d[\'26\']](M)}}8(!7.G[7.d[\'1s\']]){7.G[7.d[\'1s\']]=(4v(h,7,\'2K\'))?\'1e\':h[7.d[\'2K\']](M)}8(!7[7.d[\'1s\']]){7[7.d[\'1s\']]=7.G[7.d[\'1s\']]}8(!7.G.P&&!7.2J){8(7.G[7.d[\'S\']]==\'1e\'){7.G.12.1e=M}8(!7.G.12.1e){8(K 7[7.d[\'S\']]==\'14\'){7.G.P=1K.3w(7[7.d[\'S\']]/7.G[7.d[\'S\']])}Q{F i=35($1B.36(),7,\'34\');7.G.P=1K.3w(i/7.G[7.d[\'S\']]);7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];8(!7.G.12.2l)7.1C=O}8(7.G.P==\'6A\'||7.G.P<1){1c(M,\'28 a 4w 14 3x P G: 5w 3u "1e".\');7.G.12.1e=M}}}8(!7[7.d[\'S\']]){7[7.d[\'S\']]=\'1e\';8(!7.2J&&7.G.1v==\'*\'&&!7.G.12.1e&&7.G[7.d[\'S\']]!=\'1e\'){7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];7.1C=O}}8(7.G.12.1e){7.3y=(7[7.d[\'S\']]==\'1e\')?35($1B.36(),7,\'34\'):7[7.d[\'S\']];8(7.1C===O){7[7.d[\'S\']]=\'1e\'}7.G.P=2P(h,7,0)}Q 8(7.G.1v!=\'*\'){7.G.12.41=7.G.P;7.G.P=3z(h,7,0)}8(K 7.1C==\'1y\'){7.1C=(7[7.d[\'S\']]==\'1e\')?O:\'4x\'}7.G.P=2Q(7.G.P,7,7.G.12.2l,$19);7.G.12.2m=7.G.P;7.1u=O;8(7.2J){8(!7.G.12.2N)7.G.12.2N=7.G.P;8(!7.G.12.27)7.G.12.27=7.G.P;7.1C=O;7.1i=[0,0,0,0];F j=$1B.1W(\':P\');8(j)$1B.3a();F k=3Z(35($1B.36(),7,\'34\'),7[7.d[\'S\']]);8(K 7[7.d[\'S\']]==\'14\'&&k<7[7.d[\'S\']]){k=7[7.d[\'S\']]}8(j)$1B.3b();F m=4y(1K.2v(k/7.G[7.d[\'S\']]),7.G.12);8(m>h.W){m=h.W}F n=1K.3w(k/m),4z=7[7.d[\'1s\']],5x=3Y(4z);h.1Q(I(){F a=$(1h),4A=n-5y(a,7,\'6B\');a[7.d[\'S\']](4A);8(5x){a[7.d[\'1s\']](3Z(4A,4z))}});7.G.P=m;7.G[7.d[\'S\']]=n;7[7.d[\'S\']]=m*n}Q{7.1i=5z(7.1i);8(7.1C==\'2L\')7.1C=\'1t\';8(7.1C==\'4B\')7.1C=\'2M\';1x(7.1C){V\'4x\':V\'1t\':V\'2M\':8(7[7.d[\'S\']]!=\'1e\'){F p=42(3c(h,7),7);7.1u=M;7.1i[7.d[1]]=p[1];7.1i[7.d[3]]=p[0]}18;2w:7.1C=O;7.1u=(7.1i[0]==0&&7.1i[1]==0&&7.1i[2]==0&&7.1i[3]==0)?O:M;18}}8(K 7.2n==\'1r\'&&7.2n)7.2n=\'6C\'+A.6D(\'6E\');8(K 7.G.3d!=\'14\')7.G.3d=7.G.P;8(K 7.1n.1k!=\'14\')7.1n.1k=5A;8(K 7.1n.G==\'1y\')7.1n.G=(7.G.12.1e||7.G.1v!=\'*\')?\'P\':7.G.P;7.T=3A($19,7.T,\'T\');7.17=3A($19,7.17);7.1a=3A($19,7.1a);7.1b=3A($19,7.1b,\'1b\');7.T=$.25(M,{},7.1n,7.T);7.17=$.25(M,{},7.1n,7.17);7.1a=$.25(M,{},7.1n,7.1a);7.1b=$.25(M,{},7.1n,7.1b);8(K 7.1b.43!=\'1r\')7.1b.43=O;8(K 7.1b.3e!=\'I\'&&7.1b.3e!==O)7.1b.3e=$.1P.1J.5B;8(K 7.T.1H!=\'1r\')7.T.1H=M;8(K 7.T.4C!=\'14\')7.T.4C=0;8(K 7.T.44==\'1y\')7.T.44=M;8(K 7.T.4D!=\'1r\')7.T.4D=M;8(K 7.T.3f!=\'14\')7.T.3f=(7.T.1k<10)?6F:7.T.1k*5;8(7.29){7.29=4E(7.29)}8(H.1c){1c(H,\'3g S: \'+7.S);1c(H,\'3g 1s: \'+7.1s);8(7.3y)1c(H,\'6G \'+7.d[\'S\']+\': \'+7.3y);1c(H,\'5C 6H: \'+7.G.S);1c(H,\'5C 6I: \'+7.G.1s);1c(H,\'45 3x G P: \'+7.G.P);8(7.T.1H)1c(H,\'45 3x G 4F 6J: \'+7.T.G);8(7.17.Y)1c(H,\'45 3x G 4F 4G: \'+7.17.G);8(7.1a.Y)1c(H,\'45 3x G 4F 5D: \'+7.1a.G)}};A.5E=I(){A.1q(\'4q\',M);F a={\'4H\':A.16(\'4H\'),\'4I\':A.16(\'4I\'),\'3B\':A.16(\'3B\'),\'2L\':A.16(\'2L\'),\'2M\':A.16(\'2M\'),\'4B\':A.16(\'4B\'),\'1t\':A.16(\'1t\'),\'S\':A.16(\'S\'),\'1s\':A.16(\'1s\'),\'4J\':A.16(\'4J\'),\'1E\':A.16(\'1E\'),\'3X\':A.16(\'3X\'),\'4K\':A.16(\'4K\')};1x(a.3B){V\'4L\':F b=\'4L\';18;V\'5F\':F b=\'5F\';18;2w:F b=\'6K\'}$1B.16(a).16({\'6L\':\'2O\',\'3B\':b});A.1q(\'5G\',a).16({\'4H\':\'1t\',\'4I\':\'46\',\'3B\':\'4L\',\'2L\':0,\'1t\':0,\'4J\':0,\'1E\':0,\'3X\':0,\'4K\':0});8(7.1u){A.Z().1Q(I(){F m=2o($(1h).16(7.d[\'1E\']));8(2p(m))m=0;$(1h).1q(\'1S\',m)})}};A.5H=I(){A.4M();A.13(L(\'4N\',H),I(e,a){e.1f();8(!C.1Z){8(7.T.Y){7.T.Y.2R(2q(\'47\',H))}}C.1Z=M;8(7.T.1H){7.T.1H=O;A.X(L(\'2S\',H),a)}J M});A.13(L(\'4O\',H),I(e){e.1f();8(C.1T){3C(R)}J M});A.13(L(\'2S\',H),I(e,a,b){e.1f();1F=3h(1F);8(a&&C.1T){R.1Z=M;F c=2x()-R.2T;R.1k-=c;8(R.1o)R.1o.1k-=c;8(R.1R)R.1R.1k-=c;3C(R,O)}8(!C.1X&&!C.1T){8(b)1F.3D+=2x()-1F.2T}8(!C.1X){8(7.T.Y){7.T.Y.2R(2q(\'5I\',H))}}C.1X=M;8(7.T.5J){F d=7.T.3f-1F.3D,3E=3F-1K.2v(d*3F/7.T.3f);7.T.5J.1z($19,3E,d)}J M});A.13(L(\'1H\',H),I(e,b,c,d){e.1f();1F=3h(1F);F v=[b,c,d],t=[\'1l\',\'14\',\'1r\'],a=2U(v,t);F b=a[0],c=a[1],d=a[2];8(b!=\'17\'&&b!=\'1a\')b=C.2k;8(K c!=\'14\')c=0;8(K d!=\'1r\')d=O;8(d){C.1Z=O;7.T.1H=M}8(!7.T.1H){e.20();J 1c(H,\'3g 47: 28 2V.\')}8(C.1X){8(7.T.Y){7.T.Y.2y(2q(\'47\',H));7.T.Y.2y(2q(\'5I\',H))}}C.1X=O;1F.2T=2x();F f=7.T.3f+c;3G=f-1F.3D;3E=3F-1K.2v(3G*3F/f);1F.T=6M(I(){8(7.T.5K){7.T.5K.1z($19,3E,3G)}8(C.1T){A.X(L(\'1H\',H),b)}Q{A.X(L(b,H),7.T)}},3G);8(7.T.5L){7.T.5L.1z($19,3E,3G)}J M});A.13(L(\'2W\',H),I(e){e.1f();8(R.1Z){R.1Z=O;C.1X=O;C.1T=M;R.2T=2x();2a(R)}Q{A.X(L(\'1H\',H))}J M});A.13(L(\'17\',H)+\' \'+L(\'1a\',H),I(e,b,f,g){e.1f();8(C.1Z||A.1W(\':2O\')){e.20();J 1c(H,\'3g 47 6N 2O: 28 2V.\')}8(7.G.3d>=N.U){e.20();J 1c(H,\'28 5M G (\'+N.U+\', \'+7.G.3d+\' 5N): 28 2V.\')}F v=[b,f,g],t=[\'1j\',\'14/1l\',\'I\'],a=2U(v,t);F b=a[0],f=a[1],g=a[2];F h=e.4P.1d(H.3i.3H.W);8(K b!=\'1j\'||b==2b)b=7[h];8(K g==\'I\')b.21=g;8(K f!=\'14\'){8(7.G.1v!=\'*\'){f=\'P\'}Q{F i=[f,b.G,7[h].G];1m(F a=0,l=i.W;a<l;a++){8(K i[a]==\'14\'||i[a]==\'5O\'||i[a]==\'P\'){f=i[a];18}}}1x(f){V\'5O\':e.20();J A.1A(h+\'6O\',[b,g]);18;V\'P\':8(!7.G.12.1e&&7.G.1v==\'*\'){f=7.G.P}18}}8(R.1Z){A.X(L(\'2W\',H));A.X(L(\'3j\',H),[h,[b,f,g]]);e.20();J 1c(H,\'3g 6P 2V.\')}8(b.1k>0){8(C.1T){8(b.3j)A.X(L(\'3j\',H),[h,[b,f,g]]);e.20();J 1c(H,\'3g 6Q 2V.\')}}8(b.4Q&&!b.4Q.1z($19)){e.20();J 1c(H,\'6R "4Q" 6S O.\')}1F.3D=0;A.X(\'5P\'+h,[b,f]);8(7.29){F s=7.29,c=[b,f];1m(F j=0,l=s.W;j<l;j++){F d=h;8(!s[j][1])c[0]=s[j][0].1A(\'5Q\',h);8(!s[j][2])d=(d==\'17\')?\'1a\':\'17\';c[1]=f+s[j][3];s[j][0].X(\'5P\'+d,c)}}J M});A.13(L(\'6T\',H,O),I(e,f,g){e.1f();F h=A.Z();8(!7.1L){8(N.11==0){8(7.3k){A.X(L(\'1a\',H),N.U-1)}J e.20()}}8(7.1u)1M(h,7);8(K g!=\'14\'){8(7.G.12.1e){g=48(h,7,N.U-1)}Q 8(7.G.1v!=\'*\'){F i=(K f.G==\'14\')?f.G:4R(A,7);g=5R(h,7,N.U-1,i)}Q{g=7.G.P}g=4a(g,7,f.G,$19)}8(!7.1L){8(N.U-g<N.11){g=N.U-N.11}}7.G.12.2m=7.G.P;8(7.G.12.1e){F j=2P(h,7,N.U-g);8(7.G.P+g<=j&&g<N.U){g++;j=2P(h,7,N.U-g)}7.G.P=2Q(j,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F j=3z(h,7,N.U-g);7.G.P=2Q(j,7,7.G.12.2l,$19)}8(7.1u)1M(h,7,M);8(g==0){e.20();J 1c(H,\'0 G 3u 1n: 28 2V.\')}1c(H,\'5S \'+g+\' G 4G.\');N.11+=g;22(N.11>=N.U){N.11-=N.U}8(!7.1L){8(N.11==0&&f.4b)f.4b.1z($19);8(!7.3k)2X(7,N.11,H)}A.Z().1d(N.U-g,N.U).6U(A);8(N.U<7.G.P+g){A.Z().1d(0,(7.G.P+g)-N.U).4c(M).3I(A)}F h=A.Z(),2r=5T(h,7,g),1U=5U(h,7),2c=h.1N(g-1),2d=2r.2Y(),2z=1U.2Y();8(7.1u)1M(h,7);8(7.1C){F p=42(1U,7),k=p[0],2s=p[1]}Q{F k=0,2s=0}F l=(k<0)?7.1i[7.d[3]]:0;8(f.1I==\'5V\'&&7.G.P<g){F m=h.1d(7.G.12.2m,g),4d=7.G[7.d[\'S\']];m.1Q(I(){F a=$(1h);a.1q(\'4e\',a.1W(\':2O\')).3a()});7.G[7.d[\'S\']]=\'1e\'}Q{F m=O}F n=3l(h.1d(0,g),7,\'S\'),2e=4f(2A(1U,7,M),7,!7.1u);8(m)7.G[7.d[\'S\']]=4d;8(7.1u){1M(h,7,M);8(2s>=0){1M(2d,7,7.1i[7.d[1]])}1M(2c,7,7.1i[7.d[3]])}8(7.1C){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=k}F o={},1w=f.1k;8(f.1I==\'46\')1w=0;Q 8(1w==\'T\')1w=7.1n.1k/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=23(1w,f.1G);8(7[7.d[\'S\']]==\'1e\'||7[7.d[\'1s\']]==\'1e\'){R.1g.1p([$1B,2e])}8(7.1u){F q=7.1i[7.d[3]];8(2z.4S(2c).W){F r={};r[7.d[\'1E\']]=2c.1q(\'1S\');8(k<0)2c.16(r);Q R.1g.1p([2c,r])}8(2z.4S(2d).W){F s={};s[7.d[\'1E\']]=2d.1q(\'1S\');R.1g.1p([2d,s])}8(2s>=0){F t={};t[7.d[\'1E\']]=2z.1q(\'1S\')+7.1i[7.d[1]];R.1g.1p([2z,t])}}Q{F q=0}o[7.d[\'1t\']]=q;F u=[2r,1U,2e,1w];8(f.2f)f.2f.3J($19,u);1Y.2f=3K(1Y.2f,$19,u);1x(f.1I){V\'2B\':V\'2g\':V\'2C\':V\'2h\':R.1o=23(R.1k,R.1G);R.1R=23(R.1k,R.1G);R.1k=0;18}1x(f.1I){V\'2g\':V\'2C\':V\'2h\':F v=A.4c().3I($1B);18}1x(f.1I){V\'2h\':v.Z().1d(0,g).1O();V\'2g\':V\'2C\':v.Z().1d(7.G.P).1O();18}1x(f.1I){V\'2B\':R.1o.1g.1p([A,{\'2i\':0}]);18;V\'2g\':v.16({\'2i\':0});R.1o.1g.1p([A,{\'S\':\'+=0\'},I(){v.1O()}]);R.1R.1g.1p([v,{\'2i\':1}]);18;V\'2C\':R=4T(R,A,v,7,M);18;V\'2h\':R=4U(R,A,v,7,M,g);18}F w=I(){F b=7.G.P+g-N.U;8(b>0){A.Z().1d(N.U).1O();2r=$(A.Z().1d(N.U-(7.G.P-b)).4g().5W(A.Z().1d(0,b).4g()))}8(m){m.1Q(I(){F a=$(1h);8(!a.1q(\'4e\'))a.3b()})}8(7.1u){F c=A.Z().1N(7.G.P+g-1);c.16(7.d[\'1E\'],c.1q(\'1S\'))}R.1g=[];8(R.1o)R.1o=23(R.4V,R.1G);F d=I(){1x(f.1I){V\'2B\':V\'2g\':A.16(\'1v\',\'\');18}R.1R=23(0,2b);C.1T=O;F a=[2r,1U,2e];8(f.21)f.21.3J($19,a);1Y.21=3K(1Y.21,$19,a);8(1V.W){A.X(L(1V[0][0],H),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',H))};1x(f.1I){V\'2B\':R.1o.1g.1p([A,{\'2i\':1},d]);2a(R.1o);18;V\'2h\':R.1o.1g.1p([A,{\'S\':\'+=0\'},d]);2a(R.1o);18;2w:d();18}};R.1g.1p([A,o,w]);C.1T=M;A.16(7.d[\'1t\'],-(n-l));1F=3h(1F);2a(R);4W(7.2n,A.1A(L(\'3L\',H)));A.X(L(\'2D\',H),[O,2e]);J M});A.13(L(\'6V\',H,O),I(e,f,g){e.1f();F h=A.Z();8(!7.1L){8(N.11==7.G.P){8(7.3k){A.X(L(\'17\',H),N.U-1)}J e.20()}}8(7.1u)1M(h,7);8(K g!=\'14\'){8(7.G.1v!=\'*\'){F i=(K f.G==\'14\')?f.G:4R(A,7);g=5Y(h,7,0,i)}Q{g=7.G.P}g=4a(g,7,f.G,$19)}F j=(N.11==0)?N.U:N.11;8(!7.1L){8(7.G.12.1e){F k=2P(h,7,g),i=48(h,7,j-1)}Q{F k=7.G.P,i=7.G.P}8(g+k>j){g=j-i}}7.G.12.2m=7.G.P;8(7.G.12.1e){F k=4X(h,7,g,j);22(7.G.P-g>=k&&g<N.U){g++;k=4X(h,7,g,j)}7.G.P=2Q(k,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F k=3z(h,7,g);7.G.P=2Q(k,7,7.G.12.2l,$19)}8(7.1u)1M(h,7,M);8(g==0){e.20();J 1c(H,\'0 G 3u 1n: 28 2V.\')}1c(H,\'5S \'+g+\' G 5D.\');N.11-=g;22(N.11<0){N.11+=N.U}8(!7.1L){8(N.11==7.G.P&&f.4b)f.4b.1z($19);8(!7.3k)2X(7,N.11,H)}8(N.U<7.G.P+g){A.Z().1d(0,(7.G.P+g)-N.U).4c(M).3I(A)}F h=A.Z(),2r=4Y(h,7),1U=4Z(h,7,g),2c=h.1N(g-1),2d=2r.2Y(),2z=1U.2Y();8(7.1u)1M(h,7);8(7.1C){F p=42(1U,7),l=p[0],2s=p[1]}Q{F l=0,2s=0}8(f.1I==\'5V\'&&7.G.12.2m<g){F m=h.1d(7.G.12.2m,g),4d=7.G[7.d[\'S\']];m.1Q(I(){F a=$(1h);a.1q(\'4e\',a.1W(\':2O\')).3a()});7.G[7.d[\'S\']]=\'1e\'}Q{F m=O}F n=3l(h.1d(0,g),7,\'S\'),2e=4f(2A(1U,7,M),7,!7.1u);8(m)7.G[7.d[\'S\']]=4d;8(7.1C){8(7.1i[7.d[1]]<0){7.1i[7.d[1]]=0}}8(7.1u){1M(h,7,M);1M(2d,7,7.1i[7.d[1]])}8(7.1C){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=l}F o={},1w=f.1k;8(f.1I==\'46\')1w=0;Q 8(1w==\'T\')1w=7.1n.1k/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=23(1w,f.1G);8(7[7.d[\'S\']]==\'1e\'||7[7.d[\'1s\']]==\'1e\'){R.1g.1p([$1B,2e])}8(7.1u){F q=2z.1q(\'1S\');8(2s>=0){q+=7.1i[7.d[1]]}2z.16(7.d[\'1E\'],q);8(2c.4S(2d).W){F r={};r[7.d[\'1E\']]=2d.1q(\'1S\');R.1g.1p([2d,r])}F s=2c.1q(\'1S\');8(l>=0){s+=7.1i[7.d[3]]}F t={};t[7.d[\'1E\']]=s;R.1g.1p([2c,t])}o[7.d[\'1t\']]=-n;8(l<0){o[7.d[\'1t\']]+=l}F u=[2r,1U,2e,1w];8(f.2f)f.2f.3J($19,u);1Y.2f=3K(1Y.2f,$19,u);1x(f.1I){V\'2B\':V\'2g\':V\'2C\':V\'2h\':R.1o=23(R.1k,R.1G);R.1R=23(R.1k,R.1G);R.1k=0;18}1x(f.1I){V\'2g\':V\'2C\':V\'2h\':F v=A.4c().3I($1B);18}1x(f.1I){V\'2h\':v.Z().1d(7.G.12.2m).1O();18;V\'2g\':V\'2C\':v.Z().1d(0,g).1O();v.Z().1d(7.G.P).1O();18}1x(f.1I){V\'2B\':R.1o.1g.1p([A,{\'2i\':0}]);18;V\'2g\':v.16({\'2i\':0});R.1o.1g.1p([A,{\'S\':\'+=0\'},I(){v.1O()}]);R.1R.1g.1p([v,{\'2i\':1}]);18;V\'2C\':R=4T(R,A,v,7,O);18;V\'2h\':R=4U(R,A,v,7,O,g);18}F w=I(){F b=7.G.P+g-N.U,5Z=(7.1u)?7.1i[7.d[3]]:0;A.16(7.d[\'1t\'],5Z);8(b>0){A.Z().1d(N.U).1O()}F c=A.Z().1d(0,g).3I(A).2Y();8(b>0){1U=3c(h,7)}8(m){m.1Q(I(){F a=$(1h);8(!a.1q(\'4e\'))a.3b()})}8(7.1u){8(N.U<7.G.P+g){F d=A.Z().1N(7.G.P-1);d.16(7.d[\'1E\'],d.1q(\'1S\')+7.1i[7.d[3]])}c.16(7.d[\'1E\'],c.1q(\'1S\'))}R.1g=[];8(R.1o)R.1o=23(R.4V,R.1G);F e=I(){1x(f.1I){V\'2B\':V\'2g\':A.16(\'1v\',\'\');18}R.1R=23(0,2b);C.1T=O;F a=[2r,1U,2e];8(f.21)f.21.3J($19,a);1Y.21=3K(1Y.21,$19,a);8(1V.W){A.X(L(1V[0][0],H),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',H))};1x(f.1I){V\'2B\':R.1o.1g.1p([A,{\'2i\':1},e]);2a(R.1o);18;V\'2h\':R.1o.1g.1p([A,{\'S\':\'+=0\'},e]);2a(R.1o);18;2w:e();18}};R.1g.1p([A,o,w]);C.1T=M;1F=3h(1F);2a(R);4W(7.2n,A.1A(L(\'3L\',H)));A.X(L(\'2D\',H),[O,2e]);J M});A.13(L(\'2Z\',H),I(e,b,c,d,f,g,h){e.1f();F v=[b,c,d,f,g,h],t=[\'1l/14/1j\',\'14\',\'1r\',\'1j\',\'1l\',\'I\'],a=2U(v,t);F f=a[3],g=a[4],h=a[5];b=3m(a[0],a[1],a[2],N,A);8(b==0)J;8(K f!=\'1j\')f=O;8(C.1T){8(K f!=\'1j\'||f.1k>0)J O}8(g!=\'17\'&&g!=\'1a\'){8(7.1L){8(b<=N.U/2)g=\'1a\';Q g=\'17\'}Q{8(N.11==0||N.11>b)g=\'1a\';Q g=\'17\'}}8(g==\'17\')b=N.U-b;A.X(L(g,H),[f,b,h]);J M});A.13(L(\'6W\',H),I(e,a,b){e.1f();F c=A.1A(L(\'3M\',H));J A.1A(L(\'51\',H),[c-1,a,\'17\',b])});A.13(L(\'6X\',H),I(e,a,b){e.1f();F c=A.1A(L(\'3M\',H));J A.1A(L(\'51\',H),[c+1,a,\'1a\',b])});A.13(L(\'51\',H),I(e,a,b,c,d){e.1f();8(K a!=\'14\')a=A.1A(L(\'3M\',H));F f=7.1b.G||7.G.P,27=1K.2v(N.U/f)-1;8(a<0)a=27;8(a>27)a=0;J A.1A(L(\'2Z\',H),[a*f,0,M,b,c,d])});A.13(L(\'60\',H),I(e,s){e.1f();8(s)s=3m(s,0,M,N,A);Q s=0;s+=N.11;8(s!=0){22(s>N.U)s-=N.U;A.6Y(A.Z().1d(s,N.U))}J M});A.13(L(\'29\',H),I(e,s){e.1f();8(s)s=4E(s);Q 8(7.29)s=7.29;Q J 1c(H,\'5q 6Z 3u 29.\');F n=A.1A(L(\'3L\',H)),x=M;1m(F j=0,l=s.W;j<l;j++){8(!s[j][0].1A(L(\'2Z\',H),[n,s[j][3],M])){x=O}}J x});A.13(L(\'3j\',H),I(e,a,b){e.1f();8(K a==\'I\'){a.1z($19,1V)}Q 8(31(a)){1V=a}Q 8(K a!=\'1y\'){1V.1p([a,b])}J 1V});A.13(L(\'70\',H),I(e,b,c,d,f){e.1f();F v=[b,c,d,f],t=[\'1l/1j\',\'1l/14/1j\',\'1r\',\'14\'],a=2U(v,t);F b=a[0],c=a[1],d=a[2],f=a[3];8(K b==\'1j\'&&K b.3n==\'1y\')b=$(b);8(K b==\'1l\')b=$(b);8(K b!=\'1j\'||K b.3n==\'1y\'||b.W==0)J 1c(H,\'28 a 4w 1j.\');8(K c==\'1y\')c=\'4h\';8(7.1u){b.1Q(I(){F m=2o($(1h).16(7.d[\'1E\']));8(2p(m))m=0;$(1h).1q(\'1S\',m)})}F g=c,3N=\'3N\';8(c==\'4h\'){8(d){8(N.11==0){c=N.U-1;3N=\'61\'}Q{c=N.11;N.11+=b.W}8(c<0)c=0}Q{c=N.U-1;3N=\'61\'}}Q{c=3m(c,f,d,N,A)}8(g!=\'4h\'&&!d){8(c<N.11)N.11+=b.W}8(N.11>=N.U)N.11-=N.U;F h=A.Z().1N(c);8(h.W){h[3N](b)}Q{A.62(b)}N.U=A.Z().W;F i=A.1A(\'52\');3O(7,N.U,H);2X(7,N.11,H);A.X(L(\'53\',H));A.X(L(\'2D\',H),[M,i]);J M});A.13(L(\'71\',H),I(e,b,c,d){e.1f();F v=[b,c,d],t=[\'1l/14/1j\',\'1r\',\'14\'],a=2U(v,t);F b=a[0],c=a[1],d=a[2];8(K b==\'1y\'||b==\'4h\'){A.Z().2Y().1O()}Q{b=3m(b,d,c,N,A);F f=A.Z().1N(b);8(f.W){8(b<N.11)N.11-=f.W;f.1O()}}N.U=A.Z().W;F g=A.1A(\'52\');3O(7,N.U,H);2X(7,N.11,H);A.X(L(\'2D\',H),[M,g]);J M});A.13(L(\'2f\',H)+\' \'+L(\'21\',H),I(e,a){e.1f();F b=e.4P.1d(H.3i.3H.W);8(31(a))1Y[b]=a;8(K a==\'I\')1Y[b].1p(a);J 1Y[b]});A.13(L(\'5r\',H,O),I(e,a){e.1f();J A.1A(L(\'3L\',H),a)});A.13(L(\'3L\',H),I(e,a){e.1f();8(N.11==0)F b=0;Q F b=N.U-N.11;8(K a==\'I\')a.1z($19,b);J b});A.13(L(\'3M\',H),I(e,a){e.1f();F b=7.1b.G||7.G.P;F c=1K.2v(N.U/b-1);8(N.11==0)F d=0;Q 8(N.11<N.U%b)F d=0;Q 8(N.11==b&&!7.1L)F d=c;Q F d=1K.72((N.U-N.11)/b);8(d<0)d=0;8(d>c)d=c;8(K a==\'I\')a.1z($19,d);J d});A.13(L(\'73\',H),I(e,a){e.1f();$i=3c(A.Z(),7);8(K a==\'I\')a.1z($19,$i);J $i});A.13(L(\'1d\',H),I(e,f,l,b){e.1f();F v=[f,l,b],t=[\'14\',\'14\',\'I\'],a=2U(v,t);f=(K a[0]==\'14\')?a[0]:0,l=(K a[1]==\'14\')?a[1]:N.U,b=a[2];f+=N.11;l+=N.11;22(f>N.U){f-=N.U}22(l>N.U){l-=N.U}22(f<0){f+=N.U}22(l<0){l+=N.U}F c=A.Z();8(l>f){F d=c.1d(f,l)}Q{F d=$(c.1d(f,N.U).4g().5W(c.1d(0,l).4g()))}8(K b==\'I\')b.1z($19,d);J d});A.13(L(\'1X\',H)+\' \'+L(\'1Z\',H)+\' \'+L(\'1T\',H),I(e,a){e.1f();F b=e.4P.1d(H.3i.3H.W);8(K a==\'I\')a.1z($19,C[b]);J C[b]});A.13(L(\'5Q\',H,O),I(e,a,b,c){e.1f();J A.1A(L(\'4r\',H),[a,b,c])});A.13(L(\'4r\',H),I(e,a,b,c){e.1f();F d=O;8(K a==\'I\'){a.1z($19,7)}Q 8(K a==\'1j\'){2u=$.25(M,{},2u,a);8(b!==O)d=M;Q 7=$.25(M,{},7,a)}Q 8(K a!=\'1y\'){8(K b==\'I\'){F f=4i(\'7.\'+a);8(K f==\'1y\')f=\'\';b.1z($19,f)}Q 8(K b!=\'1y\'){8(K c!==\'1r\')c=M;4i(\'2u.\'+a+\' = b\');8(c!==O)d=M;Q 4i(\'7.\'+a+\' = b\')}Q{J 4i(\'7.\'+a)}}8(d){1M(A.Z(),7);A.3V(2u);A.54();F g=3P(A,7,O);A.X(L(\'2D\',H),[M,g])}J 7});A.13(L(\'53\',H),I(e,a,b){e.1f();8(K a==\'1y\'||a.W==0)a=$(\'74\');Q 8(K a==\'1l\')a=$(a);8(K a!=\'1j\')J 1c(H,\'28 a 4w 1j.\');8(K b!=\'1l\'||b.W==0)b=\'a.63\';a.75(b).1Q(I(){F h=1h.64||\'\';8(h.W>0&&A.Z().65($(h))!=-1){$(1h).24(\'55\').55(I(e){e.2j();A.X(L(\'2Z\',H),h)})}});J M});A.13(L(\'2D\',H),I(e,b,c){e.1f();8(!7.1b.1D)J;8(b){F d=7.1b.G||7.G.P,l=1K.2v(N.U/d);8(7.1b.3e){7.1b.1D.Z().1O();7.1b.1D.1Q(I(){1m(F a=0;a<l;a++){F i=A.Z().1N(3m(a*d,0,M,N,A));$(1h).62(7.1b.3e(a+1,i))}})}7.1b.1D.1Q(I(){$(1h).Z().24(7.1b.3o).1Q(I(a){$(1h).13(7.1b.3o,I(e){e.2j();A.X(L(\'2Z\',H),[a*d,0,M,7.1b])})})})}7.1b.1D.1Q(I(){$(1h).Z().2y(2q(\'66\',H)).1N(A.1A(L(\'3M\',H))).2R(2q(\'66\',H))});J M});A.13(L(\'52\',H),I(e){F a=A.Z(),3Q=7.G.P;8(7.G.12.1e)3Q=2P(a,7,0);Q 8(7.G.1v!=\'*\')3Q=3z(a,7,0);8(!7.1L&&N.11!=0&&3Q>N.11){8(7.G.12.1e){F b=48(a,7,N.11)-N.11}Q 8(7.G.1v!=\'*\'){F b=68(a,7,N.11)-N.11}Q{b=7.G.P-N.11}1c(H,\'76 77-1L: 78 \'+b+\' G 4G.\');A.X(\'17\',b)}7.G.P=2Q(3Q,7,7.G.12.2l,$19);J 3P(A,7)});A.13(L(\'5s\',H,O),I(e,a){e.1f();A.X(L(\'69\',H),a);J M});A.13(L(\'69\',H),I(e,a){e.1f();1F=3h(1F);A.1q(\'4q\',O);A.X(L(\'4O\',H));8(a){A.X(L(\'60\',H))}8(7.1u){1M(A.Z(),7)}A.16(A.1q(\'5G\'));A.4M();A.56();$1B.79(A);J M})};A.4M=I(){A.24(L(\'\',H));A.24(L(\'\',H,O))};A.54=I(){A.56();3O(7,N.U,H);2X(7,N.11,H);8(7.T.2t){F c=3p(7.T.2t);$1B.13(L(\'4j\',H,O),I(){A.X(L(\'2S\',H),c)}).13(L(\'4k\',H,O),I(){A.X(L(\'2W\',H))})}8(7.T.Y){7.T.Y.13(L(7.T.3o,H,O),I(e){e.2j();F a=O,c=2b;8(C.1X){a=\'1H\'}Q 8(7.T.44){a=\'2S\';c=3p(7.T.44)}8(a){A.X(L(a,H),c)}})}8(7.17.Y){7.17.Y.13(L(7.17.3o,H,O),I(e){e.2j();A.X(L(\'17\',H))});8(7.17.2t){F c=3p(7.17.2t);7.17.Y.13(L(\'4j\',H,O),I(){A.X(L(\'2S\',H),c)}).13(L(\'4k\',H,O),I(){A.X(L(\'2W\',H))})}}8(7.1a.Y){7.1a.Y.13(L(7.1a.3o,H,O),I(e){e.2j();A.X(L(\'1a\',H))});8(7.1a.2t){F c=3p(7.1a.2t);7.1a.Y.13(L(\'4j\',H,O),I(){A.X(L(\'2S\',H),c)}).13(L(\'4k\',H,O),I(){A.X(L(\'2W\',H))})}}8($.1P.2E){8(7.17.2E){8(!C.57){C.57=M;$1B.2E(I(e,a){8(a>0){e.2j();F b=59(7.17.2E);A.X(L(\'17\',H),b)}})}}8(7.1a.2E){8(!C.5a){C.5a=M;$1B.2E(I(e,a){8(a<0){e.2j();F b=59(7.1a.2E);A.X(L(\'1a\',H),b)}})}}}8($.1P.3R){F d=(7.17.5b)?I(){A.X(L(\'17\',H))}:2b,3S=(7.1a.5b)?I(){A.X(L(\'1a\',H))}:2b;8(3S||3S){8(!C.3R){C.3R=M;F f={\'7a\':30,\'7b\':30,\'7c\':M};1x(7.2k){V\'4u\':V\'6a\':f.7d=d;f.7e=3S;18;2w:f.7f=3S;f.7g=d}$1B.3R(f)}}}8(7.1b.1D){8(7.1b.2t){F c=3p(7.1b.2t);7.1b.1D.13(L(\'4j\',H,O),I(){A.X(L(\'2S\',H),c)}).13(L(\'4k\',H,O),I(){A.X(L(\'2W\',H))})}}8(7.17.2F||7.1a.2F){$(3T).13(L(\'6b\',H,O,M,M),I(e){F k=e.6c;8(k==7.1a.2F){e.2j();A.X(L(\'1a\',H))}8(k==7.17.2F){e.2j();A.X(L(\'17\',H))}})}8(7.1b.43){$(3T).13(L(\'6b\',H,O,M,M),I(e){F k=e.6c;8(k>=49&&k<58){k=(k-49)*7.G.P;8(k<=N.U){e.2j();A.X(L(\'2Z\',H),[k,0,M,7.1b])}}})}8(7.T.1H){A.X(L(\'1H\',H),7.T.4C)}8(C.4t){$(3q).13(L(\'7h\',H,O,M,M),I(e){A.X(L(\'4O\',H));8(7.T.4D&&!C.1X){A.X(L(\'1H\',H))}1M(A.Z(),7);A.3V(2u);F a=3P(A,7,O);A.X(L(\'2D\',H),[M,a])})}};A.56=I(){F a=L(\'\',H),3r=L(\'\',H,O);5c=L(\'\',H,O,M,M);$(3T).24(5c);$(3q).24(5c);$1B.24(3r);8(7.T.Y)7.T.Y.24(3r);8(7.17.Y)7.17.Y.24(3r);8(7.1a.Y)7.1a.Y.24(3r);8(7.1b.1D){7.1b.1D.24(3r);8(7.1b.3e){7.1b.1D.Z().1O()}}3O(7,\'3a\',H);2X(7,\'2y\',H)};F C={\'2k\':\'1a\',\'1X\':M,\'1T\':O,\'1Z\':O,\'5a\':O,\'57\':O,\'3R\':O},N={\'U\':A.Z().W,\'11\':0},1F={\'7i\':2b,\'T\':2b,\'3j\':2b,\'2T\':2x(),\'3D\':0},R={\'1Z\':O,\'1k\':0,\'2T\':0,\'1G\':\'\',\'1g\':[]},1Y={\'2f\':[],\'21\':[]},1V=[],H=$.25(M,{},$.1P.1J.6d,z),7={},2u=y,$1B=A.7j(\'<\'+H.5d.4p+\' 7k="\'+H.5d.6e+\'" />\').36();H.3U=A.3U;H.4l=$.1P.1J.4l++;A.3V(2u,M,B);A.5E();A.5H();A.54();8(31(7.G.2I)){F D=7.G.2I}Q{F D=[];8(7.G.2I!=0){D.1p(7.G.2I)}}8(7.2n){D.7l(6f(7.2n))}8(D.W>0){1m(F a=0,l=D.W;a<l;a++){F s=D[a];8(s==0){5e}8(s===M){s=3q.7m.64;8(s.W<1){5e}}Q 8(s===\'6g\'){s=1K.3w(1K.6g()*N.U)}8(A.1A(L(\'2Z\',H),[s,0,M,{1I:\'46\'}])){18}}}F E=3P(A,7,O),6h=3c(A.Z(),7);8(7.6i){7.6i.1z($19,6h,E)}A.X(L(\'2D\',H),[M,E]);A.X(L(\'53\',H));J A};$.1P.1J.4l=1;$.1P.1J.4s={\'29\':O,\'3k\':M,\'1L\':M,\'2J\':O,\'2k\':\'1t\',\'G\':{\'2I\':0},\'1n\':{\'1G\':\'7n\',\'1k\':5A,\'2t\':O,\'2E\':O,\'5b\':O,\'3o\':\'55\',\'3j\':O}};$.1P.1J.6d={\'1c\':O,\'3i\':{\'3H\':\'\',\'6j\':\'7o\'},\'5d\':{\'4p\':\'7p\',\'6e\':\'7q\'},\'5f\':{}};$.1P.1J.5B=I(a,b){J\'<a 7r="#"><6k>\'+a+\'</6k></a>\'};I 23(d,e){J{1g:[],1k:d,4V:d,1G:e,2T:2x()}}I 2a(s){8(K s.1o==\'1j\'){2a(s.1o)}1m(F a=0,l=s.1g.W;a<l;a++){F b=s.1g[a];8(!b)5e;8(b[3])b[0].4N();b[0].6l(b[1],{6m:b[2],1k:s.1k,1G:s.1G})}8(K s.1R==\'1j\'){2a(s.1R)}}I 3C(s,c){8(K c!=\'1r\')c=M;8(K s.1o==\'1j\'){3C(s.1o,c)}1m(F a=0,l=s.1g.W;a<l;a++){F b=s.1g[a];b[0].4N(M);8(c){b[0].16(b[1]);8(K b[2]==\'I\')b[2]()}}8(K s.1R==\'1j\'){3C(s.1R,c)}}I 3h(t){8(t.T)7s(t.T);J t}I 3K(b,t,c){8(b.W){1m(F a=0,l=b.W;a<l;a++){b[a].3J(t,c)}}J[]}I 7t(a,c,x,d,f){F o={\'1k\':d,\'1G\':a.1G};8(K f==\'I\')o.6m=f;c.6l({2i:x},o)}I 4T(a,b,c,o,d){F e=2A(4Y(b.Z(),o),o,M)[0],5g=2A(c.Z(),o,M)[0],4m=(d)?-5g:e,2G={},3s={};2G[o.d[\'S\']]=5g;2G[o.d[\'1t\']]=4m;3s[o.d[\'1t\']]=0;a.1o.1g.1p([b,{\'2i\':1}]);a.1R.1g.1p([c,3s,I(){$(1h).1O()}]);c.16(2G);J a}I 4U(a,b,c,o,d,n){F e=2A(4Z(b.Z(),o,n),o,M)[0],5h=2A(c.Z(),o,M)[0],4m=(d)?-5h:e,2G={},3s={};2G[o.d[\'S\']]=5h;2G[o.d[\'1t\']]=0;3s[o.d[\'1t\']]=4m;a.1R.1g.1p([c,3s,I(){$(1h).1O()}]);c.16(2G);J a}I 3O(o,t,c){8(t==\'3b\'||t==\'3a\'){F f=t}Q 8(o.G.3d>=t){1c(c,\'28 5M G: 7u 7v (\'+t+\' G, \'+o.G.3d+\' 5N).\');F f=\'3a\'}Q{F f=\'3b\'}F s=(f==\'3b\')?\'2y\':\'2R\',h=2q(\'2O\',c);8(o.T.Y)o.T.Y[f]()[s](h);8(o.17.Y)o.17.Y[f]()[s](h);8(o.1a.Y)o.1a.Y[f]()[s](h);8(o.1b.1D)o.1b.1D[f]()[s](h)}I 2X(o,f,c){8(o.1L||o.3k)J;F a=(f==\'2y\'||f==\'2R\')?f:O,4n=2q(\'7w\',c);8(o.T.Y&&a){o.T.Y[a](4n)}8(o.17.Y){F b=a||(f==0)?\'2R\':\'2y\';o.17.Y[b](4n)}8(o.1a.Y){F b=a||(f==o.G.P)?\'2R\':\'2y\';o.1a.Y[b](4n)}}I 3W(a,b){8(K b==\'I\')b=b.1z(a);8(K b==\'1y\')b={};J b}I 3A(a,b,c){8(K c!=\'1l\')c=\'\';b=3W(a,b);8(K b==\'1l\'){F d=5i(b);8(d==-1)b=$(b);Q b=d}8(c==\'1b\'){8(K b==\'1r\')b={\'43\':b};8(K b.3n!=\'1y\')b={\'1D\':b};8(K b.1D==\'I\')b.1D=b.1D.1z(a);8(K b.1D==\'1l\')b.1D=$(b.1D);8(K b.G!=\'14\')b.G=O}Q 8(c==\'T\'){8(K b.3n!=\'1y\')b={\'Y\':b};8(K b==\'1r\')b={\'1H\':b};8(K b==\'14\')b={\'3f\':b};8(K b.Y==\'I\')b.Y=b.Y.1z(a);8(K b.Y==\'1l\')b.Y=$(b.Y)}Q{8(K b.3n!=\'1y\')b={\'Y\':b};8(K b==\'14\')b={\'2F\':b};8(K b.Y==\'I\')b.Y=b.Y.1z(a);8(K b.Y==\'1l\')b.Y=$(b.Y);8(K b.2F==\'1l\')b.2F=5i(b.2F)}J b}I 3m(a,b,c,d,e){8(K a==\'1l\'){8(2p(a))a=$(a);Q a=2o(a)}8(K a==\'1j\'){8(K a.3n==\'1y\')a=$(a);a=e.Z().65(a);8(a==-1)a=0;8(K c!=\'1r\')c=O}Q{8(K c!=\'1r\')c=M}8(2p(a))a=0;Q a=2o(a);8(2p(b))b=0;Q b=2o(b);8(c){a+=d.11}a+=b;8(d.U>0){22(a>=d.U){a-=d.U}22(a<0){a+=d.U}}J a}I 48(i,o,s){F t=0,x=0;1m(F a=s;a>=0;a--){F j=i.1N(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](M):0;8(t>o.3y)J x;8(a==0)a=i.W;x++}}I 68(i,o,s){J 5j(i,o.G.1v,o.G.12.41,s)}I 5R(i,o,s,m){J 5j(i,o.G.1v,m,s)}I 5j(i,f,m,s){F t=0,x=0;1m(F a=s,l=i.W-1;a>=0;a--){x++;8(x==l)J x;F j=i.1N(a);8(j.1W(f)){t++;8(t==m)J x}8(a==0)a=i.W}}I 4R(a,o){J o.G.12.41||a.Z().1d(0,o.G.P).1v(o.G.1v).W}I 2P(i,o,s){F t=0,x=0;1m(F a=s,l=i.W-1;a<=l;a++){F j=i.1N(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](M):0;8(t>o.3y)J x;x++;8(x==l)J x;8(a==l)a=-1}}I 4X(i,o,s,l){F v=2P(i,o,s);8(!o.1L){8(s+v>l)v=l-s}J v}I 3z(i,o,s){J 5k(i,o.G.1v,o.G.12.41,s,o.1L)}I 5Y(i,o,s,m){J 5k(i,o.G.1v,m+1,s,o.1L)-1}I 5k(i,f,m,s,c){F t=0,x=0;1m(F a=s,l=i.W-1;a<=l;a++){x++;8(x==l)J x;F j=i.1N(a);8(j.1W(f)){t++;8(t==m)J x}8(a==l)a=-1}}I 3c(i,o){J i.1d(0,o.G.P)}I 5T(i,o,n){J i.1d(n,o.G.12.2m+n)}I 5U(i,o){J i.1d(0,o.G.P)}I 4Y(i,o){J i.1d(0,o.G.12.2m)}I 4Z(i,o,n){J i.1d(n,o.G.P+n)}I 1M(i,o,m){F x=(K m==\'1r\')?m:O;8(K m!=\'14\')m=0;i.1Q(I(){F j=$(1h);F t=2o(j.16(o.d[\'1E\']));8(2p(t))t=0;j.1q(\'6n\',t);j.16(o.d[\'1E\'],((x)?j.1q(\'6n\'):m+j.1q(\'1S\')))})}I 3P(a,o,p){F b=a.36(),$i=a.Z(),$v=3c($i,o),4o=4f(2A($v,o,M),o,p);b.16(4o);8(o.1u){F p=o.1i,r=p[o.d[1]];8(o.1C){8(r<0)r=0}F c=$v.2Y();c.16(o.d[\'1E\'],c.1q(\'1S\')+r);a.16(o.d[\'2L\'],p[o.d[0]]);a.16(o.d[\'1t\'],p[o.d[3]])}a.16(o.d[\'S\'],4o[o.d[\'S\']]+(3l($i,o,\'S\')*2));a.16(o.d[\'1s\'],5l($i,o,\'1s\'));J 4o}I 2A(i,o,a){F b=3l(i,o,\'S\',a),6o=5l(i,o,\'1s\',a);J[b,6o]}I 5l(i,o,a,b){8(K b!=\'1r\')b=O;8(K o[o.d[a]]==\'14\'&&b)J o[o.d[a]];8(K o.G[o.d[a]]==\'14\')J o.G[o.d[a]];F c=(a.5m().32(\'S\')>-1)?\'26\':\'2K\';J 3v(i,o,c)}I 3v(i,o,b){F s=0;1m(F a=0,l=i.W;a<l;a++){F j=i.1N(a);F m=(j.1W(\':P\'))?j[o.d[b]](M):0;8(s<m)s=m}J s}I 35(b,o,c){8(!b.1W(\':P\'))J 0;F d=b[o.d[c]](),5n=(o.d[c].5m().32(\'S\')>-1)?[\'7x\',\'7y\']:[\'7z\',\'7A\'];1m(F a=0,l=5n.W;a<l;a++){F m=2o(b.16(5n[a]));d-=(2p(m))?0:m}J d}I 3l(i,o,b,c){8(K c!=\'1r\')c=O;8(K o[o.d[b]]==\'14\'&&c)J o[o.d[b]];8(K o.G[o.d[b]]==\'14\')J o.G[o.d[b]]*i.W;F d=(b.5m().32(\'S\')>-1)?\'26\':\'2K\',s=0;1m(F a=0,l=i.W;a<l;a++){F j=i.1N(a);s+=(j.1W(\':P\'))?j[o.d[d]](M):0}J s}I 4v(i,o,b){F s=O,v=O;1m(F a=0,l=i.W;a<l;a++){F j=i.1N(a);F c=(j.1W(\':P\'))?j[o.d[b]](M):0;8(s===O)s=c;Q 8(s!=c)v=M;8(s==0)v=M}J v}I 5y(i,o,d){J i[o.d[\'7B\'+d]](M)-35(i,o,\'7C\'+d)}I 3Y(x){J(K x==\'1l\'&&x.1d(-1)==\'%\')}I 3Z(s,o){8(3Y(o)){o=o.1d(0,-1);8(2p(o))J s;s*=o/3F}J s}I L(n,c,a,b,d){8(K a!=\'1r\')a=M;8(K b!=\'1r\')b=M;8(K d!=\'1r\')d=O;8(a)n=c.3i.3H+n;8(b)n=n+\'.\'+c.3i.6j;8(b&&d)n+=c.4l;J n}I 2q(n,c){J(K c.5f[n]==\'1l\')?c.5f[n]:n}I 4f(a,o,p){8(K p!=\'1r\')p=M;F b=(o.1u&&p)?o.1i:[0,0,0,0];F c={};c[o.d[\'S\']]=a[0]+b[1]+b[3];c[o.d[\'1s\']]=a[1]+b[0]+b[2];J c}I 2U(c,d){F e=[];1m(F a=0,6p=c.W;a<6p;a++){1m(F b=0,6q=d.W;b<6q;b++){8(d[b].32(K c[a])>-1&&K e[b]==\'1y\'){e[b]=c[a];18}}}J e}I 5z(p){8(K p==\'1y\')J[0,0,0,0];8(K p==\'14\')J[p,p,p,p];Q 8(K p==\'1l\')p=p.3t(\'7D\').6r(\'\').3t(\'7E\').6r(\'\').3t(\' \');8(!31(p)){J[0,0,0,0]}1m(F i=0;i<4;i++){p[i]=2o(p[i])}1x(p.W){V 0:J[0,0,0,0];V 1:J[p[0],p[0],p[0],p[0]];V 2:J[p[0],p[1],p[0],p[1]];V 3:J[p[0],p[1],p[2],p[1]];2w:J[p[0],p[1],p[2],p[3]]}}I 42(a,o){F x=(K o[o.d[\'S\']]==\'14\')?1K.2v(o[o.d[\'S\']]-3l(a,o,\'S\')):0;1x(o.1C){V\'1t\':J[0,x];V\'2M\':J[x,0];V\'4x\':2w:J[1K.2v(x/2),1K.3w(x/2)]}}I 4a(x,o,a,b){F v=x;8(K a==\'I\'){v=a.1z(b,v)}Q 8(K a==\'1l\'){F p=a.3t(\'+\'),m=a.3t(\'-\');8(m.W>p.W){F c=M,5o=m[0],2H=m[1]}Q{F c=O,5o=p[0],2H=p[1]}1x(5o){V\'7F\':v=(x%2==1)?x-1:x;18;V\'7G\':v=(x%2==0)?x-1:x;18;2w:v=x;18}2H=2o(2H);8(!2p(2H)){8(c)2H=-2H;v+=2H}}8(K v!=\'14\')v=1;8(v<1)v=1;J v}I 2Q(x,o,a,b){J 4y(4a(x,o,a,b),o.G.12)}I 4y(v,i){8(K i.2N==\'14\'&&v<i.2N)v=i.2N;8(K i.27==\'14\'&&v>i.27)v=i.27;8(v<1)v=1;J v}I 4E(s){8(!31(s))s=[[s]];8(!31(s[0]))s=[s];1m(F j=0,l=s.W;j<l;j++){8(K s[j][0]==\'1l\')s[j][0]=$(s[j][0]);8(K s[j][1]!=\'1r\')s[j][1]=M;8(K s[j][2]!=\'1r\')s[j][2]=M;8(K s[j][3]!=\'14\')s[j][3]=0}J s}I 5i(k){8(k==\'2M\')J 39;8(k==\'1t\')J 37;8(k==\'4u\')J 38;8(k==\'6a\')J 40;J-1}I 4W(n,v){8(n)3T.2n=n+\'=\'+v+\'; 7H=/\'}I 6f(n){n+=\'=\';F b=3T.2n.3t(\';\');1m(F a=0,l=b.W;a<l;a++){F c=b[a];22(c.7I(0)==\' \'){c=c.1d(1)}8(c.32(n)==0){J c.1d(n.W)}}J 0}I 3p(p){8(p&&K p==\'1l\'){F i=(p.32(\'7J\')>-1)?M:O,r=(p.32(\'2W\')>-1)?M:O}Q{F i=r=O}J[i,r]}I 59(a){J(K a==\'14\')?a:2b}I 31(a){J K(a)==\'1j\'&&(a 7K 7L)}I 2x(){J 7M 7N().2x()}I 1c(d,m){8(K d==\'1j\'){F s=\' (\'+d.3U+\')\';d=d.1c}Q{F s=\'\'}8(!d)J O;8(K m==\'1l\')m=\'1J\'+s+\': \'+m;Q m=[\'1J\'+s+\':\',m];8(3q.5p&&3q.5p.6s)3q.5p.6s(m);J O}$.1P.63=I(o,c){J 1h.1J(o,c)};$.25($.1G,{\'7O\':I(t){F a=t*t;J t*(-a*t+4*a-6*t+4)},\'7P\':I(t){J t*(4*t*t-9*t+6)},\'7Q\':I(t){F a=t*t;J t*(33*a*a-7R*a*t+7S*a-67*t+15)}})})(7T);',62,490,'|||||||opts|if|||||||||||||||||||||||||||||||||var|items|conf|function|return|typeof|cf_e|true|itms|false|visible|else|scrl|width|auto|total|case|length|trigger|button|children||first|visibleConf|bind|number||css|prev|break|tt0|next|pagination|debug|slice|variable|stopPropagation|anims|this|padding|object|duration|string|for|scroll|pre|push|data|boolean|height|left|usePadding|filter|a_dur|switch|undefined|call|triggerHandler|wrp|align|container|marginRight|tmrs|easing|play|fx|carouFredSel|Math|circular|sz_resetMargin|eq|remove|fn|each|post|cfs_origCssMargin|isScrolling|c_new|queu|is|isPaused|clbk|isStopped|stopImmediatePropagation|onAfter|while|sc_setScroll|unbind|extend|outerWidth|max|Not|synchronise|sc_startScroll|null|l_cur|l_old|w_siz|onBefore|crossfade|uncover|opacity|preventDefault|direction|adjust|old|cookie|parseInt|isNaN|cf_c|c_old|pR|pauseOnHover|opts_orig|ceil|default|getTime|removeClass|l_new|ms_getSizes|fade|cover|updatePageStatus|mousewheel|key|css_o|adj|start|responsive|outerHeight|top|right|min|hidden|gn_getVisibleItemsNext|cf_getItemsAdjust|addClass|pause|startTime|cf_sortParams|scrolling|resume|nv_enableNavi|last|slideTo||is_array|indexOf||innerWidth|ms_getTrueInnerSize|parent||||hide|show|gi_getCurrentItems|minimum|anchorBuilder|pauseDuration|Carousel|sc_clearTimers|events|queue|infinite|ms_getTotalSize|gn_getItemIndex|jquery|event|bt_pauseOnHoverConfig|window|ns2|ani_o|split|to|ms_getTrueLargestSize|floor|of|maxDimention|gn_getVisibleItemsNextFilter|go_getNaviObject|position|sc_stopScroll|timePassed|perc|100|dur2|prefix|appendTo|apply|sc_callCallbacks|currentPosition|currentPage|before|nv_showNavi|sz_setSizes|vI|touchwipe|wN|document|selector|_cfs_init|go_getObject|marginBottom|ms_isPercentage|ms_getPercentage||org|cf_getAlignPadding|keys|pauseOnEvent|Number|none|stopped|gn_getVisibleItemsPrev||cf_getAdjust|onEnd|clone|orgW|isHidden|cf_mapWrapperSizes|get|end|eval|mouseenter|mouseleave|serialNumber|cur_l|di|sz|element|cfs_isCarousel|configuration|defaults|upDateOnWindowResize|up|ms_hasVariableSizes|valid|center|cf_getItemAdjustMinMax|seco|nw|bottom|delay|pauseOnResize|cf_getSynchArr|scrolled|backward|textAlign|float|marginTop|marginLeft|absolute|_cfs_unbind_events|stop|finish|type|conditions|gn_getVisibleOrg|not|fx_cover|fx_uncover|orgDuration|cf_setCookie|gn_getVisibleItemsNextTestCircular|gi_getOldItemsNext|gi_getNewItemsNext||slideToPage|updateSizes|linkAnchors|_cfs_bind_buttons|click|_cfs_unbind_buttons|mousewheelPrev||bt_mousesheelNumber|mousewheelNext|wipe|ns3|wrapper|continue|classnames|new_w|old_w|cf_getKeyCode|gn_getItemsPrevFilter|gn_getItemsNextFilter|ms_getLargestSize|toLowerCase|arr|sta|console|No|_cfs_currentPosition|_cfs_destroy|the|innerHeight|dx|Set|secp|ms_getPaddingBorderMargin|cf_getPadding|500|pageAnchorBuilder|Item|forward|_cfs_build|fixed|cfs_origCss|_cfs_bind_events|paused|onPausePause|onPauseEnd|onPauseStart|enough|needed|page|_cfs_slide_|_cfs_configuration|gn_getScrollItemsPrevFilter|Scrolling|gi_getOldItemsPrev|gi_getNewItemsPrev|directscroll|concat|shift|gn_getScrollItemsNextFilter|new_m|jumpToStart|after|append|caroufredsel|hash|index|selected||gn_getVisibleItemsPrevFilter|destroy|down|keyup|keyCode|configs|classname|cf_readCookie|random|itm|onCreate|namespace|span|animate|complete|cfs_tempCssMargin|s2|l1|l2|join|log|found|The|option|should|be|moved|second|Infinity|Width|caroufredsel_cookie_|attr|id|2500|Available|widths|heights|automatically|relative|overflow|setTimeout|or|Page|resumed|currently|Callback|returned|_cfs_slide_prev|prependTo|_cfs_slide_next|prevPage|nextPage|prepend|carousel|insertItem|removeItem|round|currentVisible|body|find|Preventing|non|sliding|replaceWith|min_move_x|min_move_y|preventDefaultEvents|wipeUp|wipeDown|wipeLeft|wipeRight|resize|timer|wrap|class|unshift|location|swing|cfs|div|caroufredsel_wrapper|href|clearTimeout|fx_fade|hiding|navigation|disabled|paddingLeft|paddingRight|paddingTop|paddingBottom|outer|inner|px|em|even|odd|path|charAt|immediate|instanceof|Array|new|Date|quadratic|cubic|elastic|106|126|jQuery'.split('|'),0,{}));

/**
 * DropKick
 *
 * Highly customizable <select> lists
 * https://github.com/JamieLottering/DropKick
 *
 * &copy; 2011 Jamie Lottering <http://github.com/JamieLottering>
 *                        <http://twitter.com/JamieLottering>
 * 
 */

(function ($, window, document) {

  var ie6 = false;

  // Help prevent flashes of unstyled content
  if ($.browser.msie && $.browser.version.substr(0, 1) < 7) {
    ie6 = true;
  } else {
    document.documentElement.className = document.documentElement.className + ' dk_fouc';
  }
  
  var
    // Public methods exposed to $.fn.dropkick()
    methods = {},

    // Cache every <select> element that gets dropkicked
    lists   = [],

    // Convenience keys for keyboard navigation
    keyMap = {
      'left'  : 37,
      'up'    : 38,
      'right' : 39,
      'down'  : 40,
      'enter' : 13
    },

    // HTML template for the dropdowns
    dropdownTemplate = [
      '<div class="dk_container" id="dk_container_{{ id }}" tabindex="{{ tabindex }}">',
        '<a class="dk_toggle">',
          '<span class="dk_label">{{ label }}</span>',
        '</a>',
        '<div class="dk_options">',
          '<ul class="dk_options_inner">',
          '</ul>',
        '</div>',
      '</div>'
    ].join(''),

    // HTML template for dropdown options
    optionTemplate = '<li class="{{ current }}"><a data-dk-dropdown-value="{{ value }}">{{ text }}</a></li>',

    // Some nice default values
    defaults = {
      startSpeed : 1000,  // I recommend a high value here, I feel it makes the changes less noticeable to the user
      theme  : false,
      change : false
    },

    // Make sure we only bind keydown on the document once
    keysBound = false
  ;

  // Called by using $('foo').dropkick();
  methods.init = function (settings) {
    settings = $.extend({}, defaults, settings);

    return this.each(function () {
      var
        // The current <select> element
        $select = $(this),

        // Store a reference to the originally selected <option> element
        $original = $select.find(':selected').first(),

        // Save all of the <option> elements
        $options = $select.find('option'),

        // We store lots of great stuff using jQuery data
        data = $select.data('dropkick') || {},

        // This gets applied to the 'dk_container' element
        id = $select.attr('id') || $select.attr('name'),

        // This gets updated to be equal to the longest <option> element
        width  = settings.width || $select.outerWidth(),

        // Check if we have a tabindex set or not
        tabindex  = $select.attr('tabindex') ? $select.attr('tabindex') : '',

        // The completed dk_container element
        $dk = false,

        theme
      ;

      // Dont do anything if we've already setup dropkick on this element
      if (data.id) {
        return $select;
      } else {
        data.settings  = settings;
        data.tabindex  = tabindex;
        data.id        = id;
        data.$original = $original;
        data.$select   = $select;
        data.value     = _notBlank($select.val()) || _notBlank($original.attr('value'));
        data.label     = $original.text();
        data.options   = $options;
      }

      // Build the dropdown HTML
      $dk = _build(dropdownTemplate, data);

      // Make the dropdown fixed width if desired
      $dk.find('.dk_toggle').css({
        'width' : width + 'px'
      });

      // Hide the <select> list and place our new one in front of it
      $select.before($dk);

      // Update the reference to $dk
      $dk = $('#dk_container_' + id).fadeIn(settings.startSpeed);

      // Save the current theme
      theme = settings.theme ? settings.theme : 'default';
      $dk.addClass('dk_theme_' + theme);
      data.theme = theme;

      // Save the updated $dk reference into our data object
      data.$dk = $dk;

      // Save the dropkick data onto the <select> element
      $select.data('dropkick', data);

      // Do the same for the dropdown, but add a few helpers
      $dk.data('dropkick', data);

      lists[lists.length] = $select;

      // Focus events
      $dk.bind('focus.dropkick', function (e) {
        $dk.addClass('dk_focus');
      }).bind('blur.dropkick', function (e) {
        $dk.removeClass('dk_open dk_focus');
      });

      setTimeout(function () {
        $select.hide();
      }, 0);
    });
  };

  // Allows dynamic theme changes
  methods.theme = function (newTheme) {
    var
      $select   = $(this),
      list      = $select.data('dropkick'),
      $dk       = list.$dk,
      oldtheme  = 'dk_theme_' + list.theme
    ;

    $dk.removeClass(oldtheme).addClass('dk_theme_' + newTheme);

    list.theme = newTheme;
  };

  // Reset all <selects and dropdowns in our lists array
  methods.reset = function () {
    for (var i = 0, l = lists.length; i < l; i++) {
      var
        listData  = lists[i].data('dropkick'),
        $dk       = listData.$dk,
        $current  = $dk.find('li').first()
      ;

      $dk.find('.dk_label').text(listData.label);
      $dk.find('.dk_options_inner').animate({ scrollTop: 0 }, 0);

      _setCurrent($current, $dk);
      _updateFields($current, $dk, true);
    }
  };

  // Expose the plugin
  $.fn.dropkick = function (method) {
    if (!ie6) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, arguments);
      }
    }
  };

  // private
  function _handleKeyBoardNav(e, $dk) {
    var
      code     = e.keyCode,
      data     = $dk.data('dropkick'),
      options  = $dk.find('.dk_options'),
      open     = $dk.hasClass('dk_open'),
      current  = $dk.find('.dk_option_current'),
      first    = options.find('li').first(),
      last     = options.find('li').last(),
      next,
      prev
    ;

    switch (code) {
      case keyMap.enter:
        if (open) {
          _updateFields(current.find('a'), $dk);
          _closeDropdown($dk);
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      case keyMap.up:
        prev = current.prev('li');
        if (open) {
          if (prev.length) {
            _setCurrent(prev, $dk);
          } else {
            _setCurrent(last, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      case keyMap.down:
        if (open) {
          next = current.next('li').first();
          if (next.length) {
            _setCurrent(next, $dk);
          } else {
            _setCurrent(first, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      default:
      break;
    }
  }

  // Update the <select> value, and the dropdown label
  function _updateFields(option, $dk, reset) {
    var value, label, data;

    value = option.attr('data-dk-dropdown-value');
    label = option.text();
    data  = $dk.data('dropkick');

    $select = data.$select;
    $select.val(value);

    $dk.find('.dk_label').text(label);

    reset = reset || false;

    if (data.settings.change && !reset) {
      data.settings.change.call($select, value, label);
    }
  }

  // Set the currently selected option
  function _setCurrent($current, $dk) {
    $dk.find('.dk_option_current').removeClass('dk_option_current');
    $current.addClass('dk_option_current');

    _setScrollPos($dk, $current);
  }

  function _setScrollPos($dk, anchor) {
    var height = anchor.prevAll('li').outerHeight() * anchor.prevAll('li').length;
    $dk.find('.dk_options_inner').animate({ scrollTop: height + 'px' }, 0);
  }

  // Close a dropdown
  function _closeDropdown($dk) {
    $dk.removeClass('dk_open');
  }

  // Open a dropdown
  function _openDropdown($dk) {
    var data = $dk.data('dropkick');
    $dk.find('.dk_options').css({ top : $dk.find('.dk_toggle').outerHeight() - 1 });
    $dk.toggleClass('dk_open');

  }

  /**
   * Turn the dropdownTemplate into a jQuery object and fill in the variables.
   */
  function _build (tpl, view) {
    var
      // Template for the dropdown
      template  = tpl,
      // Holder of the dropdowns options
      options   = [],
      $dk
    ;

    template = template.replace('{{ id }}', view.id);
    template = template.replace('{{ label }}', view.label);
    template = template.replace('{{ tabindex }}', view.tabindex);

    if (view.options && view.options.length) {
      for (var i = 0, l = view.options.length; i < l; i++) {
        var
          $option   = $(view.options[i]),
          current   = 'dk_option_current',
          oTemplate = optionTemplate
        ;

        oTemplate = oTemplate.replace('{{ value }}', $option.val());
        oTemplate = oTemplate.replace('{{ current }}', (_notBlank($option.val()) === view.value) ? current : '');
        oTemplate = oTemplate.replace('{{ text }}', $option.text());

        options[options.length] = oTemplate;
      }
    }

    $dk = $(template);
    $dk.find('.dk_options_inner').html(options.join(''));

    return $dk;
  }

  function _notBlank(text) {
    return ($.trim(text).length > 0) ? text : false;
  }

  $(function () {

    // Handle click events on the dropdown toggler
    $('.dk_toggle').live('click', function (e) {
      var $dk  = $(this).parents('.dk_container').first();

      _openDropdown($dk);

      if ("ontouchstart" in window) {
        $dk.addClass('dk_touch');
        $dk.find('.dk_options_inner').addClass('scrollable vertical');
      }

      e.preventDefault();
      return false;
    });

    // Handle click events on individual dropdown options
    $('.dk_options a').live(($.browser.msie ? 'mousedown' : 'click'), function (e) {
      var
        $option = $(this),
        $dk     = $option.parents('.dk_container').first(),
        data    = $dk.data('dropkick')
      ;
    
      _closeDropdown($dk);
      _updateFields($option, $dk);
      _setCurrent($option.parent(), $dk);
    
      e.preventDefault();
      return false;
    });

    // Setup keyboard nav
    $(document).bind('keydown.dk_nav', function (e) {
      var
        // Look for an open dropdown...
        $open    = $('.dk_container.dk_open'),

        // Look for a focused dropdown
        $focused = $('.dk_container.dk_focus'),

        // Will be either $open, $focused, or null
        $dk = null
      ;

      // If we have an open dropdown, key events should get sent to that one
      if ($open.length) {
        $dk = $open;
      } else if ($focused.length && !$open.length) {
        // But if we have no open dropdowns, use the focused dropdown instead
        $dk = $focused;
      }

      if ($dk) {
        _handleKeyBoardNav(e, $dk);
      }
    });
  });
})(jQuery, window, document);

/**
 * jquery.gallery.js
 * http://www.codrops.com
 *
 * Copyright 2011, Pedro Botelho / Codrops
 * Free to use under the MIT license.
 *
 * Date: Mon Jan 30 2012
 */


(function( $, undefined ) {
  
  /*
   * Gallery object.
   */
  $.Gallery         = function( options, element ) {
  
    this.$el  = $( element );
    this._init( options );
    
  };
  
  $.Gallery.defaults    = {
    current   : 0,  // index of current item
    autoplay  : false,// slideshow on / off
    interval  : 2000  // time between transitions
    };
  
  $.Gallery.prototype   = {
    _checkSupport : function( prop ) {
      var div = document.createElement('div'),
        vendors = 'Khtml Ms O Moz Webkit'.split(' '),
        len = vendors.length;
        
        if ( prop in div.style ) return true;

        prop = prop.replace(/^[a-z]/, function(val) {
          return val.toUpperCase();
        });

        while(len--) {
          if ( vendors[len] + prop in div.style ) {
            // browser supports box-shadow. Do what you need.
            // Or use a bang (!) to test if the browser doesn't.
            return true;
          }
        }
        return false;
    },

    _init         : function( options ) {
      
      this.options    = $.extend( true, {}, $.Gallery.defaults, options );
      
      // support for 3d / 2d transforms and transitions
      // this.support3d    = Modernizr.csstransforms3d;
      // this.support2d    = Modernizr.csstransforms;
      // this.supportTrans = Modernizr.csstransitions;
      this.supportTrans = this._checkSupport('transition');
      
      this.$wrapper     = this.$el.find('.slider-wrapper');
      
      this.$items       = this.$wrapper.children();
      this.itemsCount   = this.$items.length;
      
      // Create slide navigation automatically
      $('<nav class="slide-nav"></nav>').insertAfter( this.$wrapper ).html(
        '<span class="nav-prev"></span> \
         <span class="nav-next"></span>'
      );

      this.$nav         = this.$el.find('nav');
      this.$navPrev     = this.$nav.find('.nav-prev');
      this.$navNext     = this.$nav.find('.nav-next');
      
      // minimum of 3 items
      if( this.itemsCount < 3 ) {
          
        this.$nav.remove();
        return false;
      
      } 
      
      this.current    = this.options.current;
      
      this.isAnim     = false;
      
      this._validate();
      
      this._layout();
      
      // load the events
      this._loadEvents();
      
    },
    _validate     : function(){

      if( this.options.current < 0 || this.options.current > this.itemsCount - 1 ) {
        this.current = 0;
      }

    },
    _layout       : function(){

      // current, left and right items
      this._setItems();

      this.$leftItm.addClass('slide-left');
      this.$rightItm.addClass('slide-right');
      this.$currentItm.addClass('slide-center');

    },
    _setItems     : function(){

      this.$items.removeClass('slide-center');
      this.$currentItm  = this.$items.eq( this.current );
      this.$leftItm     = ( this.current === 0 ) ? this.$items.eq( this.itemsCount - 1 ) : this.$items.eq( this.current - 1 );
      this.$rightItm    = ( this.current === this.itemsCount - 1 ) ? this.$items.eq( 0 ) : this.$items.eq( this.current + 1 );
            
      // next & previous items
      if( this.itemsCount > 3 ) {
        
        // next item
        this.$nextItm   = ( this.$rightItm.index() === this.itemsCount - 1 ) ? this.$items.eq( 0 ) : this.$rightItm.next();
        this.$nextItm.addClass('slide-outright');
        
        // previous item
        this.$prevItm   = ( this.$leftItm.index() === 0 ) ? this.$items.eq( this.itemsCount - 1 ) : this.$leftItm.prev();
        this.$prevItm.addClass('slide-outleft');
      
      }

    },
    _loadEvents   : function(){

      var _self = this;

      // On prev nav click
      this.$navPrev.on( 'click.gallery', function( event ) {
        _self._navigate('prev');
        return false;
      });

      // On next nav click
      this.$navNext.on( 'click.gallery', function( event ) {
        _self._navigate('next');
        return false;
      });

      this.$wrapper.on( 'webkitTransitionEnd.gallery transitionend.gallery OTransitionEnd.gallery', function( event ) {
        
        _self.$currentItm.addClass('slide-center');
        _self.$items.removeClass('dg-transition');
        _self.isAnim  = false;
        
      });

    },
    _navigate     : function(dir) {

      if( this.supportTrans && this.isAnim )
        return false;

      this.isAnim = true;
      this.$items.removeClass('slide-outleft slide-outright');

      switch( dir ) {

        // Navigate to next slide
        case 'next' :
          this.current  = this.$rightItm.index();

          // current item moves left
          this.$currentItm.removeClass('slide-center').addClass('dg-transition slide-left');
          
          // right item moves to the center
          this.$rightItm.removeClass('slide-right').addClass('dg-transition slide-center');

          // next item moves to the right
          if( this.$nextItm ) {
            
            // left item moves out
            this.$leftItm.removeClass('slide-left').addClass('dg-transition slide-outleft');
            this.$nextItm.removeClass('slide-outright').addClass('dg-transition slide-right');
            
          }
          else {
            // left item moves right
            this.$leftItm.removeClass('slide-left').addClass('dg-transition slide-right');
          }
          break;

        // Navigate to previous slide
        case 'prev' :
          this.current  = this.$leftItm.index();
          
          // current item moves right
          this.$currentItm.removeClass('slide-center').addClass('dg-transition slide-right');

          // left item moves to the center
          this.$leftItm.removeClass('slide-left').addClass('dg-transition slide-center');

          // prev item moves to the left
          if( this.$prevItm ) {
            
            // right item moves out
            this.$rightItm.removeClass('slide-right').addClass('dg-transition slide-outright');
            this.$prevItm.removeClass('slide-outleft').addClass('dg-transition slide-left');

          }
          else {
          
            // right item moves left
            this.$rightItm.removeClass('slide-right').addClass('dg-transition slide-left');

          }
          break;
      };

      this._setItems();
  
      this.$currentItm.addClass('slide-center');
    }

  };
  
  var logError      = function( message ) {
    if ( this.console ) {
      console.error( message );
    }
  };
  
  $.fn.threeDeeGallery      = function( options ) {
  
    if ( typeof options === 'string' ) {
      
      var args = Array.prototype.slice.call( arguments, 1 );
      
      this.each(function() {
      
        var instance = $.data( this, 'gallery' );
        
        if ( !instance ) {
          logError( "cannot call methods on gallery prior to initialization; " +
          "attempted to call method '" + options + "'" );
          return;
        }
        
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
          logError( "no such method '" + options + "' for gallery instance" );
          return;
        }
        
        instance[ options ].apply( instance, args );
      
      });
    
    } 
    else {
    
      this.each(function() {
      
        var instance = $.data( this, 'gallery' );
        if ( !instance ) {
          $.data( this, 'gallery', new $.Gallery( options, this ) );
        }
      });
    
    }
    
    return this;
    
  };
  
})( jQuery );

/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2011 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 2.1.0
 * Date: 1st September 2011
 */


(function(b,f){b.fn.jPlayer=function(a){var c=typeof a==="string",d=Array.prototype.slice.call(arguments,1),e=this,a=!c&&d.length?b.extend.apply(null,[!0,a].concat(d)):a;if(c&&a.charAt(0)==="_")return e;c?this.each(function(){var c=b.data(this,"jPlayer"),h=c&&b.isFunction(c[a])?c[a].apply(c,d):c;if(h!==c&&h!==f)return e=h,!1}):this.each(function(){var c=b.data(this,"jPlayer");c?c.option(a||{}):b.data(this,"jPlayer",new b.jPlayer(a,this))});return e};b.jPlayer=function(a,c){if(arguments.length){this.element= b(c);this.options=b.extend(!0,{},this.options,a);var d=this;this.element.bind("remove.jPlayer",function(){d.destroy()});this._init()}};b.jPlayer.emulateMethods="load play pause";b.jPlayer.emulateStatus="src readyState networkState currentTime duration paused ended playbackRate";b.jPlayer.emulateOptions="muted volume";b.jPlayer.reservedEvent="ready flashreset resize repeat error warning";b.jPlayer.event={ready:"jPlayer_ready",flashreset:"jPlayer_flashreset",resize:"jPlayer_resize",repeat:"jPlayer_repeat", click:"jPlayer_click",error:"jPlayer_error",warning:"jPlayer_warning",loadstart:"jPlayer_loadstart",progress:"jPlayer_progress",suspend:"jPlayer_suspend",abort:"jPlayer_abort",emptied:"jPlayer_emptied",stalled:"jPlayer_stalled",play:"jPlayer_play",pause:"jPlayer_pause",loadedmetadata:"jPlayer_loadedmetadata",loadeddata:"jPlayer_loadeddata",waiting:"jPlayer_waiting",playing:"jPlayer_playing",canplay:"jPlayer_canplay",canplaythrough:"jPlayer_canplaythrough",seeking:"jPlayer_seeking",seeked:"jPlayer_seeked", timeupdate:"jPlayer_timeupdate",ended:"jPlayer_ended",ratechange:"jPlayer_ratechange",durationchange:"jPlayer_durationchange",volumechange:"jPlayer_volumechange"};b.jPlayer.htmlEvent="loadstart,abort,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,ratechange".split(",");b.jPlayer.pause=function(){b.each(b.jPlayer.prototype.instances,function(a,b){b.data("jPlayer").status.srcSet&&b.jPlayer("pause")})};b.jPlayer.timeFormat={showHour:!1,showMin:!0,showSec:!0,padHour:!1,padMin:!0,padSec:!0, sepHour:":",sepMin:":",sepSec:""};b.jPlayer.convertTime=function(a){var c=new Date(a*1E3),d=c.getUTCHours(),a=c.getUTCMinutes(),c=c.getUTCSeconds(),d=b.jPlayer.timeFormat.padHour&&d<10?"0"+d:d,a=b.jPlayer.timeFormat.padMin&&a<10?"0"+a:a,c=b.jPlayer.timeFormat.padSec&&c<10?"0"+c:c;return(b.jPlayer.timeFormat.showHour?d+b.jPlayer.timeFormat.sepHour:"")+(b.jPlayer.timeFormat.showMin?a+b.jPlayer.timeFormat.sepMin:"")+(b.jPlayer.timeFormat.showSec?c+b.jPlayer.timeFormat.sepSec:"")};b.jPlayer.uaBrowser= function(a){var a=a.toLowerCase(),b=/(opera)(?:.*version)?[ \/]([\w.]+)/,d=/(msie) ([\w.]+)/,e=/(mozilla)(?:.*? rv:([\w.]+))?/,a=/(webkit)[ \/]([\w.]+)/.exec(a)||b.exec(a)||d.exec(a)||a.indexOf("compatible")<0&&e.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}};b.jPlayer.uaPlatform=function(a){var b=a.toLowerCase(),d=/(android)/,e=/(mobile)/,a=/(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/.exec(b)||[],b=/(ipad|playbook)/.exec(b)||!e.exec(b)&&d.exec(b)||[];a[1]&&(a[1]=a[1].replace(/\s/g, "_"));return{platform:a[1]||"",tablet:b[1]||""}};b.jPlayer.browser={};b.jPlayer.platform={};var i=b.jPlayer.uaBrowser(navigator.userAgent);if(i.browser)b.jPlayer.browser[i.browser]=!0,b.jPlayer.browser.version=i.version;i=b.jPlayer.uaPlatform(navigator.userAgent);if(i.platform)b.jPlayer.platform[i.platform]=!0,b.jPlayer.platform.mobile=!i.tablet,b.jPlayer.platform.tablet=!!i.tablet;b.jPlayer.prototype={count:0,version:{script:"2.1.0",needFlash:"2.1.0",flash:"unknown"},options:{swfPath:"js",solution:"html, flash", supplied:"mp3",preload:"metadata",volume:0.8,muted:!1,wmode:"opaque",backgroundColor:"#000000",cssSelectorAncestor:"#jp_container_1",cssSelector:{videoPlay:".jp-video-play",play:".jp-play",pause:".jp-pause",stop:".jp-stop",seekBar:".jp-seek-bar",playBar:".jp-play-bar",mute:".jp-mute",unmute:".jp-unmute",volumeBar:".jp-volume-bar",volumeBarValue:".jp-volume-bar-value",volumeMax:".jp-volume-max",currentTime:".jp-current-time",duration:".jp-duration",fullScreen:".jp-full-screen",restoreScreen:".jp-restore-screen", repeat:".jp-repeat",repeatOff:".jp-repeat-off",gui:".jp-gui",noSolution:".jp-no-solution"},fullScreen:!1,autohide:{restored:!1,full:!0,fadeIn:200,fadeOut:600,hold:1E3},loop:!1,repeat:function(a){a.jPlayer.options.loop?b(this).unbind(".jPlayerRepeat").bind(b.jPlayer.event.ended+".jPlayer.jPlayerRepeat",function(){b(this).jPlayer("play")}):b(this).unbind(".jPlayerRepeat")},nativeVideoControls:{},noFullScreen:{msie:/msie [0-6]/,ipad:/ipad.*?os [0-4]/,iphone:/iphone/,ipod:/ipod/,android_pad:/android [0-3](?!.*?mobile)/, android_phone:/android.*?mobile/,blackberry:/blackberry/,windows_ce:/windows ce/,webos:/webos/},noVolume:{ipad:/ipad/,iphone:/iphone/,ipod:/ipod/,android_pad:/android(?!.*?mobile)/,android_phone:/android.*?mobile/,blackberry:/blackberry/,windows_ce:/windows ce/,webos:/webos/,playbook:/playbook/},verticalVolume:!1,idPrefix:"jp",noConflict:"jQuery",emulateHtml:!1,errorAlerts:!1,warningAlerts:!1},optionsAudio:{size:{width:"0px",height:"0px",cssClass:""},sizeFull:{width:"0px",height:"0px",cssClass:""}}, optionsVideo:{size:{width:"480px",height:"270px",cssClass:"jp-video-270p"},sizeFull:{width:"100%",height:"100%",cssClass:"jp-video-full"}},instances:{},status:{src:"",media:{},paused:!0,format:{},formatType:"",waitForPlay:!0,waitForLoad:!0,srcSet:!1,video:!1,seekPercent:0,currentPercentRelative:0,currentPercentAbsolute:0,currentTime:0,duration:0,readyState:0,networkState:0,playbackRate:1,ended:0},internal:{ready:!1},solution:{html:!0,flash:!0},format:{mp3:{codec:'audio/mpeg; codecs="mp3"',flashCanPlay:!0, media:"audio"},m4a:{codec:'audio/mp4; codecs="mp4a.40.2"',flashCanPlay:!0,media:"audio"},oga:{codec:'audio/ogg; codecs="vorbis"',flashCanPlay:!1,media:"audio"},wav:{codec:'audio/wav; codecs="1"',flashCanPlay:!1,media:"audio"},webma:{codec:'audio/webm; codecs="vorbis"',flashCanPlay:!1,media:"audio"},fla:{codec:"audio/x-flv",flashCanPlay:!0,media:"audio"},m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:!0,media:"video"},ogv:{codec:'video/ogg; codecs="theora, vorbis"',flashCanPlay:!1, media:"video"},webmv:{codec:'video/webm; codecs="vorbis, vp8"',flashCanPlay:!1,media:"video"},flv:{codec:"video/x-flv",flashCanPlay:!0,media:"video"}},_init:function(){var a=this;this.element.empty();this.status=b.extend({},this.status);this.internal=b.extend({},this.internal);this.internal.domNode=this.element.get(0);this.formats=[];this.solutions=[];this.require={};this.htmlElement={};this.html={};this.html.audio={};this.html.video={};this.flash={};this.css={};this.css.cs={};this.css.jq={};this.ancestorJq= [];this.options.volume=this._limitValue(this.options.volume,0,1);b.each(this.options.supplied.toLowerCase().split(","),function(c,d){var e=d.replace(/^\s+|\s+$/g,"");if(a.format[e]){var f=!1;b.each(a.formats,function(a,b){if(e===b)return f=!0,!1});f||a.formats.push(e)}});b.each(this.options.solution.toLowerCase().split(","),function(c,d){var e=d.replace(/^\s+|\s+$/g,"");if(a.solution[e]){var f=!1;b.each(a.solutions,function(a,b){if(e===b)return f=!0,!1});f||a.solutions.push(e)}});this.internal.instance= "jp_"+this.count;this.instances[this.internal.instance]=this.element;this.element.attr("id")||this.element.attr("id",this.options.idPrefix+"_jplayer_"+this.count);this.internal.self=b.extend({},{id:this.element.attr("id"),jq:this.element});this.internal.audio=b.extend({},{id:this.options.idPrefix+"_audio_"+this.count,jq:f});this.internal.video=b.extend({},{id:this.options.idPrefix+"_video_"+this.count,jq:f});this.internal.flash=b.extend({},{id:this.options.idPrefix+"_flash_"+this.count,jq:f,swf:this.options.swfPath+ (this.options.swfPath.toLowerCase().slice(-4)!==".swf"?(this.options.swfPath&&this.options.swfPath.slice(-1)!=="/"?"/":"")+"Jplayer.swf":"")});this.internal.poster=b.extend({},{id:this.options.idPrefix+"_poster_"+this.count,jq:f});b.each(b.jPlayer.event,function(b,c){a.options[b]!==f&&(a.element.bind(c+".jPlayer",a.options[b]),a.options[b]=f)});this.require.audio=!1;this.require.video=!1;b.each(this.formats,function(b,c){a.require[a.format[c].media]=!0});this.options=this.require.video?b.extend(!0, {},this.optionsVideo,this.options):b.extend(!0,{},this.optionsAudio,this.options);this._setSize();this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this.status.noFullScreen=this._uaBlocklist(this.options.noFullScreen);this.status.noVolume=this._uaBlocklist(this.options.noVolume);this._restrictNativeVideoControls();this.htmlElement.poster=document.createElement("img");this.htmlElement.poster.id=this.internal.poster.id;this.htmlElement.poster.onload=function(){(!a.status.video|| a.status.waitForPlay)&&a.internal.poster.jq.show()};this.element.append(this.htmlElement.poster);this.internal.poster.jq=b("#"+this.internal.poster.id);this.internal.poster.jq.css({width:this.status.width,height:this.status.height});this.internal.poster.jq.hide();this.internal.poster.jq.bind("click.jPlayer",function(){a._trigger(b.jPlayer.event.click)});this.html.audio.available=!1;if(this.require.audio)this.htmlElement.audio=document.createElement("audio"),this.htmlElement.audio.id=this.internal.audio.id, this.html.audio.available=!!this.htmlElement.audio.canPlayType&&this._testCanPlayType(this.htmlElement.audio);this.html.video.available=!1;if(this.require.video)this.htmlElement.video=document.createElement("video"),this.htmlElement.video.id=this.internal.video.id,this.html.video.available=!!this.htmlElement.video.canPlayType&&this._testCanPlayType(this.htmlElement.video);this.flash.available=this._checkForFlash(10);this.html.canPlay={};this.flash.canPlay={};b.each(this.formats,function(b,c){a.html.canPlay[c]= a.html[a.format[c].media].available&&""!==a.htmlElement[a.format[c].media].canPlayType(a.format[c].codec);a.flash.canPlay[c]=a.format[c].flashCanPlay&&a.flash.available});this.html.desired=!1;this.flash.desired=!1;b.each(this.solutions,function(c,d){if(c===0)a[d].desired=!0;else{var e=!1,f=!1;b.each(a.formats,function(b,c){a[a.solutions[0]].canPlay[c]&&(a.format[c].media==="video"?f=!0:e=!0)});a[d].desired=a.require.audio&&!e||a.require.video&&!f}});this.html.support={};this.flash.support={};b.each(this.formats, function(b,c){a.html.support[c]=a.html.canPlay[c]&&a.html.desired;a.flash.support[c]=a.flash.canPlay[c]&&a.flash.desired});this.html.used=!1;this.flash.used=!1;b.each(this.solutions,function(c,d){b.each(a.formats,function(b,c){if(a[d].support[c])return a[d].used=!0,!1})});this._resetActive();this._resetGate();this._cssSelectorAncestor(this.options.cssSelectorAncestor);!this.html.used&&!this.flash.used?(this._error({type:b.jPlayer.error.NO_SOLUTION,context:"{solution:'"+this.options.solution+"', supplied:'"+ this.options.supplied+"'}",message:b.jPlayer.errorMsg.NO_SOLUTION,hint:b.jPlayer.errorHint.NO_SOLUTION}),this.css.jq.noSolution.length&&this.css.jq.noSolution.show()):this.css.jq.noSolution.length&&this.css.jq.noSolution.hide();if(this.flash.used){var c,d="jQuery="+encodeURI(this.options.noConflict)+"&id="+encodeURI(this.internal.self.id)+"&vol="+this.options.volume+"&muted="+this.options.muted;if(b.browser.msie&&Number(b.browser.version)<=8){d=['<param name="movie" value="'+this.internal.flash.swf+ '" />','<param name="FlashVars" value="'+d+'" />','<param name="allowScriptAccess" value="always" />','<param name="bgcolor" value="'+this.options.backgroundColor+'" />','<param name="wmode" value="'+this.options.wmode+'" />'];c=document.createElement('<object id="'+this.internal.flash.id+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0"></object>');for(var e=0;e<d.length;e++)c.appendChild(document.createElement(d[e]))}else e=function(a,b,c){var d=document.createElement("param"); d.setAttribute("name",b);d.setAttribute("value",c);a.appendChild(d)},c=document.createElement("object"),c.setAttribute("id",this.internal.flash.id),c.setAttribute("data",this.internal.flash.swf),c.setAttribute("type","application/x-shockwave-flash"),c.setAttribute("width","1"),c.setAttribute("height","1"),e(c,"flashvars",d),e(c,"allowscriptaccess","always"),e(c,"bgcolor",this.options.backgroundColor),e(c,"wmode",this.options.wmode);this.element.append(c);this.internal.flash.jq=b(c)}if(this.html.used){if(this.html.audio.available)this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio),this.element.append(this.htmlElement.audio),this.internal.audio.jq=b("#"+this.internal.audio.id);if(this.html.video.available)this._addHtmlEventListeners(this.htmlElement.video,this.html.video),this.element.append(this.htmlElement.video),this.internal.video.jq=b("#"+this.internal.video.id),this.status.nativeVideoControls?this.internal.video.jq.css({width:this.status.width,height:this.status.height}):this.internal.video.jq.css({width:"0px",height:"0px"}),this.internal.video.jq.bind("click.jPlayer", function(){a._trigger(b.jPlayer.event.click)})}this.options.emulateHtml&&this._emulateHtmlBridge();this.html.used&&!this.flash.used&&setTimeout(function(){a.internal.ready=!0;a.version.flash="n/a";a._trigger(b.jPlayer.event.repeat);a._trigger(b.jPlayer.event.ready)},100);this._updateNativeVideoControls();this._updateInterface();this._updateButtons(!1);this._updateAutohide();this._updateVolume(this.options.volume);this._updateMute(this.options.muted);this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(); b.jPlayer.prototype.count++},destroy:function(){this.clearMedia();this._removeUiClass();this.css.jq.currentTime.length&&this.css.jq.currentTime.text("");this.css.jq.duration.length&&this.css.jq.duration.text("");b.each(this.css.jq,function(a,b){b.length&&b.unbind(".jPlayer")});this.internal.poster.jq.unbind(".jPlayer");this.internal.video.jq&&this.internal.video.jq.unbind(".jPlayer");this.options.emulateHtml&&this._destroyHtmlBridge();this.element.removeData("jPlayer");this.element.unbind(".jPlayer"); this.element.empty();delete this.instances[this.internal.instance]},enable:function(){},disable:function(){},_testCanPlayType:function(a){try{return a.canPlayType(this.format.mp3.codec),!0}catch(b){return!1}},_uaBlocklist:function(a){var c=navigator.userAgent.toLowerCase(),d=!1;b.each(a,function(a,b){if(b&&b.test(c))return d=!0,!1});return d},_restrictNativeVideoControls:function(){if(this.require.audio&&this.status.nativeVideoControls)this.status.nativeVideoControls=!1,this.status.noFullScreen=!0}, _updateNativeVideoControls:function(){if(this.html.video.available&&this.html.used)this.htmlElement.video.controls=this.status.nativeVideoControls,this._updateAutohide(),this.status.nativeVideoControls&&this.require.video?(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})):this.status.waitForPlay&&this.status.video&&(this.internal.poster.jq.show(),this.internal.video.jq.css({width:"0px",height:"0px"}))},_addHtmlEventListeners:function(a, c){var d=this;a.preload=this.options.preload;a.muted=this.options.muted;a.volume=this.options.volume;a.addEventListener("progress",function(){c.gate&&(d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.progress))},!1);a.addEventListener("timeupdate",function(){c.gate&&(d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.timeupdate))},!1);a.addEventListener("durationchange",function(){if(c.gate)d.status.duration=this.duration,d._getHtmlStatus(a),d._updateInterface(), d._trigger(b.jPlayer.event.durationchange)},!1);a.addEventListener("play",function(){c.gate&&(d._updateButtons(!0),d._html_checkWaitForPlay(),d._trigger(b.jPlayer.event.play))},!1);a.addEventListener("playing",function(){c.gate&&(d._updateButtons(!0),d._seeked(),d._trigger(b.jPlayer.event.playing))},!1);a.addEventListener("pause",function(){c.gate&&(d._updateButtons(!1),d._trigger(b.jPlayer.event.pause))},!1);a.addEventListener("waiting",function(){c.gate&&(d._seeking(),d._trigger(b.jPlayer.event.waiting))}, !1);a.addEventListener("seeking",function(){c.gate&&(d._seeking(),d._trigger(b.jPlayer.event.seeking))},!1);a.addEventListener("seeked",function(){c.gate&&(d._seeked(),d._trigger(b.jPlayer.event.seeked))},!1);a.addEventListener("volumechange",function(){if(c.gate)d.options.volume=a.volume,d.options.muted=a.muted,d._updateMute(),d._updateVolume(),d._trigger(b.jPlayer.event.volumechange)},!1);a.addEventListener("suspend",function(){c.gate&&(d._seeked(),d._trigger(b.jPlayer.event.suspend))},!1);a.addEventListener("ended", function(){if(c.gate){if(!b.jPlayer.browser.webkit)d.htmlElement.media.currentTime=0;d.htmlElement.media.pause();d._updateButtons(!1);d._getHtmlStatus(a,!0);d._updateInterface();d._trigger(b.jPlayer.event.ended)}},!1);a.addEventListener("error",function(){if(c.gate&&(d._updateButtons(!1),d._seeked(),d.status.srcSet))clearTimeout(d.internal.htmlDlyCmdId),d.status.waitForLoad=!0,d.status.waitForPlay=!0,d.status.video&&!d.status.nativeVideoControls&&d.internal.video.jq.css({width:"0px",height:"0px"}), d._validString(d.status.media.poster)&&!d.status.nativeVideoControls&&d.internal.poster.jq.show(),d.css.jq.videoPlay.length&&d.css.jq.videoPlay.show(),d._error({type:b.jPlayer.error.URL,context:d.status.src,message:b.jPlayer.errorMsg.URL,hint:b.jPlayer.errorHint.URL})},!1);b.each(b.jPlayer.htmlEvent,function(e,g){a.addEventListener(this,function(){c.gate&&d._trigger(b.jPlayer.event[g])},!1)})},_getHtmlStatus:function(a,b){var d=0,e=0,g=0,f=0;if(a.duration)this.status.duration=a.duration;d=a.currentTime; e=this.status.duration>0?100*d/this.status.duration:0;typeof a.seekable==="object"&&a.seekable.length>0?(g=this.status.duration>0?100*a.seekable.end(a.seekable.length-1)/this.status.duration:100,f=100*a.currentTime/a.seekable.end(a.seekable.length-1)):(g=100,f=e);b&&(e=f=d=0);this.status.seekPercent=g;this.status.currentPercentRelative=f;this.status.currentPercentAbsolute=e;this.status.currentTime=d;this.status.readyState=a.readyState;this.status.networkState=a.networkState;this.status.playbackRate= a.playbackRate;this.status.ended=a.ended},_resetStatus:function(){this.status=b.extend({},this.status,b.jPlayer.prototype.status)},_trigger:function(a,c,d){a=b.Event(a);a.jPlayer={};a.jPlayer.version=b.extend({},this.version);a.jPlayer.options=b.extend(!0,{},this.options);a.jPlayer.status=b.extend(!0,{},this.status);a.jPlayer.html=b.extend(!0,{},this.html);a.jPlayer.flash=b.extend(!0,{},this.flash);if(c)a.jPlayer.error=b.extend({},c);if(d)a.jPlayer.warning=b.extend({},d);this.element.trigger(a)}, jPlayerFlashEvent:function(a,c){if(a===b.jPlayer.event.ready)if(this.internal.ready){if(this.flash.gate){if(this.status.srcSet){var d=this.status.currentTime,e=this.status.paused;this.setMedia(this.status.media);d>0&&(e?this.pause(d):this.play(d))}this._trigger(b.jPlayer.event.flashreset)}}else this.internal.ready=!0,this.internal.flash.jq.css({width:"0px",height:"0px"}),this.version.flash=c.version,this.version.needFlash!==this.version.flash&&this._error({type:b.jPlayer.error.VERSION,context:this.version.flash, message:b.jPlayer.errorMsg.VERSION+this.version.flash,hint:b.jPlayer.errorHint.VERSION}),this._trigger(b.jPlayer.event.repeat),this._trigger(a);if(this.flash.gate)switch(a){case b.jPlayer.event.progress:this._getFlashStatus(c);this._updateInterface();this._trigger(a);break;case b.jPlayer.event.timeupdate:this._getFlashStatus(c);this._updateInterface();this._trigger(a);break;case b.jPlayer.event.play:this._seeked();this._updateButtons(!0);this._trigger(a);break;case b.jPlayer.event.pause:this._updateButtons(!1); this._trigger(a);break;case b.jPlayer.event.ended:this._updateButtons(!1);this._trigger(a);break;case b.jPlayer.event.click:this._trigger(a);break;case b.jPlayer.event.error:this.status.waitForLoad=!0;this.status.waitForPlay=!0;this.status.video&&this.internal.flash.jq.css({width:"0px",height:"0px"});this._validString(this.status.media.poster)&&this.internal.poster.jq.show();this.css.jq.videoPlay.length&&this.status.video&&this.css.jq.videoPlay.show();this.status.video?this._flash_setVideo(this.status.media): this._flash_setAudio(this.status.media);this._updateButtons(!1);this._error({type:b.jPlayer.error.URL,context:c.src,message:b.jPlayer.errorMsg.URL,hint:b.jPlayer.errorHint.URL});break;case b.jPlayer.event.seeking:this._seeking();this._trigger(a);break;case b.jPlayer.event.seeked:this._seeked();this._trigger(a);break;case b.jPlayer.event.ready:break;default:this._trigger(a)}return!1},_getFlashStatus:function(a){this.status.seekPercent=a.seekPercent;this.status.currentPercentRelative=a.currentPercentRelative; this.status.currentPercentAbsolute=a.currentPercentAbsolute;this.status.currentTime=a.currentTime;this.status.duration=a.duration;this.status.readyState=4;this.status.networkState=0;this.status.playbackRate=1;this.status.ended=!1},_updateButtons:function(a){if(a!==f)this.status.paused=!a,this.css.jq.play.length&&this.css.jq.pause.length&&(a?(this.css.jq.play.hide(),this.css.jq.pause.show()):(this.css.jq.play.show(),this.css.jq.pause.hide()));this.css.jq.restoreScreen.length&&this.css.jq.fullScreen.length&& (this.status.noFullScreen?(this.css.jq.fullScreen.hide(),this.css.jq.restoreScreen.hide()):this.options.fullScreen?(this.css.jq.fullScreen.hide(),this.css.jq.restoreScreen.show()):(this.css.jq.fullScreen.show(),this.css.jq.restoreScreen.hide()));this.css.jq.repeat.length&&this.css.jq.repeatOff.length&&(this.options.loop?(this.css.jq.repeat.hide(),this.css.jq.repeatOff.show()):(this.css.jq.repeat.show(),this.css.jq.repeatOff.hide()))},_updateInterface:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.width(this.status.seekPercent+ "%");this.css.jq.playBar.length&&this.css.jq.playBar.width(this.status.currentPercentRelative+"%");this.css.jq.currentTime.length&&this.css.jq.currentTime.text(b.jPlayer.convertTime(this.status.currentTime));this.css.jq.duration.length&&this.css.jq.duration.text(b.jPlayer.convertTime(this.status.duration))},_seeking:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.addClass("jp-seeking-bg")},_seeked:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.removeClass("jp-seeking-bg")}, _resetGate:function(){this.html.audio.gate=!1;this.html.video.gate=!1;this.flash.gate=!1},_resetActive:function(){this.html.active=!1;this.flash.active=!1},setMedia:function(a){var c=this,d=!1,e=this.status.media.poster!==a.poster;this._resetMedia();this._resetGate();this._resetActive();b.each(this.formats,function(e,f){var i=c.format[f].media==="video";b.each(c.solutions,function(b,e){if(c[e].support[f]&&c._validString(a[f])){var g=e==="html";i?(g?(c.html.video.gate=!0,c._html_setVideo(a),c.html.active= !0):(c.flash.gate=!0,c._flash_setVideo(a),c.flash.active=!0),c.css.jq.videoPlay.length&&c.css.jq.videoPlay.show(),c.status.video=!0):(g?(c.html.audio.gate=!0,c._html_setAudio(a),c.html.active=!0):(c.flash.gate=!0,c._flash_setAudio(a),c.flash.active=!0),c.css.jq.videoPlay.length&&c.css.jq.videoPlay.hide(),c.status.video=!1);d=!0;return!1}});if(d)return!1});if(d){if((!this.status.nativeVideoControls||!this.html.video.gate)&&this._validString(a.poster))e?this.htmlElement.poster.src=a.poster:this.internal.poster.jq.show(); this.status.srcSet=!0;this.status.media=b.extend({},a);this._updateButtons(!1);this._updateInterface()}else this._error({type:b.jPlayer.error.NO_SUPPORT,context:"{supplied:'"+this.options.supplied+"'}",message:b.jPlayer.errorMsg.NO_SUPPORT,hint:b.jPlayer.errorHint.NO_SUPPORT})},_resetMedia:function(){this._resetStatus();this._updateButtons(!1);this._updateInterface();this._seeked();this.internal.poster.jq.hide();clearTimeout(this.internal.htmlDlyCmdId);this.html.active?this._html_resetMedia():this.flash.active&& this._flash_resetMedia()},clearMedia:function(){this._resetMedia();this.html.active?this._html_clearMedia():this.flash.active&&this._flash_clearMedia();this._resetGate();this._resetActive()},load:function(){this.status.srcSet?this.html.active?this._html_load():this.flash.active&&this._flash_load():this._urlNotSetError("load")},play:function(a){a=typeof a==="number"?a:NaN;this.status.srcSet?this.html.active?this._html_play(a):this.flash.active&&this._flash_play(a):this._urlNotSetError("play")},videoPlay:function(){this.play()}, pause:function(a){a=typeof a==="number"?a:NaN;this.status.srcSet?this.html.active?this._html_pause(a):this.flash.active&&this._flash_pause(a):this._urlNotSetError("pause")},pauseOthers:function(){var a=this;b.each(this.instances,function(b,d){a.element!==d&&d.data("jPlayer").status.srcSet&&d.jPlayer("pause")})},stop:function(){this.status.srcSet?this.html.active?this._html_pause(0):this.flash.active&&this._flash_pause(0):this._urlNotSetError("stop")},playHead:function(a){a=this._limitValue(a,0,100); this.status.srcSet?this.html.active?this._html_playHead(a):this.flash.active&&this._flash_playHead(a):this._urlNotSetError("playHead")},_muted:function(a){this.options.muted=a;this.html.used&&this._html_mute(a);this.flash.used&&this._flash_mute(a);!this.html.video.gate&&!this.html.audio.gate&&(this._updateMute(a),this._updateVolume(this.options.volume),this._trigger(b.jPlayer.event.volumechange))},mute:function(a){a=a===f?!0:!!a;this._muted(a)},unmute:function(a){a=a===f?!0:!!a;this._muted(!a)},_updateMute:function(a){if(a=== f)a=this.options.muted;this.css.jq.mute.length&&this.css.jq.unmute.length&&(this.status.noVolume?(this.css.jq.mute.hide(),this.css.jq.unmute.hide()):a?(this.css.jq.mute.hide(),this.css.jq.unmute.show()):(this.css.jq.mute.show(),this.css.jq.unmute.hide()))},volume:function(a){a=this._limitValue(a,0,1);this.options.volume=a;this.html.used&&this._html_volume(a);this.flash.used&&this._flash_volume(a);!this.html.video.gate&&!this.html.audio.gate&&(this._updateVolume(a),this._trigger(b.jPlayer.event.volumechange))}, volumeBar:function(a){if(this.css.jq.volumeBar.length){var b=this.css.jq.volumeBar.offset(),d=a.pageX-b.left,e=this.css.jq.volumeBar.width(),a=this.css.jq.volumeBar.height()-a.pageY+b.top,b=this.css.jq.volumeBar.height();this.options.verticalVolume?this.volume(a/b):this.volume(d/e)}this.options.muted&&this._muted(!1)},volumeBarValue:function(a){this.volumeBar(a)},_updateVolume:function(a){if(a===f)a=this.options.volume;a=this.options.muted?0:a;this.status.noVolume?(this.css.jq.volumeBar.length&&this.css.jq.volumeBar.hide(), this.css.jq.volumeBarValue.length&&this.css.jq.volumeBarValue.hide(),this.css.jq.volumeMax.length&&this.css.jq.volumeMax.hide()):(this.css.jq.volumeBar.length&&this.css.jq.volumeBar.show(),this.css.jq.volumeBarValue.length&&(this.css.jq.volumeBarValue.show(),this.css.jq.volumeBarValue[this.options.verticalVolume?"height":"width"](a*100+"%")),this.css.jq.volumeMax.length&&this.css.jq.volumeMax.show())},volumeMax:function(){this.volume(1);this.options.muted&&this._muted(!1)},_cssSelectorAncestor:function(a){var c= this;this.options.cssSelectorAncestor=a;this._removeUiClass();this.ancestorJq=a?b(a):[];a&&this.ancestorJq.length!==1&&this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT,context:a,message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.ancestorJq.length+" found for cssSelectorAncestor.",hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT});this._addUiClass();b.each(this.options.cssSelector,function(a,b){c._cssSelector(a,b)})},_cssSelector:function(a,c){var d=this;typeof c==="string"?b.jPlayer.prototype.options.cssSelector[a]? (this.css.jq[a]&&this.css.jq[a].length&&this.css.jq[a].unbind(".jPlayer"),this.options.cssSelector[a]=c,this.css.cs[a]=this.options.cssSelectorAncestor+" "+c,this.css.jq[a]=c?b(this.css.cs[a]):[],this.css.jq[a].length&&this.css.jq[a].bind("click.jPlayer",function(c){d[a](c);b(this).blur();return!1}),c&&this.css.jq[a].length!==1&&this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT,context:this.css.cs[a],message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.css.jq[a].length+" found for "+a+" method.", hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT})):this._warning({type:b.jPlayer.warning.CSS_SELECTOR_METHOD,context:a,message:b.jPlayer.warningMsg.CSS_SELECTOR_METHOD,hint:b.jPlayer.warningHint.CSS_SELECTOR_METHOD}):this._warning({type:b.jPlayer.warning.CSS_SELECTOR_STRING,context:c,message:b.jPlayer.warningMsg.CSS_SELECTOR_STRING,hint:b.jPlayer.warningHint.CSS_SELECTOR_STRING})},seekBar:function(a){if(this.css.jq.seekBar){var b=this.css.jq.seekBar.offset(),a=a.pageX-b.left,b=this.css.jq.seekBar.width(); this.playHead(100*a/b)}},playBar:function(a){this.seekBar(a)},repeat:function(){this._loop(!0)},repeatOff:function(){this._loop(!1)},_loop:function(a){if(this.options.loop!==a)this.options.loop=a,this._updateButtons(),this._trigger(b.jPlayer.event.repeat)},currentTime:function(){},duration:function(){},gui:function(){},noSolution:function(){},option:function(a,c){var d=a;if(arguments.length===0)return b.extend(!0,{},this.options);if(typeof a==="string"){var e=a.split(".");if(c===f){for(var d=b.extend(!0, {},this.options),g=0;g<e.length;g++)if(d[e[g]]!==f)d=d[e[g]];else return this._warning({type:b.jPlayer.warning.OPTION_KEY,context:a,message:b.jPlayer.warningMsg.OPTION_KEY,hint:b.jPlayer.warningHint.OPTION_KEY}),f;return d}for(var g=d={},h=0;h<e.length;h++)h<e.length-1?(g[e[h]]={},g=g[e[h]]):g[e[h]]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,c){var d=this;switch(a){case "volume":this.volume(c); break;case "muted":this._muted(c);break;case "cssSelectorAncestor":this._cssSelectorAncestor(c);break;case "cssSelector":b.each(c,function(a,b){d._cssSelector(a,b)});break;case "fullScreen":this.options[a]!==c&&(this._removeUiClass(),this.options[a]=c,this._refreshSize());break;case "size":!this.options.fullScreen&&this.options[a].cssClass!==c.cssClass&&this._removeUiClass();this.options[a]=b.extend({},this.options[a],c);this._refreshSize();break;case "sizeFull":this.options.fullScreen&&this.options[a].cssClass!== c.cssClass&&this._removeUiClass();this.options[a]=b.extend({},this.options[a],c);this._refreshSize();break;case "autohide":this.options[a]=b.extend({},this.options[a],c);this._updateAutohide();break;case "loop":this._loop(c);break;case "nativeVideoControls":this.options[a]=b.extend({},this.options[a],c);this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this._restrictNativeVideoControls();this._updateNativeVideoControls();break;case "noFullScreen":this.options[a]= b.extend({},this.options[a],c);this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this.status.noFullScreen=this._uaBlocklist(this.options.noFullScreen);this._restrictNativeVideoControls();this._updateButtons();break;case "noVolume":this.options[a]=b.extend({},this.options[a],c);this.status.noVolume=this._uaBlocklist(this.options.noVolume);this._updateVolume();this._updateMute();break;case "emulateHtml":this.options[a]!==c&&((this.options[a]=c)?this._emulateHtmlBridge(): this._destroyHtmlBridge())}return this},_refreshSize:function(){this._setSize();this._addUiClass();this._updateSize();this._updateButtons();this._updateAutohide();this._trigger(b.jPlayer.event.resize)},_setSize:function(){this.options.fullScreen?(this.status.width=this.options.sizeFull.width,this.status.height=this.options.sizeFull.height,this.status.cssClass=this.options.sizeFull.cssClass):(this.status.width=this.options.size.width,this.status.height=this.options.size.height,this.status.cssClass= this.options.size.cssClass);this.element.css({width:this.status.width,height:this.status.height})},_addUiClass:function(){this.ancestorJq.length&&this.ancestorJq.addClass(this.status.cssClass)},_removeUiClass:function(){this.ancestorJq.length&&this.ancestorJq.removeClass(this.status.cssClass)},_updateSize:function(){this.internal.poster.jq.css({width:this.status.width,height:this.status.height});!this.status.waitForPlay&&this.html.active&&this.status.video||this.html.video.available&&this.html.used&& this.status.nativeVideoControls?this.internal.video.jq.css({width:this.status.width,height:this.status.height}):!this.status.waitForPlay&&this.flash.active&&this.status.video&&this.internal.flash.jq.css({width:this.status.width,height:this.status.height})},_updateAutohide:function(){var a=this,b=function(){a.css.jq.gui.fadeIn(a.options.autohide.fadeIn,function(){clearTimeout(a.internal.autohideId);a.internal.autohideId=setTimeout(function(){a.css.jq.gui.fadeOut(a.options.autohide.fadeOut)},a.options.autohide.hold)})}; this.css.jq.gui.length&&(this.css.jq.gui.stop(!0,!0),clearTimeout(this.internal.autohideId),this.element.unbind(".jPlayerAutohide"),this.css.jq.gui.unbind(".jPlayerAutohide"),this.status.nativeVideoControls?this.css.jq.gui.hide():this.options.fullScreen&&this.options.autohide.full||!this.options.fullScreen&&this.options.autohide.restored?(this.element.bind("mousemove.jPlayer.jPlayerAutohide",b),this.css.jq.gui.bind("mousemove.jPlayer.jPlayerAutohide",b),this.css.jq.gui.hide()):this.css.jq.gui.show())}, fullScreen:function(){this._setOption("fullScreen",!0)},restoreScreen:function(){this._setOption("fullScreen",!1)},_html_initMedia:function(){this.htmlElement.media.src=this.status.src;this.options.preload!=="none"&&this._html_load();this._trigger(b.jPlayer.event.timeupdate)},_html_setAudio:function(a){var c=this;b.each(this.formats,function(b,e){if(c.html.support[e]&&a[e])return c.status.src=a[e],c.status.format[e]=!0,c.status.formatType=e,!1});this.htmlElement.media=this.htmlElement.audio;this._html_initMedia()}, _html_setVideo:function(a){var c=this;b.each(this.formats,function(b,e){if(c.html.support[e]&&a[e])return c.status.src=a[e],c.status.format[e]=!0,c.status.formatType=e,!1});if(this.status.nativeVideoControls)this.htmlElement.video.poster=this._validString(a.poster)?a.poster:"";this.htmlElement.media=this.htmlElement.video;this._html_initMedia()},_html_resetMedia:function(){this.htmlElement.media&&(this.htmlElement.media.id===this.internal.video.id&&!this.status.nativeVideoControls&&this.internal.video.jq.css({width:"0px", height:"0px"}),this.htmlElement.media.pause())},_html_clearMedia:function(){if(this.htmlElement.media)this.htmlElement.media.src="",this.htmlElement.media.load()},_html_load:function(){if(this.status.waitForLoad)this.status.waitForLoad=!1,this.htmlElement.media.load();clearTimeout(this.internal.htmlDlyCmdId)},_html_play:function(a){var b=this;this._html_load();this.htmlElement.media.play();if(!isNaN(a))try{this.htmlElement.media.currentTime=a}catch(d){this.internal.htmlDlyCmdId=setTimeout(function(){b.play(a)}, 100);return}this._html_checkWaitForPlay()},_html_pause:function(a){var b=this;a>0?this._html_load():clearTimeout(this.internal.htmlDlyCmdId);this.htmlElement.media.pause();if(!isNaN(a))try{this.htmlElement.media.currentTime=a}catch(d){this.internal.htmlDlyCmdId=setTimeout(function(){b.pause(a)},100);return}a>0&&this._html_checkWaitForPlay()},_html_playHead:function(a){var b=this;this._html_load();try{if(typeof this.htmlElement.media.seekable==="object"&&this.htmlElement.media.seekable.length>0)this.htmlElement.media.currentTime= a*this.htmlElement.media.seekable.end(this.htmlElement.media.seekable.length-1)/100;else if(this.htmlElement.media.duration>0&&!isNaN(this.htmlElement.media.duration))this.htmlElement.media.currentTime=a*this.htmlElement.media.duration/100;else throw"e";}catch(d){this.internal.htmlDlyCmdId=setTimeout(function(){b.playHead(a)},100);return}this.status.waitForLoad||this._html_checkWaitForPlay()},_html_checkWaitForPlay:function(){if(this.status.waitForPlay)this.status.waitForPlay=!1,this.css.jq.videoPlay.length&& this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height}))},_html_volume:function(a){if(this.html.audio.available)this.htmlElement.audio.volume=a;if(this.html.video.available)this.htmlElement.video.volume=a},_html_mute:function(a){if(this.html.audio.available)this.htmlElement.audio.muted=a;if(this.html.video.available)this.htmlElement.video.muted=a},_flash_setAudio:function(a){var c=this;try{if(b.each(this.formats, function(b,d){if(c.flash.support[d]&&a[d]){switch(d){case "m4a":case "fla":c._getMovie().fl_setAudio_m4a(a[d]);break;case "mp3":c._getMovie().fl_setAudio_mp3(a[d])}c.status.src=a[d];c.status.format[d]=!0;c.status.formatType=d;return!1}}),this.options.preload==="auto")this._flash_load(),this.status.waitForLoad=!1}catch(d){this._flashError(d)}},_flash_setVideo:function(a){var c=this;try{if(b.each(this.formats,function(b,d){if(c.flash.support[d]&&a[d]){switch(d){case "m4v":case "flv":c._getMovie().fl_setVideo_m4v(a[d])}c.status.src= a[d];c.status.format[d]=!0;c.status.formatType=d;return!1}}),this.options.preload==="auto")this._flash_load(),this.status.waitForLoad=!1}catch(d){this._flashError(d)}},_flash_resetMedia:function(){this.internal.flash.jq.css({width:"0px",height:"0px"});this._flash_pause(NaN)},_flash_clearMedia:function(){try{this._getMovie().fl_clearMedia()}catch(a){this._flashError(a)}},_flash_load:function(){try{this._getMovie().fl_load()}catch(a){this._flashError(a)}this.status.waitForLoad=!1},_flash_play:function(a){try{this._getMovie().fl_play(a)}catch(b){this._flashError(b)}this.status.waitForLoad= !1;this._flash_checkWaitForPlay()},_flash_pause:function(a){try{this._getMovie().fl_pause(a)}catch(b){this._flashError(b)}if(a>0)this.status.waitForLoad=!1,this._flash_checkWaitForPlay()},_flash_playHead:function(a){try{this._getMovie().fl_play_head(a)}catch(b){this._flashError(b)}this.status.waitForLoad||this._flash_checkWaitForPlay()},_flash_checkWaitForPlay:function(){if(this.status.waitForPlay)this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&& (this.internal.poster.jq.hide(),this.internal.flash.jq.css({width:this.status.width,height:this.status.height}))},_flash_volume:function(a){try{this._getMovie().fl_volume(a)}catch(b){this._flashError(b)}},_flash_mute:function(a){try{this._getMovie().fl_mute(a)}catch(b){this._flashError(b)}},_getMovie:function(){return document[this.internal.flash.id]},_checkForFlash:function(a){var b=!1,d;if(window.ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+a),b=!0}catch(e){}else navigator.plugins&& navigator.mimeTypes.length>0&&(d=navigator.plugins["Shockwave Flash"])&&navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,"$1")>=a&&(b=!0);return b},_validString:function(a){return a&&typeof a==="string"},_limitValue:function(a,b,d){return a<b?b:a>d?d:a},_urlNotSetError:function(a){this._error({type:b.jPlayer.error.URL_NOT_SET,context:a,message:b.jPlayer.errorMsg.URL_NOT_SET,hint:b.jPlayer.errorHint.URL_NOT_SET})},_flashError:function(a){var c;c=this.internal.ready?"FLASH_DISABLED": "FLASH";this._error({type:b.jPlayer.error[c],context:this.internal.flash.swf,message:b.jPlayer.errorMsg[c]+a.message,hint:b.jPlayer.errorHint[c]});this.internal.flash.jq.css({width:"1px",height:"1px"})},_error:function(a){this._trigger(b.jPlayer.event.error,a);this.options.errorAlerts&&this._alert("Error!"+(a.message?"\n\n"+a.message:"")+(a.hint?"\n\n"+a.hint:"")+"\n\nContext: "+a.context)},_warning:function(a){this._trigger(b.jPlayer.event.warning,f,a);this.options.warningAlerts&&this._alert("Warning!"+ (a.message?"\n\n"+a.message:"")+(a.hint?"\n\n"+a.hint:"")+"\n\nContext: "+a.context)},_alert:function(a){alert("jPlayer "+this.version.script+" : id='"+this.internal.self.id+"' : "+a)},_emulateHtmlBridge:function(){var a=this;b.each(b.jPlayer.emulateMethods.split(/\s+/g),function(b,d){a.internal.domNode[d]=function(b){a[d](b)}});b.each(b.jPlayer.event,function(c,d){var e=!0;b.each(b.jPlayer.reservedEvent.split(/\s+/g),function(a,b){if(b===c)return e=!1});e&&a.element.bind(d+".jPlayer.jPlayerHtml", function(){a._emulateHtmlUpdate();var b=document.createEvent("Event");b.initEvent(c,!1,!0);a.internal.domNode.dispatchEvent(b)})})},_emulateHtmlUpdate:function(){var a=this;b.each(b.jPlayer.emulateStatus.split(/\s+/g),function(b,d){a.internal.domNode[d]=a.status[d]});b.each(b.jPlayer.emulateOptions.split(/\s+/g),function(b,d){a.internal.domNode[d]=a.options[d]})},_destroyHtmlBridge:function(){var a=this;this.element.unbind(".jPlayerHtml");b.each((b.jPlayer.emulateMethods+" "+b.jPlayer.emulateStatus+ " "+b.jPlayer.emulateOptions).split(/\s+/g),function(b,d){delete a.internal.domNode[d]})}};b.jPlayer.error={FLASH:"e_flash",FLASH_DISABLED:"e_flash_disabled",NO_SOLUTION:"e_no_solution",NO_SUPPORT:"e_no_support",URL:"e_url",URL_NOT_SET:"e_url_not_set",VERSION:"e_version"};b.jPlayer.errorMsg={FLASH:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",FLASH_DISABLED:"jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ", NO_SOLUTION:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",NO_SUPPORT:"It is not possible to play any media format provided in setMedia() on this browser using your current options.",URL:"Media URL could not be loaded.",URL_NOT_SET:"Attempt to issue media playback commands, while no media url is set.",VERSION:"jPlayer "+b.jPlayer.prototype.version.script+" needs Jplayer.swf version "+b.jPlayer.prototype.version.needFlash+" but found "};b.jPlayer.errorHint= {FLASH:"Check your swfPath option and that Jplayer.swf is there.",FLASH_DISABLED:"Check that you have not display:none; the jPlayer entity or any ancestor.",NO_SOLUTION:"Review the jPlayer options: support and supplied.",NO_SUPPORT:"Video or audio formats defined in the supplied option are missing.",URL:"Check media URL is valid.",URL_NOT_SET:"Use setMedia() to set the media URL.",VERSION:"Update jPlayer files."};b.jPlayer.warning={CSS_SELECTOR_COUNT:"e_css_selector_count",CSS_SELECTOR_METHOD:"e_css_selector_method", CSS_SELECTOR_STRING:"e_css_selector_string",OPTION_KEY:"e_option_key"};b.jPlayer.warningMsg={CSS_SELECTOR_COUNT:"The number of css selectors found did not equal one: ",CSS_SELECTOR_METHOD:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",CSS_SELECTOR_STRING:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",OPTION_KEY:"The option requested in jPlayer('option') is undefined."};b.jPlayer.warningHint={CSS_SELECTOR_COUNT:"Check your css selector and the ancestor.", CSS_SELECTOR_METHOD:"Check your method name.",CSS_SELECTOR_STRING:"Check your css selector is a string.",OPTION_KEY:"Check your option name."}})(jQuery);

/*
 *  GMAP3 Plugin for JQuery 
 *  Version   : 4.1
 *  Date      : 2011-11-18
 *  Licence   : GPL v3 : http://www.gnu.org/licenses/gpl.html  
 *  Author    : DEMONTE Jean-Baptiste
 *  Contact   : jbdemonte@gmail.com
 *  Web site  : http://gmap3.net
 *   
 *  Copyright (c) 2010-2011 Jean-Baptiste DEMONTE
 *  All rights reserved.
 *   
 * Redistribution and use in source and binary forms, with or without 
 * modification, are permitted provided that the following conditions are met:
 * 
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above 
 *     copyright notice, this list of conditions and the following 
 *     disclaimer in the documentation and/or other materials provided 
 *     with the distribution.
 *   - Neither the name of the author nor the names of its contributors 
 *     may be used to endorse or promote products derived from this 
 *     software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 */

 
// place any jQuery/helper plugins in here, instead of separate, slower script files.



// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());
