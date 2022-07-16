package com.modong.orderserivce;

import com.modong.orderserivce.client.BoardClient;
import com.modong.orderserivce.client.UserClient;
import com.modong.orderserivce.dto.ItemDto;
import com.modong.orderserivce.dto.OptionDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.entity.Orders;
import com.modong.orderserivce.repository.OrderRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.io.File;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;


//@DataJpaTest//https://webcoding-start.tistory.com/20
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)//객체 생성전략 변경 한개ㅂ만 생성하도록!
@ExtendWith({MockitoExtension.class})

@Testcontainers
class OrderServiceImpTest {

    @Value("${container.port}") int port;

    @Container
    static DockerComposeContainer composeContainer =
            new DockerComposeContainer(new File("src/test/resources/docker-compose.yml"))
                    .withExposedService("study-db", 5432);


    @Autowired // junit5는 di를 스스로 지원 다른방식은 junit이 먼저 생성자를 생성하려 해서 안댐
    OrderRepository orderRepository;
    @Mock
    BoardClient boardClient;
    @Mock
    UserClient userClient;


    @Container
    static PostgreSQLContainer postgreSQLContainer= new PostgreSQLContainer().withDatabaseName("test");


    @BeforeAll
    static void beforeAll(){
        postgreSQLContainer.start();
        System.out.println("---------------------");
        System.out.println(postgreSQLContainer.getJdbcUrl());
    }
    @AfterAll
    static void afterAll(){
        postgreSQLContainer.stop();

    }
//    @Test
    void createOreder() {
        //given
        OrderService orderService = new OrderServiceImp(orderRepository , boardClient , userClient);

        OptionDto optionDto = OptionDto.builder()
                .optionContent("option")
                .build();
        ItemDto itemDto = ItemDto.builder()
                .price(1000)
                .quantity(1)
                .itemContent("item")
                .options(new ArrayList<>())
                .build();
        itemDto.getOptions().add(optionDto);
        ReqOrderDto reqOrderDto = ReqOrderDto.builder()
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .itemDtoList(new ArrayList<>())
                .build();
        reqOrderDto.getItemDtoList().add(itemDto);

        //when

        Orders orders = orderService.createOreder(reqOrderDto);


        //then
        assertEquals( OrderType.ORDER_DELIVERY, orders.getOrderType());
        assertEquals( 1L, orders.getBoardId());


    }

    @Test
    void deleteOrder() {
        OrderService orderService = new OrderServiceImp(orderRepository , boardClient , userClient);

        OptionDto optionDto = OptionDto.builder()
                .optionContent("option")
                .build();
        ItemDto itemDto = ItemDto.builder()
                .price(1000)
                .quantity(1)
                .itemContent("item")
                .options(new ArrayList<>())
                .build();
        itemDto.getOptions().add(optionDto);
        ReqOrderDto reqOrderDto = ReqOrderDto.builder()
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .itemDtoList(new ArrayList<>())
                .build();
        reqOrderDto.getItemDtoList().add(itemDto);

        //when

        Orders orders = orderService.createOreder(reqOrderDto);


        //then
        assertEquals( OrderType.ORDER_DELIVERY, orders.getOrderType());
        assertEquals( 1L, orders.getBoardId());

    }


    static class ContainerPropertyInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

        @Override
        public void initialize(ConfigurableApplicationContext context) {
            TestPropertyValues.of("container.port=" + composeContainer.getServicePort("study-db", 5432))
                    .applyTo(context.getEnvironment());
        }
    }
}