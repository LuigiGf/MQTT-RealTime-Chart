/// Aplicação de teste do MQTT
const mqtt = require("mqtt");
const fs = require("fs");

//funções globais
const array = [];

/// MQTT Definition host
const host = "";
const port = 1883;

/// user and password access definition
const mqttUser = "";
const mqttPass = "";

/// topic to read using MQTT
const topic = "";

//client connection using mqtt library
const client = mqtt.connect(`mqtts://${host}:${port}`, {
  username: mqttUser,
  password: mqttPass,
  ca: fs.readFileSync("./license/ca_crt.pem"),
});

//client on connection alert
client.on("connect", function () {
  console.log("Server connected!");
  client.subscribe(topic, function () {
    console.log("subscribed on topic");
    console.log("waiting for messages");
  });
});

client.on("message", function (topic, message) {
  const data = JSON.parse(message);
  const date = new Date(data.timestamp);
  date.setHours(date.getHours() - 3);
  data.timestamp = date;
  array.push(data);
  const obj = {
    array,
  };
  fs.writeFileSync(`dataMQTT.json`, JSON.stringify(obj, null, 2));
});
