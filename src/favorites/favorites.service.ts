import { ArtistService } from './../artist/artist.service';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FavoritesAlbumEntity,
  FavoritesArtistEntity,
  FavoritesEntity,
  FavoritesTrackEntity,
} from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { ServicesEnum } from './enums/fav-service.enum';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesArtistEntity)
    private favRepoArtists: Repository<FavoritesArtistEntity>,
    @InjectRepository(FavoritesAlbumEntity)
    private favRepoAlbums: Repository<FavoritesAlbumEntity>,
    @InjectRepository(FavoritesTrackEntity)
    private favRepoTracks: Repository<FavoritesTrackEntity>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  private service = {
    artists: async (id: string) => {
      return await this.artistService.findOne(id);
    },
    albums: async (id: string) => {
      return await this.albumService.findOne(id);
    },
    tracks: async (id: string) => {
      return await this.trackService.findOne(id);
    },
  };

  private async isFavs(id: string, item: ServicesEnum) {
    const favs = {
      artists: await this.favRepoArtists.find({ where: { artistId: id } }),
      albums: await this.favRepoAlbums.find({ where: { albumId: id } }),
      tracks: await this.favRepoTracks.find({ where: { trackId: id } }),
    };
    return favs[item];
  }

  private async addItem(id: string, item: ServicesEnum) {
    const isExist = await this.isFavs(id, item);

    const isService = await this.service[item](id);

    if (!isExist && isService) {
      const favs = {
        artists: async (id: string) => {
          const item = new FavoritesArtistEntity(id);
          const artist = this.favRepoArtists.create(item);
          return await this.favRepoArtists.save(artist);
        },
        albums: async (id: string) => {
          const item = new FavoritesAlbumEntity(id);
          const album = this.favRepoAlbums.create(item);
          return await this.favRepoAlbums.save(album);
        },
        tracks: async (id: string) => {
          const item = new FavoritesTrackEntity(id);
          const track = this.favRepoTracks.create(item);
          return await this.favRepoTracks.save(track);
        },
      };
      return favs[item];
    } else {
      throw new UnprocessableEntityException();
    }
  }

  private delItem(id: string, item: ServicesEnum) {
    const isExist = this.isFavs(id, item);
    if (isExist) {
      const favs = {
        artists: async (id: string) => {
          return await this.favRepoArtists.delete({ id });
        },
        albums: async (id: string) => {
          return await this.favRepoAlbums.delete({ id });
        },
        tracks: async (id: string) => {
          return await this.favRepoTracks.delete({ id });
        },
      };
      return favs[item];
    } else {
      throw new NotFoundException();
    }
  }

  async addFavsArtist(id: string): Promise<void> {
    await this.addItem(id, ServicesEnum.Artists);
  }

  async addFavsAlbum(id: string): Promise<void> {
    await this.addItem(id, ServicesEnum.Albums);
  }

  async addFavsTrack(id: string): Promise<void> {
    await this.addItem(id, ServicesEnum.Tracks);
  }

  async findAll(): Promise<FavoritesEntity> {
    const artists = await this.favRepoArtists.find();
    const albums = await this.favRepoAlbums.find();
    const tracks = await this.favRepoTracks.find();

    const favs = new FavoritesEntity(artists, albums, tracks);
    return favs;
  }

  async deleteFavsArtist(id: string): Promise<void> {
    this.delItem(id, ServicesEnum.Artists);
  }

  async deleteFavsAlbum(id: string): Promise<void> {
    this.delItem(id, ServicesEnum.Albums);
  }

  async deleteFavsTrack(id: string): Promise<void> {
    this.delItem(id, ServicesEnum.Tracks);
  }
}
