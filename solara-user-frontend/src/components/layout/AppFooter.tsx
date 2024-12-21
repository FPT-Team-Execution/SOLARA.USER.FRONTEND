import { Footer } from 'antd/es/layout/layout'

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    padding: '0'
};

const AppFooter = () => {
    return (
        <Footer style={footerStyle}>
            <div className='bg-keyColor flex justify-center items-center h-16'>© Copyright 2024, All Rights Reserved by Solara</div>
        </Footer >
    )
}

export default AppFooter;
