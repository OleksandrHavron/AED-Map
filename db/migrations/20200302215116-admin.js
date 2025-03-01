const bcrypt = require('bcryptjs');

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env || {};

// Admin role
const { ADMIN } = require('../../shared/consts');

module.exports = {
  async up(db) {
    try {
      // How many rounds bcrypt should hash password (2^round - 2 involution to power rounds)
      const salt = bcrypt.genSaltSync(10);

      // Create admin with email and hashed password
      const admin = {
        email: ADMIN_EMAIL,
        password: bcrypt.hashSync(ADMIN_PASSWORD, salt),
        role: ADMIN
      };

      await db.collection('users').insertOne(admin);
    } catch (e) {
      console.log(e.message);
    }
  },

  async down(db) {
    try {
      await db
        .collection('users')
        .deleteMany({ role: ADMIN });
    } catch (e) {
      console.log(e.message);
    }
  }
};
