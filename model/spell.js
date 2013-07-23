var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Article Schema
 */
var SpellSchema = new Schema({
  name: {type : String, default: '', trim : true},
  school: {type : String, default: '', trim : true},
  level: {type : String, default: '', trim : true},
  components: {type : String, default: '', trim : true},
  castingTime: {type : String, default: '', trim : true},
  range: {type : String, default: '', trim : true},
  target: {type : String, default: '', trim : true},
  effect: {type : String, default: '', trim : true},
  area: {type : String, default: '', trim : true},
  duration: {type : String, default: '', trim : true},
  savingThrow: {type : String, default: '', trim : true},
  spellResistance: {type : String, default: '', trim : true},
  description: {type : String, default: '', trim : true},
  shortdescription: {type : String, default: '', trim : true},
  materialComponent: {type : String, default: '', trim : true},
  xpcost: {type : String, default: '', trim : true},
  references: {type : String, default: '', trim : true}
});

SpellSchema.statics = {
    /**
     * Find Spell by id
     *
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */

    load: function (id, cb) {
        this.findOne({ _id : id })
            .exec(cb)
    },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'name': 1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
};

mongoose.model('Spell', SpellSchema);