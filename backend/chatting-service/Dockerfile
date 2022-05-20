FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/chatting-service-1.0.jar ChatService.jar

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "ChatService.jar"]
