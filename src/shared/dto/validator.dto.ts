import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindByIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
