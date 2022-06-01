$(document).ready(function() {
    $('.main_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:true,
        nav:true,
        dots:true,
        autoplay:false,
        autoplayTimeout:2000,
        animateOut: 'fadeOut',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    $('.categories_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:true,
        nav:false,
        dots:false,
        autoplay:true,
        margin:20,
        autoplayTimeout:5000,
        responsive:{
            0:{
                items:3
            },
            600:{
                items:4
            },
            1000:{
                items:6
            }
        }
    });

    $('.doctors_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:false,
        nav:true,
        dots:true,
        margin:20,
        autoplay:true,
        autoHeight: false,
        autoplayTimeout:2000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });
    $('.pharmacies_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:false,
        nav:true,
        dots:true,
        margin:20,
        autoplay:true,
        autoplayTimeout:2000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });
    $('.botiques_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:false,
        nav:true,
        dots:true,
        margin:20,
        autoplay:true,
        autoplayTimeout:2000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });
    /*******owl*************/
    document.addEventListener("DOMContentLoaded", function () {
        /////// Prevent closing from click inside dropdown
        document.querySelectorAll('.custom-menu .dropdown-menu').forEach(function (element) {
            element.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        });
        // make it as accordion for smaller screens
        if (window.innerWidth < 992) {
            // close all inner dropdowns when parent is closed
            document.querySelectorAll('.navbar .custom-menu .dropdown').forEach(function (everydropdown) {
                everydropdown.addEventListener('hidden.bs.dropdown', function () {
                    // after dropdown is hidden, then find all submenus
                    this.querySelectorAll('.custom-menu .megasubmenu').forEach(function (everysubmenu) {
                        // hide every submenu as well
                        everysubmenu.style.display = 'none';
                    });
                })
            });

            document.querySelectorAll('.custom-menu .has-megasubmenu a').forEach(function (element) {
                element.addEventListener('click', function (e) {
                    let nextEl = this.nextElementSibling;
                    if (nextEl && nextEl.classList.contains('megasubmenu')) {
                        // prevent opening link if link needs to open dropdown
                        e.preventDefault();
                        if (nextEl.style.display == 'block') {
                            nextEl.style.display = 'none';
                        } else {
                            nextEl.style.display = 'block';
                        }
                    }
                });
            })
        }
        // end if innerWidth
    });
});

$(".shopping-cart").click(function(e){
    e.stopPropagation();
});
document.addEventListener('DOMContentLoaded', function() {
    var inputs = document.getElementsByClassName('input-number-wrapper')

    /* function incInputNumber(input, step) {
         var val = +input.value
         if (isNaN(val)) val = 1
         val += step
         input.value = val > 1 ? val: 1
         // If you need to change the input value in the DOM :
         // var newValue = val > 0 ? val : 0;
         // input.setAttribute("value", newValue);
     }*/

    /* Array.prototype.forEach.call(inputs, function(el) {
         var input = el.getElementsByTagName('input')[0]

         el.getElementsByClassName('increase')[0].addEventListener('click', function() { incInputNumber(input, 1) })
         el.getElementsByClassName('decrease')[0].addEventListener('click', function() { incInputNumber(input, -1) })
     })*/
});

var btn = $("#button");
$(window).scroll(function () {
    $(window).scrollTop() > 300 ? btn.addClass("show") : btn.removeClass("show")
}), btn.on("click", function (e) {
    e.preventDefault(), $("html, body").animate({scrollTop: 0}, "300")
});


$(".image-box").click(function (e) {
    var t = $(this).children("img");
    $(this).siblings().children("input").trigger("click"), $(this).siblings().children("input").change(function () {
        var e = new FileReader;
        e.onload = function (e) {
            var n = e.target.result;
            $(t).attr("src", n), t.parent().css("background", "transparent"), t.show(), t.siblings("p").hide()
        }, e.readAsDataURL(this.files[0])
    })
}), document.addEventListener("DOMContentLoaded", init, !1);
var AttachmentArray = [], arrCounter = 0, filesCounterAlertStatus = !1, ul = document.createElement("ul");

function init() {
    // document.querySelector("#images").addEventListener("change", handleFileSelect, !1)
}

function handleFileSelect(e) {
    if (e.target.files) {
        for (var t, n = e.target.files, a = 0; t = n[a]; a++) {
            var i = new FileReader;
            i.onload = function (e) {
                return function (t) {
                    ApplyFileValidationRules(e), RenderThumbnail(t, e), FillAttachmentArray(t, e)
                }
            }(t), i.readAsDataURL(t)
        }
        document.getElementById("images").addEventListener("change", handleFileSelect, !1)
    }
}

function ApplyFileValidationRules(t) {
    return 0 == CheckFileType(t.type) ? (alert("Ø§Ù„Ù…Ù„Ù (" + t.name + ") ÙŠØ¬Ø¨ Ø§Ù† ÙŠÙƒÙˆÙ† Ù†ÙˆØ¹ Ø§Ù„Ù…Ù„ÙØ§Øª jpg/png/gif"), void e.preventDefault()) : 0 == CheckFileSize(t.size) ? (alert("Ø§Ù„Ù…Ù„Ù (" + t.name + ") Ø§Ù„Ø­Ø¬Ù… Ø§Ù„Ø§Ù‚ØµÙ‰ Ù„Ù„ØµÙˆØ±Ø© Ù‡Ùˆ 30 Ù…ÙŠØ¬Ø§"), void e.preventDefault()) : 0 == CheckFilesCount(AttachmentArray) ? (filesCounterAlertStatus || (filesCounterAlertStatus = !0, alert("Ø§ÙƒØ¨Ø± Ø¹Ø¯Ø¯ Ø§Ù„ØµÙˆØ± Ù‡Ùˆ 10 ØµÙˆØ±")), void e.preventDefault()) : void 0
}

function CheckFileType(e) {
    return "image/jpeg" == e || "image/png" == e || "image/gif" == e
}

function CheckFileSize(e) {
    return e < 1e6
}

function CheckFilesCount(e) {
    for (var t = 0, n = 0; n < e.length; n++) void 0 !== e[n] && t++;
    return !(t > 9)
}

function RenderThumbnail(e, t) {
    var n = document.createElement("li");
    ul.appendChild(n), n.innerHTML = ['<div class="img-wrap"> <span class="close">&times;</span><img class="thumb" src="', e.target.result, '" title="', escape(t.name), '" data-id="', t.name, '"/></div>'].join("");
    var a = document.createElement("div");
    a.className = "FileNameCaptionStyle", n.appendChild(a), a.innerHTML = [t.name].join(""), document.getElementById("Filelist").insertBefore(ul, null)
}

function FillAttachmentArray(e, t) {
    AttachmentArray[arrCounter] = {
        AttachmentType: 1,
        ObjectType: 1,
        FileName: t.name,
        FileDescription: "Attachment",
        NoteText: "",
        MimeType: t.type,
        Content: e.target.result.split("base64,")[1],
        FileSizeInBytes: t.size
    }, arrCounter += 1
}

ul.className = "thumb-Images", ul.id = "imgList", jQuery(function (e) {
    e("div").on("click", ".img-wrap .close", function () {
        var t = e(this).closest(".img-wrap").find("img").data("id"), n = AttachmentArray.map(function (e) {
            return e.FileName
        }).indexOf(t);
        -1 !== n && AttachmentArray.splice(n, 1), e(this).parent().find("img").not().remove(), e(this).parent().find("div").not().remove(), e(this).parent().parent().find("div").not().remove();
        for (var a = document.querySelectorAll("#imgList li"), i = 0; li = a[i]; i++) "" == li.innerHTML && li.parentNode.removeChild(li)
    })
});
$(document).ready(function () {
    $(".js-example-basic-single").select2({dir: "ltr"})
});

$('.User-avtar').click(function(){
    if ($(".User-Dropdown").hasClass("U-open")) {
        $('.User-Dropdown').removeClass("U-open");
    }
    else {
        $('.User-Dropdown').addClass("U-open");
    }
});
$(document).ready(function () {
    $(".main_slider .owl-nav").css({
        'width': (150 + $(".main_slider .owl-dots").width() + 'px')
    });
});
$(document).ready(function () {
    $(".doctors_slider .owl-nav").css({
        'width': (150 + $(".doctors_slider .owl-dots").width() + 'px')
    });
});
$(document).ready(function () {
    $(".pharmacies_slider .owl-nav").css({
        'width': (150 + $(".pharmacies_slider .owl-dots").width() + 'px')
    });
});
$(document).ready(function () {
    $(".botiques_slider .owl-nav").css({
        'width': (150 + $(".botiques_slider .owl-dots").width() + 'px')
    });
});

$(document).ready(function () {
    var h = $('.header').height();
    $('.main_slider').css({height: 'calc(70vh - ' + h + 'px)'});
});
$('.add_fav').click(function () {
    $(this).hide();
    $(this).parent().find('.remove_fav').show();
});
$('.remove_fav').click(function () {
    $(this).hide();
    $(this).parent().find('.add_fav').show();
});

$("#flexSwitchCheckChecked").change(function () {
    if ($(this).prop('checked')) {
        $('.coupon_label span').slideToggle(1);
    } else {
        $('.coupon_label span').slideToggle(1);
    }
});
$(".show-more").click(function () {
    let lang=$('html').attr('lang')
    let more=lang=='ar'?'(Ù…Ø´Ø§Ù‡Ø¯Ø© Ø§Ù„Ù…Ø²ÙŠØ¯)':"(Show More)"
    let less=lang=='ar'?'(Ù…Ø´Ø§Ù‡Ø¯Ø© Ø£Ù‚Ù„)':"(Show Less)"
    if ($(".text").hasClass("show-more-height")) {
        $(this).text(less);
    } else {
        $(this).text(more);
    }
    $(".text").toggleClass("show-more-height");
});

$('.category-tabs li a').click(function(){
    $(this).next('ul').slideToggle('500');
    $(this).find('i').toggleClass('fa-plus fa-minus')
});

/* Set values + misc */
var promoCode;
var promoPrice;
var fadeTime = 300;

/* Assign actions */
$('.quantity input').change(function() {
    // updateQuantity(this);
});

$('.remove button').click(function() {
    // removeItem(this);
});

$(document).ready(function() {
    // updateSumItems();
});

/*
$('.promo-code-cta').click(function() {

    promoCode = $('#promo-code').val();

    if (promoCode == '10off' || promoCode == '10OFF') {
        //If promoPrice has no value, set it as 10 for the 10OFF promocode
        if (!promoPrice) {
            promoPrice = 10;
        } else if (promoCode) {
            promoPrice = promoPrice * 1;
        }
    } else if (promoCode != '') {
        alert("Invalid Promo Code");
        promoPrice = 0;
    }
    //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
    if (promoPrice) {
        $('.summary-promo').removeClass('hide');
        $('.promo-value').text(promoPrice.toFixed(2));
        recalculateCart(true);
    }
});
*/

/* Recalculate cart */
/*
function recalculateCart(onlyTotal) {
    var subtotal = 0;
    var total = 0;

    /!* Sum up row totals *!/
    $('.basket-product').each(function() {
        basket_total = parseFloat($(this).children('.subtotal').text());
        if(basket_total > 0){
            subtotal += basket_total;
        }
    });
    $('.product_gift').each(function() {
        gift_total = parseFloat($(this).children('.subtotal').text());
        if(gift_total > 0){
            subtotal += gift_total;
        }
    });

    shipping = parseFloat($('.shipping-value').text());
    vat = parseFloat($('.vat-value').text());

    if (vat > 0) {
        total = total + vat;
    }
    if(shipping > 0){
        total = total + shipping;
    }

    /!* Calculate totals *!/
    total = total + subtotal;

    //If there is a valid promoCode, and subtotal < 10 subtract from total
    var promoPrice = parseFloat($('.promo-value').text());
    if (promoPrice) {
        if (subtotal >= 10) {
            total -= promoPrice;
        } else {
            alert('Order must be more than 10 SAR for Promo code to apply.');
            $('.summary-promo').addClass('hide');
        }
    }

    /!*If switch for update only total, update only total display*!/
    if (onlyTotal) {
        /!* Update total display *!/
        $('.total-value').fadeOut(fadeTime, function() {
            $('#basket-total').html(total.toFixed(2));
            $('.total-value').fadeIn(fadeTime);
        });
    } else {
        /!* Update summary display. *!/
        $('.final-value').fadeOut(fadeTime, function() {
            $('#basket-subtotal').html(subtotal.toFixed(2));
            $('#basket-total').html(total.toFixed(2));
            if (total == 0) {
                $('.checkout-cta').fadeOut(fadeTime);
            } else {
                $('.checkout-cta').fadeIn(fadeTime);
            }
            $('.final-value').fadeIn(fadeTime);
        });
    }
}
*/

/* Update quantity */
// function updateQuantity(quantityInput) {
//     /* Calculate line price */
//     var productRow = $(quantityInput).parent().parent();
//     var price = parseFloat(productRow.children('.price').text());
//     var quantity = $(quantityInput).val();
//     var linePrice = price * quantity;
//
//     /* Update line price display and recalc cart totals */
//     productRow.children('.subtotal').each(function() {
//         $(this).fadeOut(fadeTime, function() {
//             $(this).text(linePrice.toFixed(2));
//             recalculateCart();
//             $(this).fadeIn(fadeTime);
//         });
//     });
//
//     productRow.find('.item-quantity').text(quantity);
//     updateSumItems();
// }
//
// function updateSumItems() {
//     var sumItems = 0;
//     $('.quantity input').each(function() {
//         sumItems += parseInt($(this).val());
//     });
//     $('.total-items').text(sumItems);
// }
//
// /* Remove item from cart */
// function removeItem(removeButton) {
//     /* Remove row from DOM and recalc cart total */
//     var productRow = $(removeButton).parent().parent();
//     productRow.slideUp(fadeTime, function() {
//         productRow.remove();
//         recalculateCart();
//         updateSumItems();
//     });
// }

$(function () {
    "use strict";
    var e = $("body");
    e.on("keyup", ".verify-input", function (t) {
        var n = t.which, a = $(t.target).next("input");
        return 9 != n && (n < 48 || n > 57) ? (t.preventDefault(), !1) : 9 === n || (a && a.length || (a = e.find("input.verify-input").eq(0)), void a.select().focus())
    }), e.on("keydown", ".verify-input", function (e) {
        var t = e.which;
        return 9 === t || t >= 48 && t <= 57 || (e.preventDefault(), !1)
    }), e.on("click", ".verify-input", function (e) {
        $(e.target).select()
    })
});
/*
if ($('input.onoffswitch-checkbox').is(':checked')) {
    $('.products').hide();
    $('.offers').show();
}else{
    $('.products').show();
    $('.offers').hide();
}
$(function()
{
    $('input.onoffswitch-checkbox').change(function()
    {
        if ($('input.onoffswitch-checkbox').is(':checked')) {
            $('.products').hide();
            $('.offers').fadeIn();
        }else{
            $('.products').fadeIn();
            $('.offers').hide();
        }
    });
});*/

$(document).ready(function(){
    // var shipping_subtotal = 0 ;
    // var subtotal = 0;
    // var total = 0;
    //
    // $('.shipping_value').each(function() {
    //     shipping_total = parseFloat($(this).text());
    //     if(shipping_total > 0){
    //         shipping_subtotal += shipping_total;
    //     }
    // });
    // $('#basket-shipping').text(shipping_subtotal);
    //
    // $('.basket-product').each(function() {
    //     basket_total = parseFloat($(this).children('.subtotal').text());
    //     if(basket_total > 0){
    //         subtotal += basket_total;
    //     }
    // });
    // $('.product_gift').each(function() {
    //     gift_total = parseFloat($(this).children('.subtotal').text());
    //     if(gift_total > 0){
    //         subtotal += gift_total;
    //     }
    // });
    //
    // shipping = parseFloat($('.shipping-value').text());
    // vat = parseFloat($('.vat-value').text());
    //
    // if (vat > 0) {
    //     total = total + vat;
    // }
    // if(shipping > 0){
    //     total = total + shipping;
    // }

    // /* Calculate totals */
    // total = total + subtotal;
    // $('#basket-total').text(total);
    // $('#basket-subtotal').text(subtotal);
});
$('.default').click(function () {
    $('.default').not($(this)).removeClass('active');
    $(this).toggleClass('active').next().find('.sub-table-wrap').slideToggle();
    $(".toggle-row").not($(this).next()).find('.sub-table-wrap').slideUp('fast');
});