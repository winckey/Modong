FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/user-service-1.0.jar UserService.jar

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "UserService.jar"]
