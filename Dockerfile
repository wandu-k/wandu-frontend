# Node.js를 기반으로 하는 리액트 앱 이미지
FROM node:22-alpine3.19 as build

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치 및 빌드(CI)
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Nginx를 기반으로 하는 최종 이미지
FROM nginx:alpine

# Install Cerbot(SSL 을 위한)
RUN apk add --no-cache certbot certbot-nginx

# Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# mime.types 파일을 복사
COPY nginx/mime.types /etc/nginx/mime.types

# 빌드된 리액트 앱을 Nginx의 HTML 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# Create directory for Certbot challenge
RUN mkdir -p /var/www/certbot

# 포트 설정
EXPOSE 80
EXPOSE 443

# Nginx 실행 및 Certbot 인증서 갱신
CMD ["sh", "-c", "nginx -g 'daemon off;' & certbot certonly --webroot -w /var/www/certbot --email hppmm@naver.com --agree-tos --no-eff-email -d mgsip.xyz && crond -f"]