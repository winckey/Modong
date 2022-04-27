package com.example.userservice.service;

import com.example.userservice.client.OrderServiceClient;
import com.example.userservice.dto.UserDto;
import com.example.userservice.repository.UserEntity;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.vo.ResponseOrder;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.*;

@Service
@Slf4j

public class UserServiceImpl implements UserService {


    UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;



    @Autowired
    public UserServiceImpl(UserRepository userRepository , BCryptPasswordEncoder bCryptPasswordEncoder ) {
                                                                //BCryptPasswordEncoder 여기 뜨는 에러는 빈으로 생성한적이 없기때문에
                                                                //Autowired할수없음 -> 등록과정이 필요하다.
        this.userRepository =userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;

    }

    @Override
    public UserDto createUser(UserDto userDto) {
        userDto.setUserId(UUID.randomUUID().toString());

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);// 모델 매핑전략지정 : STRICT 일치하지 않으면 실행 x
        UserEntity userEntity = modelMapper.map(userDto , UserEntity.class);


        userEntity.setEncryptedPwd(bCryptPasswordEncoder.encode(userDto.getPwd()));// 비밀번호 암호화


        userRepository.save(userEntity);

        UserDto returnUserDto = modelMapper.map(userEntity , UserDto.class);
        return returnUserDto;
    }

    @Override
    public UserDto getUserByUserId(String userId) {

        UserEntity userEntity = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserDto userDto = new ModelMapper().map(userEntity, UserDto.class);

        List<ResponseOrder> orders = new ArrayList<>();
        /* Using as rest template */
//        String orderUrl = String.format(env.getProperty("order_service.url"), userId);
//        ResponseEntity<List<ResponseOrder>> orderListResponse =
//                restTemplate.exchange(orderUrl, HttpMethod.GET, null,
//                                            new ParameterizedTypeReference<List<ResponseOrder>>() {
//                });
//        List<ResponseOrder> ordersList = orderListResponse.getBody();

        /* Using a feign client */
        /* Feign exception handling */
//        List<ResponseOrder> ordersList = orderServiceClient.getOrders(userId);


        userDto.setOrders(orders);

        return userDto;
    }

    @Override
    public Iterable<UserEntity> getUserByAll() {
        return userRepository.findAll();
    }

    @Override
    public UserDto getUserDetailsByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException(email));

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        //이거 커스텀해서 계속 사용할수 있는지 찾아보기

        UserDto userDto = mapper.map(userEntity, UserDto.class);
        return userDto;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity =userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("user not found"));


        return new User(userEntity.getEmail(), userEntity.getEncryptedPwd(),
                true, true, true, true,
                new ArrayList<>());
//        public User(String username, String password, boolean enabled, boolean accountNonExpired,
//        boolean credentialsNonExpired, boolean accountNonLocked,
//        Collection<? extends GrantedAuthority> authorities) {
//            Assert.isTrue(username != null && !"".equals(username) && password != null,
//                    "Cannot pass null or empty values to constructor");
//            this.username = username;
//            this.password = password;
//            this.enabled = enabled;
//            this.accountNonExpired = accountNonExpired;
//            this.credentialsNonExpired = credentialsNonExpired;
//            this.accountNonLocked = accountNonLocked;
//            this.authorities = Collections.unmodifiableSet(sortAuthorities(authorities));
//        }
    }
}
