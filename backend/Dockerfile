FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

COPY src ./src

RUN chmod +x mvnw && ./mvnw dependency:go-offline

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/gamerstore-0.0.1-SNAPSHOT.jar"]