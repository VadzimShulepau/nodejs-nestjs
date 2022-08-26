import { v4 as uuid } from 'uuid';
import { Column, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  @JoinColumn()
  albums: Promise<AlbumEntity[]>;

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  @JoinColumn()
  tracks: Promise<TrackEntity[]>;

  constructor(name: string, grammy: boolean) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
  }
}
