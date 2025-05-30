import CountDown from "./CountDown";
import { useRef } from "react";

const RightContent = (props) => {
    const refDiv = useRef([]);
    const { dataQuiz } = props;
    const onTimeUp = () => {
        props.handleFinishQuiz();
    }
    const getClassQuestion = (question) => {
        //check answer 
        if (question && question.answer.length > 0) {
            let isAnswered = question.answer.find(a => a.isSelected === true);
            if (isAnswered) {
                return "question selected";
            }
        }
        return "question";
    }
    const handleClickQuestion = (question, index) => {
        props.setIndex(index)
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }
        if (question && question.answer.length > 0) {
            let isAnswered = question.answer.find(a => a.isSelected === true);
            if (isAnswered) {
                return;
            }
        }
        refDiv.current[index].className = "question clicked"

    }
    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp} />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0
                    && dataQuiz.map((item, index) => {
                        return (
                            <div key={`question-abc-${index}`}
                                className={getClassQuestion(index, item)}
                                onClick={() => handleClickQuestion(index, item)}
                                ref={element => refDiv.current[index] = element}
                            >{index + 1}</div>
                        )
                    })
                }

            </div>
        </>
    )

}

export default RightContent