import { Abstract } from '../abstract-components';
import { validateField } from "@/app/utils/validation";
import { p } from "@/app/components/tags";
import classes from './input.module.scss';

interface Props {
  tag?: string;
  id: 'firstName' | 'lastName';
  type: string;
  placeholder: string;
  className?: string;
  errorContainer: Abstract;
}

export class Input extends Abstract{
  private errorContainer: Abstract;
  private id: 'firstName' | 'lastName';
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
    console.log('onchange');
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