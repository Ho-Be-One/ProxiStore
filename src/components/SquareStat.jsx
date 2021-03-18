import React from'react'
import Graphics from './Graphics'

const SquareStat = ({title, item, data, color})=>{

    if(!data) return 'Loarding'

    const cheeseData = [
        data.statistics.views[item].counts.MOBILE,
        data.statistics.views[item].counts.DESKTOP,
        data.statistics.views[item].counts.TABLET,
        data.statistics.views[item].counts.OTHER
    ]
   
    const mobile = data.statistics.views[item].counts.MOBILE
    const destop = data.statistics.views[item].counts.DESKTOP
    const tablet = data.statistics.views[item].counts.TABLET
    const other = data.statistics.views[item].counts.OTHER
    const total = mobile + destop + tablet + other

    function pourcentage(value, total, c){
        const result = (value/total)*100
        return <small className='me-1 fw-bold' style={{color:color[c]}}>{result.toFixed(1)}%</small>
    }
    return(
        <div className="col p-0 m-0 me-3  mb-3 ">
            <div className="card p-0 m-0">
                <div className="card-header tab">
                    {title}
                </div>
                <div className="row p-0 m-0 d-flex justify-content-between">
                    <div className="col p-0 m-1">
                        <div className="card-body p-0 m-0">
                            <ul className='statistics'>
                                <li style={{color:color[0]}}>Mobile : {mobile}</li>
                                <li style={{color:color[1]}}>Destop : {destop}</li>
                                <li style={{color:color[2]}}>Tablet : {tablet}</li>
                                <li style={{color:color[3]}}>Other : {other}</li>
                                <li style={{color:color[4]}}>Total : {total}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col p-0 m-0 mb-2">
                        <div className="mt-2">
                            {pourcentage(mobile, total, 0)}
                            {pourcentage(destop, total, 1)}
                            {pourcentage(tablet, total, 2)}
                            {pourcentage(other, total, 3)}
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
export default SquareStat