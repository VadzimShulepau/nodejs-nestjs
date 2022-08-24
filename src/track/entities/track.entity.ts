import { Track } from './../interfaces/track.interface';
import { v4 as uuid } from 'uuid';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
  //   nullable: true,
  //   onDelete: 'SET NULL',
  // })
  // artist: ArtistEntity;
  @Column({ nullable: true, default: null })
  artistId: string | null;

  // @ManyToOne(() => AlbumEntity, (album) => album.id, {
  //   nullable: true,
  //   onDelete: 'SET NULL',
  // })
  // album: AlbumEntity;
  @Column({ nullable: true, default: null })
  albumId: string | null;

  @Column()
  duration: number;

  constructor(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ) {
    this.id = uuid();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
