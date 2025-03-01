// Initial collection of defibrillators
const defibrillators = require('../mocks/defibrillators.json');

module.exports = {
  async up(db) {
    try {
      const admin = await db
        .collection('users')
        .findOne({ email: process.env.ADMIN_EMAIL });
      if (admin)
        defibrillators.forEach(
          (defibrillator) =>
            (defibrillator.owner = admin._id)
        );
      defibrillators.forEach(
        (defibrillator) => (defibrillator.blocked = false)
      );

      await db
        .collection('defibrillators')
        .insertMany(defibrillators);
    } catch (e) {
      console.log(e.message);
    }
  },

  async down(db) {
    try {
      await db.collection('defibrillators').deleteMany();
    } catch (e) {
      console.log(e.message);
    }
  }
};
