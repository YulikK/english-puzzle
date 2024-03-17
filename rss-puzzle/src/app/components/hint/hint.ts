import { BaseComponent } from "@/app/components/base-components.ts";
import { p, div } from "@/app/components/tags.ts";
import type Options from "@/app/Entities/options.ts";
import { HintName } from "@/app/utils/types.ts";
import type Lessons from "@/app/model/lessons.ts";
import Checkbox from "../checkbox/checkbox.ts";
import Play from "../play/play.ts";
import classes from "./hint.module.scss";

type Callback = (value: boolean) => void;
export default class Hint extends BaseComponent {
  private container: BaseComponent;

  public options: Options;

  private soundComponent: Checkbox;

  private translateComponent: Checkbox;

  private pictureComponent: Checkbox;

  private hintSound: Play;

  private hintTranslate: BaseComponent;

  private lessons: Lessons;

  private onChangePictureOption: Callback| null = null;


  constructor(container: BaseComponent, options: Options, lessons: Lessons) {
    super({ tag: 'div', className: classes.hint }); 

    this.container = container;
    this.options = options;
    this.lessons = lessons;

    this.soundComponent = new Checkbox(HintName.onSound, this.options, this.changeOptionsHandler);
    this.translateComponent = new Checkbox(HintName.onTranslate, this.options, this.changeOptionsHandler);
    this.pictureComponent = new Checkbox(HintName.onPicture, this.options, this.changeOptionsHandler);

    this.hintSound = new Play();
    this.hintTranslate = p(classes.text!, '');
    this.updatesTextTranslate();
    this.updatePlayFile();
    this.updateTranslateHint();
    this.updateSoundHint();

    this.appendChild([div({ className: classes.hintContainer },
      this.hintSound,
      this.hintTranslate
    ),
      div({ className: classes.hintOptionsContainer },
        this.translateComponent,
        this.pictureComponent,
        this.soundComponent
      )
    ]);
    this.container.appendChild([this]);
  }

  public updatesTextTranslate(): void {
    this.hintTranslate.getElement().textContent = this.lessons.getTranslate();
  }

  public updatePlayFile(): void {
    this.hintSound.setFile(this.lessons.getAudioFile());
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

  public hide(): void {
    this.addClass(classes.hide!);
  }

  public show(): void {
    this.removeClass(classes.hide!);
  }

}

