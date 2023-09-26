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
    return this.repo.save(movie);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne({
      where: {
        id,
      },
    });
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
    return this.repo.save({ ...movie, ...updateMovieDto });
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
    return this.repo.remove(movie);
  }
}
