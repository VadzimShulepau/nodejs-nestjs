import { v4 as uuid } from 'uuid';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from 'src/artist/interfaces/artist.interface';

export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  // @OneToMany(() => AlbumEntity, (album) => album.artistId)
  // albums: AlbumEntity[];

  // @OneToMany(() => TrackEntity, (track) => track.artistId)
  // tracks: TrackEntity[];

  constructor(name: string, grammy: boolean) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
  }
}
