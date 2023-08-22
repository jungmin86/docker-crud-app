// import React, { useEffect, useState } from 'react'
// import { FaCode } from "react-icons/fa";
// import { Card, Icon, Col, Typography, Row, Avatar } from 'antd';
// import Axios from 'axios';
// import moment from 'moment';
// const {Title} = Typography;
// const {Meta} = Card;

// function SubscriptionPage() {

//     const [Board, setBoard] = useState([]);

    
//     useEffect(() => {

//         const subscriptionVariables = {
//             userFrom: localStorage.getItem('userId'),
//           };

//         Axios.post('/api/board/getSubscriptionBoards', subscriptionVariables)
//         .then(response => {

//             if(response.data.success) {
//                 console.log(response.data)
//                 setBoard(response.data.boards)
//             } else {
//                 alert('비디오 가져오기를 실패했습니다.')
//             }
//         })
//     }, [])


//     const renderCards = Board.map((board, index) => {

//         // var minutes = Math.floor(video.duration / 60);
//         // var seconds = Math.floor(video.duration - minutes * 60);

//         return <Col lg={6} md={8} xs={24}>
//             <div style={{ position: 'relative', width: '100%', height: '100%', paddingBottom: '100%' }}>
//                  <a href={`/board/${board.id}`} >   
//                 <img style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} alt="thumbnail" src={`http://localhost:5050/${board.thumbnail}`} />
//                 <div className="duration"
//                     style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
//                     color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
//                     padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
//                     fontWeight:'500', lineHeight:'12px' }}>
//                     {/* <span>{minutes} : {seconds}</span> */}
//                 </div>
//                 </a>
//             </div><br />
//             <Meta
//                 avatar={
//                     <Avatar src={board.user.image} />
//                 }
//                 title={board.title}
//             />
//             <span>{board.user.lastname}{board.user.name} </span><br />
//             <span style={{ marginLeft: '3rem' }}> {moment(board.createdAt).format("YYYY-MM-DD")} </span>
//               <span>{board.views} views </span>
            
//         </Col>

//     })

//     return (
//         <div style={{ width: '85%', margin: '3rem auto' }}>
//             <Title level={2} > Subscription </Title>
//             <hr />

//             <Row>
//                 {renderCards}
//             </Row>
//         </div>
//     )
// }

// export default SubscriptionPage;
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Col, Typography, Row, Avatar } from 'antd';
import Axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {

  const [Board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태

  useEffect(() => {
    const subscriptionVariables = {
      userFrom: localStorage.getItem('userId'),
    };

    Axios.post('/api/board/getSubscriptionBoards', subscriptionVariables)
      .then(response => {
        setLoading(false); // 데이터 로딩 완료
        if (response.data.success) {
          console.log("ddd", response.data);
          setBoard(response.data.boards);
        } else {
          // API 호출 실패 시 에러 메시지를 표시
          alert('비디오 가져오기를 실패했습니다.');
        }
      })
      .catch(error => {
        setLoading(false); // 데이터 로딩 완료
        console.error('API 호출 오류:', error);
        // API 호출 오류 시 에러 메시지를 표시
        alert('비디오 가져오기를 실패했습니다.');
      });
  }, []);

  const renderCards = Board.map((board, index) => {
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

export default SubscriptionPage;
