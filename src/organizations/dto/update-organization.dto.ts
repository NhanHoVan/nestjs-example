import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  ValidateIf,
} from 'class-validator';

export class UpdateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  name: string;

  @IsString()
  @Length(0, 255)
  avatarUrl: string;

  @IsString()
  @Length(0, 255)
  address: string;

  @IsBoolean()
  isCreatOwner: boolean;

  @ValidateIf((o) => !o.isCreatOwner)
  @IsNotEmpty()
  @IsUUID()
  ownerId: string;

  @ValidateIf((o) => o.isCreatOwner)
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 254)
  ownerEmail: string;

  @ValidateIf((o) => o.isCreatOwner)
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  ownerName: string;
}
