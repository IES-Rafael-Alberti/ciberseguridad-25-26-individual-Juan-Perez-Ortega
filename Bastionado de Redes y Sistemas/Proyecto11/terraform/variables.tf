variable "network_name" {
  description = "Nombre de la red Docker"
  type        = string
  default     = "attack-net"
}

variable "network_subnet" {
  description = "Subred de la red Docker"
  type        = string
  default     = "172.20.0.0/24"
}

variable "network_gateway" {
  description = "Puerta de enlace de la red Docker"
  type        = string
  default     = "172.20.0.1"
}

variable "target_name" {
  description = "Nombre del contenedor objetivo"
  type        = string
  default     = "target"
}

variable "target_ip" {
  description = "IP del contenedor objetivo"
  type        = string
  default     = "172.20.0.3"
}

variable "monkey_name" {
  description = "Nombre del contenedor Infection Monkey"
  type        = string
  default     = "monkey-island"
}

variable "monkey_ip" {
  description = "IP del contenedor Infection Monkey"
  type        = string
  default     = "172.20.0.2"
}

variable "control_name" {
  description = "Nombre del contenedor de control"
  type        = string
  default     = "control"
}

variable "control_ip" {
  description = "IP del contenedor de control"
  type        = string
  default     = "172.20.0.4"
}
