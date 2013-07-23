var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ClassSchema = new Schema({
  name: {type : String, default : '', trim : true},
  code: {type : String, default : '', trim : true}
});

/**
 * Validations
 */
ClassSchema.path('name').validate(function (name) {
  return name.length > 0
}, 'Article title cannot be blank');

ClassSchema.path('code').validate(function (code) {
  return code.length > 0
}, 'Article body cannot be blank');

ClassSchema.statics = {
    /**
     * Find Class by id
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
      .sort({'name': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
};

mongoose.model('Class', ClassSchema);