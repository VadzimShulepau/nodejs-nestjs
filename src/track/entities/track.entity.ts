import { Track } from './../interfaces/track.interface';
import { v4 as uuid } from 'uuid';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: null })
  artistId: string | null;

  @Column({ default: null })
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
