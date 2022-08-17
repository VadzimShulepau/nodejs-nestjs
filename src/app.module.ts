import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { serviceConfig } from './configs/service.config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.evn' }),
    TypeOrmModule.forRoot(serviceConfig),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
})
export class AppModule {}
