'use strict';

const BaseController = require('./base');
const _ = require('lodash');
const CODE = require('../lib/error');
class UserController extends BaseController {

  async login() {
    const { ctx, app, service } = this;

    const UserLoginSchema = app.Joi.object().keys({
      username: app.Joi.string().required(),
      password: app.Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    });
    ctx.validate(UserLoginSchema, ctx.request.body);

    const { username, password } = ctx.request.body;

    const result = await service.user.userLogin(username, password);

    if (_.isEmpty(result)) {
      this.fail('登录失败', null, CODE.FAIL);
    } else {
      this.success('登录成功', { id: result._id });
    }
  }

  async list(ctx) {
    let { startDate, endDate, page, limit, billStatus, billNo } = ctx.query;
    limit = Number(limit);
    const offset = (Number(page) - 1) * limit;
    const Op = ctx.model.Op;
    const result = await ctx.model.ShopOrder.findAndCountAll({
      where: { billNo: { [Op.like]: `%${billNo}%` }, billStatus: { [Op.like]: `%${billStatus}%` }, billDate: { [Op.between]: [ startDate, endDate ] },
      }, offset, limit,
    });
    ctx.success('查询成功!', result.rows, result.count);
  }

  async detail(ctx) {
    const order = await ctx.model.ShopOrder.findOne({ where: { billNo: ctx.params.id }, raw: true });
    if (!order) {
      ctx.failure('查询失败!');
      return;
    }
    const goodsImages = await ctx.model.ShopOrderImages.findAll({
      where: { billNo: order.billNo },
      order: [[ 'sortNo', 'ASC' ]],
      raw: true,
    });
    const imgs = [];
    for (const img of goodsImages) {
      imgs.push({ name: img.name, url: img.imgurl, status: 'finished' });
    }
    order.goodsImages = imgs;
    ctx.success('查询成功!', order);
  }

  async del(ctx) {
    const order = await ctx.model.ShopOrder.findById(ctx.params.id);
    if (!order) {
      ctx.failure('删除失败!');
      return;
    }
    if (order.billStatus == 'S') {
      ctx.failure('已付款订单不允许删除!');
      return;
    }
    order.destroy();
    ctx.success('删除成功!');
  }
}

module.exports = UserController;