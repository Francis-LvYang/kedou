/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */

import { Toast } from 'antd-mobile';
import copy from 'copy-to-clipboard';
import React from 'react';
import '../player.less';

const Content = (props) => {
  const onPress = (item) => {
    document.documentElement.scrollTop = 0
    window.sessionStorage.removeItem('goBack')
    props.router.history.push(`/detailVideo/${item.id}`);
    props.getVideo(item.id);
    props.getChat(item.id)
  }
  const copyAccessKey = () => {
    if (props.detailData.share_url) {
      // copy(props.detailData.share_url)
      let shareUrl = window.location.href
      shareUrl=`${shareUrl}/${sessionStorage.getItem('invitation_code')}`
      copy(shareUrl)
      Toast.success('已复制邀请链接,粘贴分享给好友')
    } else {
      Toast.fail('分享复制失败')
    }
  }
  return (
    <div id='contentPlayer' style={{ padding: '.1rem', background: '#fff' }}>
      <div className='title'>
        <p style={{ fontWeight: 900 }} className='titleLogo'><img src={require('../../../assets/images/ico@2x.png')} alt="" /></p>
        <p className='titleText'>{props.detailData.title}</p>
        <p className='lastP'>
          <span style={{ fontSize: '.35rem', color: "#840fe4", fontWeight: 900 }}>{props.detailData.play_num}</span>看过
        </p>
      </div>
      <div className='collect'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
          <p onClick={props.likedClick} className={props.detailData.fabulous_video !== 0 ? 'icon1Press' : 'icon1'}><span>{props.detailData.liked_num}</span></p>  {/*点赞数量*/}
          <p className='icon2' onClick={props.showComment}><span>{props.detailData.comment_num}</span></p>  {/*评论数量*/}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
          <p onClick={props.collectBtn} className={props.isCollect ? 'icon3Press' : 'icon3'}></p>{/*收藏*/}
          <p onClick={copyAccessKey} className='icon4'></p>{/*分享*/}
        </div>
      </div>
      <div className='hotVideo'>
        <p className='hotTitle'>猜你喜欢</p>
        <div className='collectContent'>
          {
            props.dataList && props.dataList.map(item => (
              <div
                onClick={() => onPress(item)}
                style={{
                  width: '3.5rem',
                  height: item.cover_one ? '' : '4rem'
                }}
                key={item.id}
              >
                <img style={{ width: '100%', height: '100%' }} src={item.cover_one ? item.cover_one : ''} alt={item.cover_one ? '' : '暂无图片'} />
                <p>{item.title}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default Content
