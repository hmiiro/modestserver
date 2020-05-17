import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Action } from '../action.entity';

@ValidatorConstraint({ name: 'ActionType', async: false })
export class ActionTypeValidator implements ValidatorConstraintInterface {
  async getActions() {
    const res = await Action.find();
    const actions = res.map(action => {
      return action.name;
    });

    return actions;
  }
  // getting available actions from db
  readonly allowedActions = this.getActions();

  async validate(value: any): Promise<boolean> {
    const allUserActions = await this.allowedActions;

    // checking of all provided actions exist in the allowed actions
    const idx = value.every(r => allUserActions.indexOf(r) !== -1);
    //console.log(idx);
    return idx !== false; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return `One or more of the provided actions is invalid!`;
  }
}
