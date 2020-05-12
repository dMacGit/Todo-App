
let itemsArray = []
let buttonListenersArray = []
let itemEditStatesArray = []
let itemDelButtonStateArray = []

let newItem_Skeleton = {
    id: null,
    divNumber: null,
    creationDate: null,
    creationTime: null,
    modifiedDate: null,
    modifiedTime: null,
    description: "Some Task",
    priority: "Some Priority"
}

function generate_Date_String() {
    var dateString;
    const today = new Date();
    let month = today.getMonth();
    var month_String;
    switch (month) {
        //0-11 (January - December)
        case 0:
            month_String = "January";
            break;
        case 1:
            month_String = "Febuary";
            break;
        case 2:
            month_String = "March";
            break;
        case 3:
            month_String = "April";
            break;
        case 4:
            month_String = "May";
            break;
        case 5:
            month_String = "June";
            break;
        case 6:
            month_String = "July";
            break;
        case 7:
            month_String = "August";
            break;
        case 8:
            month_String = "September";
            break;
        case 9:
            month_String = "October";
            break;
        case 10:
            month_String = "November";
            break;
        case 11:
            month_String = "December";
            break;
        default:
            console.log("ERROR Parsing Month Number in Date Object!");
    }
    dateString = month_String+" "+today.getDate()+" "+today.getFullYear();
    return dateString;
};

function generate_Time_String() {
    var timeString;
    const today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let millisecsonds = today.getMilliseconds();

    timeString = hour+":"+minutes+":"+seconds+"-"+millisecsonds;
    return timeString;
};

loadDefaultItemView = function(itemId) {
    var template = Handlebars.getTemplate("item");
    
    var compiledTemplate = template({id: itemId});
    var output = document.getElementById("list-div");
    let currentInnerHTTML = output.innerHTML;
    output.innerHTML = currentInnerHTTML+compiledTemplate;
    
}

loadItemView = function(itemId, item) {
    var template = Handlebars.getTemplate("customItem");
    
    var compiledTemplate = template({id: itemId, title:item.Title, level:item.Level});
    var output = document.getElementById("list-div");
    let currentInnerHTTML = output.innerHTML;
    output.innerHTML = currentInnerHTTML+compiledTemplate;
}

removeItemView = function(itemId) {    
    var removeElement = document.getElementById("item"+itemId+"-div");
    console.log(removeElement);
    var parentNode = document.getElementById("list-div");
    parentNode.removeChild(removeElement);
}

user_StartEditItem = function(itemId) {
    var currentItemText = document.querySelector("#item"+itemId+"-desc");
    var itemLevel = document.querySelector("#item"+itemId+"-level");
    var currentDelItemButton = document.querySelector("#delete-item"+itemId);
    if (currentItemText.hasChildNodes) {

        let oldNode = currentItemText.firstElementChild;
        console.log(oldNode.innerText)
        let oldText = oldNode.innerText;
        console.log(oldNode.innerText);
        currentItemText.textContent = "";
        let taskName = document.createElement("input");
        taskName.setAttribute("id", "task-text");
        taskName.setAttribute("class", "task-edit-input");
        taskName.setAttribute("type", "text");
        taskName.setAttribute("value", oldText);
        currentItemText.appendChild(taskName);
    }
    let currentItemEditBtn = document.querySelector("#edit-item"+itemId);
    currentItemEditBtn.value = "Done";
    currentItemEditBtn.style.backgroundColor = "chocolate";
    currentItemEditBtn.style.border = "2px solid chocolate";
    currentDelItemButton.style.display = "block";
    console.log("Local version of Item @ div #edit-item",itemId," being changed...");

}

user_EndEditItem = function(itemId) {
    var currentItemText = document.querySelector("#item"+itemId+"-desc");
    var itemLevel = document.querySelector("#item"+itemId+"-level");
    var currentDelItemButton = document.querySelector("#delete-item"+itemId);
    itemEditStatesArray[itemId] = false;
    let updatedItem = {};
    if (currentItemText.hasChildNodes) {
        let oldNode = currentItemText.firstChild;
        let userText = oldNode.value;
        currentItemText.textContent = "";
        let taskName = document.createElement("p");
        taskName.textContent = userText;
        currentItemText.appendChild(taskName);
        currentDelItemButton.style.display = "none";
        updatedItem.Title = userText;
        updatedItem.Level = "Some Level";
        updateTaskById(listCache[itemId].Item,updatedItem);
    }
    let currentItemEditBtn = document.querySelector("#edit-item"+itemId);
    currentItemEditBtn.value = "Edit";
    currentItemEditBtn.style.backgroundColor = "black";
    currentItemEditBtn.style.border = "none";
}

create_NewItem_Listeners = function(itemId, startInEdit=true) {

    /*

        Error with Dynamically adding Event Listeners to dynamic number of elements.

        To fix use "Event Delegation"
        *NOTE: Taken from Stackoverflow question:

        https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript

        Similar to the below as example:

        document.addEventListener('click',function(e){
            if(e.target && e.target.id== 'brnPrepend'){
                //do something
            }
        });

    */

    //List Item specific elements
    console.log("item"+itemId+"-div");
    
    var item_container = document.getElementById("item"+itemId+"-div");
    console.log(item_container);
    var editItemButton = document.querySelector("#edit-item"+itemId);
    var delItemButton = document.querySelector("#delete-item"+itemId);
    buttonListenersArray[itemId] = editItemButton;
    if (startInEdit){
        itemEditStatesArray[itemId] = true;
        user_StartEditItem(itemId);
        itemDelButtonStateArray[itemId] = true;
    }
    else {
        itemEditStatesArray[itemId] = false;
        itemDelButtonStateArray[itemId] = false;
    }
    
    document.addEventListener("click", function (e) 
    {
        if(e.target && e.target.id== "edit-item"+itemId){
            console.log("Edit button pressed. Enabled State: ButtonId "+itemId);
            if (itemEditStatesArray[itemId] == false) {
                itemEditStatesArray[itemId] = true;
                user_StartEditItem(itemId);
            }
            else {

                itemEditStatesArray[itemId] = false;
                user_EndEditItem(itemId);
            }

            console.log("Button is now in Edit state = " + itemEditStatesArray[itemId]);
        }

        if(e.target && e.target.id== "delete-item"+itemId){
            let delItem = listCache[itemId];
            console.log("Delete button pressed. Enabled State: ButtonId "+itemId,delItem,"\n",delItem.Item);
            deleteListCacheItem(itemId);
            deleteTask(delItem.Item);
            removeItemView(itemId);
        }
    });

    document.addEventListener("mouseover", function (e) {
                
        if(e.target && e.target.id== "edit-item"+itemId){
            console.log("Mouseenter event!");
            console.log("Button in hover state"+e.target.id);
            e.target.style.backgroundColor = "cadetblue";
            e.target.style.border = "2px solid cadetblue";
        }
        
    });
    document.addEventListener("mouseout", function (e) {
        
        if(e.target && e.target.id== "edit-item"+itemId)
        {
            console.log("Button exits hover state"+e.target.id);
            if (itemEditStatesArray[itemId] == false) {
                //Default Black background
                e.target.style.backgroundColor = "Black";
                e.target.style.border = "none";
            }
            else {
                //Button enabled with Orange background
                e.target.style.backgroundColor = "chocolate";
                e.target.style.border = "2px solid chocolate";
            }
        }
    });
};

create_List_Listener = function () {
    var add_item_button = document.getElementById("add-button");

    add_item_button.addEventListener("click", function (e) {
        //First create new defult item
        let newItemId = divElementCounter;
        let newItem = newItem_Skeleton;
        newItem.id = newItemId;
        newItem.creationDate = generate_Date_String();
        newItem.creationTime = generate_Time_String();
        newItem.modifiedDate = newItem.creationDate;
        newItem.modifiedTime = newItem.creationTime;
        itemsArray[newItemId] = newItem;
        function addTest (callbackFunction) {
            addItem();
            callbackFunction();
        }

        addTest( function() {
            if ('content' in document.createElement('template')) 
            {
                loadDefaultItemView(newItemId);
                create_NewItem_Listeners(newItemId);
            }
            divElementCounter += 1;
        });
    });
    
};