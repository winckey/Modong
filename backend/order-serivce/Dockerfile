FROM openjdk:11-jdk-slim
VOLUME /tmp

COPY ./build/libs/order-serivce-1.0.jar OrderService.jar

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "OrderService.jar"]
