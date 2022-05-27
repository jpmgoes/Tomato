#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>

//logic
int out= 27;
int S0= 35;
int S1= 32;
int S2= 25;
int S3= 26;
int value;

int red;
int green;

int redCounter = 0;
int redLastCounterValue = 0;
int greenCounter = 0;
int totalCounter = 0;
int sauceCounter = 0;
int podreCounter = 0;

//mqtt
const char* brokerUser = "";
const char* brokerPass = "";
const char* broker = "broker.hivemq.com";
const char* brokerTopic = "tomatometro";
const int brokerPort = 1883;
const char* outTopicRed = "tomatometro/red";
const char* outTopicGreen = "tomatometro/green";
const char* outTopicTotal = "tomatometro/total";
const char* outTopicSauce = "tomatometro/sauce";
const char* outTopicPodre = "tomatometro/podre";

long currentTime, lastTime;
int count = 0;
char messagesRed[50];
char messagesGreen[50];
char messagesTotal[50];
char messagesSauce[50];
char messagesPodre[50];

// wifi
const char* ssid = "jpWifi"; 
// LAPTOP-TJHADC92 9050
// jpWifi
const char* pass = "12344321";

WiFiClient espClient;
PubSubClient client(espClient);

void setupWifi(){
  delay(100);
  Serial.print("\nConnecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, pass);
  
  while(WiFi.status() != WL_CONNECTED){
    delay(100);
    Serial.print("-");
  }
  
  Serial.print("\nConnected to ");
  Serial.println(ssid);
}

void reconnect(){
  while(!client.connected()){
    Serial.print("\nConnecting to ");
    Serial.println(broker);

    if(client.connect(brokerTopic, brokerUser, brokerPass)){
      Serial.print("\nConnected to ");
      Serial.println(broker);
    } else {
      Serial.println("Trying connect again");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(S0, OUTPUT);
  pinMode(S1, OUTPUT);
  pinMode(S2, OUTPUT);
  pinMode(S3, OUTPUT);
  pinMode(out, INPUT);
  digitalWrite(S0, HIGH);
  digitalWrite(S1, HIGH);
  
  Serial.begin(115200);
  setupWifi();
  client.setServer(broker, brokerPort);
}

int showColor(char* color, int value1, int value2){
  digitalWrite(S2, value1);
  digitalWrite(S3, value2);
  Serial.print(color);
  Serial.print(": ");
  int value = pulseIn(out, LOW);
  Serial.print(value);
  Serial.print("|");
  return value;
}

void printCounter(String name, int Value) {
  Serial.print(name);
  Serial.print(": ");
  Serial.println(Value);
}

void loop() {
  if(!client.connected()) reconnect();
  client.loop();

  // logic
  Serial.println("Sending messages:");
  red = showColor("red", 0, 0);
  green = showColor("green", 1, 1);

  // get counter
   if(red > 400 && green > 400){
     if(red < 1200 || green < 1200){
       if(green < red) {
         greenCounter++;
         totalCounter++;
      } else if(red < green) {
         redCounter++;
         totalCounter++;
      }
    }
  } 
  else if (red < 400 && green < 400) {
      podreCounter++;
      totalCounter++;
    }
  
  if(redCounter % 5 == 0 && redCounter != 0 && redLastCounterValue != redCounter) sauceCounter++;
  redLastCounterValue = redCounter;
  
  //publish
  snprintf(messagesRed, 75, "%ld", redCounter);
  snprintf(messagesGreen, 75, "%ld", greenCounter);
  snprintf(messagesTotal, 75, "%ld", totalCounter);
  snprintf(messagesSauce, 75, "%ld", sauceCounter);
  snprintf(messagesPodre, 75, "%ld", podreCounter);
  
  client.publish(outTopicRed, messagesRed);
  client.publish(outTopicGreen, messagesGreen);
  client.publish(outTopicTotal, messagesTotal);
  client.publish(outTopicSauce, messagesSauce);
  client.publish(outTopicPodre, messagesPodre);
  
  Serial.println();
  printCounter("green", greenCounter);
  printCounter("red", redCounter);
  printCounter("total", totalCounter);
  printCounter("sauce", sauceCounter);
  printCounter("podre", podreCounter);
  Serial.println("--------");
  delay(1000);
}
