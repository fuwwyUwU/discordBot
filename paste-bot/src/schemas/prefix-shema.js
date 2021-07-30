const { Message } = require('discord.js')
const mongoose = require('mongoose')
const mongo = require('../mongo')

const ReqString = {
    type: String,
    required: true
}

const PrefixSchma = mongoose.Schema({
    _id: ReqString,
    prefix: ReqString
})

module.exports = mongoose.model('users-prefix', PrefixSchma)


