import React, {useState} from 'react'
import './AddNoteForm.css'

function AddNoteForm({addNote}) {
    const [isExpanded,setIsExpanded] = useState(false);
    const [title ,setTitle] =useState('');
    const [content ,setContent] =useState('');
    
    
    const handleExpand = (e) => {
        setIsExpanded(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && content){
            addNote(title , content);
            handleClose();
        }
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleContentChange = (e) => {
        setContent(e.target.value);
    }
    const handleClose =(e) => {
        if(e) e.stopPropagation(); // Prevent triggering handleExpand if called from click event
        setTitle('');
        setContent('');
        setIsExpanded(false);
    }
  return (
    <form className='note-container' onClick={handleExpand} onSubmit={handleSubmit}>
        {isExpanded && (
            <input
             type='text'
             placeholder='Title'
             value={title}
             onChange={handleTitleChange}
             className='note-title-input'
            />   
        )}
        <textarea 
         placeholder='Take a note...'
         value={content}
         onChange={handleContentChange}
         className='note-content-input'
         rows={isExpanded ? 3 : 1} 
        />
        {isExpanded && (
            <div className="note-actions">
                <button
                    onClick={handleClose}
                    className={`note-close-button ${title && content ? 'note-close-button-active' : ''}`}
                >
                    Close
                </button>
                {title && content && (
                    <button
                        type="submit"
                        className="note-add-button"
                    >
                        Add Note
                    </button>
                )}
            </div>
        )}
    </form>
  )
}

export default AddNoteForm
