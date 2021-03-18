import React from "react"
import { Result, Button, Layout } from 'antd';

import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import LayoutFrame from "../components/LayoutFrame";

const NoMatch = () => {
    const { Content} = Layout

    return  <LayoutFrame>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button><Link type="primary" to='/'>Back Home</Link></Button>}
                    />
                    </Content>
            </LayoutFrame>
    
}
export default NoMatch;