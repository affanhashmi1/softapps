const nodemailer = require('nodemailer')
const constants = require('../utilities/constants')

const send = async (payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['name', 'email', 'subject', 'message'], payload)
    if (message.length > 0) throw new Error(`${message.join(', ')} missing from the request`)

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const info = await transporter.sendMail({
      from: 'SoftApps <affanhashmi101@gmail.com>',
      to: `${payload.name} <${payload.email}>`,
      subject: payload.subject,
      html: payload.message
    })

    return {
      status: true,
      id: info.messageId,
      message: 'Email sent'
    }
  } catch (error) {
    return {
      status: false,
      message: 'Email sent failed'
    }
  }
}

module.exports = { send }