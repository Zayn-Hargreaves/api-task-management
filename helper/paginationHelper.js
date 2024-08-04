module.exports = (objectPagination,query,countRecords) =>{
    //pagination
    if(query.page){
    objectPagination.currentPage = parseInt(query.page);
    }
    if(query.limit){
        objectPagination.limitItem = parseInt(query.limit);
        }
    objectPagination.skip = (objectPagination.currentPage -1) * objectPagination.limitItem;
    const totalPage= Math.ceil(countRecords/objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    //end pagination
    return objectPagination;
}