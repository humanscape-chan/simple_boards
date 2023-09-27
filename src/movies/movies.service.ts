import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.repo.create(createMovieDto);
    await this.repo.save(movie);
    return movie;
  }

  async findAll() {
    const movies = await this.repo.find();
    return movies;
  }

  async findOne(id: number) {
    if (!id) return null;
    const movie = this.repo.findOne({
      where: {
        id,
      },
    });
    if (!movie) {
      throw new Error('movie not found');
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!movie) {
      throw new Error('movie not found');
    }
    await this.repo.save({ ...movie, ...updateMovieDto });
    return movie;
  }

  async remove(id: number) {
    const movie = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!movie) {
      throw new Error('movie not found');
    }
    await this.repo.remove(movie);
    return movie;
  }
}
