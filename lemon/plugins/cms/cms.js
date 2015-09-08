/*
 * TODO:
 */

//http://stackoverflow.com/questions/10133100/javascript-variable-scope-the-evils-of-globals/10133133#10133133
(function () {
    var plusSign = '<i class="fa fa-plus-square-o"></i>';

    var CKEditorPath = "https://static.ttu.ee/portal/ext/cms/ckeditor/ckeditor.js";
// Dokuwiki acl
    var AUTH_NONE = 0;
    var AUTH_READ = 1;
    var AUTH_EDIT = 2;
    var AUTH_CREATE = 4;
    var AUTH_UPLOAD = 8;
    var AUTH_DELETE = 16;
    var AUTH_ADMIN = 255;

    var editor;
    var session_id;
    var pageId;
    var focus;
    var t; //translations
    var lang = $('#_lang').attr('class');

    session_id = $('#_sess_id').attr('class');
    focus = getFocus();
    var urlSplit = $(location).prop('href').split('/');
    var baseUrl = urlSplit[0] + '//' + urlSplit[2];



//    var x = document.createElement("BASE");
//    x.setAttribute("href", baseUrl + '/' + focus + '/' + session_id + '/');
//    document.head.appendChild(x);
    var onpopstate = false;

    window.onpopstate = function (e) {
        if (focus === 'edit')
            if (e.state) {
                onpopstate = true;
                $('.docuw').each(function (index, div) {
                    document.title = e.state;
                    var pageId = e.state;
                    var divId = dw2id(pageId);
                    $(div).empty();
                    $(div).attr('id', 'div-' + divId);
                    $(div).attr('data-rev', '');
                    var version = '';
                    var pageInfo = {name: pageId, divId: divId, version: version};
                    processDiv(pageInfo);
                    if (pageId.indexOf(':') < 0) {
                        linkWizLevel = 0;
                        linkWiz('');
                    }
                    else {
                        linkWiz(pageId);
                    }
                });
                //document.getElementById("content").innerHTML = e.state.html;

            }
    };

    getTranslations();

    var linkWizLevel = 0;
    var nsPath = [];
    linkWiz('');

    function linkWiz(ns) {
        nsPath[linkWizLevel] = ns;
        getPageList(ns)
                .done(function (data) {
                    if (!data) {
                        alert(t.txt_error);
                    }
                    else {
                        /*
                         {"id":"test:tarkvara","ns":"test","perm":8,"type":"d","level":1,"open":false}
                         <div class="odd type_f">
                         <a href="/test/tt/test3" title="test:tt:test3" class="wikilink1">test:tt:test3</a>
                         </div>
                         */
                        var html = '';
                        var even = 'even';
                        if (linkWizLevel > 0) {
                            html += '<div class="odd type_u">' +
                                    '<a href="/' + ns + '" title="' + ns + '" class="wikilink1"  data-type="up" >mine ülemisse nimeruumi</a>' +
                                    '</div>';
                        }
                        $.each(data, function (key, value) {
                            var divClass = value.type === 'd' ? 'class="' + even + ' type_d"' : 'class="' + even + ' type_f"';
                            var slash = value.type === 'd' ? '/' : '';
                            html += '<div ' + divClass + '>';
                            html += '<a href="/' + value.id.replace(':', '/') + slash + '" title="' + value.id + '" class="wikilink1" data-type="' + value.type + '">' + value.id + '</a>';
                            html += '</div>';
                            even = even === 'even' ? 'odd' : 'even';
                        });
                        $('#link_wiz').empty().html(html);
                        $(".wikilink1").each(function (index) {
                            $(this).on("click", function (e) {
                                var type = $(this).attr('data-type');
                                var title = $(this).attr('title');

                                switch (type) {
                                    case 'd': //directory
                                        linkWizLevel++;
                                        up = title;
                                        linkWiz(title);

                                        if (!onpopstate) {
                                            var url = baseUrl + '/edit/' + session_id + '/' + title + ':';
                                            history.pushState(title + ':', title + ':', url);
                                        }
                                        onpopstate = false;

                                        break;
                                    case 'up':
                                        linkWizLevel--;
                                        linkWiz(nsPath[linkWizLevel]);

                                        if (!onpopstate) {
                                            var url = baseUrl + '/edit/' + session_id + '/' + nsPath[linkWizLevel];
                                            history.pushState(nsPath[linkWizLevel], nsPath[linkWizLevel], url);
                                        }
                                        onpopstate = false;

                                        break;
                                    case 'f': //file
                                        $('.docuw').each(function (index, div) {
                                            var pageId = title;
                                            var divId = dw2id(pageId);
                                            $(div).empty();
                                            $(div).attr('id', 'div-' + divId);
                                            $(div).attr('data-rev', '');
                                            var version = '';
                                            var pageInfo = {name: pageId, divId: divId, version: version};
                                            processDiv(pageInfo);
                                        });
                                }
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        });
                    }
                });

    }

    function findDivs() {
        $('.docuw').each(function (index, div) {
            var pageId;
            var divId = '';
            if (focus === 'edit') {
                var loc = $(location).prop('href').split('/');
                if (loc.length > 5) {
                    pageId = $(location).prop('href').split('/')[5];
                }
                else {
                    pageId = 'start';
                    //window.location.replace($(location).prop('href') + '/' + pageId);
                }
                divId = dw2id(pageId);
            }
            else {
                divId = $(div).attr('id');
                pageId = id2dw(divId.substring(4));//div-myDoc -> myDoc
            }
            var version = $(div).attr('data-rev');

            var pageInfo = {name: pageId, divId: dw2id(pageId), version: version};
            processDiv(pageInfo);
        });
    }

    function processDiv(pageInfo) {

        addContentDiv(pageInfo);

        getDocInfoAndHtml(pageInfo)
                .done(function (data) {
                    if (!data) {
                        alert(t.txt_error);
                    }
                    else {
                        pageInfoAndHtml = data;
                        if (focus === 'edit') {
                            if (!onpopstate) {
                                var url = baseUrl + '/edit/' + session_id + '/' + pageInfoAndHtml.info.name;
                                history.pushState(pageInfoAndHtml.info.name, pageInfoAndHtml.info.name, url);
                            }
                            onpopstate = false;
                        }
                        pageInfoAndHtml.info.divId = dw2id(pageInfoAndHtml.info.name);
                        div = $('#div-' + pageInfoAndHtml.info.divId)[0];
                        if (pageInfoAndHtml.info.exists === 1) {
                            if (pageInfoAndHtml.info.acl == AUTH_NONE) {
                                notAuthorized();
                            }
                            else {
                                showDiv(pageInfoAndHtml);
                            }
                        }
                        else {
                            if (pageInfoAndHtml.info.acl > AUTH_READ) {
                                newPage(div, pageInfoAndHtml.info);
                            }
                            else {
                                cannotCreatePage(div);
                            }
                        }
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(t.error + ": [" + jqXHR.responseText + "]");
                });
    }
    function newPage(div, pageInfo) {
        //$(div).append('<div class="divMessage"></div>');
        //$('#' + pageInfo.divId)[0].empty();
        $(div).find('.divMessage').html(t.txt_docum_not_exists_yet.replace('%', plusSign));
        if ($('#tools-' + pageInfo.divId).length == 0) {
            var toolsMenu = Handlebars.templates['tools.hbs']({pageId: pageInfo.divId, t: t});
            $(div).prepend(toolsMenu);
        }
        toolsNew(pageInfo);
        //addContentDiv(pageInfo);
        $(".newBtn").click(function () {
            pageId = $(this).attr('data-id');
            pageInfo.name = id2dw(pageId);
            showEditorModal(pageInfo);
        });
    }

    function showDiv(pageInfoAndHtml) {
        pageInfo = pageInfoAndHtml.info;
        //addContentDiv(pageInfo);
        var div = $('#' + pageInfo.divId);
        $(div).parent().find('.divMessage').empty();
        $(div).empty().html(pageInfoAndHtml.html);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub], pageInfo.divId);

        if (pageInfo.version) {
            $(div).parent().attr('data-rev', pageInfo.version);
            $(div).parent().find('.divMessage').html(t.txt_this_is_old_rev + '<hr>');
        }
        else {
            $("#div-" + pageInfo.divId).attr('data-rev', '');
        }
        addTools(div, pageInfo);
        if (!pageInfo.locked) {
            toolsEdit(pageInfo, pageInfo.revisionCount > 1);
            if (pageInfo.acl > AUTH_READ) {

                $("#edit-" + pageInfo.divId).on("click", function (e) {
                    pageId = $(this).attr('data-id');
                    var version = $("#div-" + pageId).attr('data-rev');
                    version = version === '' ? '' : '&rev=' + version;

                    getDocInfo(id2dw(pageId) + version)
                            .done(function (data) {
                                if (!data) {
                                    alert(t.txt_error);
                                }
                                else {
                                    pageInfo = data;
                                    pageInfo.divId = dw2id(pageInfo.name);
                                    if (pageInfo.locked === false) {
                                        showEditorModal(pageInfo);
                                    }
                                    else {
                                        toolsLocked(pageInfo);
                                    }
                                }
                            });
                });
            }
            else {
                $("#edit-" + pageInfo.divId).hide();
            }
            if (pageInfo.revisionCount > 1) {

                $("#old-" + pageInfo.divId).on("click", function (e) {
                    pageId = id2dw($(this).attr('data-id'));
                    getRevisionList(pageId)
                            .done(function (data) {
                                if (data.length > 0) {
                                    data[0].version = '';
                                    var modal = Handlebars.templates['modal_revision_list.hbs']({sessionId: session_id, revisions: data, pageId: pageId, t: t});
                                    if ($('#revlist').length) {
                                        $('#revlist').replaceWith(modal);
                                    }
                                    else {
                                        $("body").prepend(modal);
                                    }
                                    $('#revlist').modal('show');
                                    $(".revisionLink").click(function (eventObject) {
                                        var pageId = $(this).attr('data-id');
                                        var rev = $(this).attr('data-rev');
                                        var indx = $(this).attr('data-index');
                                        $('#revlist').modal('hide');
                                        pageInfo.name = pageId;
                                        pageInfo.version = indx === '0' ? '' : rev;// zero is the latest
                                        processDiv(pageInfo);
                                        //vale showDiv(pageInfo);
                                        eventObject.preventDefault();// Preventing a link from being followed
                                    });
                                }
                            });
                });
            }
        }
        else {
            toolsLocked(pageInfo);
        }

    }

    function divToEditor(div, pageInfo) {
        var height = $(window).height() - 450;
        if (editor)
            editor.destroy();
        editor = CKEDITOR.replace(div,
                {
                    //customConfig: '',
                    language: lang,
                    customConfig: 'config.js',
                    //extraPlugins: 'autogrow',
                    autoGrow_maxHeight: height,
                    on:
                            {
                                instanceReady: function (ev)
                                {
                                    setLock(id2dw(pageId), 'lock')
                                            .done(function (data) {
                                                if (data == "true") {
                                                    getDocHtml(pageInfo)
                                                            .done(function (html) {
                                                                editor.setData(html);
                                                                $('#editor_modal').modal('show');
                                                            });
                                                }
                                            });
                                }
                            }
                });
    }

    function addTools(div, pageInfo) {
        var template = Handlebars.templates['tools.hbs'];
        var revisionCount = (pageInfo.revisionCount > 1) ? true : false;
        var html = template({pageId: pageInfo.divId, revision: pageInfo.version, revisions: revisionCount, t: t});
        if ($('#tools-' + pageInfo.divId).length) {
            $('#tools-' + pageInfo.divId).replaceWith(html);
        }
        else {
            $(div).parent().prepend(html);
        }
    }

    function addModal(pageId, divId) {
        var template = Handlebars.templates['modal.hbs'];
        var html = template({pageId: pageId, divId: divId, t: t});
        return html;
    }

    function addEditorModal(pageInfo) {
//        var pageId = pageInfo.name.split('&')[0]; // start&rev=1430390503
//        pageInfo.divId = dw2id(pageId);
        var modalId = 'modal-' + pageInfo.divId;
        var html = addModal(pageInfo.name, modalId);
        $("body").prepend(html);
        var modalDiv = $('#' + modalId)[0];
        divToEditor(modalDiv, pageInfo);

        $('#modal-save').on('click', function (evt) {
            var data = editor.getData();
            save(data);
        });
        $('#editor_modal').on('hidden.bs.modal', function () {
            setLock(id2dw(pageId), 'unlock')
                    .done(function (data) {
                        var pageInfo = {name: id2dw(pageId), divId: pageId, version: ''};
                        if (CKEDITOR.instances.myInstanceName)
                            CKEDITOR.instances.myInstanceName.destroy();
                        processDiv(pageInfo);
                    });
        });
    }

    function save(data) {
        divId = editor.element.$.id.substring(6);// modal-pagename
        var pageId = id2dw(divId);

        if (supportsLocalStorage()) {
            saveToLocalStorage('unsaveData', data, pageId);
        }

        saveDoc(pageId, data)
                .done(function (data, textStatus, jqXHR) {
                    if (data == "false") {
                        alert(t.txt_error_saving);
                        return;
                    }
                    if (data == "true") {

                        var pageInfo = {name: pageId, divId: divId, version: ''};
                        processDiv(pageInfo);
                        $('#editor_modal').modal('hide');
//                        getDocInfoAndHtml(pageInfo)
//                                .done(function (data) {
//                                    if (!data) {
//                                        alert(t.txt_error);
//                                    }
//                                    else {
//                                        $('#editor_modal').modal('hide');
//                                        data.info.divId = dw2id(data.info.name);
//                                        showDiv(data);
//                                    }
//                                });
                    }
                    else {
                        alert(t.txt_error + ": " + data);
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(t.txt_error + ": [" + jqXHR.responseText + "]");
                });
    }

    function dw2id(id) {
        return id.replace(/:/gi, '_');//replace all : with _
    }

    function id2dw(id) {
        return id.replace(/_/gi, ':');
    }

// for CKEditor in modal dialog
// http://ckeditor.com/forums/Support/Issue-with-Twitter-Bootstrap
//http://ckeditor.com/forums/CKEditor/Editor-Dropdowns-dont-work-in-IE11
    $.fn.modal.Constructor.prototype.enforceFocus = function () {
        modal_this = this;
        $(document).on('focusin.modal', function (e) {
            if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
                    && $(e.target.parentNode).hasClass('cke_contents cke_reset')
                    && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select')
                    && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')) {
                modal_this.$element.focus();
            }
        });
    };

    function setLock(pageId, cmd) {
        var url = baseUrl + '/query/' + session_id + '/cms:l:' + pageId;
        return $.ajax({
            type: 'post',
            dataType: 'text',
            url: url,
            data: {
                cmd: cmd
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function getRevisionList(pageId) {
        var cmd = 'r';// getg revision list
        var url = baseUrl + '/query/' + session_id + '/cms:' + cmd + ':' + pageId;
        return $.ajax({
            type: 'get',
            dataType: 'json',
            url: url
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function getDocInfoAndHtml(pageInfo) {
        var rev = '';
        if (pageInfo.version) {
            rev = '&rev=' + pageInfo.version;
        }
        var cmd = 'ih';// get info and html
        var url = baseUrl + '/query/' + session_id + '/cms:' + cmd + ':' + pageInfo.name + rev;
        return $.ajax({
            type: 'get',
            dataType: 'json',
            url: url
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function getDocHtml(pageInfo) {
        var rev = '';
        if (pageInfo.version) {
            rev = '&rev=' + pageInfo.version;
        }
        var cmd = 'h';// get html
        var url = baseUrl + '/query/' + session_id + '/cms:' + cmd + ':' + pageInfo.name + rev;
        return $.ajax({
            type: 'get',
            dataType: 'html',
            url: url
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function getDocInfo(pageId) {
        var cmd = 'inf';// get page info
        var url = baseUrl + '/query/' + session_id + '/cms:' + cmd + ':' + pageId;
        return  $.ajax({
            type: 'get',
            dataType: 'json',
            url: url
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function saveDoc(pageId, data) {
        var cmd = 's';// save
        var url = baseUrl + '/query/' + session_id + '/cms:' + cmd + ':' + pageId;

        return $.ajax({
            type: 'post',
            dataType: 'html',
            url: url,
            data: {
                html: data
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }

    function getTranslations() {
        var cmd = 'tr';// get translations
        var url = baseUrl + '/query/' + session_id + '/cms:' + cmd;
        var jqxhr = $.ajax({
            type: 'get',
            dataType: 'json',
            url: url
        })
                .done(function (data, textStatus, jqXHR) {
                    t = data;
                    findDivs();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    fail();
                });
    }

    function fail(error) {
        if (error === 'Unauthorized') {
            window.location.replace(baseUrl + '/' + focus + '/' + session_id);
        }
        else {
            alert(error);
        }
    }

    function showEditorModal(pageInfo) {
        if (!window.CKEDITOR) {
            $.getScript(CKEditorPath, function () {
                // wait until CKEdtior is fully loaded
                var timer = setInterval(function () {
                    if (window.CKEDITOR && CKEDITOR.on) {
                        clearInterval(timer);
                        addEditorModal(pageInfo);
                    }
                }, 20);
            });
        }
        else {
            addEditorModal(pageInfo);
        }
    }

    function getFocus() {
        return $(location).prop('href').split('/')[3];
    }

    function toolsLocked(pageInfo) {
        var lockExpires = pageInfo.lockExpires;
        var minutes = Math.floor(lockExpires / 60);
        var seconds = lockExpires % 60;

        var message = t.txt_locked.replace('%1', pageInfo.locked).replace('%2', minutes).replace('%3', seconds);
        $("#locked-" + pageInfo.divId).attr('title', message);
        $("#locked-" + pageInfo.divId).show();
        $("#new-" + pageInfo.divId).hide();
        $("#edit-" + pageInfo.divId).hide();
        $("#old-" + pageInfo.divId).hide();
    }

    function toolsNew(pageInfo) {
        $("#new-" + pageInfo.divId).show();
        $("#locked-" + pageInfo.divId).hide();
        $("#edit-" + pageInfo.divId).hide();
        $("#old-" + pageInfo.divId).hide();
    }

    function toolsEdit(pageInfo, old) {
        $("#new-" + pageInfo.divId).hide();
        $("#locked-" + pageInfo.divId).hide();
        $("#edit-" + pageInfo.divId).show();
        if (old) {
            $("#old-" + pageInfo.divId).show();
        }
        else {
            $("#old-" + pageInfo.divId).hide();
        }
    }

    function addContentDiv(pageInfo) {
        var div = $('#' + pageInfo.divId)[0];
        //if ($('#' + pageInfo.divId).length > 0) {
        if (div) {
            $(div).empty();
            $(div).parent().find('.divMessage').empty();
        }
        else {
            $('#div-' + pageInfo.divId).prepend('<div class="divMessage"></div>');
            $('#div-' + pageInfo.divId).append('<div id="' + pageInfo.divId + '"></div>');
        }
    }

    function getPageList(ns) {
        var cmd = 'pl';// get page list
        var url = baseUrl + '/query/' + session_id + '/cms:' + cmd + ':' + ns;

        return $.ajax({
            type: 'get',
            dataType: 'json',
            url: url
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(t.txt_error + ": [" + jqXHR.responseText + "]");
//            fail(jqXHR.responseText);
        });
    }

})(); // Called right away
