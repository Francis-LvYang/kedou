
import { ListView } from 'antd-mobile';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSearchBook, getSearchVideo } from '../../store/action/search';
import BookSearch from './components/BookContent';
import VideoSearch from './components/VideoContent';
import './index.less';
let setRequst = null;
const mapDispatchToProps = {
  getSearchVideo, getSearchBook
};

@connect(({ searchVideoData }) => ({
  searchVideoData
}), mapDispatchToProps)
@withRouter
class SearchBarExample extends React.Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      stopRequest: false,
      keyword: '',
      noData: false,
      dataSource,
      value: '',
      isSearch: false,
      isvideo: true,
      page: 1,// 请求分页
      videoData: [],
      bookDate: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    if (this.props.match.params.name === 'book') {
      this.setState({
        isvideo: false
      })
    }
  }

  componentWillUnmount() {
    this.props.searchVideoData.data = []
    this.props.searchVideoData.bookData = []
    clearTimeout(setRequst)
  }

  goback = () => {
    this.props.history.go(-1)
  }

  goBook = (item) => {
    this.props.history.push({
      pathname: '/book',
      state: { id: item.id }
    })
  }

  goPlayer = (item) => {
    this.props.history.push(`/detailVideo/video_id=${item.id}`)
  }

  onChange = (e) => {
    const searchValue = e.target.value.replace(/\s+/g, '');
    this.setState({
      value: e.target.value,
      keyword: searchValue,
    });
    clearTimeout(setRequst)
    setRequst = setTimeout(() => {
      if (searchValue === '') {
        this.setState({
          isSearch: false
        })
      } else {
        if (this.props.match.params.name === 'video') {
          this.setState({
            stopRequest: false,
            page: 1,
          })
          new Promise(resolve => {
            this.props.getSearchVideo({ keyword: searchValue, rows: '10', page: '1', resolve })
          }).then(res => {
            if (res.length > 0) {
              this.setState({
                videoData: res,
                dataSource: this.state.dataSource.cloneWithRows(res),
                isLoading: false,
                noData: false,//有数据
              })
            }
            if (res.length === 0) {
              this.setState({
                noData: true // 没数据
              })
            }
            if (res.length < 10) {
              this.setState({
                stopRequest: true,
              })
            }
          })
        } else {
          this.setState({
            stopRequest: false,
            page: 1,
          })
          new Promise(resolve => {
            this.props.getSearchBook({ keyword: searchValue, rows: '10', page: '1', handle: 'after', resolve })
          }).then(res => {
            if (res.length > 0) {
              this.setState({
                bookData: res,
                dataSource: this.state.dataSource.cloneWithRows(res),
                isLoading: false,
                noData: false,//有数据
              })
            }
            if (res.length === 0) {
              this.setState({
                noData: true // 没数据
              })
            }
            if (res.length < 10) {
              this.setState({
                stopRequest: true,
              })
            }
          })
        }
        this.setState({
          isSearch: true
        })
      }
    }, 1500);
  };

  onScrollVideoData = () => { //视频滑动请求
    if (!this.state.stopRequest && this.state.isvideo) {
      this.setState({ isLoading: true });
      new Promise(resolve => {
        this.props.getSearchVideo({
          keyword: this.state.keyword,
          rows: '10',
          page: String(this.state.page + 1),
          resolve
        })
      }).then(res => {
        if (res.length < 10) {
          this.setState({
            stopRequest: true,
          })
          return
        } else {
          const videoData = this.state.videoData
          videoData.push(...res)
          this.setState({
            page: this.state.page + 1,
            isLoading: false,
            videoData,
            dataSource: this.state.dataSource.cloneWithRows(videoData),
          })
        }
      })
    }
    if (!this.state.stopRequest && !this.state.isvideo) {
      this.setState({ isLoading: true });
      new Promise(resolve => {
        this.props.getSearchBook({
          keyword: this.state.keyword,
          rows: '10',
          page: String(this.state.page + 1),
          handle: 'after',
          resolve,
        })
      }).then(res => {
        if (res.length < 10) {
          this.setState({
            stopRequest: true,
          })
          return
        } else {
          const videoData = this.state.videoData
          videoData.push(...res)
          this.setState({
            page: this.state.page + 1,
            isLoading: false,
            videoData,
            dataSource: this.state.dataSource.cloneWithRows(videoData),
          })
        }
      })
    }
  }

  render() {
    if (this.state.isvideo) {
      const videoSearchProps = {
        dataSource: this.state.dataSource,
        noData: this.state.noData,
        goPlayer: this.goPlayer,
        onScrollVideoData: this.onScrollVideoData,
      }
      return (
        <div>
          <div className='searchHeader'>
            <input
              type="text"
              autoFocus="autofocus"
              placeholder='输入搜索关键词'
              onChange={this.onChange}
              value={this.state.value}
              onKeyDown={this.onKeyDown}
            />
            <span onClick={this.goback}>取消</span>
            <p className='searchIcon' />
          </div>
          {
            !this.state.noData
              ? <VideoSearch {...videoSearchProps} />
              : this.state.isSearch
                ? <p className='noSearch'>未搜到相关内容</p>
                : null
          }
        </div>
      );
    } else {
      const bookSearchProps = {
        dataSource: this.state.dataSource,
        noData: this.state.noData,
        goBook: this.goBook,
        onScrollVideoData: this.onScrollVideoData
      }
      return (
        <div>
          <div className='searchHeader'>
            <input
              type="search"
              autoFocus="autofocus"
              placeholder='输入搜索关键词'
              onChange={this.onChange}
              value={this.state.value}
              onKeyDown={this.onKeyDown}
            />
            <span onClick={this.goback}>取消</span>
            <p className='searchIcon' />
          </div>
          {
            !this.state.noData
              ? <BookSearch {...bookSearchProps} />
              : this.state.isSearch
                ? < p className='noSearch'>未搜到相关内容</p>
                : null
          }
        </div >
      );
    }
  }
}
export default SearchBarExample




