$(function(){
  var pageHeight = $('#canvas').height();
  var windowHeight = window.innerHeight;
  var width = $('#canvas').width();
  var r = 0;
  var g = 0;
  var b = 0;


  $('#canvas').mousemove(function(e){
    if (!$(this).hasClass('saved')) {
      getColor(e);  
    }
  });

  $('#canvas').on('click', function(){
    $(this).toggleClass('saved');
  });

  $(window).resize(function(){
    pageHeight = $('#canvas').height();
    windowHeight = window.innerHeight;
    width = $('#canvas').width();
  });

  

  var getColor = function(e){
    r = parseInt(e.pageX / width * 255);
    g = parseInt(255 - ( e.pageY - $(window).scrollTop() ) / windowHeight * 255);
    b = parseInt($(window).scrollTop() / (pageHeight - windowHeight) * 255);
    hexVal = decToHex(r, g, b);
    hsb = rgbToHsb(r, g, b);

    $('#canvas').css({'background-color': hexVal});
    $('.color-values .hex span').html('#' + hexVal);
    $('.color-values .rgb span').html('R:' + r + ' G:' + g + ' B:' + b);
    $('.color-values .hsb span').html('H:' + hsb['h'] + "&deg; S:" + hsb['s'] + '% B:' + hsb['b'] + '%');
  }

  var decToHex = function(r,g,b) {
    return getHexByte(r) + getHexByte(g) + getHexByte(b);
  }

  var getHexByte = function(val) {
    return getHexDigit(Math.floor(val/16)) + getHexDigit(Math.floor(val%16));
  }

  var getHexDigit = function(val) {
    if (val < 10) {
      return val.toString();
    } else {
      switch(val) {
        case 10:
          return 'A';
        case 11:
          return 'B';  
        case 12:
          return 'C';
        case 13:
          return 'D';
        case 14:
          return 'E';
        case 15:
          return 'F';
      }
    }
  }

  var rgbToHsb = function(red, green, blue) {

    var red = ( red / 255 );
    var green = ( green / 255 );
    var blue = ( blue / 255 );

    var min = Math.min( red, green, blue );
    var max = Math.max( red, green, blue );
    var delta = max - min;

    var b = max;

    if ( delta == 0 ) {
       h = 0;
       s = 0;
    } else {
       s = delta / max;

       deltaR = ( ( ( max - red ) / 6 ) + ( delta / 2 ) ) / delta;
       deltaG = ( ( ( max - green ) / 6 ) + ( delta / 2 ) ) / delta;
       deltaB = ( ( ( max - blue ) / 6 ) + ( delta / 2 ) ) / delta;

      if ( red == max ) {
        h = deltaB - deltaG;
      } else if ( g == max ) {
        h = ( 1 / 3 ) + deltaR - deltaB;
      } else if ( b == max ) {
        h = ( 2 / 3 ) + deltaG - deltaR;
      }
      
      if ( h < 0 ) {
        h += 1;
      }
      if ( h > 1 ) {
        h -= 1;
      }
    }

    h = Math.round(h * 360);
    s = parseInt(s * 100);
    b = parseInt(b * 100);
    return {h: h, s: s, b: b};

  }
});