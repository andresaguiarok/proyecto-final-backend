const mongoose = require("mongoose")
const ProductDao = require("../src/daos/mongoDb/productDaoMongo.js")
const Assert = require("assert")
require("dotenv").config()

mongoose.connect(process.env.KEY_SECRET_TESTING)
const assert = Assert.strict

describe("testing productDao", () => {
    before(function(){
        this.dao = new ProductDao()
    })
    beforeEach(function(){
        // mongoose.connection.collections.products.drop()
        this.timeout(2000)
    })
    it("Bring all the products correctly", async function(){
        const result = await this.dao.get()
        assert.ok(typeof result, "array")
    })
    it("A product is created", async function(){
        const productMock = {
            title: "prod test 1",
            description: "prod de testing",
            price: 1234,
            thumbnails: "https://www.test.com/image",
            code: "2ffrt5543d",
            stock: 24,
            owener: "testingUser1@gmail.com"
        }

        const result = await this.dao.create(productMock)
        const product = await this.dao.getBy({title: result.title})
        console.log(product)
        assert.ok(typeof product, "object")
    })
    it("A product is updated", async function(){
        let pid = "64d1819dd1cfa0d996f83022"
        let updateBody = {
            title: "Producto testing"
        }

        const productUpdate = await this.dao.update(pid, updateBody)
        const product = await this.dao.getBy({_id: pid})
        assert.strictEqual(product.title , updateBody.title)
    })
    it("A product is removed", async function(){
        let pid = "64d1819dd1cfa0d996f83022"
        const result = await this.dao.delete(pid)
        assert.strictEqual(typeof result, "object")
    })
})
