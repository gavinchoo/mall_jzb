var mongoose = require('../dbconnect')

var Schema = mongoose.Schema
var PersonalSchema = new Schema({
    name: String,                 // 姓名
    sex: String,                  // 性别
    birthday: Date,               // 生日
    mobile: String,               // 联系电话
    photo: String,                // 头像
    idCard: String,               // 身份证
    education: String,            // 学历
    joinPartDate: Date,           // 入党时间
    politicalStatus: String,      // 政治面貌
    village: String,              // 乡镇
    town: String,                 // 所在村
    duties: String,               // 职务
    type: String,                 //  类型
    officeDate: Date,             // 任职时间
    officeYear: Number,           // 任职年限
    townType: String,             // 村性质
    appraise: String,             // 评优情况
    beforeWork: String,           // 在村任职前职业
    beforeDuties: String,         // 是否之前担任其他职务
})

var PersonalDb = mongoose.model('personals', PersonalSchema)

module.exports = PersonalDb