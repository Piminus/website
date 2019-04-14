module.exports = {
  attributes: {
    key: 'string',
    value: 'json',
    section: 'string'
  },

  findAll: async function() {
    try {
      sails.log('find');
      const allConfigs = await Config.find();
      let temp = {};
      sails.log(allConfigs);
      let result = {};
      allConfigs.forEach(item =>{
        result[item.key] = item.value;
      });
      sails.log(result);

      return result;
    } catch (e) {
      return e;
    }
  }

};
