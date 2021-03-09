const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const User = require('../../models/User')
const Complaint = require('../../models/Complaint')
const bcrypt = require('bcryptjs')
const users = require('./users')
const complaints = require('./complaints')

const mongoose = require('mongoose')

const AdminBroOptions = {
  resources: [users,complaints],
  branding: {
    companyName: 'complaintDesk',
  }
}

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
  cookieName:process.env.ADMIN_COOKIE_NAME || "admin-bro",
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
  authenticate: async (email, password)=>{

    const user  = await User.findOne({ email })

    if(user && bcrypt.compare(password,user.password) && user.role==='admin')
    {
      return user
    }
    return null
  }
})

module.exports = router