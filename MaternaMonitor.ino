// LED Code: ON/OFF Functionality
const int buttonPin = 2;     // the number of the pushbutton pin
const int ledPin =  10;      // the number of the LED pin for on/off
int buttonStateMain = 0;         // variable for reading the pushbutton status

// Emergency Buttons
const int buttonPin1 = 3;     // the number of the pushbutton pin
const int ledPin1 =  8;      // the number of the LED pin for on/off
int button1State = 0;         // variable for reading the pushbutton status

const int buttonPin2 = 4;     // the number of the pushbutton pin
const int ledPin2 =  6;      // the number of the LED pin for on/off
int button2State = 0;         // variable for reading the pushbutton status

// Heart Rate Code
int const PULSE_SENSOR_PIN = 0;   // 'S' Signal pin connected to A0

int Signal;                // Store incoming ADC data. Value can range from 0-1024
int Threshold = 550;       // Determine which Signal to "count as a beat" and which to ignore.

// free fall detect code
#include "CurieIMU.h"
boolean blinkState = false;          // state of the LED
unsigned long loopTime = 0;          // get the time since program started
unsigned long interruptsTime = 0;    // get the time when free fall event is detected


void setup() {

   Serial.begin(9600); // initialize Serial communication
  while(!Serial) ;    // wait for serial port to connect.

  /* Initialise the IMU */
  CurieIMU.begin();
  CurieIMU.attachInterrupt(eventCallback);

  /* Enable Free Fall Detection */
  CurieIMU.setDetectionThreshold(CURIE_IMU_FREEFALL, 1000); // 1g=1000mg
  CurieIMU.setDetectionDuration(CURIE_IMU_FREEFALL, 50);  // 50ms
  CurieIMU.interrupts(CURIE_IMU_FREEFALL);
  
  // ON/OFF button
  pinMode(ledPin, OUTPUT); // initialize the LED pin as an output
  pinMode(buttonPin, INPUT); // initialize the pushbutton pin as an input

  // Emergency Buttons
    // button 1
  pinMode(ledPin1, OUTPUT); // initialize the LED pin as an output
  pinMode(buttonPin1, INPUT); // initialize the pushbutton pin as an input
    // button 2
  pinMode(ledPin2, OUTPUT); // initialize the LED pin as an output
  pinMode(buttonPin2, INPUT); // initialize the pushbutton pin as an input
  
}

static void eventCallback(){
  if (CurieIMU.getInterruptStatus(CURIE_IMU_FREEFALL)) {
    Serial.println("emergency");
    Serial.println("OpenWebPage");
    if (buttonStateMain == HIGH){
    digitalWrite(ledPin1, HIGH);
    interruptsTime = millis(); 
   
    }
  }
    
  
    // Heartbeat Functionality
  
    Signal = analogRead(PULSE_SENSOR_PIN); // Read the sensor value
  
    if(Signal > Threshold){                // If the signal is above threshold, turn on the LED
      digitalWrite(LED_BUILTIN,HIGH);
    } else {
      digitalWrite(LED_BUILTIN,LOW);     // Else turn off the LED
    }
    delay(10);
  }
  



void loop() {

    // LED ON/OFF Functionality

  // read the state of the ON/OFF button value:
  buttonStateMain = digitalRead(buttonPin);

  // read the state of the emergency button1 value:
  button1State = digitalRead(buttonPin1);

  // read the state of the emergency button2 value:
  button2State = digitalRead(buttonPin2);

  // if free fall event is detected in 1000ms, LED will be turned up

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  
  
    if (buttonStateMain == HIGH) {
    // add all functionality code here (dependent on the device being on, controlled by main button)
    
    // turn LED on:
    digitalWrite(ledPin, HIGH);

    // Emergency Button Functionality

    if (button1State == HIGH && button2State == HIGH) { // if both buttons are on, 
      digitalWrite(ledPin1, HIGH);
      Serial.println("emergency");
      Serial.println("OpenWebPage");
      loopTime = millis();
  }


    
  else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
  }

}
}
