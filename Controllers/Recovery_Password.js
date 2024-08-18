/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
//Routes
const router = express.Router();
//Models
const Recovery_Model = require('../Models/Recovery_Model');
//Libs
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
//Shared digit code variables
const sharedVariables = require('./sharedVariables');
//Validators
const utils_Controller = require('./utils_Controller');
//Variables
const saltRounds = 10;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  //tls: {
  //ciphers: 'SSLv3',
  //minVersion: 'TLSv1.2',
  //}
});

function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000);
}
var verificationCode;

const Recovery_Password_Controller = {
  async send_Digits_To_Recovery_Email(req, res) {

    await utils_Controller.email_Validator(req, res);
    if (res.headersSent) return;

    const { email, locale } = req.body;

    try {
      const [results] = await Recovery_Model.check_If_Email_Exist_Model(email);
      if (results && results.length > 0) {
        return res.sendStatus(400);
      }

      //Verification Code
      verificationCode = generateVerificationCode();
      sharedVariables.setVerificationCode(verificationCode);

      //head and text for email
      let head;
      let text;
      if (locale == 'en') {
        head = `Reset Verification Code from Ghostly Park`;
        text = `Dear User,\n\nWe have received a request to reset the password for your account at Ghostly Park.\n\nTo proceed with the password reset, please use the following verification code:${verificationCode}\n\nIf you did not initiate this request, please ignore this email. Your password will remain unchanged.\nThank you for choosing Ghostly Park. If you have any questions or concerns, please don't hesitate to contact our support team at info@ghostlypark.com.\n\nBest regards,Ghostly Park Team`;
      } else if (locale == 'gr') {
        head = `Επαλήθευση του κωδικού από το Ghostly Park`;
        text = `Αγαπητέ χρήστη,\n\nΛάβαμε ένα αίτημα επαναφοράς του κωδικού πρόσβασης για τον λογαριασμό σας στο Ghostly Park.\n\nΓια να συνεχίσετε με την επαναφορά κωδικού πρόσβασης, χρησιμοποιήστε τον ακόλουθο κωδικό επαλήθευσης:${verificationCode}\n\nΕάν δεν το κάνατε αγνοήστε αυτό το μήνυμα ηλεκτρονικού ταχυδρομείου. Ο κωδικός πρόσβασής σας θα παραμείνει αμετάβλητος.\nΣας ευχαριστούμε που επιλέξατε το Ghostly Park. Εάν έχετε οποιεσδήποτε ερωτήσεις ή ανησυχίες, μη διστάσετε να επικοινωνήσετε με την ομάδα υποστήριξής μας στη διεύθυνση info@ghostlypark.com.\n\nΜε χαιρετισμούς, η Ομάδα του Ghostly Park`;
      } else if (locale == 'es') {
        head = `Restablecer código de verificación de Ghostly Park`;
        text = `Estimado usuario:\n\nHemos recibido una solicitud para restablecer la contraseña de su cuenta en Ghostly Park.\n\nPara continuar con el restablecimiento de la contraseña, utilice el siguiente código de verificación:${verificationCode}\n\nSi no lo hizo inicie esta solicitud, ignore este correo electrónico. Su contraseña permanecerá sin cambios.\nGracias por elegir Ghostly Park. Si tiene alguna pregunta o inquietud, no dude en comunicarse con nuestro equipo de soporte en info@ghostlypark.com.\n\nSaludos cordiales, equipo de Ghostly Park`;
      } else if (locale == 'por') {
        head = `Redefinir código de verificação do Ghostly Park`;
        text = `Prezado usuário,\n\nRecebemos uma solicitação para redefinir a senha da sua conta no Ghostly Park.\n\nPara prosseguir com a redefinição da senha, use o seguinte código de verificação:${verificationCode}\n\nSe você não o fez iniciar esta solicitação, ignore este e-mail. Sua senha permanecerá inalterada.\nObrigado por escolher o Ghostly Park. Se você tiver alguma dúvida ou preocupação, não hesite em entrar em contato com nossa equipe de suporte em info@ghostlypark.com.\n\nAtenciosamente,Equipe Ghostly Park`;
      } else if (locale == 'fr') {
        head = `Réinitialiser le code de vérification de Ghostly Park`;
        text = `Cher utilisateur,\n\nNous avons reçu une demande de réinitialisation du mot de passe de votre compte sur Ghostly Park.\n\nPour procéder à la réinitialisation du mot de passe, veuillez utiliser le code de vérification suivant :${verificationCode}\n\nSi vous ne l'avez pas fait lancer cette demande, veuillez ignorer cet e-mail. Votre mot de passe restera inchangé.\nMerci d'avoir choisi Ghostly Park. Si vous avez des questions ou des préoccupations, n'hésitez pas à contacter notre équipe d'assistance à info@ghostlypark.com.\n\nMeilleures salutations, L'équipe de Ghostly Park`;
      } else if (locale == 'de') {
        head = `Setzen Sie den Bestätigungscode von Ghostly Park zurück`;
        text = `Sehr geehrter Benutzer,\n\nWir haben eine Anfrage zum Zurücksetzen des Passworts für Ihr Konto bei Ghostly Park erhalten.\n\nUm mit dem Zurücksetzen des Passworts fortzufahren, verwenden Sie bitte den folgenden Bestätigungscode:${verificationCode}\n\nFalls Sie dies nicht getan haben Wenn Sie diese Anfrage initiieren, ignorieren Sie diese E-Mail bitte. Ihr Passwort bleibt unverändert.\nVielen Dank, dass Sie sich für Ghostly Park entschieden haben. Wenn Sie Fragen oder Bedenken haben, zögern Sie bitte nicht, unser Support-Team unter info@ghostlypark.com zu kontaktieren.\n\nMit freundlichen Grüßen, Ghostly Park Team`;
      } else if (locale == 'ru') {
        head = `Сбросить код подтверждения из Ghostly Park`;
        text = `Уважаемый пользователь,\n\nМы получили запрос на сброс пароля для вашей учетной записи в Ghostly Park.\n\nЧтобы продолжить сброс пароля, используйте следующий код подтверждения:${verificationCode}\n\nЕсли вы этого не сделали инициируйте этот запрос, пожалуйста, проигнорируйте это письмо. Ваш пароль останется неизменным.\nСпасибо, что выбрали Ghostly Park. Если у вас есть какие-либо вопросы или проблемы, не стесняйтесь обращаться в нашу службу поддержки по адресу info@ghostlypark.com.\n\nС уважением, команда Ghostly Park.`;
      } else if (locale == 'ja') {
        head = `Ghostly Park から認証コードをリセットする`;
        text = `ユーザーの皆様、\n\nGhostly Park のアカウントのパスワードをリセットするリクエストを受け取りました。\n\nパスワードのリセットを続行するには、次の確認コードを使用してください:${verificationCode}\n\nまだ使用していない場合このリクエストを開始する場合は、このメールを無視してください。パスワードは変更されません。\nGhostly Park をお選びいただきありがとうございます。ご質問やご不明な点がございましたら、お気軽にサポート チーム info@ghostlypark.com までお問い合わせください。\n\nよろしくお願いいたします、Ghostly Park チーム`;
      } else if (locale == 'ch') {
        head = `重置幽灵公园验证码`;
        text = `尊敬的用户，\n\n我们收到了重置您在 Ghostly Park 帐户密码的请求。\n\n要继续重置密码，请使用以下验证码：${verificationCode}\n\n如果您没有发起此请求，请忽略此电子邮件。您的密码将保持不变。\n感谢您选择幽灵公园。如果您有任何问题或疑虑，请随时联系我们的支持团队：info@ghostlypark.com。\n\n此致，Ghostly Park 团队`;
      } else {
        head = `Reset Verification Code from Ghostly Park`;
        text = `Dear User,\n\nWe have received a request to reset the password for your account at Ghostly Park.\n\nTo proceed with the password reset, please use the following verification code:${verificationCode}\n\nIf you did not initiate this request, please ignore this email. Your password will remain unchanged.\nThank you for choosing Ghostly Park. If you have any questions or concerns, please don't hesitate to contact our support team at info@ghostlypark.com.\n\nBest regards,Ghostly Park Team`;
      }

      const mailOptions = {
        from: 'info@ghostlypark.com',
        to: email,
        subject: head,
        text: text,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.sendStatus(400);
        } else {
          return res.sendStatus(200);
        }
      });
    } catch (error) {
      res.sendStatus(400);
    }
  },

  async reset_Password_Digits_Check(req, res) {
    const { digitCode } = req.body;

    try {
      if (digitCode == verificationCode) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch (error) {
      return res.sendStatus(400);
    }
  },

  async change_Password(req, res) {

    //Validators
    await utils_Controller.password_Validator(req, res);
    if (res.headersSent) return;
    await utils_Controller.repeatPassword_Validator(req, res);
    if (res.headersSent) return;
    await utils_Controller.email_Validator(req, res);
    if (res.headersSent) return;

    const { password, repeatPassword, email } = req.body;
    console.log(password,repeatPassword,email)
    try {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          return res.sendStatus(400);
        }

        bcrypt.hash(repeatPassword, saltRounds, async (err, hashRepeat) => {
          if (err) {
            return res.sendStatus(400);
          }
          const results = await Recovery_Model.change_Password(
            hash,
            email
          );
          console.log(results)
          if (results) {
            return res.sendStatus(200);
          } else {
            return res.sendStatus(400);
          }
        });
      });
    } catch (error) {
      res.sendStatus(400);
    }
  },
};

module.exports = Recovery_Password_Controller;
