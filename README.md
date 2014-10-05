# Barteguiden-Server

This is the server for the Barteguiden-project.

## Setup

Prerequisites:

- [Vagrant](http://vagrantup.com) ([Binaries](http://vagrantup.com/downloads.html))
- [VirtualBox](https://virtualbox.org) ([Binaries](https://virtualbox.org/wiki/Downloads))

Steps to get up and running:

```
$ git clone https://github.com/Studentmediene/Barteguiden-Server.git
$ cd Barteguiden-Server
$ vagrant up
$ vagrant ssh
$ sudo service nginx restart
$ cd /vagrant/backend
$ npm run-script debug
```
*NOTE!* The first time, you'll have to run `NODE_ENV=development RESET_DB=1 npm run-script debug` instead of just `npm run-script debug`.

The web server should now be available at: [http://localhost:10913/v1/](http://localhost:10913/v1/)

## TODO

- ```vagrant ssh```
- Where to find files?
- How to start web servers manually?
- Create a short summary how the server is structured (nginx/node)
- Read NSHipster post about what to include in a README
- Special requirements for the production server? (Eventually remove the installation guide on Google Drive)
