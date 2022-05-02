package com.example.apigateway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.trace.http.HttpTraceRepository;
import org.springframework.boot.actuate.trace.http.InMemoryHttpTraceRepository;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import springfox.documentation.swagger.web.SwaggerResource;
import springfox.documentation.swagger.web.SwaggerResourcesProvider;

import static java.util.stream.Collectors.toList;

@SpringBootApplication
public class ApigatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApigatewayApplication.class, args);
    }
    @Bean
    public HttpTraceRepository httpTraceRepository() {
        return new InMemoryHttpTraceRepository();
    }

    @Bean
    @Primary
    public SwaggerResourcesProvider swaggerResourcesProvider(
            DiscoveryClient discoveryClient,
            @Value("${spring.application.name}") String gateway
    ) {
        return () -> discoveryClient.getServices()
                .stream()
                .filter(service -> !service.equals(gateway))
                .map(service -> {
                    var resource = new SwaggerResource();
                    resource.setName(service);
                    resource.setLocation(String.format("/%s/v3/api-docs", service));
                    return resource;
                })
                .collect(toList());
    }
}
