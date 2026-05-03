#!/bin/bash
set -e  # Si cualquier comando falla, el script se detiene

# Arrancamos el servicio SSH en segundo plano
# Esto permite que Hydra pueda intentar conectarse al puerto 22
service ssh start

# Nos aseguramos de que el directorio de logs existe
# y creamos el archivo eve.json vacío para que Filebeat pueda seguirlo
mkdir -p /var/log/suricata
touch /var/log/suricata/eve.json

# Arrancamos Suricata como proceso principal del contenedor (exec = PID 1)
# -c → archivo de configuración
# -i → interfaz de red a monitorizar (eth0 = red siem-net)
# -l → directorio donde escribir los logs (eve.json irá aquí)
exec suricata -c /etc/suricata/suricata.yaml -i eth0 -l /var/log/suricata
