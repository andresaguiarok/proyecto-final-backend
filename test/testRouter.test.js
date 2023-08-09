const chai        = require("chai")
const supertest   = require("supertest")

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe("Route testing", () => {
    let cookie
    describe("Testing de api/session", () => {
        it("Endpoint POST: User register", async() => {
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
        it("Endpoint POST: User login", async() => {
            const userMock = {
                email: "migueLovin@example.com",
                password: "macLovin"
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
        it("Endpoint Get: Display some logged in user data", async() => {
            const { _body } = await requester.get("/api/session/current").set("Cookie", [`${cookie.name}=${cookie.value}`])
            expect(_body).to.be.ok
            expect(_body.toInfo.email).to.be.equal("migueLovin@example.com")
            expect(_body.toInfo.role).to.be.equal("user")
        })
    })
})