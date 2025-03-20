# !! This is only tested on Ubuntu !!

# Quick Links
### Startup Script
My startup script will update and upgrade your packages, install docker, open the ssh port with ufw, and allow ssh as root.
 ```sh
wget -qO- vipth.app/jumpstart | sudo bash
```

### Individual Scripts
If you just want to do a specific thing, consider using these:

#### Install Docker
```sh
wget -qO- vipth.app/getdocker | sudo bash
```

### Update Crafty
```sh
wget -qO- vipth.app/updatecrafty | sudo bash
```
