FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y sudo curl wget git && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn \
    apt-get install -y jq

RUN useradd -ms /bin/bash dev && \
    sudo adduser dev sudo && \
    echo "dev ALL=(ALL) NOPASSWD:ALL" | tee /etc/sudoers
    
USER dev