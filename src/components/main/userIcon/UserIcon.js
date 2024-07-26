import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import style from './UserIcon.module.css';
import { useAuth } from "components/guards/AuthContext";

const UserIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { signOut } = useAuth();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={style.wrapper} ref={dropdownRef} onClick={toggleDropdown} >
            <button className={style.iconButton}>
                <FontAwesomeIcon icon={faUser} className={style.icon} />
            </button>
            {isOpen && (
                <div className={style.dropdownMenu}>
                    <ul className={style.dropdownList}>
                        <li className={style.dropdownItem}>Profile</li>
                        <li className={style.dropdownItem}>Settings</li>
                        <li 
                            className={style.dropdownItem} 
                            onClick={signOut}
                        >Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserIcon;