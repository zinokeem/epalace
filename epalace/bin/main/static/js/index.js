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
    // 추가하기
    $("#mainList input[name='insert']").on('click', function() {
        $("#mainList").hide(0, function() {
            $("#mainInsert").show(0);
        });
    });
    // 새로고침
    $("#mainList input[name='refresh']").on('click', function() {
        requestCount();
    });
    // 이전 페이지
    $("#mainList input[name='left']").on('click', function() {
        contentPager.prevPage();
        requestList();
    });
    // 다음 페이지
    $("#mainList input[name='right']").on('click', function() {
        contentPager.nextPage();
        requestList();
    });
    // 페이지 변경
    $("#mainList select[name='pageOffset']").on('change', function() {
        contentPager.changeOffset($(this).val());
        requestList();
    });
    // 이전으로
    $("input[name='back']").on('click', function() {
        var parent = $(this).parents(".container");
        parent.hide(0, function() {
            $("#mainList").show(0);
        });
    });
    // 게시글 추가
    $("#mainInsert input[name='insert']").on('click', function() {
        var editor = $("#editor");
        var subject = editor.find("input[name='subject']").val();
        //var usersid = editor.find("input[name='usersid']").val();
        var usersname = editor.find("input[name='usersname']").val();
        var content = editor.find("textarea[name='content']").val();
        requestInsert(0, usersname, subject, content);
    });
    $("#mainView input[name='delete']").on('click', function() {
        var id = $("div#content").data("id");
        requestDelete(id);
    });
}

function showList() {
    var containers = $(".container").not(".fixed").not("#mainList");
    containers.hide(0, function() {
        $("#mainList").show(0);
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

function requestInsert(usersid, usersname, subject, content) {
    if (subject === "" || content === "") {
        alert("제목과 내용을 입력해주세요.");
        return;
    }

    $.ajax({
        url : "/insertBoard",
        type : "POST",
        dataType : "json",
        data: {usersid : usersid, usersname : usersname, subject : subject, content : content},
        success: function(res) {
            alert("저장이 완료되었습니다.");
            requestCount();
            showList();
        }
    });
}

function requestDelete(id) {
    if (!confirm("정말로 삭제하시겠습니까?")) {
        alert("취소되었습니다.");
        return;
    }
    $.ajax({
        url : "/deleteBoard",
        type : "POST",
        dataType : "json",
        data: {id : id},
        success: function(res) {
            alert("삭제되었습니다.");
            requestCount();
            showList();
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

    var list = ["rownum", "subject", "usersname", "created", "hit"]

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
    $content.data("id", obj[0].id);

    $("div#content").find("input[name='subject']").val(obj[0].subject);
    $("div#content").find("input[name='usersname']").val(obj[0].usersname);
    $("div#content").find("input[name='created']").val(obj[0].created);
    $("div#content").find("textarea[name='content']").val(obj[0].content);

    $("#mainList").hide(0, function() {
        $("#mainView").show(0);
    });
}

function convertHeadName(headname) {
    if (headname === "id") {
        return "ID";
    } else if (headname === "usersname") {
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