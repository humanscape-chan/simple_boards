import { Expose } from 'class-transformer';

export class MovieDto {
  @Expose()
  title: string;

  @Expose()
  image: string;

  @Expose()
  subtitle: string;

  @Expose()
  pubDate: Date;

  @Expose()
  director: string;

  @Expose()
  actor: string;

  @Expose()
  userRating: number;

  @Expose()
  genere: string;
}
