FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/apigateway-1.0.jar ApiGateway.jar

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "ApiGateway.jar"]