FROM amazoncorreto:17-alpine

COPY target/apiSPA-0.0.1-SNAPSHOT.jar /api-v1.jar

ENTRYPOINT ["java", "-jar", "/api-v1.jar"]