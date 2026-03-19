import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TacosConfigService } from './tacos-config/tacos-config.service';
import { buildLogSearchEventQuery } from './tacos-query/tacos-query.builder';

/**
 * Service for interacting with the TACOS API.
 *
 * TACOS logs search events and returns content recommendations based on search terms.
 * The service handles GraphQL query construction and HTTP communication with the TACOS endpoint.
 */
@Injectable({
  providedIn: 'root',
})
export class TacosService {
  constructor(
    private config: TacosConfigService,
    private http: HttpClient,
  ) {}

  // TACOS GraphQL endpoint URL from configuration
  private readonly tacosUrl = this.config.tacosUrl;

  // Standard headers for GraphQL requests
  private tacosHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  /**
   * Sends a search term to TACOS for logging and retrieves content recommendations.
   *
   * This method:
   * 1. Builds a GraphQL query for logging the search event
   * 2. Posts the query to the TACOS API
   * 3. Logs the response for debugging
   * 4. Handles and logs any errors
   *
   * @param searchTerm - The user's search query to log and get recommendations for
   * @returns Observable that emits the TACOS API response containing suggested resources
   *
   * @example
   * ```typescript
   * this.tacosService.getTacosResponse('machine learning')
   *   .subscribe(response => {
   *     console.log(response.data.logSearchEvent.detectors.suggestedResources);
   *   });
   * ```
   */
  getTacosResponse(searchTerm: string): Observable<any> {
    // Build the GraphQL mutation query for logging the search event
    const graphQlQuery = buildLogSearchEventQuery(searchTerm);
    console.log(graphQlQuery);

    return this.http
      .post(
        this.tacosUrl,
        { query: graphQlQuery },
        { headers: this.tacosHeaders },
      )
      .pipe(
        // Log successful responses for debugging
        tap((res) =>
          console.log('TacosService.getTacosResponse response:', res),
        ),
        // Catch and log errors, then rethrow so subscribers can handle them
        catchError((err) => {
          console.error('TacosService.getTacosResponse error:', err);
          // Rethrow the error so subscribers can handle it
          return throwError(() => err);
        }),
      );
  }
}
