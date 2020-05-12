let listCache = [];

generateListCache = function(result, size) {
    let listOfTasks = result;
    
    for (itemId = 0; itemId < size; itemId++) {
        console.log("Reading Result for ItemID "+itemId);
        var currentReadItem = result[itemId];
        listCache[itemId] = currentReadItem;
        console.log("[ID="+itemId+"]",currentReadItem.Title, currentReadItem.Level,"ItemDBid",currentReadItem.Item);
        loadItemView(itemId,currentReadItem);
        create_NewItem_Listeners(itemId,false);
    }
    divElementCounter = size;
    console.log("List Cache: " + listCache);
};

updateListCacheItem = function(cacheId, updatedItem){
    listCache[cacheId].Title = updatedItem.Title;
    listCache[cacheId].Level = updatedItem.Level;
    listCache[cacheId].Item = updatedItem.Item;

};

deleteListCacheItem = function(itemId){
    
    console.log("Before Clearing ListCache Item @ to Null",itemId,listCache);
    listCache[itemId] = null;
    console.log("After Clearing ListCache Item @ to Null",itemId,listCache);
};

addListCacheItem = function(newItem){
    console.log("[addListCacheItem]",newItem," @ dbID ",newItem.Item);
    console.log("Updated Cache: OK. Newsize ",listCache.push(newItem));
};