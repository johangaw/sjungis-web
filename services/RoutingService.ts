class RoutingService {
  list(): string {
    return "/";
  }

  showSong(songId: string): string {
    return "/" + songId;
  }

  settings(): string {
    return "/settings";
  }
}

export default new RoutingService();
