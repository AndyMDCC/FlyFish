/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CWTable, Input, Button, message, Popconfirm, Icon } from "@chaoswise/ui";
import { observer, loadingStore, toJS } from "@chaoswise/cw-mobx";
import store from "./model/index";
import { formatDate } from '@/config/global';

import EditProjectModal from "./components/EditProjectModal";
import { successCode } from "@/config/global";
import styles from "./assets/style.less";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from 'react-router-dom';
const AppProjectManage = observer((props) => {
  const intl = useIntl();
  const {
    getProjectList,
    setSearchParams,
    saveProject, changeProject, getIndustrysList,
    openEditProjectModal, openProjectPage,
    closeEditProjectModal, deleteProject, addNewIndustrys
  } = store;
  const { total, industryList, current, pageSize, projectList, isEditProjectModalVisible, activeProject } =
    store;
  let [checkFlag, setCheckFlag] = useState(false);
  const loading = loadingStore.loading["AppProjectManage/getProjectList"];
  // 表格列表数据
  let basicTableListData = toJS(projectList);
  // 表格列配置信息
  const columns = [
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name",
      disabled: true,
      render(text, record) {
        return <span style={{cursor:'pointer'}} onClick={() => {
          goRoute(record.id);
          openProjectPage(record);
        }}>{text}</span>;
      },
    },
    {
      title: "行业",
      width: 150,
      dataIndex: "trades",
      key: "trades",
      render(trades) {
        return trades.map((item, index) => {
          if (index !== trades.length - 1) {
            return item.name + ',';
          } else {
            return item.name;
          }
        });
      },
    },
    {
      title: "描述",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render(createTime) {
        return formatDate(createTime);
      },
      width: 200
    },
    {
      title: "创建人",
      dataIndex: "creatorName",
      key: "creatorName",
      width: 110
    },
    {
      title: intl.formatMessage({
        id: "common.actions",
        defaultValue: "操作",
      }),
      dataIndex: "actions",
      key: "actions",
      width: 200,
      render(text, record, index) {
        return (
          <span className={styles.projectActionList}>
            <Link className={styles.projectAction}
              to={{}}
              onClick={() => {
                goRoute(record.id);
                openProjectPage(record);
              }}>
              <FormattedMessage
                id="pages.projectManage.goToProject"
                defaultValue="进入项目"
              />
            </Link>
            <a
              className={styles.projectAction}
              onClick={() => {
                setCheckFlag(false);
                record.trades = record.trades.map(item => item.name);
                openEditProjectModal(record);
              }}
            >
              <FormattedMessage id="common.edit" defaultValue="编辑" />
            </a>
            <Popconfirm title="确认删除？" okText="确认" cancelText="取消" onConfirm={() => {
              deleteProject(record, (res) => {
                if (res.code === successCode) {
                  message.success(
                    intl.formatMessage({
                      id: "common.deleteSuccess",
                      defaultValue: "删除成功！",
                    })
                  );
                  closeEditProjectModal();
                  getProjectList();
                } else {
                  message.error(
                    intl.formatMessage({
                      id: "common.deleteError",
                      defaultValue: "删除失败，请稍后重试！",
                    })
                  );
                }
              });
            }}>
              <a className={styles.projectAction}>
                <FormattedMessage id="common.delete" defaultValue="删除" />
              </a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const searchContent = [
    {
      components: (
        <Input
          id="key"
          key="key"
          allowClear
          style={{ width: "300px" }}
          suffix={<Icon type="search" />
          }

          placeholder={intl.formatMessage({
            id: "pages.projectManage.searchInputPlaceholder",
            defaultValue: "输入项目名称/行业/描述进行查询",
          })}
        />
      ),
    },
  ];
  // 请求列表数据
  useEffect(() => {
    getProjectList({curPage:0});
    getIndustrysList();
  }, []);
  const goRoute = (id) => {
    props.history.push(`/app/${id}/project-detail`);
  };
  // 分页、排序、筛选变化时触发
  const onPageChange = (curPage, pageSize) => {
    getProjectList({ curPage: curPage - 1, pageSize });
  };
  const onSearch = (params) => {
    setSearchParams(params);
    getProjectList({
      curPage: 0,
      pageSize: 10
    });
  };

  return (
    <React.Fragment>
      <CWTable
        columns={columns}
        dataSource={basicTableListData}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={{
          showTotal: true,
          total: total,
          current: current,
          pageSize: pageSize,
          onChange: onPageChange,
          onShowSizeChange: onPageChange,
          showSizeChanger: true
        }}
        searchBar={{
          onSearch: onSearch,
          extra: () => {
            return [
              <Button
                type="primary"
                key="create_project"
                onClick={() => {
                  setCheckFlag(true);
                  openEditProjectModal({});
                }}
              >
                <FormattedMessage
                  id="pages.projectManage.create"
                  defaultValue="添加项目"
                />
              </Button>,
            ];
          },
          searchContent: searchContent,
        }}
      ></CWTable>
      {isEditProjectModalVisible && (
        <EditProjectModal
          flag={checkFlag}
          project={activeProject}
          list={industryList}
          addIndusty={(name) => {
            addNewIndustrys(name, (res => {
              if (res.code === successCode) {
                message.success(
                  intl.formatMessage({
                    id: "common.addSuccess",
                    defaultValue: "新增成功！",
                  })
                );
                getIndustrysList();
              } else {
                message.error(
                  res.msg || intl.formatMessage({
                    id: "common.addError",
                    defaultValue: "新增失败，请稍后重试！",
                  })
                );
              }
            }));
          }}
          onSave={(project) => {
            saveProject(project, (res) => {
              if (res.code === successCode) {
                message.success(
                  intl.formatMessage({
                    id: "common.addSuccess",
                    defaultValue: "新增成功！",
                  })
                );
                closeEditProjectModal();
                getProjectList();
              } else {
                message.error(
                  res.msg || intl.formatMessage({
                    id: "common.addError",
                    defaultValue: "新增失败，请稍后重试！",
                  })
                );
              }
            });
          }}
          onChange={(id, project) => {
            changeProject(id, project, (res) => {

              if (res.code === successCode) {
                message.success(
                  intl.formatMessage({
                    id: "common.changeSuccess",
                    defaultValue: "编辑成功！",
                  })
                );
                closeEditProjectModal();
                getProjectList();
              } else {
                message.error(
                  res.msg || intl.formatMessage({
                    id: "common.changeError",
                    defaultValue: "编辑失败，请稍后重试！",
                  })
                );
              }
            });
          }}
          onCancel={closeEditProjectModal}
        />
      )}
    </React.Fragment>
  );
});
export default AppProjectManage;