$.fn.WBslider = function(mess) {
    return this.each(function() {
        if (!mess) {
            mess="";
        }
        var $_this = $(this),
            $_input = $('input', $_this),
            $_title = $('.set', $_this);

        $_input.val(parseInt($_input.attr('max')/2));
        console.log($_input.val())
        var num_format = (num) => {
            return new Intl.NumberFormat('de-DE').format(num)
        };
        $('.end', $_this).text(num_format($_input.attr('max'))+" "+mess);
        $('.start', $_this).text(num_format($_input.attr('min'))+" "+mess);
        $_input.on('input change keyup', function() {
            var $_this = $(this),
                val = parseInt($_input.val(), 10);

            if (val === '') {
                val = 0;
            }

            $_title.text(num_format(val)+ " " + mess);
            var step = 1/(($_input.attr('max')-$_input.attr('min'))/$_input.attr('step'))*100;
            var pos = ((val-$_input.attr("min"))/$_input.attr("step"))*step;
            $_title.css({'left' : pos + "%"});
            var grad = 'linear-gradient(90deg, #ff660c ' + (pos) + '%,#FFF ' + (pos) + '%)';
            $_input.css({'background': grad});

        }).on('focus', function() {
            if ( isNaN( $(this).val() ) ) {
                $(this).val(0);
            }
        }).trigger('change');

        $(window).on('resize', function() {
            $_input.trigger('change');
        });
    });
};

$(function() {

    $('#time').WBslider("tháng");
    $('#money').WBslider();

});