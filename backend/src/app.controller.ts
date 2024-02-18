import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Movie } from 'src/models';

@Controller('cine-project')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/movies/popular')
  @ApiQuery({
    name: 'pageNumber',
    type: Number,
    description: 'Page number',
    required: false,
  })
  async getPopularMovies(
    @Query('pageNumber') pageNumber?: number,
  ): Promise<Movie[]> {
    pageNumber = pageNumber ?? 1;
    return (await this.appService.getAllPopularMovies(pageNumber)).results;
  }

  @Get('/movies/:id')
  @ApiQuery({
    name: 'id',
    type: Number,
    description: 'Movie id',
    required: true,
  })
  findOne(@Param() params: { id: number }): Promise<Movie> {
    return this.appService.getMovieById(params.id);
  }

  @Get('/search')
  async getMovieByTitle(
    @Query('searchText') searchText: string,
    @Query('pageNumber') pageNumber?: number,
  ): Promise<Movie[]> {
    pageNumber = pageNumber ?? 1;
    return (await this.appService.searchPopularMovies(searchText, pageNumber))
      .results;
  }

  @Get('/genres')
  async fetchGenres() {
    return (await this.appService.getMovieGenres()).genres;
  }

  @Post('/toggle-favorite/:id')
  async toggleMovieToFavorites(@Param('id') id: string): Promise<any> {
    const movieId = parseInt(id, 10);
    if (isNaN(movieId)) {
      throw new Error('Invalid movie ID');
    }
    return this.appService.toggleMovieToFavorites(movieId);
  }

  @Get('/favorite-movies')
  async getFavoriteMovies() {
    return this.appService.getMoviesByIds();
  }

  @Get('/favorite-movies-id')
  async getFavoriteMoviesIds() {
    return this.appService.myFavoriteMovies;
  }
}
