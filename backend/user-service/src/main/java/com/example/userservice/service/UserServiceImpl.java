package com.example.userservice.service;

import com.example.userservice.db.repository.RefreshTokenRedisRepository;
import com.example.userservice.dto.UserDto;
import com.example.userservice.db.entity.UserEntity;
import com.example.userservice.db.repository.UserRepository;
import com.example.userservice.util.JwtTokenUtil;
import com.example.userservice.util.RefreshToken;
import com.example.userservice.vo.ReponseLogin;
import com.example.userservice.vo.RequestUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final Environment env;

    @Override
    public UserDto createUser(RequestUser requestUser) {

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);// 모델 매핑전략지정 : STRICT 일치하지 않으면 실행 x
        //     UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);

        UserEntity userEntity = UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(requestUser.getEmail())
                .name(requestUser.getName())
                .encryptedPwd(bCryptPasswordEncoder.encode(requestUser.getPwd())).build();


        userRepository.save(userEntity);

        UserDto returnUserDto = modelMapper.map(userEntity, UserDto.class);
        return returnUserDto;
    }

    @Override
    public UserDto getUserByUserId(String userId) {

        UserEntity userEntity = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserDto userDto = new ModelMapper().map(userEntity, UserDto.class);

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

        return userDto;
    }

    @Override
    public Iterable<UserEntity> getUserByAll() {
        return userRepository.findAll();
    }

    @Override
    public UserDto getUserDetailsByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        //이거 커스텀해서 계속 사용할수 있는지 찾아보기

        UserDto userDto = mapper.map(userEntity, UserDto.class);
        return userDto;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("user not found"));


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


    public RefreshToken saveRefreshToken(String username) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(username,
                jwtTokenUtil.generateRefreshToken(username), Long.parseLong(env.getProperty("token.re_expiration_time"))));
    }

    @Override
    public ReponseLogin reissue(String refreshToken, RequestUser requestUser) {
        UserEntity userEntity = userRepository.findByEmail(requestUser.getEmail()).get();
        RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(userEntity.getEmail()).orElseThrow(NoSuchElementException::new);

        if (refreshToken.equals(redisRefreshToken.getRefreshToken())) {
            return reissueRefreshToken(refreshToken, userEntity);
        }
        throw new IllegalArgumentException("토큰이 일치하지 않습니다.");
    }

    private ReponseLogin reissueRefreshToken(String refreshToken, UserEntity userEntity) {
        String username = userEntity.getName();
        if (lessThanReissueExpirationTimesLeft(refreshToken)) {
            String accessToken = jwtTokenUtil.generateAccessToken(username);
            return ReponseLogin.of(accessToken, saveRefreshToken(username).getRefreshToken(), userEntity);
        }
        return ReponseLogin.of(jwtTokenUtil.generateAccessToken(username), refreshToken, userEntity);
    }


    private boolean lessThanReissueExpirationTimesLeft(String refreshToken) {
        return jwtTokenUtil.getRemainMilliSeconds(refreshToken) < Long.parseLong(env.getProperty("token.re_expiration_time"));
    }
}
