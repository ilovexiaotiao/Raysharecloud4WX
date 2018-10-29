// ----------------------------------------------//
//                                               //
//                唐明明☀20150724                //
//                                               //
// ----------------------------------------------//

//meishi开始


$(document).ready(function(){
    $(".Brand").click(function(){
        if ($('.Brand-eject').hasClass('grade-w-roll')) {
            $('.Brand-eject').removeClass('grade-w-roll');
        } else {
            $('.Brand-eject').addClass('grade-w-roll');
        }
    });
});

$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.Regional-eject').hasClass('grade-w-roll')) {
            $('.Regional-eject').removeClass('grade-w-roll');
        } else {
            $('.Regional-eject').addClass('grade-w-roll');
        }
    });
});

//Sort开始

$(document).ready(function(){
    $(".Sort").click(function(){
        if ($('.Sort-eject').hasClass('grade-w-roll')) {
            $('.Sort-eject').removeClass('grade-w-roll');
        } else {
            $('.Sort-eject').addClass('grade-w-roll');
        }
    });
});


//判断页面是否有弹出







$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.Brand-eject').hasClass('grade-w-roll')){
            $('.Brand-eject').removeClass('grade-w-roll');
        };
    });
});


$(document).ready(function(){
    $(".Brand").click(function(){
        if ($('.Sort-eject').hasClass('grade-w-roll')){
            $('.Sort-eject').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Sort").click(function(){
        if ($('.Brand-eject').hasClass('grade-w-roll')){
            $('.Brand-eject').removeClass('grade-w-roll');
        };
    });
});

$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.Brand-eject').hasClass('grade-w-roll')){
            $('.Brand-eject').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.Sort-eject').hasClass('grade-w-roll')){
            $('.Sort-eject').removeClass('grade-w-roll');
        };
    });
});

$(document).ready(function(){
    $(".Sort").click(function(){
        if ($('.Regional-eject').hasClass('grade-w-roll')){
            $('.Regional-eject').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Brand").click(function(){
        if ($('.Regional-eject').hasClass('grade-w-roll')){
            $('.Regional-eject').removeClass('grade-w-roll');
        };
    });
});


//js点击事件监听开始


function Sorts(sbj){
    var arr = document.getElementById("Sort-Sort").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    sbj.style.background = "#eee"
}
function Brand(sbj){
    var arr = document.getElementById("Brand-Brand").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    sbj.style.background = "#eee"
}
function Regional(sbj){
    var arr = document.getElementById("Regional-Regional").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    sbj.style.background = "#eee"
}