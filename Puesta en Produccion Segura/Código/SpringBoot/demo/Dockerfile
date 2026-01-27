# Usa una imagen oficial de Java (solo JRE, más pequeña)
FROM eclipse-temurin:17-jre-alpine
# Copia el JAR ejecutable que Maven acaba de crear
COPY target/*.jar app.jar
# Define el puerto que usa Spring Boot
EXPOSE 8080
# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app.jar"]