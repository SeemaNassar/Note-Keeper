import React, { useState } from 'react'
import Linkify from 'react-linkify';
import './NoteCart.css'

function NoteCart({
    id,
    title,
    date,
    content,
    backgroundColor,
    onDelete,
    onUpdate
}) {
    const [isEditing , setIsEditing] = useState(false);
    const [editTitle , setEditTitle] = useState(title);
    const [editContent , setEditContent] = useState(content);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const trashIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666">
            <path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z"/>
        </svg>
    );

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancel = () => {
        setIsEditing(false);
        setEditTitle(title);
        setEditContent(content);
    };

    const handleSave = () => {
        onUpdate(id, editTitle, editContent);
        setIsEditing(false);
    };

    const handleDeleteConfirm = () => {
        setShowDeleteConfirm(true);
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    const handleDelete = () => {
        onDelete(id);
        setShowDeleteConfirm(false);
    };

    return (
        <>
            <div 
             className={`note-card ${isEditing ? 'note-card-inactive' : ''}`}
             style={{backgroundColor , borderColor: backgroundColor}}
             onClick={handleEdit}
            >
                <h2 className="note-title">{title}</h2>
                <Linkify>
                    <p className="note-content">{content}</p>
                </Linkify>
                <div className="note-date">{date}</div>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteConfirm(); }}>
                    {trashIcon}
                </button>
            </div>

            {isEditing && (
                <div className="note-modal">
                    <div className="note-modal-content">
                        <input 
                         type="text" 
                         value={editTitle} 
                         onChange={(e) => setEditTitle(e.target.value)}
                         className="note-title-input" 
                        />
                        <textarea  
                         value={editContent}
                         rows={3}
                         onChange={(e) => setEditContent(e.target.value)}
                         className="note-content-input"
                        />
                        <div className="note-actions">
                            <button className="note-close-update-button" onClick={handleCancel}>Close</button>
                            <button className="note-save-button" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteConfirm && (
                <div className="note-modal">
                    <div className="note-modal-content">
                        <h2>Note Deletion</h2>
                        <p>Are you certain you wish to delete this Note?</p>
                        <div className="note-actions">
                            <button className="note-close-update-button" onClick={handleDeleteCancel}>Close</button>
                            <button className="note-save-button" onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NoteCart
