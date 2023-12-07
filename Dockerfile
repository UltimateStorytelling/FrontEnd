# Dockerfile
FROM node:18
WORKDIR "/app"

# 환경변수 설정
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

# 의존성 설치
COPY package.json .
RUN npm install

# 애플리케이션 복사 및 빌드
COPY . .
RUN npm run build

# 서버 실행
CMD ["npm", "start"]