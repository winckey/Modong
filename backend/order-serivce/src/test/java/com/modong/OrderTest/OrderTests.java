package com.modong.OrderTest;

import com.modong.orderserivce.entity.Order;
import com.modong.orderserivce.entity.OrderType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.boot.test.context.SpringBootTest;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class OrderTest {

    @Test
    void contextLoads() {
    }


    @Test
    public void Order_생성(){
        //given
        Order order = Order.builder()
                .id(1L)
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .build();
        //when




        //then




    }

}
