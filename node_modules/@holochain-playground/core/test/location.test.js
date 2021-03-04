import { locationDistance } from '../dist';
import { expect } from '@esm-bundle/chai';

describe('DHT Location', () => {
  it('location distance', async () => {
    expect(locationDistance(10, 5)).to.equal(5);
    expect(locationDistance(5, 10)).to.equal(5);
    expect(locationDistance(4294967295 + 5, 4294967295)).to.equal(5);
    expect(locationDistance(0, 4294967295)).to.equal(1);

    const MAX_HALF_LENGTH = Math.floor(4294967295 / 2) + 2;
    expect(locationDistance(0, MAX_HALF_LENGTH)).to.equal(MAX_HALF_LENGTH - 2);
  });
});
