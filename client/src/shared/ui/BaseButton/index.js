import React from 'react'

const getNearestDeviceButton = {
    fontSize: '0.8rem',
    fontWeight: '900',
    color: 'white',
    width: '80px',
    height: '80px',
    cursor: 'pointer',
    backgroundColor: 'red',
    borderRadius: '50%',
    boxShadow: '0px 0px 25px black',
    border: '2px solid rgba(0, 0, 0, 0.6)'
};

export default function BaseButton({ onClick, children, styles }) {
    return (
        <button style={{ ...getNearestDeviceButton, ...styles }} type="button" onClick={onClick}>{children}</button>
    )
}
