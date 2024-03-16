
import { URL } from "@/constant.js";
import { BaseComponent } from "../base-components";
import { img } from "../tags";
import classes from './play.module.scss';

export default class Play extends BaseComponent{
  private audio: HTMLAudioElement;
  private src: string = '';
  constructor() {
    super({ tag: 'a', className: classes.sound });

    this.append(img({ src: 'img/hint-sound.png', alt: 'play sound hint', className: classes.soundImg, width: 24, height: 24 }))
    this.element.onclick = this.onClick;
    this.audio = new Audio();
    this.audio.onplay = () => this.element.classList.add(classes.soundOn!);
    this.audio.onended = () => this.element.classList.remove(classes.soundOn!);
  }

  private onClick = (): void => {
    console.log(`${URL}${this.src}`);
    this.audio.src = `${URL}${this.src}`;
    this.audio.play();
  }

  public setFile(src: string): void {
    this.src = src;
  }
}