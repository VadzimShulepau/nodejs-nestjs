import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artistId')
export class FavoritesArtistEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  artistId: string;

  constructor(artistId: string) {
    this.artistId = artistId;
  }
}

@Entity('albumId')
export class FavoritesAlbumEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  albumId: string;

  constructor(albumId: string) {
    this.albumId = albumId;
  }
}

@Entity('trackId')
export class FavoritesTrackEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  trackId: string;

  constructor(trackId: string) {
    this.trackId = trackId;
  }
}

@Entity('favorites')
export class FavoritesEntity {
  artists: FavoritesArtistEntity[];
  albums: FavoritesAlbumEntity[];
  tracks: FavoritesTrackEntity[];

  constructor(
    artists: FavoritesArtistEntity[],
    albums: FavoritesAlbumEntity[],
    tracks: FavoritesTrackEntity[],
  ) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
