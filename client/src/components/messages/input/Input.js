import React from 'react';
import './Input.css';

export const Input = ({onSubmit, onChange, text}) => (
    <form className="input" onSubmit={onSubmit}>
        <label htmlFor="message-input">Message:</label>
        <textarea id="message-input" className="form-control" rows="10" name="text" value={text} onChange={onChange} />

        <button className="btn btn-primary input_submit-button">Send</button>
    </form>
);
