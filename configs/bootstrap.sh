#!/usr/bin/env bash

PROJECT=/vagrant
HOME=/home/vagrant

log () {
  echo "[Barteguiden-Server] $1" | tee -a $HOME/bootstrap.log
}

log 'Installing common requirements...'
apt-get update
# apt-get install -y tmux
# apt-get install -y software-properties-common
apt-get install -y python-software-properties # Needed for 'add-apt-repository' command

log 'Installing node.js...'
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs

log 'Installing nginx...'
apt-get install -y nginx

log 'Setting up nginx...'
rm /etc/nginx/sites-enabled/default
ln -s $PROJECT/configs/nginx.conf /etc/nginx/sites-enabled/barteguiden.no
service nginx restart

log 'Installing node.js packages...'
# npm -g install locomotive
# npm -g install express
npm -g install supervisor

log 'Starting software...'
# TODO


# ---

#!/usr/bin/env bash

# HOME=/home/vagrant
# REPOS=$HOME/repos
# TOOLS=$HOME/tools
# DOWNLOADS=$HOME/downloads

# log () {
#   echo "[Barteguiden-Server] $1" | tee -a $HOME/bootstrap.log
# }

# mkdir -p $REPOS
# mkdir -p $TOOLS
# mkdir -p $DOWNLOADS

# log 'Adding repos for node and R...'
# sudo add-apt-repository -y ppa:chris-lea/node.js
# sudo sh -c 'echo "deb http://cran.rstudio.com/bin/linux/ubuntu precise/" >> /etc/apt/sources.list'
# sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9

# log 'Retrieving updated list of packages...'
# apt-get update

# log 'Installing common requirements...'
# apt-get install -y curl git python-pip make python-dev

# log 'Installing scientific Python stack...'
# apt-get install -y python-numpy python-scipy python-matplotlib python-pandas python-scikits.learn
# sudo pip install ipython

# log 'Installing GNU parallel...'
# cd $DOWNLOADS
# wget http://ftp.gnu.org/gnu/parallel/parallel-latest.tar.bz2
# tar -xjf parallel-latest.tar.bz2
# cd $(find -name 'parallel-*' -type d)
# ./configure && make && sudo make install

# log 'Installing qstats...'
# cd $DOWNLOADS
# git clone https://github.com/tonyfischetti/qstats.git
# cd qstats
# make && make install

# log 'Installing jq...'
# cd $TOOLS
# wget http://stedolan.github.io/jq/download/linux64/jq
# chmod +x jq

# log 'Installing requirements for scrape...'
# sudo apt-get install -y libxml2-dev libxslt1-dev 
# sudo pip install cssselect lxml

# log 'Cloning data-science-toolbox repository...'
# cd $REPOS
# git clone https://github.com/jeroenjanssens/data-science-toolbox.git

# log 'Installing csvkit...'
# sudo pip install csvkit

# cd $HOME
# log 'Installing json2csv...'
# echo 'golang-go golang-go/dashboard boolean true' > preseed.conf
# sudo debconf-set-selections preseed.conf
# sudo apt-get install -y golang-go
# sudo go get github.com/jehiah/json2csv

# log 'Installing xml2json...'
# sudo apt-get install -y python-software-properties python g++ make 
# sudo apt-get install -y nodejs
# curl https://npmjs.org/install.sh | sudo clean=yes sh
# sudo npm install -g xml2json-command

# log 'Installing R...'
# sudo apt-get install -y r-base-dev

# log 'Installing sqldf, ggplot2, and plyr packages'
# echo 1 | sudo $REPOS/data-science-toolbox/tools/Rio -ve 'install.packages(c("sqldf","ggplot2","plyr"),repos="http://cran.us.r-project.org")'

# sudo echo 'export PATH=$PATH:/usr/lib/go/bin:/home/vagrant/repos/data-science-toolbox/tools:/home/vagrant/tools' >> $HOME/.bashrc 
# sudo chown -R vagrant:vagrant $REPOS
# sudo chown -R vagrant:vagrant $TOOLS
# sudo rm -rf $DOWNLOADS
# sudo rm -rf $HOME/tmp
# sudo rm $HOME/preseed.conf

log 'Finished bootstrapping'
