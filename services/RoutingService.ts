class RoutingService {
  list(): string {
    return "/";
  }

  showSong(songId: string): string {
    return "/" + songId;
  }

  editSong(songId: string): string {
    return "/edit/" + songId;
  }

  newSong(): string {
    return "/new";
  }

  settings(): string {
    return "/settings";
  }
}

export default new RoutingService();
