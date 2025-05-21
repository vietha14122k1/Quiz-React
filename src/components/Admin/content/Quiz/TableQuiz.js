import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiServices";

const TableQuiz = (props) => {
    const [lsitQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.DT === 0) {
            setListQuiz(res.DT)
        }
    }
    return (
        <>
            <div>
                Lsit Quizzz:
            </div>
            <table className="table table-hover table-bordered mt-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>

                    {lsitQuiz && lsitQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button className="btn btn-waring">Edit</button>
                                    <button className="btn btn-danger">Delete</button>

                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </table>
        </>
    )
}
export default TableQuiz