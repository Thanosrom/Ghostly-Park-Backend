/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
//Routes
const router = express.Router();
//Models
const Register_Model = require('../Models/Register_Model');
//Libs
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
//Shared digit code variables
const sharedVariables = require('./sharedVariables');
const { max } = require('moment');
//Extra validators files
// const { containsBadWords } = require('./BadWords');
// const { containsCarNames } = require('./CarWords');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
    minVersion: 'TLSv1.2',
  },
});

function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000);
}
const saltRounds = 10;
var verificationCode;

const Register_Controller = {
  async send_Digit_Code(req, res) {
    const { email, locale } = req.body;
    try {
      //Verification Code
      verificationCode = generateVerificationCode();
      sharedVariables.setVerificationCode(verificationCode);

      //head and text for email
      let head;
      let text;
      if (locale == 'en') {
        head = `Email Verification Code from Ghostly Park`;
        text = `Dear User,\n\nThank you for registering with Ghostly Park! To ensure the security of your account and to complete the registration process, we kindly ask you to verify your email address.\n\nPlease use the following verification code to confirm your email: ${verificationCode} . \n\nIf you did not request this verification code, please disregard this email.\nThank you for choosing Ghostly Park. If you have any questions or need further assistance, feel free to reach out to our support team at support@ghostlypark.com.\n\nBest regards,Ghostly Park Team`;
      } else if (locale == 'gr') {
        head = `Κωδικός επαλήθευσης email από το Ghostly Park`;
        text = `Αγαπητέ χρήστη,\n\nΣας ευχαριστούμε για την εγγραφή σας στο Ghostly Park! Για να διασφαλίσετε την ασφάλεια του λογαριασμού σας και να ολοκληρώσετε τη διαδικασία εγγραφής, σας παρακαλούμε να επαληθεύσετε τη διεύθυνση ηλεκτρονικού ταχυδρομείου σας.\n\nΠαρακαλούμε χρησιμοποιήστε τον ακόλουθο κωδικό επαλήθευσης για να επιβεβαιώσετε το email σας: ${verificationCode} . \n\nΕάν δεν ζητήσατε αυτόν τον κωδικό επαλήθευσης, αγνοήστε αυτό το μήνυμα ηλεκτρονικού ταχυδρομείου.\nΣας ευχαριστούμε που επιλέξατε το Ghostly Park. Εάν έχετε οποιεσδήποτε ερωτήσεις ή χρειάζεστε περαιτέρω βοήθεια, μη διστάσετε να επικοινωνήσετε με την ομάδα υποστήριξής μας στη διεύθυνση support@ghostlypark.com.\n\nΜε χαιρετισμούς, Ομάδα Ghostly Park`;
      } else if (locale == 'es') {
        head = `Código de verificación de correo electrónico de Ghostly Park`;
        text = `Estimado usuario:\n\n¡Gracias por registrarte en Ghostly Park! Para garantizar la seguridad de su cuenta y completar el proceso de registro, le solicitamos que verifique su dirección de correo electrónico.\n\nUtilice el siguiente código de verificación para confirmar su correo electrónico: ${verificationCode}. \n\nSi no solicitó este código de verificación, ignore este correo electrónico.\nGracias por elegir Ghostly Park. Si tiene alguna pregunta o necesita más ayuda, no dude en comunicarse con nuestro equipo de soporte en support@ghostlypark.com.\n\nSaludos cordiales, equipo de Ghostly Park`;
      } else if (locale == 'por') {
        head = `Código de verificação de e-mail do Ghostly Park`;
        text = `Prezado usuário,\n\nObrigado por se registrar no Ghostly Park! Para garantir a segurança da sua conta e concluir o processo de registro, pedimos que você verifique seu endereço de e-mail.\n\nUse o seguinte código de verificação para confirmar seu e-mail: ${verificationCode} . \n\nSe você não solicitou este código de verificação, desconsidere este e-mail.\nObrigado por escolher o Ghostly Park. Se você tiver alguma dúvida ou precisar de mais assistência, sinta-se à vontade para entrar em contato com nossa equipe de suporte em support@ghostlypark.com.\n\nAtenciosamente,Equipe Ghostly Park`;
      } else if (locale == 'fr') {
        head = `Code de vérification par e-mail de Ghostly Park`;
        text = `Cher utilisateur,\n\nMerci de vous être inscrit sur Ghostly Park ! Pour garantir la sécurité de votre compte et terminer le processus d'inscription, nous vous demandons de bien vouloir vérifier votre adresse e-mail.\n\nVeuillez utiliser le code de vérification suivant pour confirmer votre e-mail : ${verificationCode} . \n\nSi vous n'avez pas demandé ce code de vérification, veuillez ignorer cet e-mail.\nMerci d'avoir choisi Ghostly Park. Si vous avez des questions ou avez besoin d'aide supplémentaire, n'hésitez pas à contacter notre équipe d'assistance à support@ghostlypark.com.\n\nCordialement, l'équipe de Ghostly Park`;
      } else if (locale == 'de') {
        head = `E-Mail-Bestätigungscode von Ghostly Park`;
        text = `Sehr geehrter Benutzer,\n\nVielen Dank für Ihre Registrierung bei Ghostly Park! Um die Sicherheit Ihres Kontos zu gewährleisten und den Registrierungsprozess abzuschließen, bitten wir Sie, Ihre E-Mail-Adresse zu bestätigen.\n\nBitte verwenden Sie den folgenden Verifizierungscode, um Ihre E-Mail zu bestätigen: ${verificationCode} . \n\nWenn Sie diesen Bestätigungscode nicht angefordert haben, ignorieren Sie diese E-Mail bitte.\nVielen Dank, dass Sie sich für Ghostly Park entschieden haben. Wenn Sie Fragen haben oder weitere Hilfe benötigen, wenden Sie sich bitte an unser Support-Team unter support@ghostlypark.com.\n\nMit freundlichen Grüßen,Ghostly Park Team`;
      } else if (locale == 'ru') {
        head = `Код подтверждения электронной почты от Ghostly Park`;
        text = `Уважаемый пользователь,\n\nСпасибо за регистрацию в Ghostly Park! Чтобы обеспечить безопасность вашей учетной записи и завершить процесс регистрации, мы просим вас подтвердить свой адрес электронной почты.\n\nДля подтверждения электронной почты используйте следующий код подтверждения: ${verificationCode} . \n\nЕсли вы не запрашивали этот код подтверждения, проигнорируйте это письмо.\nСпасибо, что выбрали Ghostly Park. Если у вас есть какие-либо вопросы или вам нужна дополнительная помощь, обращайтесь в нашу службу поддержки по адресу support@ghostlypark.com.\n\nС уважением, команда Ghostly Park.`;
      } else if (locale == 'ja') {
        head = `Ghostly Park からのメール認証コード`;
        text = `ユーザーの皆様、\n\nGhostly Park にご登録いただきありがとうございます。アカウントのセキュリティを確保し、登録プロセスを完了するには、メール アドレスを確認してください。\n\nメール アドレスを確認するには、次の確認コードを使用してください: ${verificationCode} 。 \n\nこの確認コードを要求していない場合は、このメールを無視してください。\nGhostly Park をお選びいただきありがとうございます。ご質問がある場合、またはさらにサポートが必要な場合は、サポート チーム support@ghostlypark.com までお気軽にお問い合わせください。\n\nよろしくお願いします、Ghostly Park チーム`;
      } else if (locale == 'ch') {
        head = `幽灵公园的电子邮件验证码`;
        text = `尊敬的用户，\n\n感谢您注册幽灵公园！为了确保您的帐户安全并完成注册过程，我们恳请您验证您的电子邮件地址。\n\n请使用以下验证码来确认您的电子邮件： ${verificationCode} 。 \n\n如果您没有请求此验证码，请忽略此电子邮件。\n感谢您选择幽灵公园。如果您有任何疑问或需要进一步帮助，请随时通过 support@ghostlypark.com 联系我们的支持团队。\n\n此致，Ghostly Park 团队`;
      } else {
        head = `Email Verification Code from Ghostly Park`;
        text = `Dear User,\n\nThank you for registering with Ghostly Park! To ensure the security of your account and to complete the registration process, we kindly ask you to verify your email address.\n\nPlease use the following verification code to confirm your email: ${verificationCode} . \n\nIf you did not request this verification code, please disregard this email.\nThank you for choosing Ghostly Park. If you have any questions or need further assistance, feel free to reach out to our support team at support@ghostlypark.com.\n\nBest regards,Ghostly Park Team`;
      }

      const mailOptions = {
        from: 'info@ghostlypark.com',
        to: email,
        subject: head,
        text: text,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.sendStatus(400);
        } else {
          return res.sendStatus(200);
        }
      });
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async check_If_Email_Exist(req, res) {
    const { email } = req.body;

    try {
      const validateEmail = [body('email').isEmail()];
      await Promise.all(validateEmail.map((validation) => validation.run(req)));
      const errorsEmail = validationResult(req);
      if (!errorsEmail.isEmpty()) {
        return res.sendStatus(400);
      }
      const results = await Register_Model.check_If_Email_Exist_Model(email);
      if (results.length === 0) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch (error) {
      return res.sendStatus(400);
    }
  },

  async register_Data(req, res) {
    const { username, password, email, digitCode, carInfo } = req.body;
    //Registers
    try {
      //Username
      const validateUsername = [
        body('username')
          .isLength({ min: 2, max: 25 })
          .matches(/^[A-Za-z][A-Za-z0-9]{2,25}$/),
      ];
      await Promise.all(
        validateUsername.map((validation) => validation.run(req))
      );
      const errorsUsername = validationResult(req);
      if (!errorsUsername.isEmpty()) {
        return res.sendStatus(400);
      }
      //Password
      const validatePassword = [
        body('password')
          .isLength({ min: 8, max: 25 })
          .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?!.*[\\/#$<>%;&|(){}"`[\]]).{8,25}$/
          ),
      ];
      await Promise.all(
        validatePassword.map((validation) => validation.run(req))
      );
      const errorsPassword = validationResult(req);
      if (!errorsPassword.isEmpty()) {
        return res.sendStatus(400);
      }
      //Email
      const validateEmail = [body('email').isEmail()];
      await Promise.all(validateEmail.map((validation) => validation.run(req)));
      const errorsEmail = validationResult(req);
      if (!errorsEmail.isEmpty()) {
        return res.sendStatus(400);
      }
      //Car
      const changeCarInfoValidation = [
        body('carInfo')
          .matches(/^[A-Za-z0-9\s-]{2,25}$/)
          .isLength({ min: 2, max: 25 }),
      ];
      await Promise.all(
        changeCarInfoValidation.map((validation) => validation.run(req))
      );
      const carErrors = validationResult(req);
      if (!carErrors.isEmpty()) {
        return res.sendStatus(400);
      }

      if (digitCode == verificationCode) {
        const coins = 25;
        const gems = 25;
        const subscription = 0;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            return res.sendStatus(400);
          }
          const results = await Register_Model.register_Data_Model(
            username,
            hash,
            email,
            carInfo,
            coins,
            gems,
            subscription
          );
          if (results) {
            return res.sendStatus(200);
          } else {
            return res.sendStatus(400);
          }
        });
      } else {
        return res.sendStatus(400);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  },
};

module.exports = Register_Controller;
