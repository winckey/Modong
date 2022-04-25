package com.example.apigateway.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Slf4j
//간단하게 말 하면 JWT 토큰 파싱을 하는 Filter를 만들 것이다.
//Microservice 에서 인증은 Stateless 한 방식을 적용하는 것이 불가피하다.
//만약 그렇지 않은 Session-Cookie 기반 인증을 사용하게 된다면 모든 서버가 하나의 DB를 바라보고 사용자의 Session과 Cookie를 관리하거나 모든 서버에서 Session을 따로 관리해야 한다.
//하지만 Request Header에 Token String을 담아 stateless한 인증을 사용하면 위의 문제를 쉽게 해결할 수 있다.
//그렇기에 우리는 토큰을 이용한 인증 방식을 위해 Gateway를 사용한다.
//왜 인증을 Gateway에서 할까?
//그 이유는 바로 Gateway의 흐름을 보면 알 수 있다.
//https://wonit.tistory.com/500
public class CustomFilter extends AbstractGatewayFilterFactory<CustomFilter.Config> {
//    Spring Cloud Gateway 가 추상화해 놓은 AbstractGatewayFilterFactory 를 상속받는다.
//    그리고 GatewayFilterFactory 를 구현할 때 우리의 로직을 넣으면 되는데, 해당 추상화 메서드를 GatewayFilter apply(Config config) override 한다.
//    - AbstractGatewayFilterFactory : Gateway를 구현하기 위해서는 GatewayFilterFactory를 구현해야 하며, 상속할 수 있는 추상 클래스가 바로 AbstractGatewayFilterFactory이다.
    // 상속시 매개변수로 CustomFilter.Config 자기자신의 Config를 넘겨준다.
    public CustomFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        // Custom Pre Filter
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

            log.info("Custom PRE filter: request id -> {}", request.getId());

            // Custom Post Filter
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {// 모노 데이터타입 한개의 타입
                log.info("Custom POST filter: response code -> {}", response.getStatusCode());
            }));
        };
    }

    public static class Config {
        // Put the configuration properties
    }
}
