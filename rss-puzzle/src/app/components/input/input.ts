import validateField from "@/app/utils/validation.ts";
import { p } from "@/app/components/tags.ts";
import type { FieldName } from '@/app/utils/types.ts';
import { BaseComponent } from '../base-components.ts';
import classes from './input.module.scss';

interface Props {
  tag?: string;
  id: FieldName;
  type: string;
  placeholder: string;
  className?: string;
  errorContainer: BaseComponent;
}

export default class Input extends BaseComponent{
  private errorContainer: BaseComponent;

  private id: FieldName;

  constructor({ id, type, placeholder, className, errorContainer }: Props) {
    super({ tag: 'input', id, type, placeholder, className: `${classes.input} ${className || ''}` }) 
    this.id = id;
    this.errorContainer = errorContainer;
    this.element.addEventListener('change', this.onChange);
  }


  public isValid(): boolean {
    return this.validate();
  }

  private onChange = (event: Event): void =>{
    event.preventDefault();
    this.validate();
  }

  private validate = (): boolean => {
    const value = this.getValue();
    const validationResult = validateField(value, this.id);

    if (validationResult.isValid) {
      this.setSuccess();
    } else {
      this.setError(validationResult.error);
    }
    return validationResult.isValid;
  }

  private setError(error: string): void {
    this.errorContainer.getElement().innerHTML = '';
    this.errorContainer.append(p(classes.errorMessage!, error));
    this.addClass(classes.error!);
    this.removeClass(classes.success!);
  }

  private setSuccess(): void {
    this.errorContainer.getElement().innerHTML = '';
    this.addClass(classes.success!);
    this.removeClass(classes.error!);
  }

} 