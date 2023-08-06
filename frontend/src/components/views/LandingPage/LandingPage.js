import React, { useEffect, useState, useSelector } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Col, Typography, Row, Avatar, message } from 'antd';
import Axios from 'axios';
import moment from 'moment';
const {Title} = Typography;
const {Meta} = Card;



function LandingPage() {




    const [Board, setBoard] = useState([]);

    
    useEffect(() => {
        Axios.get('/api/board/getBoards')
          .then((response) => {
            if (response.data.success) {
                message.success("성공적으로 불러왔습니다.")
              setBoard(response.data.boards);
            } else {
              alert('게시글 가져오기를 실패했습니다.');
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

    
    const renderCards = Board.map((board, index) => {

        // var minutes = Math.floor(board.duration / 60);
        // var seconds = Math.floor(board.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative', width: '100%', height: '100%', paddingBottom: '100%' }}>
                 <a href={`/board/${board.id}`} >   
                <img style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} alt="thumbnail" src={`http://localhost:5050/${board.thumbnail}`} />
                <div className="duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    {/* <span>{minutes} : {seconds}</span> */}
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={board.user.image} />
                }
                title={board.title}
            />
            <span>{board.user.lastname}{board.user.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {moment(board.createdAt).format("YYYY-MM-DD")} </span>
              <span>{board.views} views </span>
            
        </Col>

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>
            <hr />

            <Row>
                {renderCards}
            </Row>
        </div>
    )
}


export default LandingPage
