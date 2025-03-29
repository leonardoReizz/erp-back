import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AddressDTO {
  @IsString()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    description: 'The zip code of the customer',
    example: '1234567890',
  })
  @IsString()
  @MaxLength(8)
  zipCode: string;

  @ApiProperty({
    description: 'The state of the customer',
    example: 'SP',
  })
  @IsString()
  @MaxLength(2)
  state: string;

  @ApiProperty({
    description: 'The neighborhood of the customer',
    example: 'Centro',
  })
  @IsString()
  @MaxLength(100)
  neighborhood: string;

  @ApiProperty({
    description: 'The address number of the customer',
    example: '123',
  })
  @IsString()
  @MaxLength(10)
  addressNumber: string;

  @ApiProperty({
    description: 'The address complement of the customer',
    example: 'Apto 123',
  })
  @IsString()
  @MaxLength(100)
  addressComplement: string;

  @ApiProperty({
    description: 'The city of the customer',
    example: 'São Paulo',
  })
  @IsString()
  @MaxLength(100)
  city: string;
}

export class ContactInfoDTO {
  @ApiProperty({
    description: 'The phone of the customer',
    example: '1234567890',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'The phone of the customer',
    example: '1234567890',
  })
  @IsString()
  phoneTwo: string;

  @ApiProperty({
    description: 'The cel phone of the customer',
    example: '1234567890',
  })
  @IsString()
  @MaxLength(15)
  cellPhone: string;

  @ApiProperty({
    description: 'The email of the customer',
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    description: 'The observation of the customer',
    example: 'Lorem ipsum dolor sit amet',
  })
  @IsString()
  observation: string;
}

export class CreateContactDTO {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'The fantasy name of the customer',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  fantasyName: string;

  @ApiProperty({
    description: 'The type of the customer',
    example: 'LEGAL',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['LEGAL', 'PHYSICAL'])
  personType: 'LEGAL' | 'PHYSICAL';

  @ApiProperty({
    description: 'The document of the customer',
    example: '1234567890',
  })
  @IsOptional()
  @MaxLength(14)
  @IsString()
  rg: string;

  @ApiProperty({
    description: 'The document of the customer',
    example: '1234567890',
  })
  @IsOptional()
  @MaxLength(14)
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'The document of the customer',
    example: '1234567890',
  })
  @IsOptional()
  @MaxLength(14)
  @IsString()
  cnpj: string;

  @ApiProperty({
    description: 'The contribuitor of the customer',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  @IsIn(['0', '1', '2', '9'])
  contribuitor: '0' | '1' | '2' | '9';

  @ApiProperty({
    description: 'The state registration of the customer',
    example: '1234567890',
  })
  @IsString()
  @MaxLength(14)
  stateRegistration: string;

  @ApiProperty({
    description: 'The municipal registration of the customer',
    example: '1234567890',
  })
  @IsString()
  @MaxLength(14)
  municipalRegistration: string;

  @ApiProperty({
    description: 'The address of the customer',
    example: '1234567890',
  })
  @IsObject()
  @IsOptional()
  addressInfo: AddressDTO;

  @ApiProperty({
    description: 'The contact info of the customer',
    example: {
      phone: '1234567890',
      phoneTwo: '1234567890',
      celPhone: '1234567890',
      email: 'john.doe@example.com',
      observation: 'Lorem ipsum dolor sit amet',
    },
  })
  @IsObject()
  @IsOptional()
  contactInfo?: ContactInfoDTO;

  @ApiProperty({
    description: 'The type of the customer',
    example: 'CLIENT',
  })
  @IsString()
  @IsIn(['CLIENT', 'TRANSPORT', 'SUPPLIER'])
  contactType: 'CLIENT' | 'TRANSPORT' | 'SUPPLIER';

  @ApiProperty({
    description: 'The billing address of the customer',
    example: {
      address: '1234567890',
      zipCode: '1234567890',
      state: 'SP',
      neighborhood: 'Centro',
      addressNumber: '123',
      addressComplement: 'Apto 123',
    },
  })
  @IsObject()
  @IsOptional()
  billingAddress?: AddressDTO;
}
