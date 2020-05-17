import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { Status } from './status.enum';

@Injectable()
export class StatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [Status.ACTIVE, Status.INACTIVE];
  transform(value: any) {
    //make it uppercase

    const upperValue = value.toUpperCase();
    //if its not valid
    if (!this.isStatusValid(upperValue)) {
      throw new BadRequestException(`${value} is not a valid status`);
    }
    // return validated category
    return upperValue;
  }

  private isStatusValid(status: any) {
    // check its index. returns 1 if its valid
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
