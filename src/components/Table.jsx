import React, { Fragment, useState,useEffect } from 'react'

const Table = ({data, ts, days, title}) => {
    const [ source, setSource ] = useState(data)

    useEffect(()=>{
        setSource(data)
    },[ data ])

    if(!data) return 'Loading'
    
    function spliter(value){
        let arr = value.split('_')
        return arr[1]+":"+arr[2]
    }

    function header(value){
        return value.map( (e, i) => 
            <th key={i} scope="col">{
                spliter(e)
            }</th>
        )
    }

      
    function onChange(day, ts, status) {
        setSource({...source, 'diffusion':{...source.diffusion, 'slots':{'slots':{...source.diffusion.slots.slots, [day]:{...source.diffusion.slots.slots[day], [ts]:!status}}}}})
    }

    function check(value, timeSlote){
        let slots = source.diffusion.slots.slots[value]
        return timeSlote.map((e, i) => 
            <td className='text-center' key={i}>
                {slots[e] ?
                <div onClick={()=>onChange(value, e, slots[e])} className='cercleBorder'>
                    <div className='cercleIn'/>
                </div>
                :
                <div onClick={()=>onChange(value, e, slots[e])} className='cercleBorderNo'/>
                }
            </td>
        )
    }
    
    function day(ds, timeSlote){
        if(source){
            return ds.map((e, i) => 
                <tr key={i}>
                    <td>{e}</td>
                    {check(e, timeSlote)}
                </tr>
            )
        }
    }
    
    return  <Fragment>
                <p className="text-secondary">
                    {title}
                </p>
                <table className="table table-sm">
                    <thead className="tab">
                        <tr className="text-center">
                            <th scope="col"></th>
                            {header(ts)}
                        </tr>
                    </thead>
                    <tbody>
                        {day(days, ts)}
                    </tbody>
                </table>
            </Fragment>
}
export default Table