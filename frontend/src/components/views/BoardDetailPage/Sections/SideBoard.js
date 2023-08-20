import React, { useEffect, useState } from "react";
import Axios from "axios";

function SideBoard() {

    const [sideBoards, setSideBoards] = useState([])

    useEffect(() => {
        Axios.get('/api/board/getBoards')
        .then(response => {
            if(response.data.success) {
                console.log(response.data.boards)
                setSideBoards(response.data.boards)
            } else {
                alert('비디오 가져오기를 실패했습니다.')
            }
        })
    }, [])

    const renderSideBoard = sideBoards.map((board, index) => {

        // var minutes = Math.floor(video.duration / 60);
        // var seconds = Math.floor(video.duration - minutes * 60);

        return <div key={index} style={{ display: 'flex', marginBottom: '1rem', padding: '0 2rem' }}>
        <div style={{ width: '40%', marginRight: '1rem', position: 'relative', overflow: 'hidden' }}>
            <a href={`/board/${board.id}`}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={`http://localhost:5050/${board.thumbnail}`} alt="thumbnail"/>
            </a>
        </div> 

        <div style={ { width: '50%'}}>
            <a href="" style={{color: "gray"}}>
                <span style={ {fontSize: '1rem', color: 'black'}}>{board.title}</span><br />
                <span>{board.user.lastname}{board.user.name} </span><br />
                <span>{board.views} views</span><br />
                {/* <span>{minutes}: {seconds}</span><br /> */}
            </a>

        </div>
    </div>
    })

    return (
        <React.Fragment>
            <div style={{marginTop: '3rem'}} />
        {renderSideBoard}
    </React.Fragment>

        
    )
}

export default SideBoard;