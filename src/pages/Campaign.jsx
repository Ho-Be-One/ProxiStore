import React, { useState, useEffect } from "react";
import { Layout, Button, Select } from 'antd';
import axios from 'axios'
import dayjs from 'dayjs';
import SquareStat from "../components/SquareStat";
import SquareClick from "../components/SquareClick";
import Tableau from "../components/Table";
import LayoutFrame from "../components/LayoutFrame";
import { useParams } from 'react-router'

const Campaign = () => {

    const { Option } = Select;
    const { Content } = Layout;
    const [ srcDetail, setSrcDetail ] = useState()
    const [ segmentsRecorded, setSegmentsRecorded ] = useState([])
    const getUrl = useParams() 

    useEffect(()=>{
        var config = {
            method: 'get',
            url: 'https://proxistore-campaign-qof7m4cq5q-ew.a.run.app/campaigns/'+getUrl.id,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            setSegmentsRecorded(response.data.targets.segments.map( e => e.value))
            setSrcDetail(response.data)

          })
          .catch(function (error) {
            console.log(error);
          });
    },[ getUrl.id ])

    if(!srcDetail) return 'Loading'

    function handleChange(value) {        
        const index = segmentsRecorded.indexOf(value)
        if (index > -1) {
            let result = segmentsRecorded.filter(res=> res !== value)
            setSegmentsRecorded(result) 
        }
        else{
            setSegmentsRecorded([...segmentsRecorded, value]) 
        }
    }

    const TS = [ 'TS_00_08', 'TS_08_10', 'TS_10_12', 'TS_12_14', 'TS_14_16', 'TS_15_18','TS_16_18','TS_18_21', 'TS_21_24' ]
    const TSWK = [ 'TS_00_09', 'TS_09_12', 'TS_12_15', 'TS_15_18', 'TS_18_21', 'TS_21_24' ]
    const day = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY' ]
    const weekEnd = ['SATURDAY', 'SUNDAY']
    const color = [ '#5da7ec', '#4E8CC2', 'orange', '#53BE11' ]
    const segments = [ 'animal', 'sport', 'car', 'nightlife', 'art', 'culture', 'technology', 'food' ]
    

    function segmentsSelected(){
        return segmentsRecorded.map((e,i)=>
            <Button className='m-1 mb-2 mt-2' onClick={()=>handleChange(e)}  size="small" key={i} >{e}  <i className="fa fa-times"/></Button>
        )
    }


    function segmentsList(value){
        let tab2 = []
        value.map( e => 
            segmentsRecorded.indexOf(e) < 0 ? tab2.push(e) : ''
        )
        return tab2.map((e,i)=>
            <Option key={i} value={e} label={e}>{e}</Option>
        )
    }

    return  <LayoutFrame>
                <Content className="site-layout">
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <div className="row">
                            <div className="col mb-3">
                                <div className="card bg-light p-0" >
                                    <div className="card-header tab">
                                        {srcDetail.details.name}
                                    </div>
                                    <div className="card-body">
                                        <ul className='presentation'>
                                            <li><b>Période : </b>{srcDetail ? dayjs(srcDetail.diffusion.period.from).format('DD/MM/YYYY')+" -> "+dayjs(srcDetail.diffusion.period.to).format('DD/MM/YYYY'):''}</li>
                                            <li><b>Status : </b>{srcDetail.details.status}</li>
                                            <li><b>Budget : </b>{srcDetail.details.budget.value} {srcDetail.details.budget.currency}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-3">
                                <div className="card bg-light p-0" >
                                    <div className="card-header tab d-flex justify-content-between">
                                    Target "Segments" <Select placeholder='Add segement' style={{ width: 200 }} onChange={handleChange}>
                                            {segmentsList(segments)}
                                        </Select>
                                    </div>
                                    <div className="card- d-flex p-4 justify-content-start">
                                        {segmentsSelected()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row p-0 m-0 d-flex justify-content-between">
                            <SquareStat
                                title='Expected views'
                                item='expected'
                                data={srcDetail}
                                type='views'
                                color={color}
                            />
                            <SquareStat
                                title='Effective views'
                                item='effective'
                                data={srcDetail}
                                type='views'
                                color={color}
                            />
                            <SquareStat
                                title='Unique views'
                                item='unique'
                                data={srcDetail}
                                type='views'
                                color={color}
                            />
                            <SquareClick
                                title='Number of click'
                                data={srcDetail}
                                color={color}
                            />
                        </div>
                        <div className="row p-0 m-0">
                            <div className="card bg-light p-0" >
                                <div className="card-header tab">
                                    TimeSlote
                                </div>
                                <div className="card-body">
                                    <Tableau data={srcDetail} ts={TS} days={day} />
                                    <Tableau data={srcDetail} ts={TSWK} days={weekEnd} title='Week-end'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </LayoutFrame>
}
export default Campaign;
