FROM node:16 as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

ENV TZ Asia/Seoul

FROM nginx:stable-alpine as production-stage
# 로컬의 conf파일을 도커로 복사
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# 위에서 생성한 build 파일을 /usr/share/nginx/html로 복사
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


