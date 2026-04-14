# Seguridad en Conexiones Inalámbricas

## Parte 1: Guía de Hardening del Router TP-Link Archer C6

### Introducción
El TP-Link Archer C6 es un router AC1200 muy común. Esta guía securiza al máximo el dispositivo con 16 pasos prácticos. Referencia: "El mayor experto del mundo solo puede hacer un router seguro tanto como lo permita su firmware".

### Pasos de Hardening (con evidencia visual)

| Paso | Configuración | Imagen |
|------|---|---|
| 0 | **Dashboard inicial** | ![](img/Paso00-DashboardPrincipal.png) |
| 1 | **Acceso y contraseña:** Advanced > System Tools > Administration. Cambiar admin/admin por contraseña fuerte (15+ caracteres, mayúsc, minúsc, números, símbolos) | ![](img/Paso2-AdministrationPasswordChange.png) |
| 2 | **SSID:** Wireless > Wireless Settings. Cambiar de TP-Link_XXXX a nombre genérico (RED_SEGURA_2024). No ocultar SSID | ![](img/Paso3-SSIDConfiguration.png) |
| 3 | **Cifrado WiFi:** Wireless > Wireless Security. Usar WPA3 Personal o WPA2-PSK [AES]. Contraseña 20+ caracteres. NUNCA WEP/Open | ![](img/Paso4-WiFiEncryptionSettings.png) |
| 4 | **Deshabilitar WPS:** Wireless > Wireless Settings > WPS > Disable. Vulnerable a fuerza bruta | ![](img/Paso5-DisableWPS.png) |
| 5 | **Red de Invitados:** Wireless > Guest Network > Enable. Disable "Access Intranet" y "Access between Guests" | ![](img/Paso6-GuestNetworkConfiguration.png) |
| 6 | **Firewall:** Advanced > Security > Firewall > Enable. Habilitar SPI y NAT-PT | ![](img/Paso7-FirewallSettings.png) |
| 7 | **Remote Management:** Advanced > System Tools > Remote Management. Disable HTTP y HTTPS | ![](img/Paso8-RemoteManagementDisabled.png) |
| 8 | **Firmware:** Advanced > System Tools > Firmware Upgrade. Check for upgrades regularmente | ![](img/Paso9-FirmwareUpgrade.png) |
| 9 | **DNS Seguros:** Advanced > Network > DHCP Settings. Primary: 1.1.1.1, Secondary: 1.0.0.1 (Cloudflare) | ![](img/Paso10-DNSConfiguration.png) |
| 10 | **Monitoreo:** Status dashboard muestra dispositivos conectados, IPs, MACs. Revisar regularmente | ![](img/Paso11a-StatusDashboard.png) |
| 11 | **IP & MAC Binding:** Advanced > Security > IP & MAC Binding. Control de acceso por dirección MAC | ![](img/Paso12-IPMacBinding.png) |
| 12 | **System Log:** Advanced > System Tools > System Log. Enable para auditoría. Revisar para anomalías | ![](img/Paso13-SystemLog.png) |

### Medidas Críticas
- ✓ Contraseña admin fuerte (15+ caracteres)
- ✓ Cifrado WPA2/WPA3 con AES
- ✓ Firewall habilitado + SPI
- ✓ Acceso remoto deshabilitado
- ✓ Firmware actualizado
- ✓ DNS seguros (Cloudflare 1.1.1.1)
- ✓ Monitoreo de dispositivos
- ✓ Logging habilitado

### Mantenimiento
- **Mensual:** Revisar dispositivos conectados, logs, firmware updates
- **Trimestral:** Cambiar contraseñas, revisión de seguridad
- **Emergencia:** Factory reset (botón RESET 10s) si compromiso sospechado

---

## Parte 2: Infraestructura UniFi Empresarial

### 2.1 Crear Cuenta en Ubiquiti

### 2.2 Descargar e Instalar UniFi Controller

### 2.3 Diseño de la Infraestructura Física

### 2.4 Mapas de Calor

### 2.5 Guías de Hardening UniFi

---

*Documento elaborado por: Juan Pérez Ortega*
*Fecha: 2026-04-13*
*Proyecto 08: Bastionado de Redes y Sistemas*
