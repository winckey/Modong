FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/alarm-service-1.0.jar AlarmService.jar

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "AlarmService.jar"]
