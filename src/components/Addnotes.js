import React, { useContext, useState } from 'react';
import NoteContext from "../context/notes/createContext";
import { FiFileText, FiTag, FiPlus, FiEdit } from "react-icons/fi";

function Addnote(props) {
  const notesHandler = useContext(NoteContext);
  const { addNote } = notesHandler;
  const { showAlert } = props;
  
  const [tempNote, setTempNote] = useState({ title: '', description: '', tag: '' });
  const [errors, setErrors] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTempNote({ ...tempNote, [name]: value });
    
    // Validate in real-time
    if (name === 'title' || name === 'description') {
      validateField(name, value);
    }
  };

  // Validate individual field
  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'title') {
      if (value.trim().length === 0) {
        error = 'Title is required';
      } else if (value.trim().length < 5) {
        error = 'Title must be at least 5 characters';
      }
    }
    
    if (name === 'description') {
      if (value.trim().length === 0) {
        error = 'Description is required';
      } else if (value.trim().length < 5) {
        error = 'Description must be at least 5 characters';
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validate entire form
  const validateForm = () => {
    validateField('title', tempNote.title);
    validateField('description', tempNote.description);
    
    return !errors.title && !errors.description && 
           tempNote.title.trim().length >= 5 && 
           tempNote.description.trim().length >= 5;
  };

  // Handle form submission
  const clickHandler = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        const { title, description, tag } = tempNote;
        await addNote(title, description, tag);
        setTempNote({ title: '', description: '', tag: '' });
        showAlert('Note added successfully', 'success');
      } catch (error) {
        showAlert('Failed to add note', 'error');
        console.error("Add note error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Check if form is valid for submission
  const isFormValid = tempNote.title.trim().length >= 5 && 
                      tempNote.description.trim().length >= 5;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white py-3">
              <div className="d-flex align-items-center">
                <FiEdit className="me-2" size={24} />
                <h2 className="h4 mb-0">Create a New Note</h2>
              </div>
            </div>
            
            <div className="card-body p-4 p-lg-5">
              <form onSubmit={clickHandler}>
                {/* Title Field */}
                <div className="mb-4">
                  <label htmlFor="title" className="form-label fw-bold d-flex align-items-center">
                    <FiFileText className="me-2" />
                    Title
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    name="title"
                    placeholder="Enter a title for your note"
                    value={tempNote.title}
                    onChange={changeHandler}
                  />
                  {errors.title && (
                    <div className="invalid-feedback d-block mt-1">
                      {errors.title}
                    </div>
                  )}
                  {!errors.title && tempNote.title.length > 0 && tempNote.title.length < 5 && (
                    <div className="form-text text-warning">
                      Title must be at least 5 characters
                    </div>
                  )}
                </div>
                
                {/* Description Field */}
                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-bold d-flex align-items-center">
                    <FiFileText className="me-2" />
                    Description
                  </label>
                  <textarea
                    className={`form-control form-control-lg ${errors.description ? 'is-invalid' : ''}`}
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Enter your note content"
                    value={tempNote.description}
                    onChange={changeHandler}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback d-block mt-1">
                      {errors.description}
                    </div>
                  )}
                  {!errors.description && tempNote.description.length > 0 && tempNote.description.length < 5 && (
                    <div className="form-text text-warning">
                      Description must be at least 5 characters
                    </div>
                  )}
                </div>
                
                {/* Tag Field */}
                <div className="mb-4">
                  <label htmlFor="tag" className="form-label fw-bold d-flex align-items-center">
                    <FiTag className="me-2" />
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="tag"
                    name="tag"
                    placeholder="Add a tag (optional)"
                    value={tempNote.tag}
                    onChange={changeHandler}
                  />
                  <div className="form-text">
                    Helps categorize your notes (e.g., work, personal)
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold py-3"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding Note...
                      </>
                    ) : (
                      <>
                        <FiPlus className="me-2" />
                        Add Note
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style jsx="true">{`
        .card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
        }
        .form-control-lg {
          padding: 0.8rem 1rem;
          border-radius: 0.7rem;
          border: 1px solid #dee2e6;
        }
        .form-control-lg:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        .btn-lg {
          border-radius: 0.7rem;
          transition: all 0.3s ease;
        }
        .card-header {
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
        }
        .invalid-feedback {
          display: block;
        }
      `}</style>
    </div>
  );
}

export default Addnote;