import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContactDTO } from './contact.dto';
import { ContactRepository } from './contact.repository';
import { AddressRepository } from '../address/address.repository';
import { ContactInfoRepository } from '../contact-info/contact-info.repository';
import { OrganizationRepository } from '../organization/organization.repository';

@Injectable()
export class ContactService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly addressRepository: AddressRepository,
    private readonly contactInfoRepository: ContactInfoRepository,
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async create(
    userId: string,
    { contactInfo, addressInfo, billingAddress, ...data }: CreateContactDTO,
  ) {
    const organization = await this.organizationRepository.findByUserId(userId);

    if (!organization)
      throw new InternalServerErrorException(
        'Organization not found',
        'ORGANIZATION_NOT_FOUND',
      );

    if (addressInfo) {
      await this.addressRepository.create(addressInfo);
    }

    if (billingAddress) {
      await this.addressRepository.create(billingAddress);
    }

    if (contactInfo) {
      await this.contactInfoRepository.create(contactInfo);
    }

    return await this.contactRepository.create({
      ...data,
      Organization: {
        connect: {
          id: organization.id,
        },
      },
    });
  }

  async fetchByOrganizationId(organizationId: string) {
    return await this.contactRepository.fetchByOrganizationId(organizationId);
  }
}
