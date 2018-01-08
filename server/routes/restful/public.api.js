var ResponseResult = require('../model/response.result')
var ProvinceDb = require('../../db/mongo/index').Province
var CityDb = require('../../db/mongo/index').City
var AreaDb = require('../../db/mongo/index').Area

module.exports = {
    init: function (app, auth) {
        app.post('/Public/getProvinces', this.getProvinces)
        app.post('/Public/getCities', this.getCities)
        app.post('/Public/getAreas', this.getAreas)
    },

    getProvinces: function (req, res) {
        ProvinceDb.find({}).sort({id:1}).exec(function (err, result) {
            if (result != null) {
                res.json(new ResponseResult(1, "获取地址成功", result));
            } else {
                res.json(new ResponseResult(0, '获取地址失败'));
            }
        })
    },

    getCities: function (req, res) {
        var province_id = req.body.province_id.substring(0, 2)
        CityDb.find({id: {$regex: `^${province_id}`}}).sort({id:1}).exec(function (err, result) {
            if (result != null) {
                res.json(new ResponseResult(1, "获取地址成功", result));
            } else {
                res.json(new ResponseResult(0, '获取地址失败'));
            }
        })
    },

    getAreas: function (req, res) {
        var city_id = req.body.city_id.substring(0, 4)
        AreaDb.find({id: {$regex: `^${city_id}`}}).sort({id:1}).exec(function (err, result) {
            if (result != null) {
                res.json(new ResponseResult(1, "获取地址成功", result));
            } else {
                res.json(new ResponseResult(0, '获取地址失败'));
            }
        })
    },

}
