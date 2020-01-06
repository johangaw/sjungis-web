class RoutingService {
  list(): string {
    return '/';
  }

  showSong(songId: string): string {
    return '/' + songId;
  }

  editSong(songId: string): string {
    return '/updatera/' + songId;
  }

  newSong(): string {
    return '/ny';
  }

  settings(): string {
    return '/inställningar';
  }

}

export default new RoutingService();