function searchHardware(query) {

query = query.toLowerCase();

return HARDWARE_DB.filter(item => {

return (
item.model.toLowerCase().includes(query) ||
item.brand.toLowerCase().includes(query) ||
item.category.toLowerCase().includes(query) ||
item.specs.toLowerCase().includes(query)
);

});
}