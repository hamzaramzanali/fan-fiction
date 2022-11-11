const db = require('../config/connection');
const { User, Adventure } = require('../models');
const userSeeds = require('./userSeeds.json');
const adventureSeeds = require('./adventureSeeds.json');

db.once('open', async () => {
  try {
    await Adventure.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < adventureSeeds.length; i++) {
      const { _id, adventureAuthor } = await Adventure.create(adventureSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: adventureAuthor },
        {
          $addToSet: {
            adventures: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
