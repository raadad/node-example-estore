/* Author: Name here

*/
(function($){

/* ------------------------------------
  On Window Load
------------------------------------ */
$(window).load(function(){
  $(this).trigger('commerce:load');
  //$('.caroufredsel_wrapper > div').trigger('updateSizes');

}).resize(function(){ 
  var that = $(this);
  setTimeout(function(){
    that.trigger('commerce:resize');
    //$('.caroufredsel_wrapper > div').trigger('updateSizes');
  }, 200);
});


/* ------------------------------------
  On Document Ready
------------------------------------ */
$(document).ready(function(){

  /* ------------------------------------
    Custom select dropdown using DropKick
  ------------------------------------ */
  // add tabindex for each select element, why? because dropkick need it
  $('select').each(function(i){
    $(this).attr('tabindex', i+1);
  });
  $('select').dropkick();


  /* ------------------------------------
    Smooth Scroll
  ------------------------------------ */
  $('.scrolltop').click(function(e){
    e.preventDefault();
    $('body, html').animate({
      'scrollTop': 0
    });
  });

  /* ------------------------------------
    Initiate pinterest-like layout on 
    homepage-iv template
  ------------------------------------ */
  function initGrid() {
    var gridItem = $('.post-grid article'),
        gridContainer = $('.post-grid'),
        options = {
          autoResize: true,
          container: gridContainer,
          offset: 30
        };

        /* Options for IE9 and lower only */
        if( $('html').hasClass('lt-ie9') ) {
          options = {
            autoResize: true,
            offset: 20,
            container: gridContainer,
            itemWidth: 220
          }
        }

    gridItem.wookmark(options);

    /* Load more item when infinite pagination clicked */
    $('.infinite-pagination').click(function(e){
      e.preventDefault();
      var item = $('.post-grid article'),
          items= item.slice(0, 16);
      console.log( gridContainer.append( items.clone() ) );

      // Clear previous handler
      if(gridItem) gridItem.wookmarkClear();

      // Create new layout handler
      gridItem = $('.post-grid article');
      gridItem.wookmark(options);
    });

    /* Fix item grid when window resized */
    $(window).bind('commerce:resize commerce:load', function(){
      var windowWidth = $(this).width();

      // For Large Monitor
      if( windowWidth >= 1200 ) {
        options = {
          autoResize: true,
          offset: 30,
          container: gridContainer,
          itemWidth: 270
        }
      } 

      // For default Desktop
      else if( windowWidth < 1200 && windowWidth > 979 ) {
        options = {
          autoResize: true,
          offset: 20,
          container: gridContainer,
          itemWidth: 220
        }
      } 

      // For Tablet portrait
      else if( windowWidth <= 979 && windowWidth >= 768 ) {
        options = {
          autoResize: true,
          offset: 20,
          container: gridContainer,
          itemWidth: 228
        }
      } 

      // For mobile Phone
      else if ( windowWidth <= 767 ) {
        options = {
          autoResize: false,
          offset: 20,
          container: gridContainer,
          itemWidth: 240
        }
      }

      // Only run this script if browser isn't IE
      if( !$('html').hasClass('lt-ie9') ) {
        gridItem.wookmark(options);
      }
    });

  }
  initGrid();


  /* ------------------------------------
    Initiate Full Window Slider
  ------------------------------------ */
  function fullWindowSlider() {
    /* Create empty element on full window slider
       trick the carousel to start 1 item to the right */
    var sliderContainer = $('#slider-container.fullwindow .slider-wrapper'),
        sliderItem      = sliderContainer.find('article');
    $('<span class="empty"></span>').prependTo( sliderContainer )
    $('<span class="empty"></span>').appendTo( sliderContainer )

    /* Add class 'current' to current slide, and add class 'next' 
       to slide adjacent to current slide */
    sliderItem.eq(0).addClass('current').next().addClass('slide-next');

    /* Add each image slide a dimension, width and height */
    sliderContainer.find('img').each(function(){
      $(this).height( $(this).attr('height') );
    });

    sliderContainer.imagesLoaded(function(){

      sliderContainer.carouFredSel({
        circular: false,
        infinite: false,
        width:    '100%',
        items:    3,
        auto:     false,
        scroll:   {
          wipe: true,
          items:  1,
          pauseOnHover: true,
          onBefore: function( oldItems, newItems, newSizes ) {
            newItems.siblings().removeClass('slide-prev current slide-next').end()
              .eq(0).addClass('slide-prev').end()
              .eq(1).addClass('current').end()
              .eq(2).addClass('slide-next');
          }
        }
      });

      // Trigger Next and prev slide
      sliderContainer.find('article img').click(function(e){
        e.preventDefault();
        var el    = $(this),
            slide = el.parent('article');

        // If parent has class next
        if( slide.hasClass('slide-next') ) {
          sliderContainer.trigger('next');
        }
        // If parent has class prev
        else if( slide.hasClass('slide-prev') ) {
          sliderContainer.trigger('prev');
        }
      });

    });

  }
  if ($("#slider-container.fullwindow .slider-wrapper").length > 0){
    // check if element exist so it won't causing error scripting on page
    fullWindowSlider();
  }
  

  /* ------------------------------------
    Initiate 3D Slider
  ------------------------------------ */
  if( $('#slider-container.threedee').length > 0) {
    var container = $('#slider-container.threedee');

    container.threeDeeGallery()
    .touchwipe({
      wipeLeft: function(){
        container.find('.nav-next').trigger('click');
      },
      wipeRight: function(){
        container.find('.nav-prev').trigger('click');
      }
    });
  }


  /* ------------------------------------
    Initiate Product Slider
  ------------------------------------ */
  function productSlider() {
    $('.product-slider').each(function(i){

      // Create navigation for each product slider
      $('<nav></nav>').insertAfter( $(this) ).html(
        '<span class="prev" id="prev'+ i +'">Previous</span>\
         <span class="next" id="next'+ i +'">Next</span>'
      );

      // Initiate carousel
      $(this).imagesLoaded(function(){
        $(this).carouFredSel({
          circular:   false,
          infinite:   false,
          auto:       false,
          responsive: true,
          prev:       '#prev'+i,
          next:       '#next'+i,
          height:     232,
          padding:    [0, 22, 0, 22],
          items: {
            width:    194,
            minimum:  6,
            visible: {
              min:    1,
              max:    6
            }
          },
          scroll: {
            wipe:     true
          }
        });
      });

    });

    $('.product-tab .widget_tabs').bind('tabsselect', function(event, ui){
      $('.product-slider').trigger('updateSizes');
      console.log('a');
    });

  }
  if( $('.product-slider').length > 0) {
    productSlider();
  }


  /* ------------------------------------
    Initiate Related Slider
  ------------------------------------ */
  function relatedSlider() {
    $('.related-slider').each(function(i){

      // Create navigation for each product slider
      $('<nav></nav>').insertAfter( $(this) ).html(
        '<span class="prev" id="prev'+ i +'">Previous</span>\
         <span class="next" id="next'+ i +'">Next</span>'
      );

      // Initiate carousel
      $(this).imagesLoaded(function(){
        $(this).carouFredSel({
          circular:   false,
          infinite:   false,
          auto:       false,
          responsive: true,
          prev:       '#prev'+i,
          next:       '#next'+i,
          padding:    [0, 22, 0, 22],
          height:     100,
          items: {
            width:    600,
            minimum:  2,
            visible: {
              min:    1,
              max:    2
            }
          },
          scroll: {
            wipe:     true
          }
        });
      });

    });

    $('#related-articles').bind('tabsselect', function(event, ui){
      $('.related-slider').trigger('updateSizes');
    });

  }
  if( $('.related-slider').length > 0 ) {
    relatedSlider();
  }


  /* ------------------------------------
    Initiate Slider on post format image
  ------------------------------------ */
  function slideFormatGallery() {
    $('.format-gallery').each(function(i){

      var that = $(this);

      // Create navigation for each post format image slider
      $('<nav></nav>').insertAfter( $(this).find('.entry-thumb') ).html(
        '<span class="prev" id="prev'+ i +'"></span>\
         <span class="next" id="next'+ i +'"></span>'
      );

      // Make sure image is loaded first
      that.find('.entry-thumb').imagesLoaded(function(){
        // Initiate carousel
        that.find('.entry-thumb').carouFredSel({
          circular:   false,
          infinite:   false,
          auto:       false,
          responsive: true,
          prev:       '#prev'+i,
          next:       '#next'+i,
          scroll: {
            wipe:     true
          },
          visible:    1
        });
      });

    });
  }
  if( $('.format-gallery').length > 0 ) {
    slideFormatGallery();
  }

  /* ------------------------------------
    Initiate Slider on Product Detail
  ------------------------------------ */
  function imagesGallery() {

    var productImages = $('.product-images .post-header .entry-images'),
        productThumb  = $('.product-images .thumbnails'),
        imagesLength  = productImages.find('img').length;

    // Count images
    $('.counter .total').text( imagesLength );

    // Give data-number to each of product thumb
    productThumb.find('a').each(function(i){
      $(this).data('slide', i);
    });

    // Thumb
    productThumb.imagesLoaded(function(){
      productThumb.carouFredSel({
        auto:       false,
        infinite:   false,
        circular:   false,
        responsive: true,
        items: {
          width:    60,
          height:   80,
          minimum:  2,
          visible: {
            min:    2,
            max:    4
          }
        },
        next:       '.product-images .next',
        prev:       '.product-images .prev'
      });
    });

    // Big Images
    productImages.imagesLoaded(function(){
      productImages.carouFredSel({
        circular:   false,
        infinite:   false,
        auto:       false,
        responsive: true,
        items: {
          visible:  1,
          width:    370
        },
        scroll: {
          fx:       'directscroll',
          onBefore: function(oldItems, newItems) {
            productImages.trigger('currentPosition', function(i){
              $('.counter .current').text( i + 1 );
            });
          }
        }
      });
    });

    productThumb.find('a').click(function(e){
      e.preventDefault();
      productImages.trigger('slideTo', $(this).data('slide'));
      productThumb.find('a').removeClass('selected');
      $(this).addClass('selected');
    });

    productThumb.find('a').eq(0).addClass('selected');

  }
  if( $('body').hasClass('single-product') ) {
    imagesGallery();
  }


  /* ------------------------------------
    Shipping calculator slide
  ------------------------------------ */
  $('.shipping-calculator-form').hide();
  $('.shipping-calculator-button').click(function(e){
    e.preventDefault();
    $('.shipping-calculator-form').slideToggle();
  });


  /* ------------------------------------
    Widget Tabs
  ------------------------------------ */
  function widgetTabs() {
    $('.widget_tabs, #related-articles').tabs({
      fx: { opacity: 'toggle', duration: 200 },
      show: function(event, ui) {
        $(this).css('height', 'auto');
      }
    });

    // prevent default for event on each tabs link
    if ($().tabs) {
      $('.ui-tabs-nav a').click( function (e) {
        e.preventDefault();
        $('.related-slider').trigger('updateSizes');
      });
    }
  }
  widgetTabs();


  /* ------------------------------------
    Initiate Widget Price Filter
  ------------------------------------ */
  function widgetPriceFilter() {
    
    $('input#min_price, input#max_price').hide();
    $('.price_slider, .price_label').show();
    var minPrice  = $('.price_slider_amount #min_price').attr('data-min'),
        maxPrice  = $('.price_slider_amount #max_price').attr('data-max');
        current_min_price = parseInt(minPrice);
        current_max_price = parseInt(maxPrice);

    $('body').bind('price_slider_create price_slider_slide', function(event, min, max) {
      $('.price_label .from').text( '$'+min );
      $('.price_label .to').text('$'+max);
    });

    $('.price_slider').slider({
      range:    true,
      animate:  true,
      min:      minPrice,
      max:      maxPrice,
      values:   [ current_min_price, current_max_price ],
      create: function(event, ui) {
        $(".price_slider_amount #min_price").val(current_min_price);
        $(".price_slider_amount #max_price").val(current_max_price);
        $("body").trigger("price_slider_create", [current_min_price, current_max_price]);
      },
      slide: function(event, ui) {
        $("input#min_price").val(ui.values[0]);
        $("input#max_price").val(ui.values[1]);
        $("body").trigger("price_slider_slide", [ui.values[0], ui.values[1]]);
      },
      change: function(event, ui) {
        $("body").trigger("price_slider_change", [ui.values[0], ui.values[1]]);
      }
    });

  }
  widgetPriceFilter();


  /* ------------------------------------
    Initiate jplayer
  ------------------------------------ */
  function initJPlayer() {
    $('.audio-player-container').each(function(i){

      var idPrefix        = 'jquery_jplayer_'+i,
          playerWrapperID = 'jp_container_'+i,
          playerTitle     = $(this).data('title'),
          playerSource    = $(this).data('source');

      var htmlContent     = '\
        <div id="'+ idPrefix +'" class="jp-jplayer"></div>\
        <div id="'+ playerWrapperID +'" class="jp-audio">\
          <div class="jp-type-single">\
            \
            <div class="jp-gui jp-interface">\
              <ul class="jp-controls">\
                <li><a class="jp-play" href="javascript:;" tabindex="1">play</a></li>\
                <li> <a class="jp-pause" href="javascript:;" tabindex="1" style="display: none; ">pause</a> </li>\
                <li> <a class="jp-stop" href="javascript:;" tabindex="1">stop</a> </li>\
                <li> <a class="jp-mute" href="javascript:;" tabindex="1" title="mute">mute</a> </li>\
                <li> <a class="jp-unmute" href="javascript:;" tabindex="1" title="unmute" style="display: none; ">unmute</a> </li>\
                <li> <a class="jp-volume-max" href="javascript:;" tabindex="1" title="max volume">max volume</a> </li>\
              </ul>\
              \
              <div class="jp-progress">\
                <div class="jp-seek-bar">\
                  <div class="jp-play-bar"></div>\
                </div>\
              </div>\
              \
              <div class="jp-volume-bar"><div class="jp-volume-bar-value"></div></div>\
              \
              <div class="jp-current-time"></div>\
              <div class="jp-duration"></div>\
              \
              <ul class="jp-toggles">\
                <li> <a class="jp-repeat" href="javascript:;" tabindex="1" title="repeat">repeat</a> </li>\
                <li> <a class="jp-repeat-off" href="javascript:;" tabindex="1" title="repeat off">repeat off</a> </li>\
              </ul>\
            </div><!-- .jp-interface -->\
            \
            <div class="jp-title">\
              <ul> <li>'+ playerTitle +'</li> </ul>\
            </div>\
            \
            <div class="jp-no-solution">\
              <span>Update Required</span>\
              To play the media you will need to either update your browser to a recent version or update your\
              <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>\
            </div>\
            \
          </div><!-- .jp-type-single -->\
        </div>\
      ';
      $(htmlContent).appendTo( $(this) );

      
      // JPlayer initialization
      $('#' + idPrefix ).jPlayer({
        ready: function (event) {
          $(this).jPlayer("setMedia", {
            mp3: playerSource
          });
        },
        cssSelectorAncestor: '#' + playerWrapperID,
        swfPath: "js",
        supplied: "mp3",
        wmode: "window"
      });

    });
  }
  initJPlayer();


  /* ------------------------------------
    Initiate flickr request via JSON
  ------------------------------------ */
  function pull_flickr_image_request() {
    // Our very special jQuery JSON fucntion call to Flickr, gets details of the most recent 20 images
    // if you need to display group pool? http://api.flickr.com/services/feeds/groups_pool.gne
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=" + flickrid + "&lang=en-us&format=json&jsoncallback=?", displayImages);

    function displayImages(data) {
      // Randomly choose where to start. A random number between 0 and the number of photos we grabbed (20) minus 9 (we are displaying 9 photos).
      var iStart = Math.floor(Math.random()*(6));
      // Reset our counter to 0
      var iCount = 0;

      // Start putting together the HTML string
      var htmlString = "<ul>";

      // Now start cycling through our array of Flickr photo details
      $.each(data.items, function(i,item){

        // Let's display 9 photos (a 3x3 grid), starting from a random point in the feed
        if (iCount > iStart && iCount < (iStart + 7)) {

          // I only want the ickle square thumbnails
          var sourceSquare = (item.media.m).replace("_m.jpg", "_s.jpg");

          // Here's where we piece together the HTML
          htmlString += '<li><a href="' + item.link + '" target="_blank">';
          htmlString += '<img src="' + sourceSquare + '" alt="' + item.title + '" title="' + item.title + '"/>';
          htmlString += '</a></li>';
        }
        // Increase our counter by 1
        iCount++;
      });
    // Pop our HTML in the #images DIV
    $('.widget_flickr_list .widget-inner-container').html(htmlString + "</ul>");

    // Close down the JSON function call
    }
  }
  // then fire the function above to execute
  pull_flickr_image_request();
  
  
  
  // jtweetsanywhere for widget twitter
  $('.widget_tweets .widget-inner-container').jTweetsAnywhere({
    username: 'nukman',
    //searchParams: ['q='+tweet],
    count: 2,
    showTweetFeed: {
      autoConformToTwitterStyleguide: true,
      expandHovercards: true,
      showSource: true,
      showProfileImages: true,
      showTimestamp: {
        refreshInterval: 15
      },
      autorefresh: {
        mode: 'trigger-insert',
        interval: 30
      },
      paging: { mode: 'none' }
    },
    onDataRequestHandler: function(stats, options) {
      if (stats.dataRequestCount < 11) {
        return true;
      } else {
        stopAutorefresh(options);
        // alert("To avoid struggling with Twitter's rate limit, we stop loading data after 10 API calls.");
      }
    }
  });

});
})(jQuery);


