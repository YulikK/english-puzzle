import { BaseComponent } from "@/app/components/base-components";
import classes from "./progress-bar.module.scss";
import { div, p } from "@/app/components/tags";

export class ProgressBar extends BaseComponent {
  private progressLine: BaseComponent;
  private level: BaseComponent;
  private round: BaseComponent;
  constructor() {
    super({ tag: 'div', className: classes.progressWrapper }); 
    this.level = p(classes.level!, 'Lvl 1');
    this.round = p(classes.round!, '10 / 42');
    this.progressLine = div({ className: classes.progressBar },
      div({ className: classes.progressCircle },
        div({ className: classes.progressInformation },
          this.level,
          this.round))
    );
    this.appendChild([this.progressLine])
    
  }
  
}