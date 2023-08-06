
import React, { useEffect, useState } from "react";
import {Row, Col,  Avatar, List} from 'antd';
import Axios from "axios";

// import { response } from "express";

// import Subscribe from './Sections/Subscribe.js';
// import Comment from './Sections/Comment.js';
// import LikeDislikes from './Sections/LikeDislikes.js'


function BoardDetailPage(props) {


    
    const boardId = props.match.params.boardId;
    const variable = {boardId: boardId}

    const [BoardDetail, setBoardDetail] = useState([]);
    // const [Comments, setComments] = useState([])
    


    useEffect(() => {

        Axios.post('/api/board/getBoardDetail', variable)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.board);
                    setBoardDetail(response.data.board);

                } else {
                    alert('비디오 정보를 가져오길 실패했습니다.');
                }
            })

        // Axios.post('/api/comment/getComments', variable)
        // .then(response => {
        //     if (response.data.success) {
        //         setComments(response.data.comments)
        //     } else {
        //         alert('코멘트 정보를 가져오는 것을 실패했습니다.')
        //     }
        // })

    }, []);

    // const refreshFunction = (newComment)=> {
    //     setComments(Comments.concat(newComment));
    // }
    
    // const subscribeButton = VideoDetail && VideoDetail.writer && (VideoDetail.writer._id !== localStorage.getItem('userId')) 
    //     && <Subscribe 
    //     userTo={VideoDetail.writer && VideoDetail.writer._id} 
    //     userFrom={localStorage.getItem('userId')} />
    if(BoardDetail.user) {
        return (
            
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
    
                <div style={{ width: '100%', padding: '3rem 4rem', position: 'relative', overflow: 'hidden' }}>
  <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={`http://localhost:5050/${BoardDetail.filePath}`} alt="게시글 이미지" />
    
                        <List.Item
                            actions
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={BoardDetail.user && BoardDetail.user.image} />}
                                    title={<span>
                                        {BoardDetail.user.lastname}{BoardDetail.user.name}
                                      </span>}
                                    description={BoardDetail.description}
                                />
                        </List.Item>
    
                        {/* comments */}
                        {/* <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/> */}
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    {/* <SideBoard /> */}
                </Col>
            </Row>
    
        )
    }

    else {
        return (
            <div>Loading...</div>
        )
    }

        
    
}


export default BoardDetailPage
