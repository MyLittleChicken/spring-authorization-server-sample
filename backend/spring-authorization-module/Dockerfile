# Build stage
FROM openjdk:21-slim AS build
WORKDIR /app

# 전체 프로젝트 복사
COPY . .

# gradlew 실행 권한 부여
RUN chmod +x ./gradlew

# 필요한 모듈만 빌드
RUN ./gradlew :spring-authorization-module:bootJar --no-daemon

# Run stage
FROM openjdk:21-slim
WORKDIR /app

# 빌드된 jar 복사
COPY --from=build /app/spring-authorization-module/build/libs/*.jar app.jar

EXPOSE 9000
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
