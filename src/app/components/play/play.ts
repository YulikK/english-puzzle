import { URL } from "@/constant.ts";
import { BaseComponent } from "../base-components.ts";
import { img } from "../tags.ts";
import classes from './play.module.scss';

export default class Play extends BaseComponent{
  private audio: HTMLAudioElement;

  private src = '';

  private image: BaseComponent<HTMLElementTagNameMap['img']>;

  constructor() {
    super({ tag: 'a', className: classes.sound });
    this.image = img({ src: 'img/hint-sound.png', alt: 'play sound hint', className: `${classes.soundImg} ${classes.disable}`, width: 24, height: 24 })
    this.append(this.image);
    this.element.onclick = this.onClick;
    this.audio = new Audio();
    this.audio.onplay = (): void => this.image.setElementSrc('img/hint-sound-play.png');
    this.audio.onended = (): void => this.image.setElementSrc('img/hint-sound.png');
    this.audio.addEventListener('canplaythrough', this.onLoad);
  }

  private onClick = async (): Promise<void> => {
    try {
      await this.audio.play();
    } catch (error) {
      this.image.addClass(classes.disable!)
    }
  }

  public setFile(src: string): void {
    this.src = src;
    this.audio.src = `${URL}${this.src}`;
    this.audio.load();
    
  }

  private onLoad = (): void => {
    this.image.removeClass(classes.disable!);
  }
}