import assert from "assert";
import { 
  TestHelpers,
  TransparentUpgradeableProxy_AuctionBuffersUpdated
} from "generated";
const { MockDb, TransparentUpgradeableProxy } = TestHelpers;

describe("TransparentUpgradeableProxy contract AuctionBuffersUpdated event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for TransparentUpgradeableProxy contract AuctionBuffersUpdated event
  const event = TransparentUpgradeableProxy.AuctionBuffersUpdated.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("TransparentUpgradeableProxy_AuctionBuffersUpdated is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await TransparentUpgradeableProxy.AuctionBuffersUpdated.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualTransparentUpgradeableProxyAuctionBuffersUpdated = mockDbUpdated.entities.TransparentUpgradeableProxy_AuctionBuffersUpdated.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedTransparentUpgradeableProxyAuctionBuffersUpdated: TransparentUpgradeableProxy_AuctionBuffersUpdated = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      timeBuffer: event.params.timeBuffer,
      bidBufferBps: event.params.bidBufferBps,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualTransparentUpgradeableProxyAuctionBuffersUpdated, expectedTransparentUpgradeableProxyAuctionBuffersUpdated, "Actual TransparentUpgradeableProxyAuctionBuffersUpdated should be the same as the expectedTransparentUpgradeableProxyAuctionBuffersUpdated");
  });
});
