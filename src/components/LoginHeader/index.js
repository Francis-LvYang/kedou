 /**
 * @component LoginHeader
 * @description 登录|注册|忘记密码 头部
 * @parameter title={str} 标题 goBack={fn} 点击返回的回调函数
 * @time 2020/2/3
 * @author Aiden
 */
import React from 'react'
import './index.scss'
function index(props) {
    const {
        title,
        goBack
    } = props
    return (
        <div className='loginHeader' onClick={()=>goBack()}>
            <div className="goback">
                <img src={require('../../assets/images/back-black.png')} alt=""/>
            </div>
            <div className="title">
                {title}
            </div>
        </div>
    )
}

export default index
