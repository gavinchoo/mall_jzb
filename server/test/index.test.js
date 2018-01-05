/* eslint-env mocha */
const supertest = require('supertest')

describe('mall-api-test', () => {
    const api = supertest('http://localhost:3000')
    var token = "";
    it('Accesstoken', (done) => {
        var body = {username: 'admin', pwd: '123456'}
        api.post('/Api/User/Accesstoken')
            .send(body)
            .expect(200)
            .end(function (req, res) {
                if (res.body.code == 0){
                    api.post('/Api/User/Register')
                        .send(body)
                        .expect(200)
                        .end(function (req, res) {
                            done()
                        })
                }else {
                    token = res.body.data.token
                    done()
                }
            })
    })


    it('getReceiveAddrs', (done) => {
        var body = {page: 2, pagesize: 10}
        api.post('/Api/User/getReceiveAddrs')
          .set("Authorization", token)
          .send(body)
          .expect(200)
          .end(function (req, res) {
              console.log(res.text)
              done()
          })
    })

    it('addReceiveAddr', (done) => {
        var body = {realname: "AAAA", address: "dfdsf", province: "广东"}
        api.post('/Api/User/addReceiveAddr')
          .set("Authorization", token)
          .send(body)
          .expect(200)
          .end(function (req, res) {
              console.log(res.text)
              done()
          })
    })
})
