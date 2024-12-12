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
  const entity: Marketplace_ListingAdded = {
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
    listingType: event.params.listing[11]
    ,
  };

  context.Marketplace_ListingAdded.set(entity);
});

Marketplace.ListingRemoved.handler(async ({ event, context }) => {
  const entity: Marketplace_ListingRemoved = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    listingId: event.params.listingId,
    listingCreator: event.params.listingCreator,
  };

  context.Marketplace_ListingRemoved.set(entity);
});

Marketplace.ListingUpdated.handler(async ({ event, context }) => {
  const entity: Marketplace_ListingUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    listingId: event.params.listingId,
    listingCreator: event.params.listingCreator,
  };

  context.Marketplace_ListingUpdated.set(entity);
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
  const entity: Marketplace_NewSale = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    listingId: event.params.listingId,
    assetContract: event.params.assetContract,
    lister: event.params.lister,
    buyer: event.params.buyer,
    quantityBought: event.params.quantityBought,
    totalPricePaid: event.params.totalPricePaid,
  };

  context.Marketplace_NewSale.set(entity);
});
