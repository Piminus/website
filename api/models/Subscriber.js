module.exports = {
  attributes: {
    email: {
      type: 'string',
      unique: true
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
