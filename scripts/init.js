let divElementCounter = 0;

loadHeader = function() {
                
    var template = Handlebars.getTemplate("header");
    var compiledTemplate = template();
    var output = document.getElementById("list-header");
    output.innerHTML = compiledTemplate;
}

loadActionPanel = function () {
    var template = Handlebars.getTemplate("actionPanel");
    var compiledTemplate = template();
    var output = document.getElementById("list-actions");
    output.innerHTML = compiledTemplate;
}

load_Templates = function () {
    if ('content' in document.createElement('template')) 
    {
        console.log("=== Browser Supports HTML Templates! ===");
        loadHeader();
        loadActionPanel();
    }
    else {
        console.log("=== HTML Templates NOT SUPPORTED! ===");
    }
}

load_Listeners = function () {
    create_List_Listener();
}