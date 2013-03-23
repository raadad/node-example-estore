/*
selectivizr v1.0.3b - (c) Keith Clark, freely distributable under the terms 
of the MIT license.

selectivizr.com
*/
/* 
  
Notes about this source
-----------------------

 * The #DEBUG_START and #DEBUG_END comments are used to mark blocks of code
   that will be removed prior to building a final release version (using a
   pre-compression script)
  
  
References:
-----------
 
 * CSS Syntax          : http://www.w3.org/TR/2003/WD-css3-syntax-20030813/#style
 * Selectors           : http://www.w3.org/TR/css3-selectors/#selectors
 * IE Compatability    : http://msdn.microsoft.com/en-us/library/cc351024(VS.85).aspx
 * W3C Selector Tests  : http://www.w3.org/Style/CSS/Test/CSS3/Selectors/current/html/tests/
 
*/

(function(win) {

  // If browser isn't IE, then stop execution! This handles the script 
  // being loaded by non IE browsers because the developer didn't use 
  // conditional comments.
  if (/*@cc_on!@*/true) return;

  // =========================== Init Objects ============================

  var doc = document;
  var root = doc.documentElement;
  var xhr = getXHRObject();
  var ieVersion = /MSIE (\d+)/.exec(navigator.userAgent)[1];
  
  // If were not in standards mode, IE is too old / new or we can't create
  // an XMLHttpRequest object then we should get out now.
  if (doc.compatMode != 'CSS1Compat' || ieVersion<6 || ieVersion>8 || !xhr) {
    return;
  }
  
  
  // ========================= Common Objects ============================

  // Compatiable selector engines in order of CSS3 support. Note: '*' is
  // a placholder for the object key name. (basically, crude compression)
  var selectorEngines = {
    "NW"                : "*.Dom.select",
    "MooTools"              : "$$",
    "DOMAssistant"            : "*.$", 
    "Prototype"             : "$$",
    "YAHOO"               : "*.util.Selector.query",
    "Sizzle"              : "*", 
    "jQuery"              : "*",
    "dojo"                : "*.query"
  };

  var selectorMethod;
  var enabledWatchers           = [];     // array of :enabled/:disabled elements to poll
  var domPatches              = [];
  var ie6PatchID              = 0;      // used to solve ie6's multiple class bug
  var patchIE6MultipleClasses       = true;   // if true adds class bloat to ie6
  var namespace               = "slvzr";

  // Stylesheet parsing regexp's
  var RE_COMMENT              = /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*?/g;
  var RE_IMPORT             = /@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))\s*([^;]*);/g;
  var RE_ASSET_URL            = /(behavior\s*?:\s*)?\burl\(\s*(["']?)(?!data:)([^"')]+)\2\s*\)/g;
  var RE_PSEUDO_STRUCTURAL        = /^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/;
  var RE_PSEUDO_ELEMENTS          = /:(:first-(?:line|letter))/g;
  var RE_SELECTOR_GROUP         = /((?:^|(?:\s*})+)(?:\s*@media[^{]+{)?)\s*([^\{]*?[\[:][^{]+)/g;
  var RE_SELECTOR_PARSE         = /([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g; 
  var RE_LIBRARY_INCOMPATIBLE_PSEUDOS   = /(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g;
  var RE_PATCH_CLASS_NAME_REPLACE     = /[^\w-]/g;
  
  // HTML UI element regexp's
  var RE_INPUT_ELEMENTS         = /^(INPUT|SELECT|TEXTAREA|BUTTON)$/;
  var RE_INPUT_CHECKABLE_TYPES      = /^(checkbox|radio)$/;

  // Broken attribute selector implementations (IE7/8 native [^=""], [$=""] and [*=""])
  var BROKEN_ATTR_IMPLEMENTATIONS     = ieVersion>6 ? /[\$\^*]=(['"])\1/ : null;

  // Whitespace normalization regexp's
  var RE_TIDY_TRAILING_WHITESPACE     = /([(\[+~])\s+/g;
  var RE_TIDY_LEADING_WHITESPACE      = /\s+([)\]+~])/g;
  var RE_TIDY_CONSECUTIVE_WHITESPACE    = /\s+/g;
  var RE_TIDY_TRIM_WHITESPACE       = /^\s*((?:[\S\s]*\S)?)\s*$/;
  
  // String constants
  var EMPTY_STRING            = "";
  var SPACE_STRING            = " ";
  var PLACEHOLDER_STRING          = "$1";

  // =========================== Patching ================================

  // --[ patchStyleSheet() ]----------------------------------------------
  // Scans the passed cssText for selectors that require emulation and
  // creates one or more patches for each matched selector.
  function patchStyleSheet( cssText ) {
    return cssText.replace(RE_PSEUDO_ELEMENTS, PLACEHOLDER_STRING).
      replace(RE_SELECTOR_GROUP, function(m, prefix, selectorText) {  
          var selectorGroups = selectorText.split(",");
          for (var c = 0, cs = selectorGroups.length; c < cs; c++) {
            var selector = normalizeSelectorWhitespace(selectorGroups[c]) + SPACE_STRING;
            var patches = [];
            selectorGroups[c] = selector.replace(RE_SELECTOR_PARSE, 
              function(match, combinator, pseudo, attribute, index) {
                if (combinator) {
                  if (patches.length>0) {
                    domPatches.push( { selector: selector.substring(0, index), patches: patches } )
                    patches = [];
                  }
                  return combinator;
                }   
                else {
                  var patch = (pseudo) ? patchPseudoClass( pseudo ) : patchAttribute( attribute );
                  if (patch) {
                    patches.push(patch);
                    return "." + patch.className;
                  }
                  return match;
                }
              }
            );
          }
          return prefix + selectorGroups.join(",");
        });
  };

  // --[ patchAttribute() ]-----------------------------------------------
  // returns a patch for an attribute selector.
  function patchAttribute( attr ) {
    return (!BROKEN_ATTR_IMPLEMENTATIONS || BROKEN_ATTR_IMPLEMENTATIONS.test(attr)) ? 
      { className: createClassName(attr), applyClass: true } : null;
  };

  // --[ patchPseudoClass() ]---------------------------------------------
  // returns a patch for a pseudo-class
  function patchPseudoClass( pseudo ) {

    var applyClass = true;
    var className = createClassName(pseudo.slice(1));
    var isNegated = pseudo.substring(0, 5) == ":not(";
    var activateEventName;
    var deactivateEventName;

    // if negated, remove :not() 
    if (isNegated) {
      pseudo = pseudo.slice(5, -1);
    }
    
    // bracket contents are irrelevant - remove them
    var bracketIndex = pseudo.indexOf("(")
    if (bracketIndex > -1) {
      pseudo = pseudo.substring(0, bracketIndex);
    }   
    
    // check we're still dealing with a pseudo-class
    if (pseudo.charAt(0) == ":") {
      switch (pseudo.slice(1)) {

        case "root":
          applyClass = function(e) {
            return isNegated ? e != root : e == root;
          }
          break;

        case "target":
          // :target is only supported in IE8
          if (ieVersion == 8) {
            applyClass = function(e) {
              var handler = function() { 
                var hash = location.hash;
                var hashID = hash.slice(1);
                return isNegated ? (hash == EMPTY_STRING || e.id != hashID) : (hash != EMPTY_STRING && e.id == hashID);
              };
              addEvent( win, "hashchange", function() {
                toggleElementClass(e, className, handler());
              })
              return handler();
            }
            break;
          }
          return false;
        
        case "checked":
          applyClass = function(e) { 
            if (RE_INPUT_CHECKABLE_TYPES.test(e.type)) {
              addEvent( e, "propertychange", function() {
                if (event.propertyName == "checked") {
                  toggleElementClass( e, className, e.checked !== isNegated );
                }               
              })
            }
            return e.checked !== isNegated;
          }
          break;
          
        case "disabled":
          isNegated = !isNegated;

        case "enabled":
          applyClass = function(e) { 
            if (RE_INPUT_ELEMENTS.test(e.tagName)) {
              addEvent( e, "propertychange", function() {
                if (event.propertyName == "$disabled") {
                  toggleElementClass( e, className, e.$disabled === isNegated );
                } 
              });
              enabledWatchers.push(e);
              e.$disabled = e.disabled;
              return e.disabled === isNegated;
            }
            return pseudo == ":enabled" ? isNegated : !isNegated;
          }
          break;
          
        case "focus":
          activateEventName = "focus";
          deactivateEventName = "blur";
                
        case "hover":
          if (!activateEventName) {
            activateEventName = "mouseenter";
            deactivateEventName = "mouseleave";
          }
          applyClass = function(e) {
            addEvent( e, isNegated ? deactivateEventName : activateEventName, function() {
              toggleElementClass( e, className, true );
            })
            addEvent( e, isNegated ? activateEventName : deactivateEventName, function() {
              toggleElementClass( e, className, false );
            })
            return isNegated;
          }
          break;
          
        // everything else
        default:
          // If we don't support this pseudo-class don't create 
          // a patch for it
          if (!RE_PSEUDO_STRUCTURAL.test(pseudo)) {
            return false;
          }
          break;
      }
    }
    return { className: className, applyClass: applyClass };
  };

  // --[ applyPatches() ]-------------------------------------------------
  function applyPatches() {
    var elms, selectorText, patches, domSelectorText;

    for (var c=0; c<domPatches.length; c++) {
      selectorText = domPatches[c].selector;
      patches = domPatches[c].patches;

      // Although some selector libraries can find :checked :enabled etc.
      // we need to find all elements that could have that state because
      // it can be changed by the user.
      domSelectorText = selectorText.replace(RE_LIBRARY_INCOMPATIBLE_PSEUDOS, EMPTY_STRING);

      // If the dom selector equates to an empty string or ends with
      // whitespace then we need to append a universal selector (*) to it.
      if (domSelectorText == EMPTY_STRING || domSelectorText.charAt(domSelectorText.length - 1) == SPACE_STRING) {
        domSelectorText += "*";
      }

      // Ensure we catch errors from the selector library
      try {
        elms = selectorMethod( domSelectorText );
      } catch (ex) {
        // #DEBUG_START
        log( "Selector '" + selectorText + "' threw exception '" + ex + "'" );
        // #DEBUG_END
      }


      if (elms) {
        for (var d = 0, dl = elms.length; d < dl; d++) {
          var elm = elms[d];
          var cssClasses = elm.className;
          for (var f = 0, fl = patches.length; f < fl; f++) {
            var patch = patches[f];
            if (!hasPatch(elm, patch)) {
              if (patch.applyClass && (patch.applyClass === true || patch.applyClass(elm) === true)) {
                cssClasses = toggleClass(cssClasses, patch.className, true );
              }
            }
          }
          elm.className = cssClasses;
        }
      }
    }
  };

  // --[ hasPatch() ]-----------------------------------------------------
  // checks for the exsistence of a patch on an element
  function hasPatch( elm, patch ) {
    return new RegExp("(^|\\s)" + patch.className + "(\\s|$)").test(elm.className);
  };
  
  
  // =========================== Utility =================================
  
  function createClassName( className ) {
    return namespace + "-" + ((ieVersion == 6 && patchIE6MultipleClasses) ?
      ie6PatchID++
    :
      className.replace(RE_PATCH_CLASS_NAME_REPLACE, function(a) { return a.charCodeAt(0) }));
  };

  // --[ log() ]----------------------------------------------------------
  // #DEBUG_START
  function log( message ) {
    if (win.console) {
      win.console.log(message);
    }
  };
  // #DEBUG_END

  // --[ trim() ]---------------------------------------------------------
  // removes leading, trailing whitespace from a string
  function trim( text ) {
    return text.replace(RE_TIDY_TRIM_WHITESPACE, PLACEHOLDER_STRING);
  };

  // --[ normalizeWhitespace() ]------------------------------------------
  // removes leading, trailing and consecutive whitespace from a string
  function normalizeWhitespace( text ) {
    return trim(text).replace(RE_TIDY_CONSECUTIVE_WHITESPACE, SPACE_STRING);
  };

  // --[ normalizeSelectorWhitespace() ]----------------------------------
  // tidies whitespace around selector brackets and combinators
  function normalizeSelectorWhitespace( selectorText ) {
    return normalizeWhitespace(selectorText.
      replace(RE_TIDY_TRAILING_WHITESPACE, PLACEHOLDER_STRING).
      replace(RE_TIDY_LEADING_WHITESPACE, PLACEHOLDER_STRING)
    );
  };

  // --[ toggleElementClass() ]-------------------------------------------
  // toggles a single className on an element
  function toggleElementClass( elm, className, on ) {
    var oldClassName = elm.className;
    var newClassName = toggleClass(oldClassName, className, on);
    if (newClassName != oldClassName) {
      elm.className = newClassName;
      elm.parentNode.className += EMPTY_STRING;
    }
  };

  // --[ toggleClass() ]--------------------------------------------------
  // adds / removes a className from a string of classNames. Used to 
  // manage multiple class changes without forcing a DOM redraw
  function toggleClass( classList, className, on ) {
    var re = RegExp("(^|\\s)" + className + "(\\s|$)");
    var classExists = re.test(classList);
    if (on) {
      return classExists ? classList : classList + SPACE_STRING + className;
    } else {
      return classExists ? trim(classList.replace(re, PLACEHOLDER_STRING)) : classList;
    }
  };
  
  // --[ addEvent() ]-----------------------------------------------------
  function addEvent(elm, eventName, eventHandler) {
    elm.attachEvent("on" + eventName, eventHandler);
  };

  // --[ getXHRObject() ]-------------------------------------------------
  function getXHRObject() {
    if (win.XMLHttpRequest) {
      return new XMLHttpRequest;
    }
    try { 
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) { 
      return null;
    }
  };

  // --[ loadStyleSheet() ]-----------------------------------------------
  function loadStyleSheet( url ) {
    xhr.open("GET", url, false);
    xhr.send();
    return (xhr.status==200) ? xhr.responseText : EMPTY_STRING; 
  };
  
  // --[ resolveUrl() ]---------------------------------------------------
  // Converts a URL fragment to a fully qualified URL using the specified
  // context URL. Returns null if same-origin policy is broken
  function resolveUrl( url, contextUrl, ignoreSameOriginPolicy ) {

    function getProtocol( url ) {
      return url.substring(0, url.indexOf("//"));
    };

    function getProtocolAndHost( url ) {
      return url.substring(0, url.indexOf("/", 8));
    };

    if (!contextUrl) {
      contextUrl = baseUrl;
    }

    // protocol-relative path
    if (url.substring(0,2)=="//") {
      url = getProtocol(contextUrl) + url;
    }

    // absolute path
    if (/^https?:\/\//i.test(url)) {
      return !ignoreSameOriginPolicy && getProtocolAndHost(contextUrl) != getProtocolAndHost(url) ? null : url ;
    }

    // root-relative path
    if (url.charAt(0)=="/") {
      return getProtocolAndHost(contextUrl) + url;
    }

    // relative path
    var contextUrlPath = contextUrl.split(/[?#]/)[0]; // ignore query string in the contextUrl  
    if (url.charAt(0) != "?" && contextUrlPath.charAt(contextUrlPath.length - 1) != "/") {
      contextUrlPath = contextUrlPath.substring(0, contextUrlPath.lastIndexOf("/") + 1);
    }

    return contextUrlPath + url;
  };
  
  // --[ parseStyleSheet() ]----------------------------------------------
  // Downloads the stylesheet specified by the URL, removes it's comments
  // and recursivly replaces @import rules with their contents, ultimately
  // returning the full cssText.
  function parseStyleSheet( url ) {
    if (url) {
      return loadStyleSheet(url).replace(RE_COMMENT, EMPTY_STRING).
      replace(RE_IMPORT, function( match, quoteChar, importUrl, quoteChar2, importUrl2, media ) {
        var cssText = parseStyleSheet(resolveUrl(importUrl || importUrl2, url));
        return (media) ? "@media " + media + " {" + cssText + "}" : cssText;
      }).
      replace(RE_ASSET_URL, function( match, isBehavior, quoteChar, assetUrl ) { 
        quoteChar = quoteChar || EMPTY_STRING;
        return isBehavior ? match : " url(" + quoteChar + resolveUrl(assetUrl, url, true) + quoteChar + ") "; 
      });
    }
    return EMPTY_STRING;
  };

  // --[ getStyleSheets() ]-----------------------------------------------
  function getStyleSheets() {
    var url, stylesheet;
    for (var c = 0; c < doc.styleSheets.length; c++) {
      stylesheet = doc.styleSheets[c];
      if (stylesheet.href != EMPTY_STRING) {
        url = resolveUrl(stylesheet.href);
        if (url) {
          stylesheet.cssText = stylesheet["rawCssText"] = patchStyleSheet( parseStyleSheet( url ) );
        }
      }
    }
  };

  // --[ init() ]---------------------------------------------------------
  function init() {
    applyPatches();

    // :enabled & :disabled polling script (since we can't hook 
    // onpropertychange event when an element is disabled) 
    if (enabledWatchers.length > 0) {
      setInterval( function() {
        for (var c = 0, cl = enabledWatchers.length; c < cl; c++) {
          var e = enabledWatchers[c];
          if (e.disabled !== e.$disabled) {
            if (e.disabled) {
              e.disabled = false;
              e.$disabled = true;
              e.disabled = true;
            }
            else {
              e.$disabled = e.disabled;
            }
          }
        }
      }, 250)
    }
  };

  // Determine the baseUrl and download the stylesheets
  var baseTags = doc.getElementsByTagName("BASE");
  var baseUrl = (baseTags.length > 0) ? baseTags[0].href : doc.location.href;
  getStyleSheets();

  // Bind selectivizr to the ContentLoaded event. 
  ContentLoaded(win, function() {
    // Determine the "best fit" selector engine
    for (var engine in selectorEngines) {
      var members, member, context = win;
      if (win[engine]) {
        members = selectorEngines[engine].replace("*", engine).split(".");
        while ((member = members.shift()) && (context = context[member])) {}
        if (typeof context == "function") {
          selectorMethod = context;
          init();
          return;
        }
      }
    }
  });
  

  
  /*!
   * ContentLoaded.js by Diego Perini, modified for IE<9 only (to save space)
   *
   * Author: Diego Perini (diego.perini at gmail.com)
   * Summary: cross-browser wrapper for DOMContentLoaded
   * Updated: 20101020
   * License: MIT
   * Version: 1.2
   *
   * URL:
   * http://javascript.nwbox.com/ContentLoaded/
   * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
   *
   */

  // @w window reference
  // @f function reference
  function ContentLoaded(win, fn) {

    var done = false, top = true,
    init = function(e) {
      if (e.type == "readystatechange" && doc.readyState != "complete") return;
      (e.type == "load" ? win : doc).detachEvent("on" + e.type, init, false);
      if (!done && (done = true)) fn.call(win, e.type || e);
    },
    poll = function() {
      try { root.doScroll("left"); } catch(e) { setTimeout(poll, 50); return; }
      init('poll');
    };

    if (doc.readyState == "complete") fn.call(win, EMPTY_STRING);
    else {
      if (doc.createEventObject && root.doScroll) {
        try { top = !win.frameElement; } catch(e) { }
        if (top) poll();
      }
      addEvent(doc,"readystatechange", init);
      addEvent(win,"load", init);
    }
  };
})(this);


/*!
 * NWMatcher 1.2.5 - Fast CSS3 Selector Engine
 * Copyright (C) 2007-2012 Diego Perini
 * See http://nwbox.com/license
 */

(function(t){var ct='nwmatcher-1.2.5',l=typeof exports=='object'?exports:((t.NW||(t.NW={}))&&(t.NW.Dom||(t.NW.Dom={}))),i=t.document,m=i.documentElement,K=[].slice,bJ={}.toString,bk,W,G,X,p,bl,bm,bn,bo,L='[#.:]?',bp='([~*^$|!]?={1})',x='[\\x20\\t\\n\\r\\f]*',bq='[\\x20]|[>+~][^>+~]',br='[-+]?\\d*n?[-+]?\\d*',Y='"[^"]*"'+"|'[^']*'",bK='\\([^()]+\\)|\\(.*\\)',bL='\\{[^{}]+\\}|\\{.*\\}',bM='\\[[^[\\]]*\\]|\\[.*\\]',Z='\\[.*\\]|\\(.*\\)|\\{.*\\}',q='(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)',B='(?:-?[_a-zA-Z]{1}[-\\w]*|[^\\x00-\\xa0]+|\\\\.+)+',bs='('+Y+'|'+B+')',C=x+'('+q+'+:?'+q+'+)'+x+'(?:'+bp+x+bs+')?'+x,bN=C.replace(bs,'([\\x22\\x27]*)((?:\\\\?.)*?)\\3'),M='((?:'+br+'|'+Y+'|'+L+'|'+q+'+|\\['+C+'\\]|\\(.+\\)|'+x+'|,)+)',bO='.+',ba='(?=[\\x20\\t\\n\\r\\f]*[^>+~(){}<>])(\\*|(?:'+L+B+')|'+bq+'|\\['+C+'\\]|\\('+M+'\\)|\\{'+bO+'\\}|,)+',bP=ba.replace(M,'.*'),N=new RegExp(ba,'g'),O=new RegExp('^'+x+'|'+x+'$','g'),bQ=new RegExp('^((?!:not)('+L+'|'+B+'|\\([^()]*\\))+|\\['+C+'\\])$'),bb=new RegExp('([^,\\\\\\[\\]]+|'+bM+'|'+bK+'|'+bL+'|\\\\.)+','g'),bR=new RegExp('(\\['+C+'\\]|\\('+M+'\\)|[^\\x20>+~]|\\\\.)+','g'),bt=/[\x20\t\n\r\f]+/g,bu=new RegExp(B+'|^$'),z=(function(){var g=(i.appendChild+'').replace(/appendChild/g,'');return function(a,b){var d=a&&a[b]||false;return d&&typeof d!='string'&&g==(d+'').replace(new RegExp(b,'g'),'')}})(),bS=z(i,'hasFocus'),P=z(i,'querySelector'),bT=z(i,'getElementById'),bU=z(m,'getElementsByTagName'),Q=z(m,'getElementsByClassName'),bV=z(m,'getAttribute'),bW=z(m,'hasAttribute'),bv=(function(){var a=false,b=m.id;m.id='length';try{a=!!K.call(i.childNodes,0)[0]}catch(e){}m.id=b;return a})(),bw='nextElementSibling'in m&&'previousElementSibling'in m,bX=bT?(function(){var a=true,b='x'+String(+new Date),d=i.createElementNS?'a':'<a name="'+b+'">';(d=i.createElement(d)).name=b;m.insertBefore(d,m.firstChild);a=!!i.getElementById(b);m.removeChild(d);return a})():true,bx=bU?(function(){var a=i.createElement('div');a.appendChild(i.createComment(''));return!!a.getElementsByTagName('*')[0]})():true,by=Q?(function(){var a,b=i.createElement('div'),d='\u53f0\u5317';b.appendChild(i.createElement('span')).setAttribute('class',d+'abc '+d);b.appendChild(i.createElement('span')).setAttribute('class','x');a=!b.getElementsByClassName(d)[0];b.lastChild.className=d;return a||b.getElementsByClassName(d).length!=2})():true,bY=bV?(function(){var a=i.createElement('input');a.setAttribute('value',5);return a.defaultValue!=5})():true,bz=bW?(function(){var a=i.createElement('option');a.setAttribute('selected','selected');return!a.hasAttribute('selected')})():true,bZ=(function(){var a=i.createElement('select');a.appendChild(i.createElement('option'));return!a.firstChild.selected})(),bA,bB,y,n,bC=/opera/i.test(bJ.call(t.opera)),ca=bC&&parseFloat(opera.version())>=11,cb=P?(function(){var h=[],f=i.createElement('div'),c,k=function(a,b,d,g){var j=false;b.appendChild(d);try{j=b.querySelectorAll(a).length==g}catch(e){}while(b.firstChild){b.removeChild(b.firstChild)}return j};c=i.createElement('p');c.setAttribute('class','');k('[class^=""]',f,c,1)&&h.push('[*^$]=[\\x20\\t\\n\\r\\f]*(?:""|'+"'')");c=i.createElement('option');c.setAttribute('selected','selected');k(':checked',f,c,0)&&h.push(':checked');c=i.createElement('input');c.setAttribute('type','hidden');k(':enabled',f,c,1)&&h.push(':enabled',':disabled');c=i.createElement('link');c.setAttribute('href','x');k(':link',f,c,1)||h.push(':link');if(bz){h.push('\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)')}return h.length?new RegExp(h.join('|')):{'test':function(){return false}}})():true,cc=new RegExp('(?:\\[[\\x20\\t\\n\\r\\f]*class\\b|\\.'+B+')'),cd=new RegExp(!(bx&&by)?!bC?'^(?:\\*|[.#]?-?[_a-zA-Z]{1}'+q+'*)$':'^(?:\\*|#-?[_a-zA-Z]{1}'+q+'*)$':'^#?-?[_a-zA-Z]{1}'+q+'*$'),ce={'a':1,'A':1,'area':1,'AREA':1,'link':1,'LINK':1},cf={'checked':1,'disabled':1,'ismap':1,'multiple':1,'readonly':1,'selected':1},R={value:'defaultValue',checked:'defaultChecked',selected:'defaultSelected'},cg={'action':2,'cite':2,'codebase':2,'data':2,'href':2,'longdesc':2,'lowsrc':2,'src':2,'usemap':2},bD={'class':0,'accept':1,'accept-charset':1,'align':1,'alink':1,'axis':1,'bgcolor':1,'charset':1,'checked':1,'clear':1,'codetype':1,'color':1,'compact':1,'declare':1,'defer':1,'dir':1,'direction':1,'disabled':1,'enctype':1,'face':1,'frame':1,'hreflang':1,'http-equiv':1,'lang':1,'language':1,'link':1,'media':1,'method':1,'multiple':1,'nohref':1,'noresize':1,'noshade':1,'nowrap':1,'readonly':1,'rel':1,'rev':1,'rules':1,'scope':1,'scrolling':1,'selected':1,'shape':1,'target':1,'text':1,'type':1,'valign':1,'valuetype':1,'vlink':1},ch={'accept':1,'accept-charset':1,'alink':1,'axis':1,'bgcolor':1,'charset':1,'codetype':1,'color':1,'enctype':1,'face':1,'hreflang':1,'http-equiv':1,'lang':1,'language':1,'link':1,'media':1,'rel':1,'rev':1,'target':1,'text':1,'type':1,'vlink':1},D={},H={'=':"n=='%m'",'^=':"n.indexOf('%m')==0",'*=':"n.indexOf('%m')>-1",'|=':"(n+'-').indexOf('%m-')==0",'~=':"(' '+n+' ').indexOf(' %m ')>-1",'$=':"n.substr(n.length-'%m'.length)=='%m'"},E={ID:new RegExp('^\\*?#('+q+'+)|'+Z),TAG:new RegExp('^('+q+'+)|'+Z),CLASS:new RegExp('^\\*?\\.('+q+'+$)|'+Z)},u={spseudos:/^\:((root|empty|nth-)?(?:(first|last|only)-)?(child)?-?(of-type)?)(?:\(([^\x29]*)\))?(.*)/,dpseudos:/^\:(link|visited|target|lang|not|active|focus|hover|checked|disabled|enabled|selected)(?:\((["']*)(.*?(\(.*\))?[^'"()]*?)\2\))?(.*)/,attribute:new RegExp('^\\['+bN+'\\](.*)'),children:/^[\x20\t\n\r\f]*\>[\x20\t\n\r\f]*(.*)/,adjacent:/^[\x20\t\n\r\f]*\+[\x20\t\n\r\f]*(.*)/,relative:/^[\x20\t\n\r\f]*\~[\x20\t\n\r\f]*(.*)/,ancestor:/^[\x20\t\n\r\f]+(.*)/,universal:/^\*(.*)/,id:new RegExp('^#('+q+'+)(.*)'),tagName:new RegExp('^('+q+'+)(.*)'),className:new RegExp('^\\.('+q+'+)(.*)')},bE=function(a,b){var d=-1,g;if(!a.length&&Array.slice)return Array.slice(b);while((g=b[++d]))a[a.length]=g;return a},bF=function(a,b,d){var g=-1,j;while((j=b[++g])){if(false===d(a[a.length]=j)){break}}return a},F=function(b,d){var g,j=i;X=b;i=b.ownerDocument||b;if(d||j!==i){m=i.documentElement;n=i.createElement('DiV').nodeName=='DiV';y=!n&&typeof i.compatMode=='string'?i.compatMode.indexOf('CSS')<0:(function(){var a=i.createElement('div').style;return a&&(a.width=1)&&a.width=='1px'})();g=i.createElement('div');g.appendChild(i.createElement('p')).setAttribute('class','xXx');g.appendChild(i.createElement('p')).setAttribute('class','xxx');bA=!n&&Q&&y&&(g.getElementsByClassName('xxx').length!=2||g.getElementsByClassName('xXx').length!=2);bB=!n&&P&&y&&(g.querySelectorAll('[class~=xxx]').length!=2||g.querySelectorAll('.xXx').length!=2);o.CACHING&&l.setCache(true,i)}},bc=function(a,b){var d=-1,g=null;while((g=b[++d])){if(g.getAttribute('id')==a){break}}return g},I=!bX?function(a,b){a=a.replace(/\\/g,'');return b.getElementById&&b.getElementById(a)||bc(a,b.getElementsByTagName('*'))}:function(a,b){var d=null;a=a.replace(/\\/g,'');if(n||b.nodeType!=9){return bc(a,b.getElementsByTagName('*'))}if((d=b.getElementById(a))&&d.name==a&&b.getElementsByName){return bc(a,b.getElementsByName(a))}return d},ci=function(a,b){F(b||(b=i));return I(a,b)},cj=function(a,b){var d=a=='*',g=b,j=[],h=g.firstChild;d||(a=a.toUpperCase());while((g=h)){if(g.tagName>'@'&&(d||g.tagName.toUpperCase()==a)){j[j.length]=g}if((h=g.firstChild||g.nextSibling))continue;while(!h&&(g=g.parentNode)&&g!==b){h=g.nextSibling}}return j},A=!bx&&bv?function(a,b){return n||b.nodeType==11?cj(a,b):K.call(b.getElementsByTagName(a),0)}:function(a,b){var d=-1,g=d,j=[],h,f=b.getElementsByTagName(a);if(a=='*'){while((h=f[++d])){if(h.nodeName>'@')j[++g]=h}}else{while((h=f[++d])){j[d]=h}}return j},ck=function(a,b){F(b||(b=i));return A(a,b)},bG=function(a,b){return S('[name="'+a.replace(/\\/g,'')+'"]',b)},cl=function(a,b){var d=-1,g=d,j=[],h,f=A('*',b),c;a=' '+(y?a.toLowerCase():a).replace(/\\/g,'')+' ';while((h=f[++d])){c=n?h.getAttribute('class'):h.className;if(c&&c.length&&(' '+(y?c.toLowerCase():c).replace(bt,' ')+' ').indexOf(a)>-1){j[++g]=h}}return j},J=function(a,b){return(by||bA||n||!b.getElementsByClassName)?cl(a,b):K.call(b.getElementsByClassName(a.replace(/\\/g,'')),0)},cm=function(a,b){F(b||(b=i));return J(a,b)},bd='compareDocumentPosition'in m?function(a,b){return(a.compareDocumentPosition(b)&16)==16}:'contains'in m?function(a,b){return a!==b&&a.contains(b)}:function(a,b){while((b=b.parentNode)){if(b===a)return true}return false},bH=!bY?function(a,b){return a.getAttribute(b)||''}:function(a,b){b=b.toLowerCase();if(R[b]){return a[R[b]]||''}return(cg[b]?a.getAttribute(b,2)||'':cf[b]?a.getAttribute(b)?b:'':((a=a.getAttributeNode(b))&&a.value)||'')},be=!bz?function(a,b){return n?!!a.getAttribute(b):a.hasAttribute(b)}:function(a,b){b=b.toLowerCase();if(R[b]){return!!a[R[b]]}a=a.getAttributeNode(b);return!!(a&&(a.specified||a.nodeValue))},cn=function(a){a=a.firstChild;while(a){if(a.nodeType==3||a.nodeName>'@')return false;a=a.nextSibling}return true},co=function(a){return be(a,'href')&&ce[a.nodeName]},cp=function(a,b){var d=1,g=b?'nextSibling':'previousSibling';while((a=a[g])){if(a.nodeName>'@')++d}return d},cq=function(a,b){var d=1,g=b?'nextSibling':'previousSibling',j=a.nodeName;while((a=a[g])){if(a.nodeName==j)++d}return d},cr=function(a){for(var b in a){o[b]=!!a[b];if(b=='SIMPLENOT'){bf={};T={};bg={};U={};o['USE_QSAPI']=false;N=new RegExp(bP,'g')}else if(b=='USE_QSAPI'){o[b]=!!a[b]&&P;N=new RegExp(ba,'g')}}},r=function(a){a='SYNTAX_ERR: '+a+' ';if(o.VERBOSITY){if(typeof t.DOMException!='undefined'){throw{code:12,message:a}}else{throw new Error(12,a);}}else{if(t.console&&t.console.log){t.console.log(a)}else{t.status+=a}}},o={CACHING:false,SHORTCUTS:false,SIMPLENOT:true,USE_HTML5:false,USE_QSAPI:P,VERBOSITY:true},bh='r[r.length]=c[k];if(f&&false===f(c[k]))break;else continue main;',V=function(a,b,d){var g=typeof a=='string'?a.match(bb):a;typeof b=='string'||(b='');if(g.length==1){b+=bI(g[0],d?bh:'f&&f(k);return true;')}else{var j=-1,h={},f;while((f=g[++j])){f=f.replace(O,'');if(!h[f]&&(h[f]=true)){b+=bI(f,d?bh:'f&&f(k);return true;')}}}if(d){return new Function('c,s,r,d,h,g,f','var N,n,x=0,k=-1,e;main:while((e=c[++k])){'+b+'}return r;')}else{return new Function('e,s,r,d,h,g,f','var N,n,x=0,k=e;'+b+'return false;')}},bI=function(a,b){var d,g,j,h=0,f,c,k,v,s,w;while(a){h++;if((c=a.match(u.universal))){f=''}else if((c=a.match(u.id))){b='if('+(n?'s.getAttribute(e,"id")':'(e.submit?s.getAttribute(e,"id"):e.id)')+'=="'+c[1]+'"){'+b+'}'}else if((c=a.match(u.tagName))){b='if(e.nodeName'+(n?'=="'+c[1]+'"':'.toUpperCase()=="'+c[1].toUpperCase()+'"')+'){'+b+'}'}else if((c=a.match(u.className))){b='if((n='+(n?'s.getAttribute(e,"class")':'e.className')+')&&n.length&&(" "+'+(y?'n.toLowerCase()':'n')+'.replace('+bt+'," ")+" ").indexOf(" '+(y?c[1].toLowerCase():c[1])+' ")>-1){'+b+'}'}else if((c=a.match(u.attribute))){f=c[1].split(':');f=f.length==2?f[1]:f[0]+'';if(c[2]&&!H[c[2]]){r('Unsupported operator in attribute selectors "'+a+'"');return''}s=false;w='false';if(c[2]&&c[4]&&(w=H[c[2]])){bD['class']=y?1:0;c[4]=c[4].replace(/\\([0-9a-f]{2,2})/,'\\x$1');s=(n?ch:bD)[f.toLowerCase()];w=w.replace(/\%m/g,s?c[4].toLowerCase():c[4])}else if(c[2]=='!='||c[2]=='='){w='n'+c[2]+'="'+c[4]+'"'}f='n=s.'+(c[2]?'get':'has')+'Attribute(e,"'+c[1]+'")'+(s?'.toLowerCase();':';');b=f+'if('+(c[2]?w:'n')+'){'+b+'}'}else if((c=a.match(u.adjacent))){b=bw?'var N'+h+'=e;if(e&&(e=e.previousElementSibling)){'+b+'}e=N'+h+';':'var N'+h+'=e;while(e&&(e=e.previousSibling)){if(e.nodeName>"@"){'+b+'break;}}e=N'+h+';'}else if((c=a.match(u.relative))){b=bw?('var N'+h+'=e;e=e.parentNode.firstElementChild;while(e&&e!==N'+h+'){'+b+'e=e.nextElementSibling}e=N'+h+';'):('var N'+h+'=e;e=e.parentNode.firstChild;while(e&&e!==N'+h+'){if(e.nodeName>"@"){'+b+'}e=e.nextSibling}e=N'+h+';');}else if((c=a.match(u.children))){b='var N'+h+'=e;if(e&&e!==h&&e!==g&&(e=e.parentNode)){'+b+'}e=N'+h+';';}else if((c=a.match(u.ancestor))){b='var N'+h+'=e;while(e&&e!==h&&e!==g&&(e=e.parentNode)){'+b+'}e=N'+h+';';}else if((c=a.match(u.spseudos))&&c[1]){switch(c[2]){case'root':if(c[7]){b='if(e===h||s.contains(h,e)){'+b+'}';}else{b='if(e===h){'+b+'}';}break;case'empty':b='if(s.isEmpty(e)){'+b+'}';break;default:if(c[2]&&c[6]){if(c[6]=='n'){b='if(e!==h){'+b+'}';break;}else if(c[6]=='even'){d=2;g=0;}else if(c[6]=='odd'){d=2;g=1;}else{g=((j=c[6].match(/(-?\d+)$/))?parseInt(j[1],10):0);d=((j=c[6].match(/(-?\d*)n/))?parseInt(j[1],10):0);if(j&&j[1]=='-')d=-1;}s=g<1&&d>1?'(n-('+g+'))%'+d+'==0':d>+1?(c[3]=='last')?'(n-('+g+'))%'+d+'==0':'n>='+g+'&&(n-('+g+'))%'+d+'==0':d<-1?(c[3]=='last')?'(n-('+g+'))%'+d+'==0':'n<='+g+'&&(n-('+g+'))%'+d+'==0':d===0?'n=='+g:(c[3]=='last')?d==-1?'n>='+g:'n<='+g:d==-1?'n<='+g:'n>='+g;b='if(e!==h){n=s['+(c[5]?'"nthOfType"':'"nthElement"')+'](e,'+(c[3]=='last'?'true':'false')+');if('+s+'){'+b+'}}';}else{d=c[3]=='first'?'previous':'next';j=c[3]=='only'?'previous':'next';g=c[3]=='first'||c[3]=='last';w=c[5]?'&&n.nodeName!=e.nodeName':'&&n.nodeName<"@"';b='if(e!==h){'+('n=e;while((n=n.'+d+'Sibling)'+w+');if(!n){'+(g?b:'n=e;while((n=n.'+j+'Sibling)'+w+');if(!n){'+b+'}')+'}')+'}';}break;}}else if((c=a.match(u.dpseudos))&&c[1]){switch(c[1]){case'not':f=c[3].replace(O,'');if(o.SIMPLENOT&&!bQ.test(f)){r('Negation pseudo-class only accepts simple selectors "'+a+'"');return'';}else{if('compatMode'in i){b='if(!'+V([f],'',false)+'(e,s,r,d,h,g)){'+b+'}';}else{b='if(!s.match(e, "'+f.replace(/\x22/g,'\\"')+'",g)){'+b+'}';}}break;case'checked':s='if((typeof e.form!="undefined"&&(/^(?:radio|checkbox)$/i).test(e.type)&&e.checked)';b=(o.USE_HTML5?s+'||(/^option$/i.test(e.nodeName)&&e.selected)':s)+'){'+b+'}';break;case'disabled':b='if(((typeof e.form!="undefined"&&!(/^hidden$/i).test(e.type))||s.isLink(e))&&e.disabled){'+b+'}';break;case'enabled':b='if(((typeof e.form!="undefined"&&!(/^hidden$/i).test(e.type))||s.isLink(e))&&!e.disabled){'+b+'}';break;case'lang':s='';if(c[3])s=c[3].substr(0,2)+'-';b='do{(n=e.lang||"").toLowerCase();if((n==""&&h.lang=="'+c[3].toLowerCase()+'")||(n&&(n=="'+c[3].toLowerCase()+'"||n.substr(0,3)=="'+s.toLowerCase()+'"))){'+b+'break;}}while((e=e.parentNode)&&e!==g);';break;case'target':j=i.location?i.location.hash:'';if(j){b='if(e.id=="'+j.slice(1)+'"){'+b+'}';}break;case'link':b='if(s.isLink(e)&&!e.visited){'+b+'}';break;case'visited':b='if(s.isLink(e)&&e.visited){'+b+'}';break;case'active':if(n)break;b='if(e===d.activeElement){'+b+'}';break;case'hover':if(n)break;b='if(e===d.hoverElement){'+b+'}';break;case'focus':if(n)break;b=bS?'if(e===d.activeElement&&d.hasFocus()&&(e.type||e.href)){'+b+'}':'if(e===d.activeElement&&(e.type||e.href)){'+b+'}';break;case'selected':f=bZ?'||(n=e.parentNode)&&n.options[n.selectedIndex]===e':'';b='if(/^option$/i.test(e.nodeName)&&(e.selected'+f+')){'+b+'}';break;default:break;}}else{f=false;v=true;for(f in D){if((c=a.match(D[f].Expression))&&c[1]){k=D[f].Callback(c,b);b=k.source;v=k.status;if(v)break;}}if(!v){r('Unknown pseudo-class selector "'+a+'"');return'';}if(!f){r('Unknown token in selector "'+a+'"');return'';}}if(!c){r('Invalid syntax in selector "'+a+'"');return'';}a=c&&c[c.length-1];}return b;},bi=function(a,b,d,g){var j;if(!(a&&a.nodeName>'@')){r('Invalid element argument');return false;}else if(!b||typeof b!='string'){r('Invalid selector argument');return false;}else if(d&&d.nodeType==1&&!bd(d,a)){return false;}else if(X!==d){F(d||(d=a.ownerDocument));}b=b.replace(O,'');o.SHORTCUTS&&(b=NW.Dom.shortcuts(b,a,d));if(bl!=b){if((j=b.match(N))&&j[0]==b){bk=(j=b.match(bb)).length<2;bl=b;bn=j;}else{r('The string "'+b+'", is not a valid CSS selector');return false;}}else j=bn;if(!T[b]||bf[b]!==d){T[b]=V(bk?[b]:j,'',false);bf[b]=d;}return T[b](a,bj,[],i,m,d,g);},cs=function(a,b){return S(a,b,function(){return false;})[0]||null;},S=function(a,b,d){var g,j,h,f,c,k,v=a;if(arguments.length===0){r('Missing required selector parameters');return[];}else if(a===''){r('Empty selector string');return[];}else if(typeof a!='string'){return[];}else if(b&&!(/1|9|11/).test(b.nodeType)){r('Invalid context element');return[];}else if(X!==b){F(b||(b=i));}if(o.CACHING&&(f=l.loadResults(v,b,i,m))){return d?bF([],f,d):f;}if(!ca&&cd.test(a)){switch(a.charAt(0)){case'#':if((h=I(a.slice(1),b))){f=[h];}else f=[];break;case'.':f=J(a.slice(1),b);break;default:f=A(a,b);break;}}else if(!n&&o.USE_QSAPI&&!(bB&&cc.test(a))&&!cb.test(a)){try{f=b.querySelectorAll(a);}catch(e){}}if(f){f=d?bF([],f,d):bv?K.call(f):bE([],f);o.CACHING&&l.saveResults(v,b,i,f);return f;}a=a.replace(O,'');o.SHORTCUTS&&(a=NW.Dom.shortcuts(a,b));if((j=bm!=a)){if((c=a.match(N))&&c[0]==a){W=(c=a.match(bb)).length<2;bm=a;bo=c;}else{r('The string "'+a+'", is not a valid CSS selector');return[];}}else c=bo;if(b.nodeType==11){f=b.childNodes;}else if(!n&&W){if(j){c=a.match(bR);k=c[c.length-1];G=k.split(':not')[0];p=a.length-k.length;}if((c=G.match(E.ID))&&(k=c[1])){if((h=I(k,b))){if(bi(h,a)){d&&d(h);f=[h];}else f=[];}}else if((c=a.match(E.ID))&&(k=c[1])){if((h=I(k,i))){if('#'+k==a){d&&d(h);f=[h];}if(/[>+~]/.test(a)){b=h.parentNode;}else{a=a.replace('#'+k,'*');p-=k.length+1;b=h;}}else f=[];}if(f){o.CACHING&&l.saveResults(v,b,i,f);return f;}if(!Q&&(c=G.match(E.TAG))&&(k=c[1])){if((f=A(k,b)).length===0){return[];}a=a.slice(0,p)+a.slice(p).replace(k,'*');}else if((c=G.match(E.CLASS))&&(k=c[1])){if((f=J(k,b)).length===0){return[];}if(bu.test(a.charAt(a.indexOf(k)-1))){a=a.slice(0,p)+a.slice(p).replace('.'+k,'');}else{a=a.slice(0,p)+a.slice(p).replace('.'+k,'*');}}else if((c=a.match(E.CLASS))&&(k=c[1])){if((f=J(k,b)).length===0){return[];}for(g=0,els=[];f.length>g;++g){els=bE(els,f[g].getElementsByTagName('*'));}f=els;if(bu.test(a.charAt(a.indexOf(k)-1))){a=a.slice(0,p)+a.slice(p).replace('.'+k,'');}else{a=a.slice(0,p)+a.slice(p).replace('.'+k,'*');}}else if(Q&&(c=G.match(E.TAG))&&(k=c[1])){if((f=A(k,b)).length===0){return[];}a=a.slice(0,p)+a.slice(p).replace(k,'*');}}if(!f){f=/^(?:applet|object)$/i.test(b.nodeName)?b.childNodes:A('*',b);}if(!U[a]||bg[a]!==b){U[a]=V(W?[a]:c,'',true);bg[a]=b}f=U[a](f,bj,[],i,m,b,d);o.CACHING&&l.saveResults(v,b,i,f);return f},bf={},T={},bg={},U={},bj={nthElement:cp,nthOfType:cq,getAttribute:bH,hasAttribute:be,byClass:J,byName:bG,byTag:A,byId:I,contains:bd,isEmpty:cn,isLink:co,select:S,match:bi};Tokens={prefixes:L,encoding:q,operators:bp,whitespace:x,identifier:B,attributes:C,combinators:bq,pseudoclass:M,pseudoparms:br,quotedvalue:Y};l.ACCEPT_NODE=bh;l.emit=r;l.byId=ci;l.byTag=ck;l.byName=bG;l.byClass=cm;l.getAttribute=bH;l.hasAttribute=be;l.match=bi;l.first=cs;l.select=S;l.compile=V;l.contains=bd;l.configure=cr;l.setCache=function(){return};l.loadResults=function(){return};l.saveResults=function(){return};l.shortcuts=function(a){return a};l.Config=o;l.Snapshot=bj;l.Operators=H;l.Selectors=D;l.Tokens=Tokens;l.registerOperator=function(a,b){H[a]||(H[a]=b)};l.registerSelector=function(a,b,d){D[a]||(D[a]={Expression:b,Callback:d})};F(i,true)})(this);