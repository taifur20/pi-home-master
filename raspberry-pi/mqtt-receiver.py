import paho.mqtt.client as mqtt
import ssl
import json
import RPi.GPIO as GPIO
import time

# make sure python gpio library is installed
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
kitchenLightPin = 23 # Broadcom pin 23 (P1 header pin 16)
bedLightPin = 10     # Broadcom pin 17 (P1 header pin 19)
bedFanPin = 11       # Broadcom pin 27 (P1 header pin 23)
bathLightPin = 22    # Broadcom pin 22 (P1 header pin 15)
GPIO.setup(kitchenLightPin, GPIO.OUT) # pin set as output
GPIO.setup(bedLightPin, GPIO.OUT)     # pin set as output
GPIO.setup(bedFanPin, GPIO.OUT)       # pin set as output
GPIO.setup(bathLightPin, GPIO.OUT)    # pin set as output
GPIO.output(kitchenLightPin, GPIO.LOW)
GPIO.output(bedLightPin, GPIO.LOW)
GPIO.output(bedFanPin, GPIO.LOW)
GPIO.output(bathLightPin, GPIO.LOW)

client = mqtt.Client()

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("taifur/test/pi/voice")

def on_message(client, userdata, msg):
    
     if str(msg.payload) == 'Kitchenlighton':
        print("Kitchen light on command received ")
        print(str(msg.payload))
        GPIO.output(kitchenLightPin, GPIO.HIGH)  # gpio pin high
        
     if str(msg.payload) == 'Kitchenlightoff':
        print("Kitchen light off command received ")
        print(str(msg.payload))
        GPIO.output(kitchenLightPin, GPIO.LOW)

     if str(msg.payload) == 'Bedlighton':
        print("Bedroom light on command received ")
        print(str(msg.payload))
        GPIO.output(bedLightPin, GPIO.HIGH)  # gpio pin high
        
     if str(msg.payload) == 'Bedlightoff':
        print("Bedroom light off command received ")
        print(str(msg.payload))
        GPIO.output(bedLightPin, GPIO.LOW)

     if str(msg.payload) == 'Bedroomfanon':
        print("Bedroom fan on command received ")
        print(str(msg.payload))
        GPIO.output(bedFanPin, GPIO.HIGH)  # gpio pin high
        
     if str(msg.payload) == 'Bedroomfanoff':
        print("Bedroom fan off command received ")
        print(str(msg.payload))
        GPIO.output(bedFanPin, GPIO.LOW)

     if str(msg.payload) == 'Bathroomlighton':
        print("Bathroom light on command received ")
        print(str(msg.payload))
        GPIO.output(bathLightPin, GPIO.HIGH)  # gpio pin high
        
     if str(msg.payload) == 'Bathroomlightoff':
        print("Bathroom light off command received ")
        print(str(msg.payload))
        GPIO.output(bathLightPin, GPIO.LOW)
       
        

client.on_connect = on_connect
client.on_message = on_message
#client.tls_set(ca_certs='rootCA.pem', certfile='certificate.pem.crt', keyfile='private.pem.key', cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)
client.tls_set(ca_certs='rootCA.pem', certfile='certificate.pem.crt', keyfile='private.pem.key', cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_SSLv23, ciphers=None)
#client.tls_set(ca_certs='rootCA.pem', certfile='certificate.pem.crt', keyfile='private.pem.key', tls_version=ssl.PROTOCOL_SSLv23)
#client.tls_insecure_set(True)
#client.connect("a3jra11pv5kiyg.iot.us-east-1.amazonaws.com", 8883, keepalive=60, bind_address="")
client.connect("a3jra11pv5kiyg.iot.us-east-1.amazonaws.com", 8883, keepalive=60)
client.loop_forever()

