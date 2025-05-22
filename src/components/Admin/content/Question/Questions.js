import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'


const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                desciption: 'question 1 ',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        desciption: 'answer 1',
                        isCorrect: false
                    },

                ]
            },
        ]
    );

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                desciption: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        desciption: '',
                        isCorrect: false
                    }
                ]
            };
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone)

        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer = {


                id: uuidv4(),
                desciption: '',
                isCorrect: false


            };
            let index = questionsClone.findIndex(item.id === questionId);
            questionsClone[index].answers.push(
                newAnswer
            )
            setQuestions(questionsClone)
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item.id === questionId);
            questionsClone[index] = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone)

        }
    }
    return (
        <div className="question-container">
            <div className="title">
                ManageQuestion
            </div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add question:

                </div>
                <div className='q-main mb-5'>
                    <div className='questions-content'>

                        <div className="form-floating description">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label >Question's description</label>
                        </div>
                        <div className='group-upload'>
                            <label ><RiImageAddFill className='label-up' /></label>
                            <input type={'file'} hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='btn-add '>
                            <span><FaPlus className='icon-add' /></span>
                            <span><FaMinus className='icon-remove' /></span>

                        </div>

                    </div>
                    <div className='answers-content'>
                        <input className="form-check-input iscorrect" type="checkbox" />
                        <div className="form-floating answer-name">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label >answers 1</label>
                        </div>
                        <div className='btn-group '>
                            <span><TiPlus className='icon-add' /></span>
                            <span><TiMinus className='icon-remove' /></span>

                        </div>
                    </div>
                    <div className='answers-content'>
                        <input className="form-check-input iscorrect" type="checkbox" />
                        <div className="form-floating answer-name">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label >answers 1</label>
                        </div>
                        <div className='btn-group '>
                            <span><TiPlus className='icon-add' /></span>
                            <span><TiMinus className='icon-remove' /></span>

                        </div>
                    </div>
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-5'>
                                <div className='questions-content'>

                                    <div className="form-floating description">
                                        <input type="text" className="form-control" placeholder="name@example.com" value={question.desciption} />
                                        <label >Question {index + 1}'s description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label ><RiImageAddFill className='label-up' /></label>
                                        <input type={'file'} hidden />
                                        <span>0 file is uploaded</span>
                                    </div>
                                    <div className='btn-add '>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}><FaPlus className='icon-add' /></span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}><FaMinus className='icon-remove' /></span>
                                        }
                                    </div>

                                </div>
                                {question.answers && question.answers / length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input className="form-check-input iscorrect" type="checkbox" />
                                                <div className="form-floating answer-name">
                                                    <input value={answer.desciption} type="text" className="form-control" placeholder="name@example.com" />
                                                    <label >answers {index + 1}</label>
                                                </div>
                                                <div className='btn-group '>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}><TiPlus className='icon-add' /></span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}><TiMinus className='icon-remove' /></span>
                                                    }
                                                </div>
                                            </div>

                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Questions