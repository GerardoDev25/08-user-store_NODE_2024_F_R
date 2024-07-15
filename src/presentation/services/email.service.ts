import nodemailer, { Transporter } from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    public readonly mailerService: string,
    public readonly mailerEmail: string,
    public readonly senderEmailSecret_key: string
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: senderEmailSecret_key,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
