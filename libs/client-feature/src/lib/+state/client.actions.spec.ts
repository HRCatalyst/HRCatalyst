import * as fromClient from './client.actions';

describe('loadClients', () => {
  it('should return an action', () => {
    expect(fromClient.loadClients().type).toBe('[Client] Load Clients');
  });
});
