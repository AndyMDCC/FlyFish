import { toMobx } from '@chaoswise/cw-mobx';
import { getProjectManageListService, saveProjectService,deleteProjectService } from "../services";
import _ from "lodash";


const model = {
  // 唯一命名空间
  namespace: "AppProjectManage",
  // 状态
  state: {
    searchParams: {},
    projectList: [],
    total: 0,
    activeProject: null,
    isEditProjectModalVisible: false,
  },
  effects: {
    // 获取项目列表数据
    *getProjectList(params = {}) {
      // 处理参数
      let options = {
        curPage: this.curPage,
        pageSize: this.pageSize,
        ...this.searchParams,
        ...params,
      };
      // 请求数据
      const res = yield getProjectManageListService(options);
      this.setProjectList(res);
    },
    *saveProject(params = {}, callback) {
      // 测试代码
      const res = yield saveProjectService(params);
      callback && callback(res);
    },
    *deleteProject(params = {}, callback) {
      // 测试代码
      const res = yield deleteProjectService(params);
      callback && callback(res);
    },
  },
  reducers: {
    setProjectList(res) {
      this.projectList = res.data;
      this.total = res.total;
      this.curPage = res.curPage;
      this.pageSize = res.pageSize;
    },
    setSearchParams(searchParams) {
      this.searchParams = searchParams || {};
    },
    openEditProjectModal(project) {
      this.activeProject = _.clone(project);
      this.isEditProjectModalVisible = true;
    },
    openProjectPage(project) {
      this.activeProject = _.clone(project);
    },
    closeEditProjectModal() {
      this.activeProject = null;
      this.isEditProjectModalVisible = false;
    },
  },
};

export default toMobx(model);