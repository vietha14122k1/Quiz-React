import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../services/apiServices";
import _ from 'lodash'
import './DetailQuiz.scss'

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    useEffect(() => {
        fetchQuestions();
    }, [quizId]);
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, questionDescription, image }
                }

                )
                .value()
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId} : {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">

                </div>
                <div className="q-content">
                    <div className="question">
                        Quiz 1: how are you doing?
                    </div>
                    <div className="answer">
                        <div>
                            <div className="a-child">1</div>
                            <div className="a-child">2</div>
                            <div className="a-child">3</div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary">Prev</button>
                    <button className="btn btn-primary">Next</button>

                </div>

            </div>
            <div className="right-content">
                Count Down
            </div>
        </div>
    )
}
export default DetailQuiz