import React from 'react';
import { Badge } from 'react-bootstrap';
import '../css/footer.css'

const Footer = () => {

    return (
        <>
            <div className='footer row'>
                <h3>
                    <Badge variant="light">
                        <a target='_blank' className='text' href='https://github.com/hamzaramzanali'>
                            @Hamza Ramazali
                        </a>
                    </Badge>
                </h3>
                <h3>
                    <Badge variant="light">
                        <a target='_blank' className='text' href='https://github.com/Christilato'>
                            @Christi Lato
                        </a>
                    </Badge>
                </h3>
                <h3 className='text'>
                    <Badge variant="light" className='text'>
                        <a target='_blank' className='text' href='https://github.com/terrencebudnik'>
                            @Terrence Budnik
                        </a>
                    </Badge>
                </h3>
                <h3>
                    <Badge variant="light">
                        <a target='_blank' className='text' href='https://github.com/terrencebudnik'>
                            @Terrence Budnik
                        </a>
                    </Badge>
                </h3>
                <h3>
                    <Badge variant="light">
                        <a target='_blank' href='https://github.com/AliCelikay'>
                            @Ali Celikay
                        </a>
                    </Badge>
                </h3>
            </div>
        </>
    );
}

export default Footer;
