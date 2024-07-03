import type Store from "../API/store.ts";
import type { OptionsType , HintName } from "../utils/types.ts";

export default class Options {
  public items: OptionsType = {
    onSound: true,
    onTranslate: true,
    onPicture: true
  }

  private store: Store;

  constructor(store: Store) {
    this.store = store;
    const savedOptions = this.store.getOptions();
    if (savedOptions) {
      this.items.onSound = savedOptions.onSound;
      this.items.onTranslate = savedOptions.onTranslate;
      this.items.onPicture = savedOptions.onPicture;
    }
  }

  public setOption(option: HintName, value: boolean): void {
    this.items[option] = value;
    this.store.setOptions(this.items);
  }
  
  public getFullOptions(): OptionsType {
    return this.items;
  }

  public getOptions(option: HintName): boolean {
    return this.items[option];
  }

}