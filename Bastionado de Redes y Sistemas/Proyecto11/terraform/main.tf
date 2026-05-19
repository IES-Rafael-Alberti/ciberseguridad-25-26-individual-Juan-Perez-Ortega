terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.0"
}

provider "docker" {}

resource "docker_network" "attack_net" {
  name = var.network_name

  ipam_config {
    subnet  = var.network_subnet
    gateway = var.network_gateway
  }
}

resource "docker_image" "target" {
  name = "target:latest"
  build {
    context    = "${path.module}/../docker/target"
    dockerfile = "Dockerfile"
  }
  triggers = {
    dockerfile = filemd5("${path.module}/../docker/target/Dockerfile")
  }
}

resource "docker_image" "monkey_island" {
  name         = "infectionmonkey/monkey-island:latest"
  keep_locally = false
}

resource "docker_volume" "monkey_data" {
  name = "monkey-data"
}

resource "docker_container" "target" {
  name     = var.target_name
  image    = docker_image.target.image_id
  hostname = "target-server"

  networks_advanced {
    name         = docker_network.attack_net.name
    ipv4_address = var.target_ip
  }

  ports {
    internal = 22
    external = 2222
  }

  ports {
    internal = 80
    external = 8080
  }

  capabilities {
    add = ["NET_ADMIN"]
  }

  privileged = true
  restart    = "unless-stopped"
}

resource "docker_container" "monkey_island" {
  name  = var.monkey_name
  image = docker_image.monkey_island.image_id

  networks_advanced {
    name         = docker_network.attack_net.name
    ipv4_address = var.monkey_ip
  }

  ports {
    internal = 5000
    external = 5000
  }

  volumes {
    volume_name    = docker_volume.monkey_data.name
    container_path = "/home/monkey-island-user/.monkey_island"
  }

  restart    = "unless-stopped"
  depends_on = [docker_container.target]
}

resource "docker_image" "control" {
  name = "control:latest"
  build {
    context    = "${path.module}/../docker/control"
    dockerfile = "Dockerfile"
  }
  triggers = {
    dockerfile = filemd5("${path.module}/../docker/control/Dockerfile")
  }
}

resource "docker_container" "control" {
  name     = var.control_name
  image    = docker_image.control.image_id
  hostname = "control"

  networks_advanced {
    name         = docker_network.attack_net.name
    ipv4_address = var.control_ip
  }

  volumes {
    host_path      = abspath("${path.module}/../ansible")
    container_path = "/workspace/ansible"
  }

  volumes {
    host_path      = abspath("${path.module}/../inspec")
    container_path = "/workspace/inspec"
  }

  tty        = true
  stdin_open = true
  restart    = "unless-stopped"
  depends_on = [docker_container.target]
}
