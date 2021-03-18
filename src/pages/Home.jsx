import React, { useState, useEffect} from "react";
import { Layout, Pagination, Button } from 'antd';
import axios from 'axios'
import LayoutFrame from "../components/LayoutFrame";
import { Link } from "react-router-dom";

const Home = () => {

    const { Content } = Layout;
    const [ srcData, setSrcData ] = useState()
    const [ displayStatus, setDisplayStatus ] = useState(['DRAFT', 'CANCELLED', 'RUNNING', 'FINISHED'])

    useEffect(()=>{
        var config = {
            method: 'get',
            url: 'https://proxistore-campaign-qof7m4cq5q-ew.a.run.app/campaigns/',
            headers: { }
          };
          axios(config)
          .then(function (response) {
            setSrcData(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });

    },[ setSrcData ])

    if(!srcData) return 'Loading'

    function zero(val){
        val +=1
        if(val < 10 ) return "0"+val
        return val            
    }

    function handleChange(value) {        
        const index = displayStatus.indexOf(value)
        if (index > -1) {
            let result = displayStatus.filter(res=> res !== value)
            setDisplayStatus(result) 
        }
        else{
            setDisplayStatus([...displayStatus, value]) 
        }
    }

    const source =(
        srcData.result.map((resp, index) => 
        displayStatus.includes(resp.details.status) ?
            <tr className='tab-normal' key={index} >
                <td className='ps-3'><b>{zero(index)}</b></td>
                <td><Link to={'/campaign/'+resp.id.value}>{resp.details.name}</Link></td>
                <td>{resp.details.source}</td>
                <td>{resp.details.status}</td>
                <td><b>{resp.details.budget.value+" "+resp.details.budget.currency}</b></td>
            </tr> : ''
        )
    )
    
    
    function btnStatusDisplay(value){
        if(displayStatus.includes(value)) return <Button className='m-1 mb-2 mt-2' type='primary'  size="small" onClick={()=>handleChange(value)}>{value}</Button>
        return <Button className='m-1 mb-2 mt-2'  size="small" onClick={()=>handleChange(value)}>{value}</Button>
    }

    return  <LayoutFrame>
                <Content className="site-layout">
                    <div className="card p-0 mb-3">
                        <div className="card-body p-3"> 
                            <div className="col d-flex flex-row-reverse">
                                {btnStatusDisplay('DRAFT')}
                                {btnStatusDisplay('CANCELLED')}
                                {btnStatusDisplay('RUNNING')}
                                {btnStatusDisplay('FINISHED')}
                            </div>
                        </div>
                    </div>
                    <div className="site-layout-background">
                        <div className="card p-0 m-0">
                            <div className="card-body p-0"> 
                                <table className="table text-secondary table-sm">
                                    <thead className="tab">
                                    <tr>
                                      <th scope="col p-3"></th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Source</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Budget</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {source}
                                    </tbody>
                                </table>
                            </div>
                            <div className="container col-md-auto mb-4">
                                {
                                    <Pagination
                                        defaultCurrent={srcData.pageable.page}
                                        total={srcData.pageable.size}
                                        position='bottomCenter'
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </Content>
        </LayoutFrame>
}

export default Home;
