import { ListView } from 'antd-mobile';
import React from 'react';
import '../index.less';


const bookSearch = (props) => {
  const onEndReached = (event) => {
    props.onScrollVideoData()
  }

  const row = (item, sectionID, rowID) => {
    return (
      <div key={item.id} className='searchContent'>
        <div className='searchContentOne'>
          <img onClick={()=>props.goBook(item)} style={{ width: '2.7rem', height: '4rem' }} src={item.poster} alt="" />
          <div style={{ height: '4rem' }}>
            <div className='searchText'>
              <h1>{item.title}</h1>
              <div style={{ display: 'flex' }}>
                <p className='playerNum'>{item.play}</p>
                <p className='collectNum'>{item.love}</p>
              </div>
              <div style={{ display: 'flex', marginTop: '.3rem' }}>
                <p className='typeText1'>{item.label}</p>
                <p className='typeText2'>{'暂无'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <ListView
      dataSource={props.dataSource}
      // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
      //   {state.isLoading ? 'Loading...' : 'Loaded'}
      // </div>)}
      renderRow={row}
      className="am-list-search"
      pageSize={4}
      useBodyScroll
      // onScroll={() => { console.log('scroll'); }}
      scrollRenderAheadDistance={500}
      onEndReached={onEndReached}
      onEndReachedThreshold={10}
    />
  );
}
export default bookSearch