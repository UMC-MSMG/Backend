import CoolsmsMessageService from "coolsms-node-sdk";
import dotenv from "dotenv";

dotenv.config();

const messageService = new CoolsmsMessageService(
  process.env.SMS_API_KEY as string,
  process.env.SMS_API_SECRET as string
);

messageService.sendOne({
  to: "수신번호 입력",
  from: "01045961425",
  text: "SMS는 한글 45자, 영자 90자까지 입력할 수 있습니다.",
  subject: "",
  autoTypeDetect: true,
});
