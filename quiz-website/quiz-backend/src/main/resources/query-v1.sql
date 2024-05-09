USE quiz;

# select câu trả lời của người dùng có id 4 cho bài quiz số 2(chính trị)
SELECT  ques.description as question, ans.description as answer, pa.answer_id, ans.correct_answer, pa.user_answer
FROM quiz AS q
JOIN question AS ques ON q.id = ques.quiz_id
JOIN answer AS ans ON ques.id = ans.question_id
JOIN participant_answer AS pa ON ans.id = pa.answer_id
WHERE pa.participant_id = 4 and q.id = 2;