(function($){
  jQuery.fn.timePicker = function(options){
    options = $.extend({
      defColor:"white", //element default bg color
      hoverColor:"green" //element hover bg color
    }, options);
  var make = function(){
    //inserting HTML of Hours into time_picker
    var $this=$(this);
    var i;
    var own=options.owner;
    var html = "";
    var $HoursHolder=$('<div class="hour_holder"></div>');
    for( i = 0; i < 24; i++){                                 //creates 24 HRS
      (i<10)? zero="0":zero="";
      html+='<div class="hour" data-tp-hour="'+i+'">'+zero+i+':00</div>'
    }
    $HoursHolder.html(html);
    // content+="</div>";
    html="";
    var $MinutesHolder = $('<div class="minute_holder">');
    for (i=0; i<12; i++){                                 //creates 12 MNS
      html+='<div class="minute"></div>';
    }
    $MinutesHolder.html(html);
    $this.append($HoursHolder)
           .append($MinutesHolder);
      //hide Hours, minutes 
      $HoursHolder.toggle(false);
      $MinutesHolder.toggle(false);
      //Hours_holder's events>>
      $MinutesHolder.mouseleave( function(){
        this.toggle(false);  
      });
      //Hours_holder's events<<
      //Hour's events>>>
      $HoursHolder.click(function (e){
        minutesChange(e);
      });
      //Hour's events<<<
      function minutesChange(e){
        $MinutesHolder.toggle(true)
                      .offset($(e.target).offset());
        h = $(e.target).data("tp-hour");
        if(h<10) h="0"+h;
        // for(i=0; i<12; i++){
        $MinutesHolder.children().each(function(ind, obj){
          (ind<2)? m="0" : m="";
          $(obj).text(h+":"+m+(ind*5));    
        });
        // }
      }
      //Minute's events>>>
      $MinutesHolder.click(function(e){
        $MinutesHolder.toggle(false);
        $HoursHolder.toggle(false);
        own.val($(e.target).text());    
      });
      //Minute's events<<<
      //Time_picker's events>>>
      $this
        .css("background-color",options.defColor)
        .mouseenter( function(){
          $this.css("background-color",options.hoverColor);
          $HoursHolder.toggle(true);
        })
        .mouseleave( function(){
          $this.css("background-color",options.defColor);
          $MinutesHolder.toggle(false);
          $HoursHolder.toggle(false);
        })
        .click( function(){
          $(this).css("background-color", "black");
          
        });
      };
    return this.each(make); 
    };
})(jQuery);