import { useState } from "react";

export default function PageWithJSbasedForm() {
  const [loader, setLoader] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setAnswer("");
    setLoader(true);

    const data = {
      question: event.target.question.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/titanic";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    const answer = JSON.stringify(result.answer);

    setAnswer(answer.replace(/['"]+/g, ""));
    setLoader(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full m-8 mb-4 text-center"
      >
        <label htmlFor="question" className="mb-8">
          Write a question and then click on the button for get a answer
        </label>
        <textarea
          id="question"
          className="border-2 border-gray-300 bg-white w-80 h-20 px-5 pr-16 mb-8 rounded-lg text-sm focus:outline-none"
          name="question"
          placeholder="Type your question here"
          required
        />
        <button
          type="submit"
          disabled={loader}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loader ? "Loading..." : "Get Answer"}
        </button>
      </form>
      {answer && (
        <div className="flex flex-col items-center justify-center w-80 m-8 text-center bg-blue-100 rounded-sm p-4">
          <p className="text-1xl font-bold text-gray-500">{answer}</p>
        </div>
      )}
    </>
  );
}
