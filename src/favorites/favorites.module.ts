import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoritesEntity,
  FavoritesArtistEntity,
  FavoritesTrackEntity,
  FavoritesAlbumEntity,
} from './entities/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesEntity,
      FavoritesArtistEntity,
      FavoritesAlbumEntity,
      FavoritesTrackEntity,
    ]),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService, TypeOrmModule],
})
export class FavoritesModule {}
