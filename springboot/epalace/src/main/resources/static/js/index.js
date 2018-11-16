/**
 * error palace
 */
$(document).ready(function() {
    init();
});

var dateUtils;
var contentPager;

function init() {
    dateUtils = new DateUtils();
    contentPager = new pageManager();
    requestCount();
    initEventHandler();
}

function initEventHandler() {
    $("input[name='refresh']").on('click', function() {
        requestCount();
    });
    $("input[name='left']").on('click', function() {
        contentPager.prevPage();
        requestList();
    });
    $("input[name='right']").on('click', function() {
        contentPager.nextPage();
        requestList();
    });
    $("select[name='pageOffset']").on('change', function() {
        contentPager.changeOffset($(this).val());
        requestList();
    });

    $("input[name='back']").on('click', function() {
        $("#mainView").hide(0, function() {
            $("#mainList").show(0);
        });
    });
}

function requestCount() {
    $.ajax({
        url : "/selectBoardCount",
        type : "POST",
        dataType : "json",
        success: function(res) {
            contentPager.setSumCount(res);
            requestList();
        }
    });
}

function requestContent(index) {
    $.ajax({
        url : "/selectBoard",
        type : "POST",
        dataType : "json",
        data: {id : index},
        success: function(res) {
            console.log(res);
            drawContent(res);
        }
    });
}

function requestList() {
    $.ajax({
        url : "/selectBoardList",
        type : "POST",
        dataType : "json",
        data: {startCount : contentPager.startCount, offset : contentPager.offset},
        success: function(res) {
            console.log(res);
            drawContentsList(res);
        }
    });
}

function drawPager() {
    var html = "";
    var list = contentPager.getPageList();
    for (var loop in list) {
        if (contentPager.startPage == loop) {
            html += "<li onclick='contentPager.movePage("+ list[loop] +");requestList()' style='text-decoration: underline;'>" + (list[loop]+1) + "</li>";
        } else {
            html += "<li onclick='contentPager.movePage("+ list[loop] +");requestList()'>" + (list[loop]+1) + "</li>";
        }
    }

    $("ul.pageList").empty().append(html);
}

function drawContentsList(contents) {
    drawPager();
    var head = '';
    var body = '';

    var list = ["rownum", "subject", "name", "created", "hit"]

    if (contents[0] != undefined) {
        head += "<tr>";
        for (var index in list) {
            head += "<th>" + convertHeadName(list[index]) + "</th>";
        }
        head += "</tr>";
    }

    for (var objIndex in contents) {
        var obj = contents[objIndex];
        body += "<tr data-id='"+ obj["id"] +"' onclick='clickContent(this)'>";
        for (var propertyIndex in obj) {
            var property = obj[propertyIndex];
            for (var index in list) {
                if (propertyIndex == list[index]) {
                    if (propertyIndex == "created") {
                        body += "<td>" + property.substring(0,10) + "</td>";
                    } else {
                        body += "<td>" + property + "</td>";
                    }
                }
            }
        }
        body += "</tr>";
    }
    $("#contents > tbody").empty().append(head + body);
}

function clickContent(obj) {
    var $obj = $(obj);
    requestContent($obj.data("id"));
}

function drawContent(obj) {
    if (obj.length < 1) {
        return;
    }

    var $content = $("div#content");
    $("div#content").find("input[name='subject']").val(obj[0].subject);
    $("div#content").find("input[name='name']").val(obj[0].name);
    $("div#content").find("input[name='created']").val(obj[0].created);
    $("div#content").find("textarea[name='content']").val(obj[0].content);

    $("#mainList").hide(0, function() {
        $("#mainView").show(0);
    });
}

function convertHeadName(headname) {
    if (headname === "id") {
        return "ID";
    } else if (headname === "name") {
        return "AUTH";
    } else if (headname === "subject") {
        return "SUBJECT";
    } else if (headname === "created") {
        return "CREATED DATE";
    } else if (headname === "hit") {
        return "HIT";
    } else if (headname === "rownum") {
        return "NO";
    } else {
        return headname;
    }
}