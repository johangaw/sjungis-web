import { useState } from "react";

const isServerSide = typeof window === "undefined";

class SettingsService {
  private settings: {
    showObsceneSongs: boolean;
  };

  private readonly storageKey = "sjungis-settings";

  constructor() {
    const dataString = isServerSide
      ? null
      : window.localStorage.getItem(this.storageKey);
    this.settings = {
      showObsceneSongs: false,
    };

    if (dataString) {
      try {
        this.settings = JSON.parse(dataString);
      } catch {}
    }
  }

  get showObsceneSongs(): boolean {
    return this.settings.showObsceneSongs;
  }

  set showObsceneSongs(value: boolean) {
    this.settings.showObsceneSongs = value;
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
  }
}

const instance = new SettingsService();
export default instance;

export function useSetting<K extends keyof SettingsService>(
  key: K
): [SettingsService[K], (newValue: SettingsService[K]) => void] {
  const [value, setter] = useState(instance[key]);
  return [
    value,
    (newValue) => {
      setter(newValue);
      instance[key] = newValue;
    },
  ];
}
