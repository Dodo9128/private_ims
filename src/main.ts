import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./libs/utils/swagger/swagger";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./libs/utils/globalErrorHandler";

async function bootstrap() {
  const startTime = process.hrtime();
  const app = await NestFactory.create(AppModule, {});

  process.title = process.env.HOSTNAME;

  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  /**
   * Cors 설정
   * TODO: 추후 acceptable domain 추가 필요
   */
  app.enableCors();

  const serverStart = await app.listen(process.env.SERVER_PORT);
  if (serverStart) {
    setTimeout(() => {
      const endTime = process.hrtime(startTime);
      console.log(`SERVER START in %d.%d seconds`, endTime[0], endTime[1]);
    }, 1000);
  }
}
void bootstrap();
