FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/service-discovery-1.0.jar DiscoveryService.jar

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "DiscoveryService.jar"]