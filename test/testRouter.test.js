const chai        = require("chai")
const supertest   = require("supertest")

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe("Router testing", () => {
    let cookie
    describe("Testing de api/session", () => {
        it("Endpoint POST: Register a user successfully", async() => {
            const userMock = {
                firtsName: "miguel",
                lastName: "mac lovin",
                userName: "lovinmiguel",
                email: "migueLovin@example.com",
                birthDate: "01-21-1994",
                password: "macLovin"
            }
    
            const { _body } = await requester.post("/api/session/register").send(userMock)
            expect(_body).to.be.ok
            expect(_body).to.have.property("status", "success")
        })
        it("Endpoint POST: Incorrect user registration", async() => {
            const userMock = {
                firtsName: "miguel",
                email: "migueLovin@example.com",
                birthDate: "01-21-1994",
                password: "macLovin"
            }

            const {
                _body,
                statusCode,
                ok 
            } = await requester.post("/api/session/register").send(userMock)

            expect(statusCode).to.be.equal(400)
            expect(ok).to.be.false
            expect(_body).to.have.property("status").to.be.eql("Error")
        })
        it("Endpoint POST: Login the user correctly", async() => {
            const userMock = {
                email: "andres22aguiar@gmail.com",
                password: "andres"
            }
    
            const result = await requester.post("/api/session/login").send(userMock)
            const resCookie = result.headers["set-cookie"][0]
            expect(resCookie).to.be.ok
            expect(resCookie).to.deep.include("Max-Age" || "Expires")
    
            cookie = {
                name: resCookie.split("=")[0],
                value: resCookie.split("=")[1]
            }
            expect(cookie.name).to.be.ok
            expect(cookie.name).to.be.equal("CoderCookieToken")
        }) 
        it("Endpoint POST: Password login error", async() => {
            const userMock = {
                email: "andres22aguiar@gmail.com",
                password: "23sgt"
            }
    
        const {
            statusCode,
            ok,
            _body
        } = await requester.post("/api/session/login").send(userMock)

        expect(statusCode).to.be.equal(400)
        expect(ok).to.be.false
        expect(_body).to.have.property("status").to.be.eql("error")
        expect(_body).to.have.property("message").to.be.eql("Invalid password")
        }) 
        it("Endpoint GET: You get your data correctly", async() => {
            const { _body } = await requester.get("/api/session/current").set("Cookie", [`${cookie.name}=${cookie.value}`])
            expect(_body).to.be.ok
            expect(_body.toInfo).to.have.property("email" || "role")
            expect(_body.toInfo.role).to.be.equal("premium")
        })
        it("Endpoint GET: It does not bring the user data by mistake", async() => {
            const { 
                statusCode,
                ok,
                _body
            } = await requester.get("/api/session/current")

            expect(statusCode).to.be.equal(401)
            expect(ok).to.be.false
            expect(_body).to.have.property("status").to.be.eql("error")
            expect(_body).to.have.property("error").to.be.eql("No auth token")            
        })
    })
    describe("Testing de api/products", () => {
        it("Endpoint POST: Create the product correctly", async() => {
            const productMock = {
                title: "Pantalón Urbano Puma Fandom Hombre",
                description: "Marca: PUMA",
                price: 140,
                thumbnails: "https://www.moov.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwae78e7ae/products/PU536113-01/PU536113-01-1.JPG",
                stock: 24
            }

            const { 
                _body,
                statusCode
            } = await requester.post("/api/products").send(productMock).set("Cookie", [`${cookie.name}=${cookie.value}`])
            
            expect(statusCode).to.be.equal(200)
            expect(_body).to.be.ok
            expect(_body).to.have.property("status" , "A product has been created successfully")
            expect(_body.payload).to.have.property("title" || "owener")
        })
        it("Endpoint POST: Error when creating the product due to lack of fields", async() => {
            const productMock = {
                title: "Pantalón Urbano Puma Fandom Hombre",
                thumbnails: "https://www.moov.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwae78e7ae/products/PU536113-01/PU536113-01-1.JPG",
                stock: 24
            }

            const { 
                statusCode, 
                ok,
                _body 
            } = await requester.post("/api/products").send(productMock).set("Cookie", [`${cookie.name}=${cookie.value}`])
            
            expect(statusCode).to.be.equal(404)
            expect(ok).to.be.false
            expect(_body).to.have.property("status" , "Error")
            expect(_body).to.have.property("error").to.be.eql("Error creating product")
        })
        it("Endpoint GET: Gets all products correctly", async() => {
            const { 
                statusCode,
                ok 
            } = await requester.get("/api/products").set("Cookie", [`${cookie.name}=${cookie.value}`])

            expect(ok).to.be.true
            expect(statusCode).to.be.equal(200)
        })
        it("Endpoint GET: Error when obtaining the products due to lack of login", async() => {
            const { 
                statusCode,
                ok
            } = await requester.get("/api/products")

            expect(statusCode).to.be.equal(401)
            expect(ok).to.be.false
        })
        it("Endpoint PUT: Update a product successfully", async() => {
            let pid = "65025a067a2094c819be2a1e"
            let updateBody = {
                title: "Test product 2",
                description: "this product will be used for testing 2",
                thumbnails: "https://www.test.com/on/image-false",
                stock: 45
            }

            const { 
                _body, 
                statusCode
            } = await requester.put(`/api/products/${pid}`).send(updateBody).set("Cookie", [`${cookie.name}=${cookie.value}`])
            
            expect(statusCode).to.be.equal(200)
            expect(_body).to.be.ok
            expect(_body).to.have.property("status" , "Updated product")
            expect(_body).to.have.property("message")
        })
        it("Endpoint PUT: Error when updating a product that does not exist", async() => {
            let pid = "64c3060a2fd5c54zxgds63f3"
            let updateBody = {
                title: "Test product 3",
                description: "this product will be used for testing 2",
                thumbnails: "https://www.test.com/on/image-false",
                stock: 45
            }

            const { 
                statusCode,
                ok,
                _body
            } = await requester.put(`/api/products/${pid}`).send(updateBody).set("Cookie", [`${cookie.name}=${cookie.value}`])

            expect(statusCode).to.be.equal(404)
            expect(ok).to.be.false
            expect(_body).to.have.property("status").to.be.eql("Error")
            expect(_body).to.have.property("message").to.be.eql("The product does not exist")
        })
    })
    describe("Testing de api/carts", () => {
        it("Endpoint PUT: Add a product to cart successfully", async() => {
            let cid = "64910d7703c427a0d5e1a835"
            let pid = "64cfe44584385bc20a41dd1e"
            let opid = "64c1909fc3e1cce54f5d0c7a"
            let otpid = "64a77cbad78e6863649916bb"

            const { 
                _body,
                statusCode,
                ok
            } = await requester.put(`/api/carts/${cid}/products/${pid}`).set("Cookie", [`${cookie.name}=${cookie.value}`])
            await requester.put(`/api/carts/${cid}/products/${opid}`).set("Cookie", [`${cookie.name}=${cookie.value}`])
            await requester.put(`/api/carts/${cid}/products/${otpid}`).set("Cookie", [`${cookie.name}=${cookie.value}`])

            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            expect(_body).to.have.property("status" , "The cart was updated successfully" || "message")
        })
        it("Endpoint PUT: Error when adding a product to a cart that does not exist", async() => {
            let cid = "64910d77afasf27a0ddgd835"
            let pid = "64cfe44584385bc20a41dd1e"

            const { 
                statusCode,
                ok,
                _body
            } = await requester.put(`/api/carts/${cid}/products/${pid}`).set("Cookie", [`${cookie.name}=${cookie.value}`])

            expect(statusCode).to.be.equal(404)
            expect(ok).to.be.false
            expect(_body).to.have.property("status").to.be.eql("Error")
            expect(_body).to.have.property("message").to.be.eql("The cart does not exist")
            
        })
        it("Endpoint Delete: Delete a product from the cart correctly", async() => {
            let cid = "64910d7703c427a0d5e1a835"
            let pid = "64cfe44584385bc20a41dd1e"

            const { 
                statusCode,
                ok,
                _body 
            } = await requester.delete(`/api/carts/${cid}/products/${pid}`).set("Cookie", [`${cookie.name}=${cookie.value}`])
            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            expect(_body).to.have.property("status", "success")
            expect(_body.payload).to.have.property("acknowledged", true)
        })
        it("Endpoint Delete: Error, product or cart that does not exist", async() => {
            let cid = "64910d7703c4vv0d5e1a835"
            let pid = "64cfe44xvcx8bc20a41dd1e"

            const { 
                statusCode,
                ok,
                _body 
            } = await requester.delete(`/api/carts/${cid}/products/${pid}`).set("Cookie", [`${cookie.name}=${cookie.value}`])

            expect(statusCode).to.be.equal(404)
            expect(ok).to.be.false
            expect(_body).to.have.property("status").to.be.eql("error")
            expect(_body).to.have.property("message").to.be.eql("Cart o product not found")
        })
        it("Endpoint Delete: Remove all products from cart correctly", async() => {
            let cid = "64910d7703c427a0d5e1a835"

            const { 
                statusCode,
                ok,
                _body 
            } = await requester.delete(`/api/carts/${cid}`).set("Cookie", [`${cookie.name}=${cookie.value}`])

            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            expect(_body).to.have.property("status", "success")
            expect(_body).to.have.property("message", "The cart was emptied successfully")
            expect(_body.payload).to.have.property("acknowledged", true)
            expect(_body.payload).to.have.property("matchedCount", 1)
        })
        it("Endpoint Delete: Shopping cart not found error", async() => {
            let cid = "6491ccvb7a0d5e1a835"

            const { 
                statusCode,
                ok,
                _body 
            } = await requester.delete(`/api/carts/${cid}`).set("Cookie", [`${cookie.name}=${cookie.value}`])

            expect(statusCode).to.be.equal(404)
            expect(ok).to.be.false
            expect(_body).to.have.property("status").to.be.eql("error")
            expect(_body).to.have.property("message").to.be.eql("Cart not found")
        })
    })
})