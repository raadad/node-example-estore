
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