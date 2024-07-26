import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import style from './UserIcon.module.css';

const UserIcon = () => (
    <div className={style.wrapper}>
        <FontAwesomeIcon icon={faUser} className={style.icon} />
    </div>
);

export default UserIcon;