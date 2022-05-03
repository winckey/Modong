FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/chatting-service-1.0.jar ChatService.jar
ENTRYPOINT ["java", "-jar", "ChatService.jar"]
