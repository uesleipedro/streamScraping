function getNextSequenceValue(sequenceName) {

   const Counters = require("../models/Counters");

   const count = Counters.findByIdAndUpdate(
      sequenceName,
      { $inc: { sequence: 1 } },
      { new: true },
   )
   return count;
}

module.exports = getNextSequenceValue;