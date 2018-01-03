/* eslint-env mocha */
const supertest = require('supertest')

describe('personal-service', () => {
    const api = supertest('http://localhost:3000')
    it('returns a 200 for a collection of personal', (done) => {
        var body = {page: 2, pagesize: 10}
        api.post('/Api/User/getReceiveAddrs')
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTgxNzA4ODA4MjQiLCJpYXQiOjE1MTQ3OTExODMsImV4cCI6MTUxNDgwMTI2M30.o0_kd4A68FN8BXz9KT3IYKGFdd78QYrlPgwaFoZWq9k")
          .send(body)
          .expect(200)
          .end(function (req, res) {
              console.log(res.text)
              done()
          })
    })

    it('returns a 200 for a collection of personal', (done) => {
        var body = {realname: "AAAA", address: "dfdsf", province: "广东"}
        api.post('/Api/User/addReceiveAddr')
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTgxNzA4ODA4MjQiLCJpYXQiOjE1MTQ3OTExODMsImV4cCI6MTUxNDgwMTI2M30.o0_kd4A68FN8BXz9KT3IYKGFdd78QYrlPgwaFoZWq9k")
          .send(body)
          .expect(200)
          .expect(200, done)
    })
})
