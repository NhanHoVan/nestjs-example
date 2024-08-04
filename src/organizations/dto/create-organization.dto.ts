import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrganizationDto {
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

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 254)
  ownerEmail: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  ownerName: string;
}
