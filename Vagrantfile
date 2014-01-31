# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
  config.vm.hostname = "barteguiden-server"
  config.vm.network "forwarded_port", guest: 80, host: 10913
  config.vm.provision :shell, :path => "config/bootstrap.sh"
end
