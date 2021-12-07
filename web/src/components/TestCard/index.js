import React from 'react';
import { Form, Popconfirm } from "@chaoswise/ui";
import { Card, Tag, Col, Row, Icon, Avatar, Empty, message, Tooltip, Spin } from 'antd';
const { Meta } = Card;
import styles from './index.less';
import { TAG_COLORS, APP_DEVELOP_STATUS } from '@/config/global';
import { observer, toJS } from "@chaoswise/cw-mobx";
import { wordlimit } from '@/config/global';
const computedTagWordByStatus = (status) => {
    return APP_DEVELOP_STATUS.find(item => item.id === status).name;
};
const computedTagColorByStatus = (status) => {
    return TAG_COLORS.find(item => item.id === status).color;
};
// import logo from '../../assets/images/logo.svg';




export default Form.create({ name: "BASIC_CARD" })(
    function BasicCard({ number, projectID, onDelete, setActiveCard, addOwn, showOwn, checkCard, value, state, showStateTag, actions, canDelete, canAdd }) {
        let [loadFlag, setLoadFlag] = React.useState([]);
        const tradesArr = (trades) => {
            if (trades.length === 0) {
                return '暂无';
            } else {
                return trades.map((item, index) => {
                    if (index !== trades.length - 1) {
                        return item.name + ',';
                    } else {
                        return item.name;
                    }
                });
            }
        };
        let [checkid, setCheckId] = React.useState('');

        return (
            <Row justify="space-around" gutter={['16', '16']} style={{ margin: '10px' }} className={styles.cardList}>
                {
                    value && value.list && value.list.length > 0 ? value.list.map((item, index) => <Col span={number || 8} key={item.id}>
                        <Card
                            onClick={() => {
                                setActiveCard && setActiveCard(item);
                            }}
                            style={{ boxShadow: checkid == item.id ? '3px 3px 3px 3px #dedede' : null, position: 'relative' }}
                            cover={
                                <>
                                    {
                                        canDelete && item.isLib ? <Popconfirm title="确认删除？" okText="确认" cancelText="取消" onConfirm={() => {
                                            onDelete && onDelete(item);
                                        }}>
                                            <Tag className={styles.deleteTag} color='red' >
                                                <Icon type="minus" />
                                            </Tag>
                                        </Popconfirm> : null
                                    }
                                    {
                                        canAdd ? <Tag className={styles.deleteTag} color={item.projects.map(item => item.id).includes(projectID) ? "#52C41A" : "#2db7f5"} onClick={() => {
                                            if (item.projects.map(item => item.id).includes(projectID)) {
                                                message.error('该组件已归属该项目');
                                                return;
                                            }
                                            let projectsArr = item.projects.map(item => item.id);
                                            addOwn && addOwn(item.id, projectsArr);
                                        }}>
                                            {item.projects.map(item => item.id).includes(projectID) ? <Icon type="check" /> : <Icon type="plus" />}
                                        </Tag> : null
                                    }
                                    {
                                        !showStateTag ? null : <Tag className={styles.tag} color={computedTagColorByStatus(item.developStatus)}>{computedTagWordByStatus(item.developStatus)}</Tag>
                                    }
                                    <img
                                        style={{ height: number ? '157px' : '240px' }}
                                        onClick={() => {
                                            checkCard && checkCard(item.id);
                                            setCheckId(item.id);
                                        }}
                                        onLoad={(event) => {
                                            const target = event.target;
                                            if (target.complete) {
                                                let a = [...loadFlag, item.id];
                                                setLoadFlag(a);
                                            }

                                        }}
                                        alt="暂无照片"
                                        src={'/api/' + item.cover}
                                    />
                                    {loadFlag.includes(item.id) ? null : <Spin size="default" className={styles.img} style={{ height: number ? '157px' : '240px', lineHeight: number ? '157px' : '240px' }} />}

                                </>
                            }
                            actions={actions && actions(item).props.children}
                        >
                            <Meta
                                onClick={() => {
                                    checkCard && checkCard(item.id);
                                    setCheckId(item.id);
                                }}
                                title={(() => {
                                    return <Tooltip title={item.name}>
                                        <span>{`${item.name || '暂无'}`}</span>
                                    </Tooltip>;

                                })()}
                                description={(() => {
                                    const apply = [
                                        <div key='apply'>
                                            <Tooltip title={item.updater}>
                                                <p className='titleOverflow'>当前开发人：{item.updater || '暂无'}</p>
                                            </Tooltip>
                                            <Tooltip title={item.creator}>
                                                <p className='titleOverflow' >创建人：{item.creator || '暂无'}</p>
                                            </Tooltip>
                                            <Tooltip title={item.tags && tradesArr(item.tags)}>
                                                <p className='titleOverflow'>标签：{item.tags && tradesArr(item.tags)}</p>
                                            </Tooltip>
                                        </div>
                                    ];
                                    const actionsOk = [
                                        <div key='template'>
                                            <Tooltip title={item.id}><p className='titleOverflow'>模板编号：{item.id || '暂无'}</p>  </Tooltip>
                                            <Tooltip title={item.trades && tradesArr(item.trades)}> <p >行业：{item.trades && tradesArr(item.trades)}</p>  </Tooltip>
                                        </div>
                                    ];
                                    const applyList = [
                                        <div key='apply'>
                                            <Tooltip title={item.id}>
                                                <p className='titleOverflow'>组件编号：{item.id || '暂无'}</p>
                                            </Tooltip>
                                            <Tooltip title={item.desc}>
                                                <p className='titleOverflow'>描述：{item.desc || '暂无'}</p>
                                            </Tooltip>
                                        </div>
                                    ];
                                    if (!actions) return applyList;
                                    if (state) {
                                        return actionsOk;
                                    } else {
                                        return apply;
                                    }
                                })()}
                            />

                        </Card>
                    </Col>) : <div className='flexContainer'> <Empty /></div>
                }
            </Row>
        );

    }
);