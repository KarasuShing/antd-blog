import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { List, Icon, Card, Divider, Avatar, Skeleton  } from 'antd';
import styles from './Content.less';
import marked from 'marked'
const { Meta } = Card;
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
    const { author, info, articleLoading, comments } = this.props;
    const listData = [];
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <Fragment>
        <Card
          loading={articleLoading}
          style={{ margin: '0 auto', maxWidth: 1200 }}
          cover={<Skeleton active loading={articleLoading}><div className={styles.cover} style={{ backgroundImage: `url(${info.cover})` }} /></Skeleton>}
        >
          <Meta
            avatar={<Avatar src={info.avatar} />}
            title={info.name}
            description={[
              <IconText type="clock-circle" text={info.updated_at} key='1' />,
              <Divider type="vertical" key='2' />,
              <IconText type="eye" text={info.views} key='3' />,
              <Divider type="vertical" key='4' />,
              <IconText type="star-o" text={info.star} key='5' />,
              <Divider type="vertical" key='6' />,
              <IconText type="like-o" text={info.like} key='7' />,
              <Divider type="vertical" key='8' />,
              <IconText type="message" text={info.comment} key='9' />
            ]}
          />
          <div dangerouslySetInnerHTML={{ __html: marked(info.content || '') }} />
        </Card>
        <Card style={{ margin: '16px auto 0', maxWidth: 1200 }} title="评论" id='c'>
          <List
            itemLayout="horizontal"
            dataSource={comments}
            locale={{emptyText:'暂无评论'}}
            renderItem={(item, index) => (
              <List.Item style={{ flexDirection: 'column' }}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={[
                    <p key='content'>{item.content}</p>,
                    <div style={{ width: '100%' }} key='extra'>
                      <span style={{ marginRight: 20 }}>#{index + 1}</span>
                      <span style={{ marginRight: 20 }}>{item.created_at}</span>
                      <span style={{ marginRight: 20 }}><IconText type='smile' text={item.dislike || 0}/></span>,
                      <span style={{ marginRight: 20 }}><IconText type='frown' text={item.like || 0}/></span>
                    </div>
                  ]}
                  style={{ width: '100%' }}
                />

              </List.Item>
            )}
          />,
      </Card>
      </Fragment>
    );
  }
}

export default Content;
