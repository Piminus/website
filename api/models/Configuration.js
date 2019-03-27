module.exports = {
  attributes: {
    key: 'string',
    value: 'json',
    section: 'string'
  },

  findByKey: async function(key) {
    try {
        const config = await this.find({key: key});
        return config;
  } catch (e) {
      return e('db error');
    }
  },

  findAll: async function() {
    try {
      const allConfigs = await this.find();
      let temp = {};
      let result = allConfigs.reduce((previousValue, currentItem, index, arr) => {
        temp[currentItem.key] = currentItem.value;
        return temp;

      }, '');

      return result;
    } catch (e) {
      return e;
    }
  }

};
