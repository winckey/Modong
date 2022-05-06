FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/board-service-1.0.jar BoardService.jar

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "BoardService.jar"]
