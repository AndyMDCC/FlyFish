'use strict';
const Service = require('egg').Service;
const _ = require('lodash');

const Enum = require('../lib/enum');

class ApplicationService extends Service {
  async create(params) {
    const { ctx } = this;
    const userInfo = ctx.userInfo;

    const returnData = { msg: 'ok', data: {} };

    const existsApplications = await ctx.model.Application._findOne({ name: params.name });
    if (!_.isEmpty(existsApplications)) {
      returnData.msg = 'Exists Already';
      return returnData;
    }

    const tagData = await this.getTagData(params);
    const result = await ctx.model.Application._create(Object.assign(
      params,
      tagData,
      {
        creator: userInfo.userId,
        updater: userInfo.userId,
      }
    ));
    returnData.data = result;

    return returnData;
  }

  async getTagData(params) {
    const { ctx } = this;

    const newTagNames = (params.tags || []).filter(item => !item.id);
    const existTags = await ctx.model.Tag._find({ name: { $in: newTagNames.map(item => item.name) }, status: Enum.COMMON_STATUS.VALID, type: Enum.TAG_TYPE.APPLICATION });
    const needInsertTags = newTagNames.filter(item => !existTags.some(tag => tag.name === item.name));

    let insertedTags = [];
    if (!_.isEmpty(needInsertTags)) {
      const insertData = needInsertTags.map(item => ({ type: Enum.TAG_TYPE.APPLICATION, name: item.name }));
      insertedTags = await ctx.model.Tag._create(insertData);
    }

    return {
      tags: [
        ...(params.tags || []).filter(item => item.id).map(item => item.id), // 前端传进来的带id的
        ...existTags.map(item => item.id), // 前端传进来无id的，但库里已存在的
        ...insertedTags.map(item => item.id) ], // 前端传进来无id的，新创建的
    };
  }

  async updateBasicInfo(id, requestData) {
    const { ctx } = this;

    const userInfo = ctx.userInfo;
    const { type, developStatus, projectId, isLib, status } = requestData;

    const updateData = {
      updater: userInfo.userId,
    };
    if (type) updateData.type = type;
    if (projectId) updateData.projectId = projectId;
    if (developStatus) updateData.developStatus = developStatus;
    if (_.isBoolean(isLib)) updateData.isLib = isLib;
    if (status) updateData.status = status;
    const tagData = await this.getTagData(requestData);

    await ctx.model.Application._updateOne({ id }, Object.assign(updateData, tagData));
  }

  async updateDesignInfo(id, requestData) {
    const { ctx, config } = this;
    const { pages } = requestData;
    const { pathConfig: { applicationPath } } = config;

    const curApplicationInfo = await ctx.model.Application._findOne({ id });

    const updateData = {};
    if (!_.isEmpty(pages)) updateData.pages = pages;
    await ctx.model.Application._updateOne({ id }, updateData);

    const curApplicationUseComponents = _.flatten((curApplicationInfo.pages || []).map(page => (page.components || []).map(component => component.id)));
    const updateApplicationUseComponents = _.flatten((pages || []).map(page => (page.components || []).map(component => component.id)));
    const deleteComponentIds = _.difference(curApplicationUseComponents, updateApplicationUseComponents);
    const addComponentIds = _.difference(updateApplicationUseComponents, curApplicationUseComponents);

    if (!_.isEmpty(deleteComponentIds)) {
      for (const deleteComponentId of deleteComponentIds) {
        await ctx.model.Component._updateOne({ id: deleteComponentId }, { $pull: { applications: id } });
      }
    }

    if (!_.isEmpty(addComponentIds)) {
      for (const addComponentId of addComponentIds) {
        await ctx.model.Component._updateOne({ id: addComponentId }, { $addToSet: { applications: id } });
      }
    }

    // note: async screenshot component cover, no wait!!!!!
    const savePath = `${applicationPath}/cover/${id}.png`;
    this.genCoverImage(id, savePath);
  }

  async copyApplication(id, applicationInfo) {
    const { ctx } = this;

    const userInfo = ctx.userInfo;
    const returnData = { msg: 'ok', data: {} };

    const copyApplication = await ctx.model.Application._findOne({ id });
    if (_.isEmpty(copyApplication)) {
      returnData.msg = 'No Exists';
      return returnData;
    }

    const existsApplications = await ctx.model.Application._findOne({ name: applicationInfo.name });
    if (!_.isEmpty(existsApplications)) {
      returnData.msg = 'Exists Already';
      return returnData;
    }

    const createInfo = {
      name: applicationInfo.name,

      type: copyApplication.type,
      category: copyApplication.category,
      projectId: copyApplication.projectId,
      tags: copyApplication.tags || [],
      cover: copyApplication.cover,
      developStatus: copyApplication.developStatus,
      pages: copyApplication.pages,
      status: copyApplication.status,

      creator: userInfo.userId,
      updater: userInfo.userId,
    };

    const result = await ctx.model.Application._create(createInfo);
    returnData.data.id = result.id;

    return returnData;
  }

  async getApplicationInfo(id) {
    const { ctx } = this;

    const applicationInfo = await ctx.model.Application._findOne({ id });
    const usersInfo = await ctx.model.User._find({ id: { $in: [ applicationInfo.creator, applicationInfo.updater ] } });
    const creatorUser = (usersInfo || []).find(user => user.id === applicationInfo.creator) || {};
    const updaterUser = (usersInfo || []).find(user => user.id === applicationInfo.updater) || {};

    let projectInfo = {};
    if (!_.isEmpty(applicationInfo.projectId)) projectInfo = await ctx.model.Project._findOne({ id: applicationInfo.projectId });
    const tagIds = applicationInfo.tags || [];
    const tagsInfo = await ctx.model.Tag._find({ id: { $in: tagIds } });

    const returnInfo = {
      id: applicationInfo.id,
      name: applicationInfo.name,
      isLib: applicationInfo.isLib,
      projectInfo: {
        id: projectInfo.id || '',
        name: projectInfo.name || '',
      },
      tags: (applicationInfo.tags || []).map(tag => {
        const curTag = (tagsInfo || []).find(tagInfo => tagInfo.id === tag) || {};
        return {
          id: curTag.id || '',
          name: curTag.name || '',
        };
      }),
      pages: applicationInfo.pages || [],
      type: applicationInfo.type,
      cover: applicationInfo.cover,
      developStatus: applicationInfo.developStatus,

      creatorInfo: {
        id: creatorUser.id,
        username: creatorUser.username,
      },
      updaterInfo: {
        id: updaterUser.id,
        username: updaterUser.username,
      },
    };

    return returnInfo || {};
  }

  async delete(id) {
    const { ctx } = this;

    const updateData = {
      status: Enum.COMMON_STATUS.INVALID,
    };

    await ctx.model.Application._updateOne({ id }, updateData);
  }

  async getList(requestData) {
    const { ctx } = this;

    const { name, type, isLib, tags, projectId, developStatus, curPage, pageSize, status } = requestData;
    const queryCond = {
      status: status ? status : Enum.COMMON_STATUS.VALID,
    };

    if (name) queryCond.name = { $regex: name };
    if (developStatus) queryCond.developStatus = developStatus;
    if (projectId) queryCond.projectId = projectId;
    if (type) queryCond.type = type;
    if (_.isBoolean(isLib)) queryCond.isLib = isLib;
    if (!_.isEmpty(tags)) queryCond.tags = { $in: tags };

    const users = await ctx.model.User._find({});
    const projectList = await ctx.model.Project._find();
    const tagList = await ctx.model.Tag._find();

    const applicationList = await ctx.model.Application._find(queryCond);

    const total = applicationList.length || 0;
    const data = (applicationList || []).splice(curPage * pageSize, pageSize).map(application => {
      const curCreatorUser = (users || []).find(user => user.id === application.creator) || {};
      const curUpdaterUser = (users || []).find(user => user.id === application.updater) || {};
      const curProjectInfo = (projectList || []).find(project => project.id === application.projectId) || {};
      const curTags = (tagList || []).filter(tag => (application.tags || []).includes(tag.id));

      return {
        id: application.id,
        name: application.name,
        developStatus: application.developStatus,
        type: application.type,
        cover: application.cover,
        tags: (curTags || []).map(tag => {
          return {
            id: tag.id,
            name: tag.name,
          };
        }),
        projects: {
          id: curProjectInfo.id,
          name: curProjectInfo.name,
        },
        pages: application.pages || [],
        creator: curCreatorUser.username,
        updater: curUpdaterUser.username,
        updateTime: application.updateTime,
        createTime: application.createTime,
      };
    });

    return { total, data };
  }

  async getComponentList(id, requestData) {
    const { ctx } = this;

    const { name, type } = requestData;
    const applicationInfo = await ctx.model.Application._findOne({ id });

    const returnData = { msg: 'ok', data: {} };
    if (!applicationInfo.projectId) {
      returnData.msg = 'No Exists ProjectId';
      return returnData;
    }

    const queryCond = {
      status: Enum.COMMON_STATUS.VALID,
      developStatus: Enum.COMPONENT_DEVELOP_STATUS.ONLINE,
      projects: applicationInfo.projectId,
    };
    if (name) queryCond.name = name;
    if (type) queryCond.type = type;

    const returnList = [];
    const componentCategories = await ctx.model.ComponentCategory._find({}, null, { sort: '-create_time', limit: 1 }) || [];
    const components = await ctx.model.Component._find(queryCond) || [];

    for (const category of _.get(componentCategories, [ 0, 'categories' ], [])) {
      const categoryInfo = { id: category.id, name: category.name, subCategories: [] };

      for (const children of category.children || []) {
        const subCategoryInfo = { id: children.id, name: children.name, components: [] };

        const curComponents = (components || []).filter(component => component.category === category.id && component.subCategory === children.id);
        subCategoryInfo.components = subCategoryInfo.components.concat(curComponents.map(component => {
          return {
            id: component.id,
            name: component.name,
            cover: component.cover,
            version: _.get(component, [ 'version', (component.version || []).length - 1, 'no' ], 'current'),
          };
        }));
        categoryInfo.subCategories.push(subCategoryInfo);
      }
      returnList.push(categoryInfo);
    }

    returnData.data = returnList;
    return returnData;
  }

  async genCoverImage(id, savePath) {
    const { ctx, logger } = this;

    try {
      const url = 'http://www.baidu.com';
      const result = await ctx.helper.screenshot(url, savePath);
      if (result === 'success') {
        await ctx.model.Application._updateOne({ id }, { cover: `/applications/cover/${id}.png` });
      }
      logger.info(`${id} gen cover success!`);
    } catch (error) {
      logger.error(`${id} gen cover error: ${error || error.stack}`);
    }
  }
}

module.exports = ApplicationService;