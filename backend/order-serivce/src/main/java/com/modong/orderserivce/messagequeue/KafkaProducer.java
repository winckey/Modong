package com.modong.orderserivce.messagequeue;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.modong.orderserivce.dto.ChatDto;
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

    public ChatDto send(String topic, ChatDto chatDto) {
        //topic 보낼곳
        //orderDto 내용
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";
        try {
            jsonInString = mapper.writeValueAsString(chatDto);
        } catch(JsonProcessingException ex) {
            ex.printStackTrace();
        }

        kafkaTemplate.send(topic, jsonInString);
        log.info("Kafka Producer sent data from the Order microservice: " + chatDto);

        return chatDto;
    }
}
