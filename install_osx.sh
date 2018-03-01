#!/bin/bash

sudo port selfupdate
sudo port upgrade outdated

sudo port install nginx git

sudo port install py27-pip
sudo port select --set pip pip27
which pip

sudo pip install --upgrade pip

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

echo "Installing requirements"
modules=$(cat requirements.txt )
for m in $modules; do
  sudo easy_install $m;
done

#TODO INSTALL WITH easy_install
sudo pip install http://projects.unbit.it/downloads/uwsgi-latest.tar.gz
sudo ln -s /opt//local/Library/Frameworks/Python.framework/Versions/2.7/bin/uwsgi /opt/local/sbin/


echo "Preparing database"
cd server/
python manage.py migrate
python manage.py loaddata config/default/*.json

echo "Creating superuser for Django server"
python manage.py createsuperuser

echo "Creating required directories"
mkdir -p /data/ebiokit-data/nginx/sites-enabled/conf/
mkdir -p /data/ebiokit-data/ebiokit_components/ebiokit-data
mkdir -p /data/ebiokit-data/ebiokit_components/ebiokit-logs
mkdir -p /data/ebiokit-data/ebiokit_components/ebiokit-services/init-scripts
mkdir -p /data/ebiokit-data/ebiokit_components/ebiokit-services/launchers
mkdir -p /data/ebiokit-data/ebiokit_components/ebiokit-services/uninstallers
cp config/default/main-site.* /data/ebiokit-data/nginx/sites-enabled/conf/

echo "Please download the eBioKit virtual machine from ftp://ftpuser@77.235.253.230/ebiokit-original.tar.gz"
echo "and import the machine in VirtualBox"
echo "You will need also to configure Nginx to run as a reverse proxy. Add the following "
echo "lines at /etc/nginx/sites-enabled/default:"
echo ""
echo "server {"
echo "     ..."
echo "     include /data/ebiokit/nginx/sites-enabled/conf/*.conf;"
echo "     ..."
echo "}"
echo ""