#!/usr/bin/env bash

HOME=/home/vagrant
PROJECT=/vagrant
CONFIG=$PROJECT/config
BACKEND=$PROJECT/backend
FRONTEND=$PROJECT/frontend
IMPORT=$PROJECT/import-scripts

log () {
  echo "[Barteguiden-Server] $1" | tee -a $HOME/bootstrap.log
}

log 'Installing common requirements...'
apt-get update
# apt-get install -y tmux
# apt-get install -y software-properties-common
apt-get install -y python-software-properties # Needed for 'add-apt-repository' command

log 'Installing node...'
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs
npm -g install supervisor

log 'Installing nginx...'
apt-get install -y nginx
rm /etc/nginx/sites-enabled/default
ln -s $CONFIG/nginx.conf /etc/nginx/sites-enabled/barteguiden.no

log 'Setting up backend...'
cd $BACKEND && npm install
mkdir -p $BACKEND/data # Needed for sqlite database

log 'Starting servers...'
service nginx restart
# cd $BACKEND && RESET_DB=1 npm start

log 'Finished bootstrapping'
