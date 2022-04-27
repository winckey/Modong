FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/config-Service-1.0.jar ConfigService.jar
ENTRYPOINT ["java", "-jar", "ConfigService.jar"]