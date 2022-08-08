import { ArtistEntity } from './entities/artist.entity';
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
// import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async create(
    createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity | undefined> {
    const { name, grammy } = createArtistDto;
    const artist = new ArtistEntity(name, grammy);

    const newArtist = this.artistRepository.create(artist);
    await this.artistRepository.save(newArtist);
    return newArtist;
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<ArtistEntity | undefined> {
    const artist = this.artistRepository.findOneBy({ id });
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity | undefined> {
    const artist = await this.findOne(id);
    if (!artist) throw new NotFoundException('artist not found');
    const updatedArtist = Object.assign(artist, updateArtistDto);
    await this.artistRepository.update(id, updatedArtist);
    return updatedArtist;
  }

  async remove(id: string): Promise<void> {
    const artist = await this.findOne(id);

    if (!artist) throw new NotFoundException('artist not found');

    await this.artistRepository.delete(id);

    const albums = await this.albumService.findAll();
    albums.filter((album) => album.artistId === id);

    const tracks = await this.trackService.findAll();
    tracks.filter((track) => track.artistId === id);

    albums.map(async (album) => {
      const { id, name, year } = album;
      return await this.albumService.update(id, { name, year, artistId: null });
    });

    tracks.map(async (track) => {
      const { id, name, albumId, duration } = track;
      return await this.trackService.update(id, {
        name,
        artistId: null,
        albumId,
        duration,
      });
    });

    await this.favoritesService.deleteFavsArtist(id);
  }
}
