import express from "express";
import bodyParser from "body-parser";
import { BASE_USER_PORT } from "../config";
import {
  generateRsaKeyPair,
  exportPubKey,
  rsaEncrypt,
  createRandomSymmetricKey,
  exportSymKey,
  symEncrypt,
} from "../crypto";



export type SendMessageBody = {
  message: string;
  destinationUserId: number;
};

export async function user(userId: number) {
  const _user = express();
  _user.use(express.json());
  _user.use(bodyParser.json());


  // Variables to store the last received and last sent messages
  let lastReceivedMessage: string | null = null;
  let lastSentMessage: string | null = null;

  // Route to receive messages
  _user.post("/message", (req, res) => {
    const { message }: { message: string } = req.body;
    console.log(`User ${userId} received message: ${message}`);
    lastReceivedMessage = message;
    res.send("success");
  });

  // Route to retrieve the last received message
  _user.get("/getLastReceivedMessage", (req, res) => {
    res.json({ result: lastReceivedMessage });
  });

  // Route to retrieve the last sent message
  _user.get("/getLastSentMessage", (req, res) => {
    res.json({ result: lastSentMessage });
  });

  _user.get("/status", (req, res) => {
    res.send("live");
  });


  const server = _user.listen(BASE_USER_PORT + userId, () => {
    console.log(
      `User ${userId} is listening on port ${BASE_USER_PORT + userId}`
    );
  });

  return server;
}












