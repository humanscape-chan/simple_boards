import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateMovieDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  @IsString()
  image: string;

  @Expose()
  @IsOptional()
  @IsString()
  subtitle: string;

  @Expose()
  @IsOptional()
  @IsDate()
  pubDate: Date;

  @Expose()
  @IsOptional()
  @IsString()
  director: string;

  @Expose()
  @IsOptional()
  @IsString()
  actor: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  userRating: number;

  @Expose()
  @IsOptional()
  @IsString()
  genere: string;
}
