export function buildLogSearchEventQuery(searchTerm: string): string {
    const safeTerm = searchTerm.replace(/"/g, '\\"');

    return `
    {
      logSearchEvent(searchTerm: "${safeTerm}", sourceSystem: "nde-sandbox") {
        phrase
        detectors {
          suggestedResources {
            title
            url
          }
        }
      }
    }
  `;
}
