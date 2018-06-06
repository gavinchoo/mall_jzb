var mongoose = require('mongoose')

var Schema = mongoose.Schema
var CategorySchema = require('./category')

var SourceTypeSchema = new Schema({
    value: {type: String, required: true},
    title: {type: String, required: true},
})

var ColumnsSchema = new Schema({
    title: {type: String, required: true},
    dataIndex: {type: String, required: true},
    type: {type: String, required: true},
    source: {type: SourceTypeSchema, required: true},
    category: {type: CategorySchema, required: false},
    table: {type: String, required: true},
    group: {type: String, required: true},
    showFiled: {type: String},
    valueFiled: {type: String},
    uploadUri: {type: String},
    downloadUri: {type: String},
    removeUri: {type: String},
    required: {type: Boolean},
    listshow: {type: Boolean},
})

var TableSchema = new Schema({
    projectId: {type: String, required: true},
    title: {type: String, required: true},
    name: {type: String, required: true},
    groupTitle: {type: String, required: true},
    groupName: {type: String, required: true},
    columns: {type: [ColumnsSchema]},
})

module.exports = TableSchema