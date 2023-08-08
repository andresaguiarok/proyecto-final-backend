const mongoose = require("mongoose")
const ProductDao = require("../src/daos/mongoDb/productDaoMongo.js")
const chai = require("chai")

mongoose.connect("mongodb+srv://andresaguiarok:andres-2408@cluster0.wbacuba.mongodb.net/testing?retryWrites=true&w=majority")
const expect = chai.expect

describe("testing productDao en chai", () => {
    before(function(){
        this.dao = new ProductDao()
    })
    beforeEach(function(){
        // mongoose.connection.collections.products.drop()
        this.timeout(2000)
    })
    it("Bring all the products correctly", async function(){
        const result = await this.dao.get()
        expect(result).to.be.deep.equal([])
        expect(result).deep.equal([])
        expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equal(true)
    })
    it("A product is created", async function(){
        const productMock = {
            title: "prod test chai",
            description: "prod de testing chai",
            price: 1234,
            thumbnails: "https://www.test.com/image",
            code: "2ffrt5543",
            stock: 24,
            owener: "testingUser@gmail.com"
        }

        const result = await this.dao.create(productMock)
        expect(result).to.be.ok
    })
    it("A product is updated", async function(){
        let pid = "64d19b61914c2466615a6069"
        let updateBody = {
            title: "Prod Chai"
        }

        const productUpdate = await this.dao.update(pid, updateBody)
        const product = await this.dao.getBy({_id: pid})
        expect(productUpdate).to.be.ok
        expect(product).to.have.property("title", "Prod Chai")
    })
    it("A product is removed", async function(){
        const productMock = {
            title: "prod test chai",
            description: "prod de testing chai",
            price: 1234,
            thumbnails: "https://www.test.com/image",
            code: "2ffrt5543",
            stock: 24,
            owener: "testingUser@gmail.com"
        }

        const productCreate = await this.dao.create(productMock)
        const productRemove = await this.dao.delete(productCreate._id)
        expect(productRemove).to.be.ok
        expect(productCreate).to.have.property("title" || "owener")
    })
})