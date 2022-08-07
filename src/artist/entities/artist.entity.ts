import { Artist } from './../interfaces/artist.interface';
import { v4 as uuid } from 'uuid';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
  }
}
