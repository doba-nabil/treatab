//I added event handler for the file upload control to access the files properties.
document.addEventListener("DOMContentLoaded", init, false);

//To save an array of attachments
var AttachmentArray = [];

//counter for attachment array
var arrCounter = 0;

//to make sure the error message for number of files will be shown only one time.
var filesCounterAlertStatus = false;

//un ordered list to keep attachments thumbnails
var ul = document.createElement("ul");
ul.className = "thumb-Images";
ul.id = "imgList";

function init() {
    //add javascript handlers for the file upload event
    document
        .querySelector("#files")
        .addEventListener("change", handleFileSelect, false);
}

//the handler for file upload event
function handleFileSelect(e) {
    //to make sure the user select file/files
    if (!e.target.files) return;

    //To obtaine a File reference
    var files = e.target.files;

    // Loop through the FileList and then to render image files as thumbnails.
    for (var i = 0, f; (f = files[i]); i++) {
        //instantiate a FileReader object to read its contents into memory
        var fileReader = new FileReader();

        // Closure to capture the file information and apply validation.
        fileReader.onload = (function (readerEvt) {
            return function (e) {
                //Apply the validation rules for attachments upload
                ApplyFileValidationRules(readerEvt);

                //Render attachments thumbnails.
                RenderThumbnail(e, readerEvt);

                //Fill the array of attachment
                FillAttachmentArray(e, readerEvt);
            };
        })(f);

        // Read in the image file as a data URL.
        // readAsDataURL: The result property will contain the file/blob's data encoded as a data URL.
        // More info about Data URI scheme https://en.wikipedia.org/wiki/Data_URI_scheme
        fileReader.readAsDataURL(f);
    }
    document
        .getElementById("files")
        .addEventListener("change", handleFileSelect, false);
}

//To remove attachment once user click on x button
jQuery(function ($) {
    $("div").on("click", ".img-wrap .close", function () {
        var id = $(this)
            .closest(".img-wrap")
            .find("img")
            .data("id");

        //to remove the deleted item from array
        var elementPos = AttachmentArray.map(function (x) {
            return x.FileName;
        }).indexOf(id);
        if (elementPos !== -1) {
            AttachmentArray.splice(elementPos, 1);
        }

        //to remove image tag
        $(this)
            .parent()
            .find("img")
            .not()
            .remove();

        //to remove div tag that contain the image
        $(this)
            .parent()
            .find("div")
            .not()
            .remove();

        //to remove div tag that contain caption name
        $(this)
            .parent()
            .parent()
            .find("div")
            .not()
            .remove();

        //to remove li tag
        var lis = document.querySelectorAll("#imgList li");
        for (var i = 0; (li = lis[i]); i++) {
            if (li.innerHTML == "") {
                li.parentNode.removeChild(li);
            }
        }
    });
});

//Apply the validation rules for attachments upload
function ApplyFileValidationRules(readerEvt) {
    //To check file type according to upload conditions
    if (CheckFileType(readerEvt.type) == false) {
        alert(
            "The file (" +
            readerEvt.name +
            ") does not match the upload conditions, You can only upload jpg/png/gif files"
        );
        e.preventDefault();
        return;
    }

    //To check file Size according to upload conditions
    if (CheckFileSize(readerEvt.size) == false) {
        alert(
            "The file (" +
            readerEvt.name +
            ") does not match the upload conditions, The maximum file size for uploads should not exceed 300 KB"
        );
        e.preventDefault();
        return;
    }

    //To check files count according to upload conditions
    if (CheckFilesCount(AttachmentArray) == false) {
        if (!filesCounterAlertStatus) {
            filesCounterAlertStatus = true;
            alert(
                "You have added more than 10 files. According to upload conditions you can upload 10 files maximum"
            );
        }
        e.preventDefault();
        return;
    }
}

//To check file type according to upload conditions
function CheckFileType(fileType) {
    if (fileType == "image/jpeg") {
        return true;
    } else if (fileType == "image/png") {
        return true;
    } else if (fileType == "image/gif") {
        return true;
    } else {
        return false;
    }
    return true;
}

//To check file Size according to upload conditions
function CheckFileSize(fileSize) {
    if (fileSize < 300000) {
        return true;
    } else {
        return false;
    }
    return true;
}

//To check files count according to upload conditions
function CheckFilesCount(AttachmentArray) {
    //Since AttachmentArray.length return the next available index in the array,
    //I have used the loop to get the real length
    var len = 0;
    for (var i = 0; i < AttachmentArray.length; i++) {
        if (AttachmentArray[i] !== undefined) {
            len++;
        }
    }
    //To check the length does not exceed 10 files maximum
    if (len > 9) {
        return false;
    } else {
        return true;
    }
}

//Render attachments thumbnails.
function RenderThumbnail(e, readerEvt) {
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = [
        '<div class="img-wrap"> <span class="close">&times;</span>' +
        '<img class="thumb" src="',
        e.target.result,
        '" title="',
        escape(readerEvt.name),
        '" data-id="',
        readerEvt.name,
        '"/>' + "</div>"
    ].join("");

    var div = document.createElement("div");
    div.className = "FileNameCaptionStyle";
    li.appendChild(div);
    div.innerHTML = [readerEvt.name].join("");
    document.getElementById("Filelist").insertBefore(ul, null);
}

//Fill the array of attachment
function FillAttachmentArray(e, readerEvt) {
    AttachmentArray[arrCounter] = {
        AttachmentType: 1,
        ObjectType: 1,
        FileName: readerEvt.name,
        FileDescription: "Attachment",
        NoteText: "",
        MimeType: readerEvt.type,
        Content: e.target.result.split("base64,")[1],
        FileSizeInBytes: readerEvt.size
    };
    arrCounter = arrCounter + 1;
}

$('.story>button').click(function () {
    $(this).text($(this).text() == 'Follow' ? 'Following' : 'Follow');
    $(this).toggleClass('active');
});
$('.like').click(function () {
    $(this).toggleClass('active');
});

$(document).ready(function() {
    $(document).on("click", function(event){
        $('.User-Dropdown').removeClass("U-open");
        $('.User-avtar').click(function(e){
            e.stopPropagation();
        });
        // $('.User-Dropdown > *').click(function(e){
        //     e.stopPropagation();
        // });
    });

    $('.doctor_categories_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:false,
        nav:false,
        dots:false,
        autoplay:false,
        margin:20,
        autoplayTimeout:5000,
        responsive:{
            0:{
                items:3,
                stagePadding: 25,
            },
            600:{
                items:4,
                stagePadding: 35,
            },
            1000:{
                items:6,
                stagePadding: 45,
            }
        }
    });
    $('.lab_categories_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:false,
        nav:false,
        dots:false,
        autoplay:false,
        margin:20,
        autoplayTimeout:5000,
        responsive:{
            0:{
                items:3,
                stagePadding: 25,
            },
            600:{
                items:4,
                stagePadding: 35,
            },
            1000:{
                items:6,
                stagePadding: 45,
            }
        }
    });
    $('.main_section_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:true,
        nav:false,
        dots:false,
        autoplay:true,
        autoplayTimeout:5000,
        responsive:{
            0:{
                items:2,
                margin:5,
            },
            600:{
                items:2,
                margin:10,
            },
            1000:{
                items:2,
                margin:25,
            }
        }
    });
    $('.reservistion_slider').owlCarousel({
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
    $('.latest_offers_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:false,
        nav:false,
        dots:false,
        autoplay:true,
        autoplayTimeout:5000,
        responsive:{
            0:{
                items:1,
                margin:5,
                stagePadding: 25,
            },
            600:{
                items:1,
                margin:10,
                stagePadding: 35,
            },
            1000:{
                items:2,
                margin:20,
                stagePadding: 55,
            }
        }
    });
    $('.search_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:true,
        nav:false,
        dots:true,
        autoplay:true,
        autoplayTimeout:5000,
        responsive:{
            0:{
                items:1,
                margin:5,
            },
            600:{
                items:1,
                margin:10,
            },
            1000:{
                items:1,
                margin:25,
            }
        }
    });
    $('.slider_search_page_slider').owlCarousel({
        navText:['<i class="las la-angle-left fa-2x"></i>','<i class="las la-angle-right fa-2x"></i>'],
        loop:true,
        nav:false,
        dots:true,
        autoplay:true,
        autoplayTimeout:5000,
        responsive:{
            0:{
                items:1,
                margin:5,
            },
            600:{
                items:2,
                margin:10,
            },
            1000:{
                items:3,
                margin:25,
            }
        }
    });

    $('.groups_slider').owlCarousel({
        loop:false,
        nav:false,
        dots:false,
        autoplayTimeout:5000,

        responsive:{
            0:{
                items:3,
                margin:5,
            },
            600:{
                items:4,
                margin:5,
            },
            1000:{
                items:7,
                margin:10,
            }
        }
    });

});

$(document).ready(function () {
    var h = $('.header').height();
    $('.main_slider').css({height: 'calc(80vh - ' + h + 'px)'});
});

$(document).ready(function(){
    $('a[href="#search"]').on('click', function(event) {
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });
    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });
    $.fn.cascadeCheckboxes = function() {
        $.fn.checkboxParent = function() {
            //to determine if checkbox has parent checkbox element
            var checkboxParent = $(this)
                .parent("li")
                .parent("ul")
                .parent("li")
                .find('> input[type="checkbox"]');
            return checkboxParent;
        };

        $.fn.checkboxChildren = function() {
            //to determine if checkbox has child checkbox element
            var checkboxChildren = $(this)
                .parent("li")
                .find(' > .subcategories > li > input[type="checkbox"]');
            return checkboxChildren;
        };

        $.fn.cascadeUp = function() {
            var checkboxParent = $(this).checkboxParent();
            if ($(this).prop("checked")) {
                if (checkboxParent.length) {
                    //check if all children of the parent are selected - if yes, select the parent
                    //these will be the siblings of the element which we clicked on
                    var children = $(checkboxParent).checkboxChildren();
                    console.log(children);
                    var booleanChildren = $.map(children, function(child, i) {
                        return $(child).prop("checked");
                    });
                    //check if all children are checked
                    var allChecked = booleanChildren.filter(function(x) {return !x})
                    //if there are no false elements, parent is selected
                    if (!allChecked.length) {
                        $(checkboxParent).prop("checked", true);
                        $(checkboxParent).cascadeUp();
                    }
                }
            } else {
                if (checkboxParent.length) {
                    //if parent is checked, becomes unchecked
                    $(checkboxParent).prop("checked", false);
                    $(checkboxParent).cascadeUp();
                }
            }
        };
        $.fn.cascadeDown = function() {
            var checkboxChildren = $(this).checkboxChildren();
            if (checkboxChildren.length) {
                checkboxChildren.prop("checked", $(this).prop("checked"));
                checkboxChildren.each(function(index) {
                    $(this).cascadeDown();
                });
            }
        }

        $(this).cascadeUp();
        $(this).cascadeDown();
    };

    $("input[type=checkbox]:not(:disabled)").on("change", function() {
        $(this).cascadeCheckboxes();
    });

    $(".category a").on("click", function(e) {
        $(this).find("> i").toggleClass('rotate');
        e.preventDefault();
        $(this)
            .parent()
            .find("> .subcategories")
            .slideToggle(function() {
                if ($(this).is(":visible")) $(this).css("display", "flex");
            });
    });
});
//new codes
$('.wish_btn').click(function () {
    $(this).find('.fav').toggle();
    $(this).find('.unfav').toggle();
    $(this).toggleClass('active');
    $('.wish_btn abbr').html('Add To Wishlist');
    $('.wish_btn.active abbr').html('Added To Wishlist');
});
$(document).ready(function () {
    $('.wish_btn abbr').html('Add To Wishlist');
    $('.wish_btn.active abbr').html('Added To Wishlist');

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $(".datefield").val(today);
    $(".datefield").attr('min' , today);
    $("#datefield").val(today);
    $("#datefield").attr('min' , today);
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

$(".category label").on("click", function(e) {
    $(this)
        .parent()
        .find(".subcategories")
        .slideToggle(function() {
            if ($(this).is(":visible")){
                $(this).css("display", "flex");
                $(this).parent().find('> input').prop('checked', true);
            }else{
                $(this).parent().find('> input').prop('checked', false);

            }
        });
});

$("#FileInput").on('change',function (e) {
    var labelVal = $(".title").text();
    var oldfileName = $(this).val();
    fileName = e.target.value.split( '\\' ).pop();

    if (oldfileName == fileName) {return false;}
    var extension = fileName.split('.').pop();

    if ($.inArray(extension,['jpg','jpeg','png']) >= 0) {
        $(".filelabel i").removeClass().addClass('las la-file-image');
        $(".filelabel i, .filelabel .title").css({'color':'#208440'});
        $(".filelabel").css({'border':' 2px solid #208440'});
    }
    else if(extension == 'pdf'){
        $(".filelabel i").removeClass().addClass('las la-file-pdf');
        $(".filelabel i, .filelabel .title").css({'color':'red'});
        $(".filelabel").css({'border':' 2px solid red'});

    }
    else if(extension == 'doc' || extension == 'docx'){
        $(".filelabel i").removeClass().addClass('las la-file-word');
        $(".filelabel i, .filelabel .title").css({'color':'#2388df'});
        $(".filelabel").css({'border':' 2px solid #2388df'});
    }
    else{
        $(".filelabel i").removeClass().addClass('las la-file');
        $(".filelabel i, .filelabel .title").css({'color':'black'});
        $(".filelabel").css({'border':' 2px solid black'});
    }

    if(fileName ){
        if (fileName.length > 10){
            $(".filelabel .title").text(fileName.slice(0,4)+'...'+extension);
        }
        else{
            $(".filelabel .title").text(fileName);
        }
    }
    else{
        $(".filelabel .title").text(labelVal);
    }
});
$('.follow').click(function(){
    $(this).toggleClass('following');
});

$(function(){
    var gallery = $('.gallery a').simpleLightbox({navText:    ['&lsaquo;','&rsaquo;']});
});