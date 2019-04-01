module.exports = {
  attributes: {
    key: 'string',
    value: 'json',
    section: 'string'
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
