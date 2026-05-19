FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    sshpass \
    openssh-client \
    curl \
    wget \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install ansible

RUN curl -L https://omnitruck.chef.io/install.sh | bash -s -- -P inspec

WORKDIR /workspace

CMD ["tail", "-f", "/dev/null"]
