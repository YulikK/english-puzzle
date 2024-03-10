import Store from "../API/store";
import { OptionsType } from "../utils/types";
import { HintName } from "../utils/types";

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
    console.log(option, value);
    this.items[option] = value;
    this.store.setOptions(this.items);
  }
  
  public getFullOptions() {
    return this.items;
  }

  getOptions(option: HintName): boolean {
    return this.items[option];
  }

}