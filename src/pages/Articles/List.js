import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Divider, List as Alist, Avatar, Button } from 'antd';
import router from 'umi/router';
import UserCard from '@/components/UserCard';
import styles from './List.less';
const Item = Alist.Item;
@connect(({ user, article, loading }) => ({
  author: user.author,
  authorLoding: loading.effects['user/fetchAuthor'],
  list: article.list,
  total: article.total,
  articleLoading: loading.effects['article/fetch']
}))
class List extends Component {
  state = {
    page: 1,
    size: 5
  };

  componentDidMount() {
    const { page, size } = this.state;
    this.props.dispatch({
      type: 'user/fetchAuthor'
    })
    this.fetchArticle(page, size);
  }

  fetchArticle = (page, size) => {
    this.props.dispatch({
      type: 'article/fetch',
      payload: page, size
    })
  }

  changePage = (page, size) => {
    this.fetchArticle(page, size);
  }

  toArticle = (id) => {
    router.push('/articles/' + id);
  }

  render() {
    const { author, list, total, articleLoading } = this.props;
    const listData = [];
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const pagination = { onChange: this.changePage, total: total, pageSize: 5 };
    return (
      <Row gutter={24}>
        <Col lg={5} md={12}>
          <UserCard dataSource={author} />
        </Col>
        <Col lg={19} md={12}>
          <Card className={styles.tabsCard} >
            <Alist
              itemLayout="vertical"
              size="large"
              pagination={pagination}
              dataSource={list}
              loading={articleLoading}
              renderItem={item => (
                <Item
                  key={item.title}
                  onClick={() => {this.toArticle(item.id)}}
                  actions={[
                    <IconText type="star-o" text={item.star || 0} />,
                    <IconText type="like-o" text={item.like || 0} />,
                    <IconText type="message" text={item.comment || 0} />,
                    <div>{item.created_at}</div>
                  ]}
                  extra={<div className={styles.cover} style={{backgroundImage:`url(${item.cover})`}} />}
                >
                  <Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description || '作者很赖，没有添加文章描述'}
                  />
                  {item.content}
                </Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      
    );
  }
}

export default List;
