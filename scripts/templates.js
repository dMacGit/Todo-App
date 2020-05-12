/*  Implement Custom Method to import html templates using Handlebars
    Credit to: http://berzniz.com/post/24743062344/handling-handlebarsjs-like-a-pro
    Found using Stackoverflow: https://stackoverflow.com/questions/23013447/how-to-define-handlebar-js-templates-in-an-external-file
*/

Handlebars.getTemplate = function(name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
            url : '../static/views/' + name + '.handlebars',
            success : function(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
            },
            async : false
        });
    }
    return Handlebars.templates[name];
};