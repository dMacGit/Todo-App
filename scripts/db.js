let db;

addItem = function (itemTitle = "Some Task", itemLevel = "Some Level") {
    let newItem = { Title: itemTitle, Level: itemLevel };
    let transaction = db.transaction(['todoTest'], 'readwrite');
    let objectStore = transaction.objectStore('todoTest');
    let request = objectStore.add(newItem);

    request.onsuccess = function () {
        console.log('Request Add Item Success!');
        let cacheItem = newItem;
        cacheItem.Item = request.result;
        console.log("New Item", cacheItem);
        addListCacheItem(cacheItem);
    };


    transaction.oncomplete = function () {
        console.log('Transaction completed: database modification finished.');

    };

    transaction.onerror = function () {
        console.log('Transaction not opened due to error');
    };
};

deleteTask = function (itemId) {
    var transaction = db.transaction(["todoTest"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log("deleteTask() [Transaction] Success!");
    };
    transaction.onerror = function (event) {
        console.log("deleteTask() [Transaction] Error!");
    };
    var objectStore = transaction.objectStore("todoTest");
    var objectStoreRequest = objectStore.delete(itemId);

    objectStoreRequest.onsuccess = function (event) {
        console.log("deleteTask() [Request] Success!");
        console.log(objectStoreRequest.result);
    };
};

deleteAllTasks = function () {
    var transaction = db.transaction(["todoTest"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log("deleteAllTasks() [Transaction] Success!");
    };

    transaction.onerror = function (event) {
        console.log("deleteAllTasks() [Transaction] Error!");
    };
    var objectStore = transaction.objectStore("todoTest");
    var objectStoreRequest = objectStore.clear();

    objectStoreRequest.onsuccess = function (event) {
        console.log("deleteAllTasks() [Request] Success!");
        var myRecord = objectStoreRequest.result;
        console.log(myRecord);
    };

};

window.onload = function () {

    let dbRequest = window.indexedDB.open('todo_db', 3);
    dbRequest.onerror = function () {
        console.log('Database failed to open');
    };

    dbRequest.onsuccess = function () {
        db = dbRequest.result;
        console.log(db);
        console.log('Database opened successfully');
        grabList();


    };

    dbRequest.onupgradeneeded = function (e) {
        let db = e.target.result;
        let objectStore = db.createObjectStore('todoTest', { keyPath: 'Item', autoIncrement: true });
        objectStore.createIndex('itemTitle', 'Title', { unique: false });
        objectStore.createIndex('itemLevel', 'Level', { unique: false });
        console.log('Database setup complete');
    };
};

grabList = function () {

    var transaction = db.transaction(["todoTest"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log("grabList() [Transaction] Success!");
    };

    transaction.onerror = function (event) {
        console.log("grabList() [Transaction] Error!");
    };
    var objectStore = transaction.objectStore("todoTest");
    var objectStoreRequest = objectStore.getAll();


    objectStoreRequest.onsuccess = function (event) {
        console.log("grabList() [Request] Success!");

        listSize = objectStoreRequest.result.length;
        console.log(objectStoreRequest);
        console.log("Length checked: " + listSize);
        if (listSize > 0) {
            generateListCache(objectStoreRequest.result, listSize);
        }
    };


};

getTaskById = function (taskId) {
    var transaction = db.transaction(["todoTest"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log("GetData() [Transaction] Success!");
    };
    transaction.onerror = function (event) {
        console.log("GetData() [Transaction] Error!");
    };
    var objectStore = transaction.objectStore("todoTest");
    var objectStoreRequest = objectStore.get(taskId);

    objectStoreRequest.onsuccess = function (event) {
        console.log("GetData() [Request] Success!");

        console.log("ItemId ", taskId, " removed!");
    };

};

updateTaskById = function (taskId, updatedItem) {
    var transaction = db.transaction(["todoTest"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log("updateTaskById() [Transaction] Success!");
    };

    transaction.onerror = function (event) {
        console.log("updateTaskById() [Transaction] Error!");
    };

    var objectStore = transaction.objectStore("todoTest");
    var objectStoreRequest = objectStore.get(taskId);
    objectStoreRequest.onsuccess = function (event) {

        console.log("updateTaskById() [Request] Success!");
        let updateRecord = objectStoreRequest.result;
        updateRecord.Title = updatedItem.Title;
        updateRecord.Level = updatedItem.Level;
        updateItemRequest = objectStore.put(updateRecord);



        updateItemRequest.onsuccess = function () {
            console.log("updateTaskById() [updateItemRequest] Success!");
        };

    };



};