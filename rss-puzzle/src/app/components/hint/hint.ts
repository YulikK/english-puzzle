import { BaseComponent } from "@/app/components/base-components.ts";
import { a, img, p } from "@/app/components/tags.ts";
import type Options from "@/app/Entities/options.ts";
import { HintName } from "@/app/utils/types.ts";
import Checkbox from "../checkbox/checkbox.ts";
import classes from "./hint.module.scss";

type Callback = (value: boolean) => void;
export default class Hint extends BaseComponent {
  private options: Options;

  private soundComponent: Checkbox;

  private translateComponent: Checkbox;

  private pictureComponent: Checkbox;

  private hintSound: BaseComponent;

  private hintTranslate: BaseComponent;

  private onChangePictureOption: Callback| null = null;


  constructor(options: Options) {
    super({ tag: 'div', className: classes.hintContainer }); 

    this.options = options;

    this.soundComponent = new Checkbox(HintName.onSound, this.options, this.changeOptionsHandler);
    this.translateComponent = new Checkbox(HintName.onTranslate, this.options, this.changeOptionsHandler);
    this.pictureComponent = new Checkbox(HintName.onPicture, this.options, this.changeOptionsHandler);

    this.hintSound = a({ className: classes.sound, onclick: this.soundPlay },
      img({ src: 'img/hint-sound.png', alt: 'play sound hint', className: classes.soundImg })
    );
    this.hintTranslate = p(classes.text!, 'Студенты согласны, что у них слишком много домашней работы');
    this.updateTranslateHint();
    this.updateSoundHint();
  }

  public getOptions(): Checkbox[] {
    return [
      this.translateComponent,
      this.pictureComponent,
      this.soundComponent
    ];
  }

  public getHint(): BaseComponent[]{
    const hintArr = [];
    if (this.hintSound) {
      hintArr.push(this.hintSound);
    }
    if (this.hintTranslate) {
      hintArr.push(this.hintTranslate);
    }
    return hintArr;
  }

  private soundPlay = (): void => {
    if (this.hintSound) {
      this.hintSound.toggleClass(classes.soundOn!);
    }
    
  }
  
  private changeOptionsHandler = (id: HintName): void => {
    if (id === HintName.onSound) {
      this.updateSoundHint();
    } else if (id === HintName.onTranslate) {
      this.updateTranslateHint();
    } else if (id === HintName.onPicture) {
      if (this.onChangePictureOption) {
        this.onChangePictureOption(this.options.getOptions(HintName.onPicture));
      }
    }
  }

  public setOnPictureCallback(callback: Callback): void {
    this.onChangePictureOption = callback;
  }

  private updateSoundHint(): void {
    if (this.options.items.onSound) {
      this.hintSound.removeClass(classes.hide!);
    } else {
      this.hintSound.addClass(classes.hide!);
    }
  }

  private updateTranslateHint(): void {
    if (this.options.items.onTranslate) {
      this.hintTranslate.removeClass(classes.hide!);
    } else {
      this.hintTranslate.addClass(classes.hide!);
    }
  }

}

