lsblk
exit
sudo apt install pip
sudo pip3 install rpi_ws281x
sudo apt install python3
sudo apt install python3-rpi_ws281x
sudo pip install blinka
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install python3-pip
sudo apt install --upgrade python3-setuptools
sudo apt install python3-venv
python3 -m venv env --system-site-packages
source env/bin/activate
cd ~
pip3 install --upgrade adafruit-python-shell
wget https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/raspi-blinka.py
sudo -E env PATH=$PATH python3 raspi-blinka.py
source env/bin/activate
ls
sudo nano blinka-test.py
sudo chmod u+x blinka-test.py 
sudo python3 blinka-test.py 
sudo apt-get install -y i2c-tools libgpiod-dev python3-libgpiod
pip3 install --upgrade adafruit-blinka
ls /dev/i2c*
ls /dev/i2c* /dev/spi*
ls /boot
sudo nano /boot/config.txt 
sudo nano /boot/firmware/config.txt 
sudo vi /boot/firmware/config.txt 
sudo reboot
sudo nano ~/.bashrc
sudo reboot
                                                                                                    curl http://localhost:3000
