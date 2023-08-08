const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Product = new Schema({
    tensp: String,
    mau: String,
    loaisp: String,
    anhsp: String,
    tenkh: String,
    makh: String,
})
module.exports = mongoose.model('Product', Product)