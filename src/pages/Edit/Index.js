import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Upload, Icon, message, Input, Button } from 'antd';
import styles from './Index.less';
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';
const Dragger = Upload.Dragger;
@connect(({ user, article, loading }) => ({
}))
class Index extends Component {
  state = {
    fileList: [],
    coverpath: '',
    title: '',
    md: ''
  };

  componentDidMount() {
    this.smde = new SimpleMDE({
      element: document.getElementById('editor').childElementCount,
      autofocus: true,
      autosave: true,
      previewRender: function (plainText) {
        return marked(plainText, {
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight: function (code) {
            return highlight.highlightAuto(code).value;
          }
        });
      }
    })
  }

  inputTitle = (e) => {
    this.setState({})
  }

  onSubmit = () => {
    const cover = this.state.coverpath;
    const title = this.state.title.replace(/\s+/g, '');
    const md = this.smde.value().replace(/(^\s*)|(\s*$)/g, "");
    if (!title) {
      message.error('请输入文章标题');
      return;
    }
    if (!md) {
      message.error('文章内容不能为空');
      return;
    }
    this.props.dispatch({
      type: 'article/add',
      payload: { title, cover, md: window.btoa(encodeURI(md)) }
    })
  }

  render() {
    const that = this;
    let { coverpath, fileList, md } = this.state;
    const props = {
      name: 'file',
      action: '/blog/v1/articleCover',
      fileList,
      onRemove: () => { that.setState({ coverpath: '' }) },
      onChange(info) {
        let { fileList } = info;
        fileList = fileList.slice(-1);
        that.setState({ fileList });
        const status = info.file.status;
        if (status !== 'uploading') {

        }
        if (status === 'done' && info.file.response) {
          that.setState({ coverpath: info.file.response });
          message.success('文件上传成功');
        } else if (status === 'error') {
          message.error('文件上传失败');
        }
      },
    };
    return (

      <div style={{ padding: '0 200px' }}>
        <div style={{ marginBottom: 16 }}>
          <Dragger {...props}>
            {coverpath ? (
              <img src={coverpath} />
            ) : (
                <div>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">点击或拖拽上传文章封面图片</p>
                </div>
              )}
          </Dragger>
        </div>
        <div className={styles.title}>
          <Input placeholder="input with clear icon" allowClear onChange={(e) => { this.setState({ title: e.currentTarget.value }) }} placeholder='请输入文章标题' />
        </div>
        <textarea id="editor" defaultValue={md} />
        <Button type='primary' onClick={this.onSubmit}>发布</Button>
        <Button style={{ marginLeft: 16 }}>保存草稿</Button>
      </div >
    );
  }
}

export default Index;
