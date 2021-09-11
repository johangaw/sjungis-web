class RoutingService {
  list(): string {
    return "/";
  }

  showSong(songId: string, refresh: boolean = false): string {
    return "/" + songId + (refresh ? "?refresh=true" : "");
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
