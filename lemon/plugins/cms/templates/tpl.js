(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['alert.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"row\" id=\"error_alert_div\">\r\n    <div class=\"alert alert-danger alert-dismissable fade in col-md-6\" id=\"error_alert\">"
    + this.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times</button>\r\n    </div>\r\n</div>";
},"useData":true});
templates['modal.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"modal fade\" id=\"editor_modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-body\">\r\n                <div  id=\""
    + this.escapeExpression(((helper = (helper = helpers.divId || (depth0 != null ? depth0.divId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"divId","hash":{},"data":data}) : helper)))
    + "\" class=\"editable\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
templates['modal_revision_list.hbs'] = template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "    <li class=\"list-group-item\"><a class=\"revisionLink\" data-id=\""
    + alias2(alias1((depth0 != null ? depth0.pageId : depth0), depth0))
    + "\" data-rev=\""
    + alias2(alias1((depth0 != null ? depth0.version : depth0), depth0))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" href=\"/edit/"
    + alias2(alias1((depths[1] != null ? depths[1].sessionId : depths[1]), depth0))
    + "/"
    + alias2(alias1((depth0 != null ? depth0.pageId : depth0), depth0))
    + "&amp;rev="
    + alias2(alias1((depth0 != null ? depth0.version : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.pageId : depth0), depth0))
    + "</a> - "
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].t : depths[1])) != null ? stack1.txt_last_modified : stack1), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0.modified : depth0), depth0))
    + " "
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].t : depths[1])) != null ? stack1.txt_person : stack1), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0.user : depth0), depth0))
    + "</li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return " <div class=\"modal fade\" id=\"revlist\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n <div class=\"modal-dialog modal-lg\">\r\n <div class=\"modal-content\">\r\n <div class=\"modal-header\">\r\n <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n <h4 class=\"modal-title\" id=\"myModalLabel\">"
    + this.escapeExpression(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + " - eelnevad versioonid</h4>\r\n </div>\r\n <div class=\"modal-body\">\r\n<ul class=\"list-group\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.revisions : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " </div>\r\n </div>\r\n </div>\r\n </div>";
},"useData":true,"useDepths":true});
templates['tools.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<div class=\"tools\" id=\"tools-"
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\">\r\n    <ul style=\"list-style: none;\">\r\n        <li><a id=\"locked-"
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-large\" title=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.t : depth0)) != null ? stack1.txt_page_locked : stack1), depth0))
    + "\"><i class=\"fa fa-lock\"></i></a></li>\r\n        <li><a id=\"new-"
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-large newBtn\" title=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.t : depth0)) != null ? stack1.txt_new : stack1), depth0))
    + "\"><i class=\"fa fa-plus-square-o\"></i></a></li>\r\n        <li><a id=\"edit-"
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-large\" title=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.t : depth0)) != null ? stack1.txt_edit : stack1), depth0))
    + "\"><i class=\"fa fa-pencil-square-o\"></i></a></li>\r\n        <li><a id=\"old-"
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + alias3(((helper = (helper = helpers.pageId || (depth0 != null ? depth0.pageId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-large\" title=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.t : depth0)) != null ? stack1.txt_old_revisions : stack1), depth0))
    + "\"><i class=\"fa fa-clock-o\"></i></a></li>\r\n    </ul>\r\n</div>";
},"useData":true});
})();
