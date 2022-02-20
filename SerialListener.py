import serial
from subprocess import call
import webbrowser

ser = serial.Serial(
    port='/dev/cu.usbmodem14301', # Change this to your COM port number
    baudrate=9600,
    parity=serial.PARITY_ODD,
    stopbits=serial.STOPBITS_TWO,
    bytesize=serial.SEVENBITS
)

if (ser.isOpen()):
    print "Serial Port is Open..."
    print "Waiting for a command ..."
    while 1:
        cmd = ser.readline()
        if cmd.strip() == "OpenWebPage":
            print "Received command from Arduino..." 
            print "Opening webpage..."
            webbrowser.open("https://phone-call-5320-dev.twil.io/phone-call")
            break
