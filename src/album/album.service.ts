import { AlbumEntity } from './entities/album.entity';
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
// import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async create(
    createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumEntity | undefined> {
    const { name, year, artistId } = createAlbumDto;
    const album = new AlbumEntity(name, year, artistId);

    const newAlbum = this.albumRepository.create(album);
    await this.albumRepository.save(newAlbum);
    return newAlbum;
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<AlbumEntity | undefined> {
    const album = await this.albumRepository.findOneBy({ id });
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity | undefined> {
    const album = await this.findOne(id);

    if (!album) throw new NotFoundException('album not found');
    const updatedAlbum = Object.assign(album, { ...updateAlbumDto });
    await this.albumRepository.update(id, updatedAlbum);
    return album;
  }

  async remove(id: string): Promise<void> {
    const album = await this.findOne(id);
    if (!album) throw new NotFoundException('artist not found');

    await this.albumRepository.delete(id);

    const tracks = await this.trackService.findAll();
    tracks.filter((track) => track.albumId === id);

    tracks.map(async (track) => {
      const { id, name, artistId, duration } = track;
      return await this.trackService.update(id, {
        name,
        artistId,
        albumId: null,
        duration,
      });
    });

    this.favoritesService.deleteFavsAlbum(id);
  }
}
