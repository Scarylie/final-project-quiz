import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GhostBtn } from 'components/styles/Buttons';
import { API_URL } from 'utils/urls';

let iconStyles = { fontSize: '3em' };

const DeleteQuiz = ({ title, id }) => {
  const API_QUIZ_ID = `${API_URL('quiz')}/${id}`;
  const navigate = useNavigate();

  const handleRemoveQuiz = () => {
    console.log('Delete this quiz:', API_QUIZ_ID);

    const options = {
      method: 'DELETE',
    };
    fetch(API_QUIZ_ID, options)
      .then((data) => data.json())
      .then((data) => console.log(API_QUIZ_ID, data))
      .catch((error) => console.error(error));
  };

  return (
    <GhostBtn
      type="button"
      className="removeBtn"
      onClick={(event) => handleRemoveQuiz(event, id)}>
      {title}
      <RiDeleteBin6Line style={iconStyles} />
    </GhostBtn>
  );
};

export default DeleteQuiz;
