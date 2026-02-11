import { parse } from 'graphql';
import { buildLogSearchEventQuery } from './tacos-query.builder';

describe('TacosQueryBuilder', () => {
    it('builds the correct query', () => {
        const actual = parse(buildLogSearchEventQuery('foo'));

        const expected = parse(`
    {
      logSearchEvent(searchTerm: "foo", sourceSystem: "nde-sandbox") {
        phrase
        detectors {
          suggestedResources {
            title
            url
          }
        }
      }
    }
  `);

        expect(actual).toEqual(expected);
    });
})
