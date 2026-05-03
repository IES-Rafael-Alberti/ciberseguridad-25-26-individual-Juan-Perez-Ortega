# Usamos Ubuntu 22.04 como base porque Suricata está en sus repos oficiales
FROM ubuntu:22.04

# Evitar preguntas interactivas durante la instalación de paquetes
ENV DEBIAN_FRONTEND=noninteractive

# Instalamos:
#   suricata      → motor IDS que analiza el tráfico de red en tiempo real
#   openssh-server → servicio SSH que será el objetivo del ataque de fuerza bruta
#   curl          → para verificar conectividad durante el troubleshooting
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        suricata \
        openssh-server \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Creamos el usuario "victim" que Hydra intentará comprometer por SSH
# La contraseña "victimpass" es la que Hydra encontrará en el diccionario rockyou.txt
RUN useradd -m -s /bin/bash victim && \
    echo "victim:victimpass" | chpasswd

# Ubuntu deshabilita la autenticación SSH por contraseña por defecto
# La habilitamos porque Hydra necesita autenticarse con usuario/contraseña
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Directorios que Suricata y SSH necesitan para funcionar
RUN mkdir -p /var/log/suricata /run/sshd /etc/suricata/rules

# Reemplazamos la configuración por defecto de Suricata con la nuestra
# Define la red a monitorizar, la interfaz y el formato de salida (EVE JSON)
COPY suricata.yaml /etc/suricata/suricata.yaml

# Reglas personalizadas: detección ICMP y fuerza bruta SSH
COPY rules/local.rules /etc/suricata/rules/local.rules

# Script de arranque: inicia SSH y luego Suricata en primer plano
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Puerto SSH expuesto para que el contenedor Kali pueda atacarlo
EXPOSE 22

CMD ["/start.sh"]
