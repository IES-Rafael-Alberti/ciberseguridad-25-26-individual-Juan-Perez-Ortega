output "target_ssh" {
  description = "Comando SSH para conectar al objetivo"
  value       = "ssh ansible@localhost -p 2222"
}

output "target_http" {
  description = "URL HTTP del servidor objetivo"
  value       = "http://localhost:8080"
}

output "monkey_island_url" {
  description = "URL de Infection Monkey Island"
  value       = "https://localhost:5000"
}

output "target_ip" {
  description = "IP interna del contenedor objetivo"
  value       = var.target_ip
}

output "monkey_ip" {
  description = "IP interna de Infection Monkey"
  value       = var.monkey_ip
}

output "control_exec" {
  description = "Comando para entrar al contenedor de control"
  value       = "docker exec -it control bash"
}
