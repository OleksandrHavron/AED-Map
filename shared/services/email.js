const nodemailer = require('nodemailer');

const {
  BASE_URL,
  EMAIL_FROM,
  EMAIL_USER,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  ACCESS_TOKEN
} = process.env || {};

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,

      }
    });
  }

  sendMail(oBody) {
    return this.transporter.sendMail({
      from: `AED-maps <${EMAIL_FROM}>`,
      ...oBody
    });
  }

  passwordReset(email, token) {
    return this.sendMail({
      to: email,
      subject: 'Відновлення пароля',
      html: `
              <h1>Вітаємо, вас!</h1>
              <p>Для успішного завершення відновлення потрібно змінити пароль.</p>
              <p>Посилання для зміни пароля - <a href="${BASE_URL}/reset/${email}/${token}">Відновити пароль</a>.</p>
              <p>Посилання дійсне протягом години.</p>
              <hr />
              <a href="${BASE_URL}">Головна сторінка</a>
            `
    });
  }

  passwordSuccessfullyReset(email) {
    return this.sendMail({
      to: email,
      subject: 'Відновлення пароля пройшло успішно',
      html: `
            <h1>Вітаємо, вас!</h1>
            <p>Відновлення пароля пройшло успішно.</p>
            <hr />
            <a href="${BASE_URL}">Головна сторінка</a>
          `
    });
  }

  userSignUp(email, token) {
    return this.sendMail({
      to: email,
      subject: 'Реєстрація нового користувача',
      html: `
              <h1>Вітаємо, вас!</h1>
              <p>Для успішного завершення реєстрації потрібно створити пароль.</p>
              <p>Посилання для створення пароля - <a href="${BASE_URL}/signup/${email}/${token}">Створити пароль</a>.</p>
              <p>Посилання дійсне протягом години.</p>
              <hr />
              <a href="${BASE_URL}">Головна сторінка</a>
            `
    });
  }

  userSuccessfullySignUp(email) {
    return this.sendMail({
      to: email,
      subject:
        'Реєстрація нового користувача пройшла успішно',
      html: `
              <h1>Вітаємо, вас!</h1>
              <p>Реєстрація нового користувача пройшла успішно.</p>
              <p>Ваша електронна адреса для входу в особистий кабінет - ${email}.</p>
              <hr />
              <a href="${BASE_URL}">Головна сторінка</a>
            `
    });
  }
}

const emailService = new EmailService();

module.exports = {
  EmailService,
  emailService
};
