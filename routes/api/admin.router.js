const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const {User} = require('./users')
const {Complaint} = require('./complaints')

const mongoose = require('mongoose')

const AdminBroOptions = {
  resources: [User,Complaint],
  branding: {
    companyName: 'complaintDesk',
  }
}

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'raghurajj@gmail.com',
  password: process.env.ADMIN_PASSWORD || 'raghurajj'
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
  cookieName:process.env.ADMIN_COOKIE_NAME || "admin-bro",
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
  authenticate: async (email, password)=>{
    if(email === ADMIN.email && password === ADMIN.password){
      return ADMIN
    }
    return null
  }
})

module.exports = router