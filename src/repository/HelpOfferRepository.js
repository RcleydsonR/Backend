const BaseRepository = require('./BaseRepository');
const OfferedHelp = require('../models/HelpOffer');

class OfferdHelpRepository extends BaseRepository {
  constructor() {
    super(OfferedHelp);
  }

  async create(offeredHelp) {
    const newOfferdHelp = await super.$save(offeredHelp);
    return newOfferdHelp;
  }

  async list() {
    const aggregate = [
      {
        $lookup: {
          from: 'user',
          localField: 'ownerId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: false,
        },
      },
    ];
    const helpOffers = await super.$listAggregate(aggregate);
    return helpOffers;
  }

  async listByOwnerId(ownerId) {
    const query = { ownerId };
    const helpOffers = await super.$list(query);
    return helpOffers;
  }

  async listByHelpedUserId(helpedUserId) {
    const query = { helpedUserId };
    const helpOffers = await super.$list(query);
    return helpOffers;
  }

  async getById(id) {
    const helpOffer = await super.$getById(id);
    return helpOffer;
  }

  async update(helpOffer) {
    await super.$update(helpOffer);
  }
}

module.exports = OfferdHelpRepository;
