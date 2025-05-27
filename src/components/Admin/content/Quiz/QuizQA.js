import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from "../../../../services/apiServices";
import { FaPlus, FaMinus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _, { create } from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { toast } from 'react-toastify';


const QuizQA = (props) => {
    const initQuestions =
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },

                ]
            },
        ]
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState(initQuestions);

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
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
                description: '',
                isCorrect: false


            };
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index] = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)

        }
    }
    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);

        }
    }
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type = 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }

                }
                return answer;
            })

            setQuestions(questionsClone);

        }

    }
    const handleSubmitQuestionForQuiz = async () => {
        //submit question
        // await Promise.all(questions.map(async (question) => {
        //     const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
        //     await Promise.all(question.answers.map(async (answer) => {
        //         await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
        //     }))
        // }))
        if (_.isElement(selectedQuiz)) {
            toast.error("please choose a quiz!");
            return
        }

        //validate answer
        let isValdAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; i++) {
                if (!questions[i].answers[j].description) {
                    isValdAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValdAnswer === false) break;
        }
        if (isValdAnswer === false) {
            toast.error(`Not Empty Answer ${indexA + 1} at question ${indexQ + 1}`)
            return;
        }
        //validate question 
        let isValdQuestion = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].description) {
                isValdQuestion = false;
                indexQ1 = i;
                break;
            }
        }
        if (isValdQuestion === false) {
            toast.error(`Not empty description for question ${indexQ1 + 1}`);
            return
        }
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile)
            //sudmit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }
        }
        toast.success('Create question and answer sucessed!');
        setQuestions(initQuestions);
    }
    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }
    return (
        <div className="question-container">
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add question:

                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-5'>
                                <div className='questions-content'>

                                    <div className="form-floating description">
                                        <input type="text" className="form-control" placeholder="name@example.com" value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label >Question {index + 1}'s description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`} ><RiImageAddFill className='label-up' /></label>
                                        <input id={`${question.id}`} type={'file'} hidden
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                        />
                                        <span>{question.imageName ? <span onClick={() => handlePreviewImage(question.id)}> {question.imageName} </span> : '0 file is uploaded'}</span>
                                    </div>
                                    <div className='btn-add '>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}><FaPlus className='icon-add' /></span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}><FaMinus className='icon-remove' /></span>
                                        }
                                    </div>

                                </div>
                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input className="form-check-input iscorrect" type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input value={answer.description} type="text" className="form-control" placeholder="name@example.com"
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)} />
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
                {questions && questions.length > 0 &&
                    <div>
                        <button onClick={() => handleSubmitQuestionForQuiz()} className='btn btn-warning'>Save Question</button>
                    </div>
                }
                {isPreviewImage === true &&
                    <Lightbox image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    ></Lightbox>
                }
            </div>

        </div>
    )
}

export default QuizQA