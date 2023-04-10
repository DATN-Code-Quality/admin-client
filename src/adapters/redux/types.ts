import { Auth } from '../../domain/auth';

import { Sonarqube } from '~/domain/sonarqube';

export interface StoreState {
  auth: Auth;
  sonarqube: Sonarqube;
}
