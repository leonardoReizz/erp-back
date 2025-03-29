import { Module } from '@nestjs/common';
import { AddressRepository } from '../address/address.repository';
import { ContactRepository } from '../contact/contact.repository';
import { ContactInfoRepository } from '../contact-info/contact-info.repository';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { OrganizationRepository } from '../organization/organization.repository';
@Module({
  controllers: [ContactController],
  providers: [
    ContactService,
    ContactRepository,
    AddressRepository,
    ContactInfoRepository,
    OrganizationRepository,
  ],
})
export class ContactModule {}
