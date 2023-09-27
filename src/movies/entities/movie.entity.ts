import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from 'src/reviews/entities/review.entity';

@Entity()
export class Movie {
  // 네이버영화 API 차용
  // https://developers.naver.com/docs/serviceapi/search/movie/movie.md#%EA%B0%9C%EC%9A%94
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  subtitle: string;

  @Column({
    nullable: true,
  })
  pubDate: Date;

  @Column({
    nullable: true,
  })
  director: string;

  @Column({
    nullable: true,
  })
  actor: string;

  @Column({
    nullable: true,
  })
  userRating: number;

  @Column({
    nullable: true,
  })
  genere: string;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
