#!/bin/bash

mkdir -p /var/run/sshd /run/rsyslogd

rsyslogd || true
/usr/sbin/sshd || true
nginx || true

echo "==================================="
echo " Target server corriendo"
echo " SSH  -> puerto 22  (2222 en host)"
echo " HTTP -> puerto 80  (8080 en host)"
echo "==================================="

tail -f /dev/null
