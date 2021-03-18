import React from'react'
import Graphics from './Graphics'

const SquareClick = ({title, data, color})=>{

    if(!data) return 'Loarding'

    const cheeseData = [
        data.statistics.clicks.count,
        data.statistics.clicks.unique
    ]
   
    const count = data.statistics.clicks.count
    const unique = data.statistics.clicks.unique
    const total = data.statistics.clicks.count + data.statistics.clicks.unique

    function pourcentage(value, total, c){
        const result = (value/total)*100
        return <small className='me-1 fw-bold' style={{color:color[c]}}>{result.toFixed(1)}%</small>
    }
    
    return(
        <div className="col p-0 m-0  mb-3 ">
            <div className="card p-0 m-0">
                <div className="card-header tab">
                    {title}
                </div>
                <div className="row p-0 m-0 d-flex justify-content-between">
                    <div className="col p-0 m-1">
                        <div className="card-body p-0 m-0">
                            <ul className='statistics'>
                                <li style={{color:color[0]}}>Count : {count}</li>
                                <li style={{color:color[1]}}>Unique : {unique}</li>
                                <li style={{color:color[2]}}>.</li>
                                <li style={{color:color[3]}}>.</li>
                                <li style={{color:color[4]}}>.</li>
                                <li>Total : {total}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col p-0 m-0 mb-2">
                    <div className="mt-2">
                            {pourcentage(count, total, 0)}
                            {pourcentage(unique, total, 1)}
                        </div>
                        <Graphics 
                            data={cheeseData}
                            color={color}
                        />
                    </div>
                </div>
            </div> 
        </div>
    )
}
export default SquareClick