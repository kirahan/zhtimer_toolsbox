/**
 * Created by kira on 2015/9/17.
 */





$(function(){
    $('#creat_scramble_button').click(function(){
        var scramble_amount = $('.scramble_amount')
        if (scramble_amount.val() > 50)
            scramble_amount.addClass('amount_error')
        else
        {
            var puzzle_type = $('.active').attr('data-puzzle')
            var scramble_num = $('.scramble_amount').val()
            var create_scramble_api = 'http://www.zhtimer.cn:2014/scramble/.json?=' + puzzle_type + '*'+ scramble_num

            $('.scramble_result_panel').children().remove()

            $.get(create_scramble_api,function(data){
                    var scramble_data = data[0].scrambles
                    if($('.show_scramble_image').val()==1)
                    {
                        for (index=1; index<=scramble_data.length; index++)
                        {

                            var text =index.toString() + '. '+ scramble_data[index-1]
                            var scramble_image_api = 'http://www.zhtimer.cn:2014/view/' + puzzle_type + '.svg?scramble='+ encodeURIComponent(scramble_data[index-1])
                            var size
                            if(!isNaN($('.scramble_font_size').val()))
                                size = parseInt($('.scramble_font_size').val())
                            else
                            {
                                if (scramble_data[0].length <= 220)
                                    size = 40
                                else if (scramble_data[0].length <= 300)
                                    size = 30
                                else
                                    size = 25
                            }
                            var list = $('<ui></ui>')
                            list.css('font-size',size)
                            list.text(text)
                            $('.scramble_result_panel').append(list)

                            var scramble_image = $('<img width="640px" height="480px"><br>')
                            scramble_image.attr('src',scramble_image_api)
                            $('.scramble_result_panel').append(scramble_image)
                        }
                    }
                    else
                    {
                        for (index=1; index<=scramble_data.length; index++)
                        {
                            var text =index.toString() + '. '+ scramble_data[index-1]

                            var size
                            if(!isNaN($('.scramble_font_size').val()))
                                size = parseInt($('.scramble_font_size').val())
                            else {
                                if (scramble_data[0].length <= 220)
                                    size = 40
                                else if (scramble_data[0].length <= 300)
                                    size = 30
                                else
                                    size = 25
                            }
                            var list = $('<ui></ui><br>')
                            list.css('font-size',size)
                            list.text(text)
                            $('.scramble_result_panel').append(list)
                        }
                    }


            });
        }
    });

    $('.scramble_amount').mouseenter(function () {
        $('.scramble_amount').removeClass('amount_error')
    });

    $('.scramble_button_item').click(function(){
        $('.scramble_button_item').removeClass('active');
        $(this).addClass('active')
        $('#scramble_puzzle_name').text($('.active').attr('data-item'))
    });

    $('.show_scramble_image').click(function(){
        if($(this).attr('checked'))
        {
            $(this).val(0)
            $(this).removeAttr('checked')
        }
        else {
            $(this).val(1)
            $(this).attr('checked', 'true')
        }
    });

    $('.scramble_font_size').blur(function(){
        if($(this).val()=='')
        $(this).val("Default")
    })
})

