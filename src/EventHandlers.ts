/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  Marketplace,
  Marketplace_AuctionBuffersUpdated,
  Marketplace_AuctionClosed,
  Marketplace_Initialized,
  Marketplace_ListingAdded,
  Marketplace_ListingRemoved,
  Marketplace_ListingUpdated,
  Marketplace_NewOffer,
  Marketplace_NewSale,
  Marketplace_Listings,
} from "generated";

Marketplace.AuctionBuffersUpdated.handler(async ({ event, context }) => {
  const entity: Marketplace_AuctionBuffersUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    timeBuffer: event.params.timeBuffer,
    bidBufferBps: event.params.bidBufferBps,
  };

  context.Marketplace_AuctionBuffersUpdated.set(entity);
});

Marketplace.AuctionClosed.handler(async ({ event, context }) => {
  const entity: Marketplace_AuctionClosed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    listingId: event.params.listingId,
    closer: event.params.closer,
    cancelled: event.params.cancelled,
    auctionCreator: event.params.auctionCreator,
    winningBidder: event.params.winningBidder,
  };

  context.Marketplace_AuctionClosed.set(entity);
});

Marketplace.Initialized.handler(async ({ event, context }) => {
  const entity: Marketplace_Initialized = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    version: event.params.version,
  };

  context.Marketplace_Initialized.set(entity);
});

Marketplace.ListingAdded.handler(async ({ event, context }) => {
  // Create event entity
  const eventEntity: Marketplace_ListingAdded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    listingId: event.params.listingId,
    assetContract: event.params.assetContract,
    lister: event.params.lister,
    tokenId: event.params.listing[3],
    tokenOwner: event.params.listing[1],
    currency: event.params.listing[7],
    startTime: event.params.listing[4],
    endTime: event.params.listing[5],
    quantity: event.params.listing[6],
    reservePricePerToken: event.params.listing[8],
    tokenType: event.params.listing[10].toString(),
    buyoutPricePerToken: event.params.listing[9],
    listingType: event.params.listing[11],
  };
  context.Marketplace_ListingAdded.set(eventEntity);

  // Create or update listing entity
  const listingEntity: Marketplace_Listings = {
    id: event.params.listingId.toString(),
    listingId: event.params.listingId,
    assetContract: event.params.assetContract,
    lister: event.params.lister,
    tokenId: event.params.listing[3],
    tokenOwner: event.params.listing[1],
    currency: event.params.listing[7],
    startTime: event.params.listing[4],
    endTime: event.params.listing[5],
    quantity: event.params.listing[6],
    reservePricePerToken: event.params.listing[8],
    tokenType: event.params.listing[10].toString(),
    buyoutPricePerToken: event.params.listing[9],
    listingType: event.params.listing[11],
    isActive: true,
    quantityRemaining: event.params.listing[6], // Initial quantity
  };

  context.Marketplace_Listings.set(listingEntity);
});

Marketplace.ListingRemoved.handler(async ({ event, context }) => {
  // Create event entity
  const eventEntity: Marketplace_ListingRemoved = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    listingId: event.params.listingId,
    listingCreator: event.params.listingCreator,
  };

  context.Marketplace_ListingRemoved.set(eventEntity);

  // Update listing entity
  const listingId = event.params.listingId.toString();
  const existingListing = await context.Marketplace_Listings.get(listingId);

  if (existingListing) {
    // Create new listing object with updated isActive field
    const updatedListing = {
      ...existingListing,
      isActive: false
    };
    context.Marketplace_Listings.set(updatedListing);
  }
});

Marketplace.ListingUpdated.handler(async ({ event, context }) => {
  // Create event entity
  const eventEntity: Marketplace_ListingUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    listingId: event.params.listingId,
    listingCreator: event.params.listingCreator,
  };
  context.Marketplace_ListingUpdated.set(eventEntity);

  // Update listing entity if it exists
  const listingId = event.params.listingId.toString();
  const existingListing = await context.Marketplace_Listings.get(listingId);

  if (existingListing) {
    // Update any relevant fields if they're available in the event
    context.Marketplace_Listings.set(existingListing);
    // TODO: Need to update the smart contract to emit the new events

  }
});

Marketplace.NewOffer.handler(async ({ event, context }) => {
  const entity: Marketplace_NewOffer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    listingId: event.params.listingId,
    offeror: event.params.offeror,
    listingType: event.params.listingType,
    quantityWanted: event.params.quantityWanted,
    totalOfferAmount: event.params.totalOfferAmount,
    currency: event.params.currency,
  };

  context.Marketplace_NewOffer.set(entity);
});

Marketplace.NewSale.handler(async ({ event, context }) => {
  // Create event entity
  const eventEntity: Marketplace_NewSale = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    listingId: event.params.listingId,
    assetContract: event.params.assetContract,
    lister: event.params.lister,
    buyer: event.params.buyer,
    quantityBought: event.params.quantityBought,
    totalPricePaid: event.params.totalPricePaid,
  };
  context.Marketplace_NewSale.set(eventEntity);

  // Update listing entity
  const listingId = event.params.listingId.toString();
  const existingListing = await context.Marketplace_Listings.get(listingId);

  if (existingListing) {
    const updatedListing = {
      ...existingListing,
      quantityRemaining: existingListing.quantityRemaining - event.params.quantityBought,
      isActive: existingListing.quantityRemaining - event.params.quantityBought > BigInt(0)
    };
    context.Marketplace_Listings.set(updatedListing);
  }
});
