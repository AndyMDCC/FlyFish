import { flattenMessages } from "./utils";

export default flattenMessages({
  common: {
    save: "保存",
    cancel: "取消",
    create: "添加",
    edit: "编辑",
    delete: "删除",
    ok: "确定",
    disable:'禁用',
    recovery:'恢复',
    download: "下载",
    all: "全部",
    export: "导出",
    import: "导入",
    actions: "操作",
    pleaseInput: "请输入",
    pleaseSelect: "请选择",
    saveError: "保存失败，请稍后重试！",
    saveSuccess: "保存成功！",
    disableSuccess: "禁用成功！",
    disableError: "禁用失败，请稍后重试！",
    recoverySuccess:'恢复成功！',
    recoveryError:'恢复失败，请稍后重试！',
    addError: "新增失败，请稍后重试！",
    addSuccess: "新增成功！",
    deleteError: "删除失败，请稍后重试！",
    deleteSuccess: "删除成功！",
    changeSuccess:'编辑成功！',
    changeError:"编辑失败，请稍后重试！",
    loadDataError: "加载{name}失败，请稍后重试！",
  },
  business: {},
  components: {},
  pages: {
    projectManage: {
      create: "添加项目",
      edit: "编辑项目",
      goToProject: "进入项目",
      searchInputPlaceholder: "输入项目名称/项目标识/行业/描述进行查询",
      searchInputTag:'选择标签进行查询'
    },
    applyDevelop: {
      create: "添加应用",
      edit: "编辑应用",
      goToProject: "进入应用",
      searchInputPlaceholder:'选择应用类型进行查询',
      searchInputDevelopmentState: "选择开发状态进行查询",
      searchInputProgressName:'输入项目名称进行查询',
      searchInputAppName:'输入应用名称进行查询',
      searchInputApplyLabel:'选择应用标签进行查询'
    },
    userManage: {
      create: "添加用户",
      edit: "编辑用户",
      configurePermissions:"配置权限",
      searchInputUsername:"输入用户名进行查询",
      searchInputEmail: "输入邮箱进行查询",
      searchInputproject: "选择所属项目进行查询",
      searchInputstate:"选择状态进行查询"
    },
    roleManage:{
      create: "添加角色",
      edit: "编辑角色",
      member:"成员列表",
      role:'权限配置',
      searchInputRoleName:'输入角色名进行查询'
    }
  },
  columns: {
    projectManage: {},
  },
});