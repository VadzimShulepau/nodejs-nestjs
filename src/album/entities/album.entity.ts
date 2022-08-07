import { Album } from './../interfaces/album.interface';
import { v4 as uuid } from 'uuid';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true, default: null })
  artistId: string | null;

  constructor(name: string, year: number, artistId: string | null) {
    this.id = uuid();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
