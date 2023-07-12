exports.generateInfoProductError = (product) => {
    return `One or more properties were incomplete or invalid
    List of required product properties
    * title        : Need to be string, received: ${product.title}
    * description  : Need to be string, received: ${product.description}
    * description  : Need to be number, received: ${product.price}
    * thumbnails   : Need to be string, received: ${product.thumbnails}
    * stock        : Need to be number, received: ${product.stock}
    * code         : Need to be number, received: ${product.code}`
}
