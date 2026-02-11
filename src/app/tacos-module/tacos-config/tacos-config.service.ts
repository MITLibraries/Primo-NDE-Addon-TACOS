import { Inject, Injectable, Optional } from '@angular/core';
import { TACOS_CONFIG_DEFAULTS } from './tacos-config.constants';

/**
 * Configuration parameters that can be provided when importing the TACOS module.
 * These allow applications to customize TACOS behavior.
 */
export interface TacosModuleParameters {
  /** URL of the TACOS GraphQL API endpoint */
  tacosUrl: string,
  /** Whether to display recommendations in the UI (always logs searches regardless) */
  displayRecs: boolean
}

/**
 * Service that provides configuration values for the TACOS module.
 * 
 * Configuration can be customized by providing MODULE_PARAMETERS when the module is loaded.
 * If no parameters are provided, sensible defaults are used from TACOS_CONFIG_DEFAULTS.
 * 
 * When deployed as an NDE add-on, institutions can configure these parameters through 
 * Alma's Add-on Configuration interface by uploading a JSON configuration file.
 * 
 * @example
 * ```json
 * // Example JSON configuration in Alma Add-on Configuration:
 * {
 *   "tacosUrl": "https://tacos.libraries.mit.edu/graphql",
 *   "displayRecs": true
 * }
 * ```
 * 
 * The MODULE_PARAMETERS injection token automatically provides access to these 
 * institution-specific settings at runtime.
 */
@Injectable({
  providedIn: 'root'
})
export class TacosConfigService {
  /**
   * @param tacosModuleParameters - Optional configuration parameters injected via MODULE_PARAMETERS token.
   * This is automatically populated from the add-on configuration JSON when deployed through Alma.
   */
  constructor(@Optional() @Inject('MODULE_PARAMETERS') public tacosModuleParameters: TacosModuleParameters) { }

  /**
   * Gets the TACOS API endpoint URL.
   * Falls back to default URL if not provided in module parameters.
   */
  get tacosUrl(): string {
    return this.tacosModuleParameters?.tacosUrl ?? TACOS_CONFIG_DEFAULTS.tacosUrl
  }

  /**
   * Gets the flag for whether to display recommendations in the UI.
   * Falls back to default (false) if not provided in module parameters.
   * Note: Search events are always logged regardless of this setting.
   */
  get displayRecs(): boolean {
    return this.tacosModuleParameters?.displayRecs ?? TACOS_CONFIG_DEFAULTS.displayRecs
  }
}