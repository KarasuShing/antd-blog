import React, { PureComponent } from 'react';
import { Icon, Card, Divider, Tag } from 'antd';
import styles from './index.less';

export default class UserCard extends PureComponent {
  state = {
  };

  render() {
    const { dataSource } = this.props;
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1012041_i48evarko1.js'
    })
    return (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        {dataSource && Object.keys(dataSource).length ? (
          <div>
            <div className={styles.avatarHolder}>
              <img alt="" src={dataSource.avatar} />
              <div className={styles.name}>{dataSource.name}</div>
              <div>{dataSource.signature}</div>
            </div>
            <div className={styles.detail}>
              <p>
                <Icon type='mail' />{dataSource.email}
              </p>
              <p>
                <Icon type="environment" />{dataSource.city}
              </p>
              <p>
                <a href='https://github.com/KarasuShing'>
                  <IconFont type="icon-github" />乌鸦
                </a>
              </p>
              <p>
                <a href='https://space.bilibili.com/2310190'>
                  <IconFont type="icon-CN_bilibili" />Karasu_Shing
                </a>
              </p>
              <p>
                <a href='https://www.zhihu.com/people/KarasuShing/activities'>
                  <IconFont type="icon-zhihu" />乌鸦
                </a>
              </p>
              <p>
                <a href='https://psnine.com/psnid/hz_raven'>
                  <IconFont type="icon-playstation" />hz_raven
                </a>
              </p>
            </div>
            <Divider dashed />
            <div className={styles.tags}>
              {dataSource.tags.map((item, key) => (
                <Tag key={key}>{item}</Tag>
              ))}
            </div>
          </div>
        ) : (
            'loading...'
          )}
      </Card>
    );
  }
}