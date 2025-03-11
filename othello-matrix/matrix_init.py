import json
import time
# import board
# import neopixel

class LED:
    def __init__(self, physical_address, logical_address, color=(0, 0, 0), brightness=1.0, zone=None):
        self.physical_address = physical_address
        self.logical_address = logical_address
        self.color = color
        self.brightness = brightness
        self.state = False
        self.animation_effect = None
        self.zone = zone
        self.last_updated = time.time()

    def turn_on(self, color=None):
        self.color = color if color else self.color
        self.state = True
        self.last_updated = time.time()

    def turn_off(self):
        self.state = False
        self.last_updated = time.time()

def load_leds_from_config(config_path):
    with open(config_path, 'r') as file:
        config_data = json.load(file)
    
    leds = []
    for led_data in config_data["LEDs"]:
        leds.append(
            LED(
                physical_address=led_data["physical_address"],
                logical_address=led_data["logical_address"],
                zone=led_data.get("zone", None)  # Optional
            )
        )
    return leds

# Load the LEDs from the JSON config
leds = load_leds_from_config("matrix_config.json")

# Example usage
for led in leds:
    print(f"LED {led.logical_address} at physical position {led.physical_address} in {led.zone}")
