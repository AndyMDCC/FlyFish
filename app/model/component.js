'use strict';
const _ = require('lodash');
const { camelizeKeys, decamelizeKeys } = require('humps');
const Enum = require('../lib/enum');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ComponentSchema = new Schema({
    create_time: {
      type: Date,
      default: Date.now,
    },
    update_time: {
      type: Date,
      default: Date.now,
    },

    name: String,
    category: String,
    sub_category: String,
    type: String,
    desc: String,
    projects: [ String ],
    tags: [ String ],

    versions: [{
      _id: false,
      no: String,
      desc: String,
      status: String,
    }],
    cover: String,
    creator: String,
    develop_status: {
      type: String,
      default: Enum.COMPONENT_DEVELOP_STATUS.DOING,
    },

    status: {
      type: String,
      default: Enum.COMMON_STATUS.VALID,
    },
  });

  ComponentSchema.statics._find = async function(params, projection, options) {
    const doc = _toDoc(params);
    const res = await this.find(doc, projection, options).lean(true);
    return res.map(_toObj);
  };

  ComponentSchema.statics._findOne = async function(params) {
    const doc = _toDoc(params);
    const res = await this.findOne(doc).lean(true);
    return _toObj(res);
  };

  ComponentSchema.statics._create = async function(params) {
    const doc = _toDoc(params);
    return await this.create(doc);
  };

  function _toDoc(obj, update = false) {
    if (_.isEmpty(obj)) return;

    if (obj.id) obj._id = obj.id; delete (obj.id);
    if (update) obj.updateTime = Date.now();
    return decamelizeKeys(obj);
  }

  function _toObj(doc) {
    if (_.isEmpty(doc)) return;

    const res = {};
    res.id = doc._id.toString();

    const camelizeRes = camelizeKeys(doc);

    if (!_.isNil(camelizeRes.createTime)) res.createTime = camelizeRes.createTime.getTime();
    if (!_.isNil(camelizeRes.updateTime)) res.updateTime = camelizeRes.updateTime.getTime();

    return Object.assign({}, camelizeRes, res);
  }

  return mongoose.model('Component', ComponentSchema);
};