# !! This is only tested on Ubuntu !!

# Quick Links
### Startup Script
My startup script will update and upgrade your packages, install docker, open the ssh port with ufw, and allow ssh as root.
 ```sh
wget -qO- https://raw.githubusercontent.com/Vipth/startup-script/refs/heads/main/startup.sh | sudo bash
```

### Individual Scripts
If you just want to do a specific thing, consider using these:

#### Install Docker
```sh
wget -qO- https://raw.githubusercontent.com/Vipth/startup-script/refs/heads/main/indvidual%20scripts/install_docker.sh | sudo bash
```

### Update Crafty
```sh
wget -qO- https://raw.githubusercontent.com/Vipth/startup-script/refs/heads/main/indvidual%20scripts/update_crafty.sh | sudo bash
```
