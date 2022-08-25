import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('fav_artistId')
export class FavoritesArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Promise<ArtistEntity>;
  @Column({ nullable: true })
  artistId: string;

  constructor(artistId: string) {
    this.artistId = artistId;
  }
}

@Entity('fav_albumId')
export class FavoritesAlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Promise<AlbumEntity>;
  @Column({ nullable: true })
  albumId: string;

  constructor(albumId: string) {
    this.albumId = albumId;
  }
}

@Entity('fav_trackId')
export class FavoritesTrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => TrackEntity, (track) => track.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  track: Promise<TrackEntity>;
  @Column({ nullable: true })
  trackId: string;

  constructor(trackId: string) {
    this.trackId = trackId;
  }
}

// @Entity('favorites')
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
