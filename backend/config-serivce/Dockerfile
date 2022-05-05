FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/config-service-1.0.jar ConfigService.jar

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "ConfigService.jar"]