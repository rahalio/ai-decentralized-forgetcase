/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@forgetcase/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  casId(): string;
  asmId(): string;
  slaId(): string;
  fflId(): string;
  crdId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
