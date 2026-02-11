import { Inject, Injectable, Optional } from '@angular/core';

interface TacosModuleParameters {
  tacosUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class TacosConfigService {
  private readonly DEFAULT_TACOS_URL = 'https://tacos.libraries.mit.edu/graphql';

  constructor(@Optional() @Inject('MODULE_PARAMETERS') public tacosModuleParameters: TacosModuleParameters) { }

  /**
   * Get the TACOS API URL from configuration, or return default.
   * Expects moduleParameters to have a structure like: { tacosApiUrl: 'https://...' }
   */
  getTacosUrl(): string {
    if (this.tacosModuleParameters?.tacosUrl) {
      return this.tacosModuleParameters.tacosUrl;
    }
    return this.DEFAULT_TACOS_URL;
  }
}
