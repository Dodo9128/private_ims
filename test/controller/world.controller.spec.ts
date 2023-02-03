import { Test, TestingModule } from '@nestjs/testing';
import { WorldController } from '../../src/world/world.controller';
import { WorldService } from '../../src/world/world.service';

describe('WorldController', () => {
  let controller: WorldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldController],
      providers: [WorldService],
    }).compile();

    controller = module.get<WorldController>(WorldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
