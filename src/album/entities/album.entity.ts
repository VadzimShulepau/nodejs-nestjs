import { Album } from './../interfaces/album.interface';
import { v4 as uuid } from 'uuid';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: AlbumEntity;
  @Column({ nullable: true, default: null })
  artistId: string | null;

  constructor(name: string, year: number, artistId: string | null) {
    this.id = uuid();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
