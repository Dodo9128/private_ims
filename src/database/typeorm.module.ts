/*
* typeORM에서 제공되던 EntityRepository가 v0.3.x부터 deprecated 되었기 때문에 만들었음...
* */
import { DynamicModule, Provider } from "@nestjs/common";
import { getDataSourceToken } from "@nestjs/typeorm";
import { DataSource} from "typeorm";
import { TYPEORM_CUSTOM_REPOSITORY } from "../api/decorator/typeorm.decorator"; // 이 데코레이터가 기존의 @EntityRepository를 대체한다.

export class CustomTypeOrmModule {
  public static forCustomRepository<T extends new (...args: any[]) => any>(repositories: T[]): DynamicModule { //클래스 데코레이터
    const providers: Provider[] = [];

    for (const repository of repositories) { //동적으로 받아온 repositories array를 순회하면서 repository를 추출한다~
      const entity = Reflect.getMetadata(TYPEORM_CUSTOM_REPOSITORY, repository);

      if (!entity) {
        continue;
      }

      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository = dataSource.getRepository<any>(entity);
          return new repository(baseRepository.target,
                                baseRepository.manager,
                                baseRepository.queryRunner);
        },
      });
    }

    return { exports: providers, module: CustomTypeOrmModule, providers }
  };
}
