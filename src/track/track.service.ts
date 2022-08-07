// import { Favorites } from './../favorites/interfaces/favorites.interface';
import { TrackEntity } from './entities/track.entity';
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async create(
    createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity | undefined> {
    const { name, artistId, albumId, duration } = createTrackDto;
    const newTrack = new TrackEntity(name, artistId, albumId, duration);

    const track = this.trackRepository.create(newTrack);
    await this.trackRepository.save(track);
    return track;
  }

  async findAll(): Promise<TrackEntity[]> {
    return this.trackRepository.find();
  }

  async findOne(id: string): Promise<TrackEntity | undefined> {
    const track = await this.trackRepository.findOneBy({ id });
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity | undefined> {
    const track = await this.findOne(id);

    const { name, artistId, albumId, duration } = updateTrackDto;

    if (!track) throw new NotFoundException('user not found');
    const updatedTrack = Object.assign(track, {
      name,
      artistId,
      albumId,
      duration,
    });

    await this.trackRepository.update(id, updatedTrack);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const track = await this.findOne(id);
    if (!track) throw new NotFoundException('track not found');

    await this.trackRepository.delete(id);
    await this.favoritesService.deleteFavsTrack(id);
  }
}
