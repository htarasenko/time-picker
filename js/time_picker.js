(function($){
  jQuery.fn.timePicker = function(options){
    options = $.extend({
      defColor:"white", //цвет элемента над которым нет курсора
      hoverColor:"green" //цвет элемента на который наведен курсор
    }, options);
  var make = function(){
    //inserting HTML of Hours into time_picker
    var own=options.owner;
    var content="<div id=\""+own+"\" class=\"hour_holder\">";
    for (i=0; i<24; i++){                                 //creates 24 HRS
      (i<10)? zero="0":zero="";
      content+="<div name=\""+i+"\" id=\""+own+"\" class=\"hour\">"+zero+i+":00</div>"
    }
    content+="</div>";
    content+="<div id=\""+own+"\" class=\"minute_holder\">";
    for (i=0; i<12; i++){                                 //creates 12 MNS
      content+="<div name=\""+i+"\" id=\""+own+"\" class=\"minute\"></div>"
    }
    content+="</div>";
    $(this).append(content);
      //hide Hours, minutes 
      $("#"+own+".hour_holder").toggle(false);
      $("#"+own+".minute_holder").toggle(false);
      //Hours_holder's events>>
      $("#"+own+".minute_holder").mouseleave( function(){
        $(this).toggle(false);  
      });
      //Hours_holder's events<<
      //Hour's events>>>
      $("#"+own+".hour").click(function (){
        minutesChange(this);
      });
      //Hour's events<<<
      function minutesChange(hour){
        $("#"+own+".minute_holder").toggle(true)
                                    .offset($(hour).offset());
        h = $(hour).attr("name");
        if(h<10) h="0"+h;
        for(i=0; i<12; i++){
          (i<2)? m="0" : m="";
          $('[name="'+i+'"].minute').text(h+":"+m+(i*5));
        }
      }
      //Minute's events>>>
      $("#"+own+".minute").click(function(){
        $("#"+own+".minute_holder").toggle(false);
        $("#"+own+".hour_holder").toggle(false);
        $('[name="'+own+'"]').val($(this).text());    
//        console.log($(this).text());    
      });
      //Minute's events<<<
      //Time_picker's events>>>
      $(this).css("background-color",options.defColor)
        .mouseenter( function(){
          $(this).css("background-color",options.hoverColor);
          $("#"+own+".hour_holder").toggle(true);
        })
        .mouseleave( function(){
          $(this).css("background-color",options.defColor);
          $("#"+own+".hour_holder").toggle(false);
          $("#"+own+".minute_holder").toggle(false);
        })
        .click( function(){
          $(this).css("background-color", "black");
          
        });
      //Time_picker's events<<<
      };
    return this.each(make); 
    };
})(jQuery);