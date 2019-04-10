import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Divider, Avatar, Button } from 'antd';
import UserCard from '@/components/UserCard';
import styles from './Content.less';
@connect(({ user, article, loading }) => ({
  author: user.author,
  authorLoding: loading.effects['user/fetchAuthor'],
  info: article.info,
  comments: article.comments,
  articleLoading: loading.effects['article/fetchDetail']
}))
class Content extends Component {
  state = {
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch({
      type: 'user/fetchAuthor'
    })
    this.fetchDetail(id);
  }

  fetchDetail = (id) => {
    this.props.dispatch({
      type: 'article/fetchDetail',
      payload: id
    })
  }

  render() {
    const { author, info, articleLoading } = this.props;
    const listData = [];
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <Row gutter={24}>
        <Col lg={5} md={12}>
          <UserCard dataSource={author} />
        </Col>
        <Col lg={19} md={12}>
          <Card loading={articleLoading} bodyStyle={{padding:0}}>
            <div className={styles.cover} style={{backgroundImage:`url(${info.cover})`}} />
          </Card>
        </Col>
      </Row>

    );
  }
}

export default Content;
