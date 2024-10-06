import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create a post', () => {
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        content: 'This is a test post',
        status: 'draft',
      };
      const result = await controller.create(createPostDto, {
        userId: 1,
        username: 'test',
        email: 'test@test.com',
      });
      expect(result).toEqual({
        message: 'Post created successfully',
        id: expect.any(Number),
      });
    });
  });
});
