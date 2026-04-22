/**
 * Reputation at three scopes. Local = neighbourhood / small community.
 * Professional = workplace and industry. Broader = public / civic;
 * usually 0 for most characters and non-zero for notable figures.
 * Each -1 (disrepute) to 1 (esteem).
 */
export interface ReputationProfile {
  readonly local: number
  readonly professional: number
  readonly broader: number
}
