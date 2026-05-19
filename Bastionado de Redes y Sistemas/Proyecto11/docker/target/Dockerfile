FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    openssh-server \
    nginx \
    iptables \
    iptables-persistent \
    fail2ban \
    curl \
    wget \
    net-tools \
    iputils-ping \
    sudo \
    python3 \
    python3-pip \
    rsyslog \
    nano \
    dos2unix \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/run/sshd /etc/iptables

RUN useradd -m -s /bin/bash ansible && \
    echo 'ansible:ansible123' | chpasswd && \
    usermod -aG sudo ansible && \
    echo 'ansible ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    echo 'PubkeyAuthentication yes' >> /etc/ssh/sshd_config

COPY entrypoint.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

EXPOSE 22 80

ENTRYPOINT ["/entrypoint.sh"]
