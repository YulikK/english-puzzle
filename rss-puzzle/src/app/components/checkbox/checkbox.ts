import type Options from "@/app/Entities/options.ts";
import type { HintName } from "@/app/utils/types.ts";
import { BaseComponent } from "../base-components.ts";
import classes from "./checkbox.module.scss";

type callback = (id: HintName) => void;
export default class Checkbox extends BaseComponent{
  private options: Options;

  private id: HintName;

  private input: BaseComponent;

  private label: BaseComponent;

  private changeCallback: callback;

  constructor(id: HintName, options: Options, changeCallback: callback){
    super({ tag: 'div', className: classes.optionWrap });
    this.options = options;
    this.changeCallback = changeCallback;
    this.id = id;
    this.input = new BaseComponent<HTMLInputElement>({ tag: 'input', id, type: 'checkbox', className: classes.input, onchange: this.onChange, checked: this.options.getOptions(this.id) });
    this.label = new BaseComponent<HTMLLabelElement>({ tag: 'label', className: `${classes.label} ${classes[this.id]}`, htmlFor: this.id })
    this.appendChild([this.input, this.label]);
  }

  private onChange = (evt: Event): void => {
    if (evt.target instanceof HTMLInputElement) {
      this.options.setOption(this.id, evt.target.checked);
      this.changeCallback(this.id);
    }
  }
}

