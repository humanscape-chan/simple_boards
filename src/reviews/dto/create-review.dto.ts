import { IsString, IsOptional } from 'class-validator';
import { UserDto } from 'src/users/dtos/user.dto';
import { MovieDto } from 'src/movies/dto/movie.dto';

export class CreateReviewDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  user: UserDto;

  movie: MovieDto;
}
