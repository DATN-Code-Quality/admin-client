import { PartnerType, StateStatus } from '../constant/enum';

import { mockApi } from './mock.helper';

import { ResponseData } from '~/constant';
import { Partner, Threshold } from '~/domain/partner';

const mockThresholds: Threshold[] = [
  {
    model: 'Face emb',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
  {
    model: 'PhotoID',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
  {
    model: 'Fraud IDCard',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
  {
    model: 'Liveness',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
  {
    model: 'Skew',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
  {
    model: 'Glass/mask',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
  {
    model: 'Hat',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
  {
    model: 'Bad face',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
  {
    model: 'Frontal check',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
  {
    model: 'Blur-Selfie',
    threshold: 0.5,
    updated_at: 1677467490000,
  },
];

export function mockPartner() {
  return {
    async getAllPartners(): Promise<ResponseData<Partner[]>> {
      return mockApi([
        {
          id: 1,
          name: 'Agency 1',
          type: PartnerType.AGENCY,
          under_agency_id: 0,
          thresholds: mockThresholds,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 2,
          name: 'Partner 1',
          type: PartnerType.PARTNER,
          under_agency_id: 1,
          thresholds: mockThresholds,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 3,
          name: 'Partner 2',
          type: PartnerType.PARTNER,
          under_agency_id: 1,
          thresholds: mockThresholds,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 4,
          name: 'Agency 2',
          type: PartnerType.AGENCY,
          under_agency_id: 0,
          thresholds: mockThresholds,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 5,
          name: 'Partner 3',
          type: PartnerType.PARTNER,
          under_agency_id: 4,
          thresholds: mockThresholds,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
      ]);
    },
  };
}
