package com.modong.boardservice.messagequeue;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaProducer {
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void send(String topic, Long boardId , String orderType , String name) {
        //topic 보낼곳
        //orderDto 내용
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";
        try {
            Delete delete  = new Delete();
            delete.setId(boardId);
            delete.setOrderType(orderType);
            delete.setName(name);
            jsonInString = mapper.writeValueAsString(delete);
        } catch(JsonProcessingException ex) {
            ex.printStackTrace();
        }

        kafkaTemplate.send(topic,jsonInString);
        log.info("Kafka Producer sent data from the Order microservice: " + boardId.toString());
    }

    public void send(String topic) {
        //topic 보낼곳
        //orderDto 내용
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "test";


        kafkaTemplate.send(topic,jsonInString);
        log.info("Kafka Producer sent data from the Order microservice: " + jsonInString);
    }
    @Getter
    @Setter
    class Delete {

        private Long id;

        private String orderType;

        private  String name;
    }
}
